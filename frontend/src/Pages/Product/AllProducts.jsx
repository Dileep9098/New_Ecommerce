import React, { useState } from 'react'
import FilterProduct from '../../Comoponant/Product/FilterProduct'
import SideBarProduct from '../../Comoponant/Product/SideBarProduct'
import ProductBox from '../../Comoponant/Product/ProductBox'
import { Link, useAsyncError, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../Store/Feature/product/productSlice';
import { useEffect } from 'react';
import { AddCustomerWishList } from '../../utils/CartHelper';
import { replaceWhiteSpacesWithDashSymbolInUrl } from '../../utils/ConversionHelper';
const BASE_URL = import.meta.env.VITE_IMG_URL;

export default function AllProducts() {
  const [showProduct, setShowProduct] = useState(5)
  console.log('Hello bhai mere kya huaa ', showProduct)

  const handleShowColunm = (n) => {
    console.log(n)
    setShowProduct(n)

  }


  const { isLoading, products, productCount } = useSelector((state) => state.product)
  const dispatch = useDispatch()
  console.log("Hello Kya hua hai", products)
  // const [TotalRecords, setTotalRecords] = useState(productCount);
  const [showPagination, setshowPagination] = useState(false);
  const [PageNo, setPageNo] = useState(1);
  const [PageSize, setPageSize] = useState(10);
  const [TotalRecords, setTotalRecords] = useState(productCount);
  const [newArrivals, setNewArrivals] = useState(false)
  const [newArrivalsProducts, setNewArrivalsProducts] = useState([])
  const [searchCategoryName, setSearchCategoryName] = useState('')

  // console.log("setNewArrivals", newArrivals)

  const param1 = useParams()

  console.log("Param Category ID", param1)

  let categoryParamArray = []
  categoryParamArray.push(parseInt(param1.category_id) ?? 0)
  const search = useLocation().search;

  const queryParams = new URLSearchParams(location.search);
  const SearchTerm = queryParams.get('SearchTerm');

  const [CategoryID, setCategoryID] = useState(categoryParamArray)
  const [SizeID, setSizeID] = useState([]);
  const [ColorID, setColorID] = useState(null);
  const [TagID, setTagID] = useState([]);
  const [ManufacturerID, setManufacturerID] = useState([]);
  const [MinPrice, setMinPrice] = useState(null);
  const [MaxPrice, setMaxPrice] = useState(null);
  const [Rating, setRating] = useState(null);
  const [productSearch, setProductSearch] = useState('');
  const [OrderByColumnName, setOrderByColumnName] = useState('');


  const setFilterValueInParent = async (e, value, type) => {
    
    let categoriesIdsCommaSeperated = CategoryID.length > 0 ? CategoryID.join(",") : "";
    let brandsIdsCommaSeperated = ManufacturerID.length > 0 ? ManufacturerID.join(",") : "";
    let sizeIdsCommaSeperated = SizeID.length > 0 ? SizeID.join(",") : "";
    let tagsIdsCommaSeperated = TagID.length > 0 ? TagID.join(",") : "";
    let minPriceLocal = MinPrice;
    let maxPriceLocal = MaxPrice;
    let colorIdLocal = ColorID;
    let ratingLocal = Rating;
    if (type == "category") {

      let updatedCategories = [...CategoryID];
      const index = updatedCategories.indexOf(value);

      if (index === -1) {
        updatedCategories.push(value);
      } else {
        updatedCategories.splice(index, 1);
      }
      updatedCategories = updatedCategories.filter((num) => num !== 0);

      await setCategoryID(updatedCategories);
      categoriesIdsCommaSeperated = updatedCategories.join(",");


    } else if (type == "brand") {

      let updatedBrands = [...ManufacturerID];
      const index = updatedBrands.indexOf(value);

      if (index === -1) {
        updatedBrands.push(value);
      } else {
        updatedBrands.splice(index, 1);
      }
      updatedBrands = updatedBrands.filter((num) => num !== 0);

      await setManufacturerID(updatedBrands);
      brandsIdsCommaSeperated = updatedBrands.join(",");


    } else if (type == "size") {

      let updatedSize = [...SizeID];
      const index = updatedSize.indexOf(value);

      if (index === -1) {
        updatedSize.push(value);
      } else {
        updatedSize.splice(index, 1);
      }
      updatedSize = updatedSize.filter((num) => num !== 0);

      await setSizeID(updatedSize);
      sizeIdsCommaSeperated = updatedSize.join(",");


    } else if (type == "price") {

      // setTimeout(() => {
      //     const priceArray = value.split("-");
      //     setMinPrice(priceArray[0]);
      //     setMaxPrice(priceArray[1]);
      // }, 100);

      await setMinPrice(value.min);
      await setMaxPrice(value.max);
      // const priceArray = value.split("-");
      // await setMinPrice(priceArray[0]);
      // await setMaxPrice(priceArray[1]);

      minPriceLocal = value.min;
      maxPriceLocal =   value.max;

    } else if (type == "color") {

      await setColorID(value);
      colorIdLocal = value;


    }
    else if (type == "rating") {

      await setRating(value);
      ratingLocal = value;

    } else if (type == "tag") {

      let updatedTags = [...TagID];
      const index = updatedTags.indexOf(value);

      if (index === -1) {
        updatedTags.push(value);
      } else {
        updatedTags.splice(index, 1);
      }
      updatedTags = updatedTags.filter((num) => num !== 0);

      await setTagID(updatedTags);
      tagsIdsCommaSeperated = updatedTags.join(",");

    }


  }



  const setSortByFilter = (value) => {
    // debugger
    if (value) {
      setOrderByColumnName(value);
      console.log("Product Page per", value);
    } else {
      console.log("Received undefined or invalid value:", value);
    }
  }
  const setPageSizeFromProductFilter = (value) => {
    if (value) {

      setPageSize(parseInt(value));
      console.log("Product Page per", value);
    } else {
      console.log("Received undefined or invalid value:", value);
    }
  }


  useEffect(() => {
    
    const param = {

      SearchTerm: SearchTerm || productSearch,
      SizeID: SizeID.join(","),
      // ColorID: ColorID,
      CategoryID: CategoryID.join(","),
      // TagID: TagID.join(","),
      ManufacturerID: ManufacturerID.join(","),
      MinPrice: MinPrice,
      MaxPrice: MaxPrice,
      Rating: Rating,
      OrderByColumnName: OrderByColumnName,
      PageNo: PageNo,
      PageSize: PageSize || 10,
      // productSearch: productSearch||""


    }

    setSearchCategoryName(param1.category_name)
    if (param1.category_name == "all-categories") {
      dispatch(getAllProducts({ param, CategoryName: "" }))
    }
    else {
      dispatch(getAllProducts({ param, CategoryName: param1.category_name }))
    }


    // setOrderByColumnName("")
  }, [param1, CategoryID, ManufacturerID, SizeID, MaxPrice, MinPrice, Rating, PageNo, PageSize, productSearch, OrderByColumnName])


  // debugger
  const activeProducts = Array.isArray(products) ? products.filter(product => product.IsActive) : [];


  // Get All Products 
  const setCurrentPage = (pageNumber) => {
    setPageNo(pageNumber);
  }
  const maxPagesToShow = 5;

  const getPageNumbers = () => {
    if (totalPages <= maxPagesToShow) {
      // if total pages <= 5, show all
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let startPage = Math.max(1, PageNo - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    // Adjust if endPage exceeds totalPages
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = endPage - maxPagesToShow + 1;
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const totalPages = Math.ceil(TotalRecords / PageSize);


  useEffect(() => {
    setTotalRecords(productCount || 0);
    // debugger

    if (newArrivals) {
      const newArrivalsActiveProduct = Array.isArray(products)
        ? products.filter(product =>
          product.IsActive &&
          product.MarkAsNew &&
          Array.isArray(product.ProductPictures) &&
          product.ProductPictures.length > 0 // ✅ Check for images
        )
        : [];

      setNewArrivalsProducts(newArrivalsActiveProduct);
    }
  }, [productCount, newArrivals, products]);


  const HandleAddToWishList = ({ ProductId, ProductName, Price, IsShippingFree, ShippingCharge, OrderMaximumQuantity, StockQuantity, ProductPictures, DiscountPrice, CouponCode }) => {

    let customerWishList = AddCustomerWishList(ProductId, ProductName, Price, IsShippingFree, ShippingCharge, OrderMaximumQuantity, StockQuantity, ProductPictures, DiscountPrice, CouponCode);
    localStorage.setItem("customerWishList", customerWishList)

  };
  return (

    <>

      <div className="mt-8 mb-lg-14 mb-8">
        <div className="container-fluid px-lg-8">
          <div className="row gx-10">
            <SideBarProduct productSearch={productSearch} setProductSearch={setProductSearch} setSortByFilter={setSortByFilter} setPageSizeFromProductFilter={setPageSizeFromProductFilter} setFilterValueInParent={setFilterValueInParent} setNewArrivals={setNewArrivals} />


            <section className="col-lg-9 col-md-12">

              <FilterProduct handleShowColunm={handleShowColunm} showProduct={showProduct} productSearch={productSearch} setProductSearch={setProductSearch} setSortByFilter={setSortByFilter} setPageSizeFromProductFilter={setPageSizeFromProductFilter} setFilterValueInParent={setFilterValueInParent} setNewArrivals={setNewArrivals} />


              {showProduct == 3 || showProduct == 5 ?

                <div className={`row g-4 row-cols-xl-${showProduct} row-cols-lg-${showProduct} row-cols-2 row-cols-md-2 mt-2`}>

                  {newArrivalsProducts && newArrivalsProducts.length > 0 ? (
                    newArrivalsProducts.map((product, ind) => (
                      <div className="col-lg-3 col-md-6 col-sm-6 col-6" key={ind}>
                        <ProductBox key={product._id} product={product} />
                      </div>
                    ))
                  ) : activeProducts && activeProducts.length > 0 ? (
                    activeProducts.map((product, ind) => (
                      <div className="col-lg-3 col-md-6 col-sm-6 col-6" key={ind}>
                        <ProductBox key={product._id} product={product} />
                      </div>
                    ))
                  ) : (
                    <div className="w-100 py-5 d-flex flex-column align-items-center justify-content-center text-center">
                      <div
                        className="p-4 rounded shadow-sm bg-light"
                        style={{
                          maxWidth: "400px",
                          border: "1px solid #e0e0e0",
                        }}
                      >
                        <i
                          className="bi bi-box-seam text-muted"
                          style={{ fontSize: "3rem", marginBottom: "10px" }}
                        ></i>
                        <h4 className="fw-semibold mb-2">No Products Found</h4>
                        <p className="text-muted mb-0">
                          We couldn’t find any products right now. Please check back later!
                        </p>
                      </div>
                    </div>

                  )}

                </div>

                :
                <div class="row g-4 row-cols-1 mt-2">
                  {
                    (Array.isArray(activeProducts) &&
                      activeProducts.map((product, ind) => (
                        <div class="col">
                          <div class="card card-product">
                            <div class="card-body">
                              <div class="row align-items-center">
                                <div class="col-md-4 col-12">
                                  <div class="text-center position-relative">
                                    <div class="position-absolute top-0">
                                      <span class="badge bg-primary"> {product?.DiscountProductsMappings?.DiscountValue
                                        ? `${product.DiscountProductsMappings.DiscountValue} %`
                                        : ""}</span>
                                    </div>
                                    <Link to={`/product-details/${product._id}/${product.ProductsCategoriesMappings.map((category) => replaceWhiteSpacesWithDashSymbolInUrl(category.Name)).join('-') ?? "shop"}/${replaceWhiteSpacesWithDashSymbolInUrl(product.ProductName)}`}>
                                      <img src={product?.ProductPictures?.length
                                        ? `${BASE_URL}/${product.ProductPictures[0]}`
                                        : 'fallback-image.jpg'
                                      } alt="Grocery Ecommerce Template" class="mb-3 img-fluid" width={200} />
                                    </Link>
                                  </div>
                                </div>
                                <div class="col-md-8 col-12 flex-grow-1">

                                  <h2 class="fs-6"><a href="shop-single.html" class="text-inherit text-decoration-none">{product.ProductName}</a></h2>
                                  <div>
                                    <small class="text-warning">
                                      <i class="bi bi-star-fill"></i>
                                      <i class="bi bi-star-fill"></i>
                                      <i class="bi bi-star-fill"></i>
                                      <i class="bi bi-star-fill"></i>
                                      <i class="bi bi-star-half"></i>
                                    </small>
                                    <span class="text-muted small">4.5(149)</span>
                                  </div>
                                  <div class="mt-2">
                                    <p className="product-price">
                                      <span>&#8377;{product.Price} <sub><del>{product.OldPrice}</del></sub></span>
                                      {/* <span>
                            <AutoCurrencyPrice Price={product.Price} />
                            {product.OldPrice && <sub><del><AutoCurrencyPrice Price={product.OldPrice} /></del></sub>}      
                        </span> */}
                                    </p>

                                    <div class="mt-3">
                                      <Link to={`/product-details/${product._id}/${product.ProductsCategoriesMappings.map((category) => replaceWhiteSpacesWithDashSymbolInUrl(category.Name)).join('-') ?? "shop"}/${replaceWhiteSpacesWithDashSymbolInUrl(product.ProductName)}`} class="btn btn-icon btn-sm btn-outline-gray-400 text-muted me-2" >
                                        <i class="bi bi-eye" data-bs-toggle="tooltip" data-bs-html="true" title="Quick View"></i>
                                      </Link>
                                      <a onClick={(e) => { e.preventDefault(); HandleAddToWishList({ ProductId: product._id, ProductName: product.ProductName, Price: product.Price, IsShippingFree: product.IsShippingFree, ShippingCharge: product.ShippingCharge, OrderMaximumQuantity: product.OrderMaximumQuantity, StockQuantity: product.StockQuantity, ProductPictures: product.ProductPictures[0], DiscountPrice: product.DiscountProductsMappings.DiscountValue, CouponCode: product.DiscountProductsMappings.couponCode, }) }} class="btn btn-icon btn-sm btn-outline-gray-400 text-muted me-2" data-bs-toggle="tooltip" data-bs-html="true" title="Wishlist">
                                        <i class="bi bi-heart"></i>
                                      </a>
                                      <a href="#!" class="btn btn-icon btn-sm btn-outline-gray-400 text-muted" data-bs-toggle="tooltip" data-bs-html="true" title="Compare">
                                        <i class="bi bi-arrow-left-right"></i>
                                      </a>
                                    </div>
                                    <div class="mt-2">
                                      <Link to={`/product-details/${product._id}/${product.ProductsCategoriesMappings.map((category) => replaceWhiteSpacesWithDashSymbolInUrl(category.Name)).join('-') ?? "shop"}/${replaceWhiteSpacesWithDashSymbolInUrl(product.ProductName)}`} class="btn btn-primary">
                                        <i class="bi bi-bag-check me-2 fs-5"></i>
                                        Add to Cart
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}


                </div>
              }

              <div className="row mt-8">
                <div className="col ">
                  {/* nav */}
                  <nav>
                    <ul className="pagination text-center justify-content-center">
                      {/* Previous button */}
                      <li className={`page-item ${PageNo === 1 ? 'disabled' : ''}`}>
                        <a
                          className="page-link mx-1"
                          href="#"
                          aria-label="Previous"
                          onClick={(e) => { e.preventDefault(); if (PageNo > 1) setCurrentPage(PageNo - 1); }}
                        >
                          <i className="feather-icon icon-chevron-left" />
                        </a>
                      </li>

                      {/* Page numbers */}
                      {getPageNumbers().map((page) => (
                        <li key={page} className={`page-item ${PageNo === page ? 'active' : ''}`}>
                          <a
                            className="page-link mx-1"
                            href="#"
                            onClick={(e) => { e.preventDefault(); setCurrentPage(page); }}
                          >
                            {page}
                          </a>
                        </li>
                      ))}

                      {/* Next button */}
                      <li className={`page-item ${PageNo === totalPages ? 'disabled' : ''}`}>
                        <a
                          className="page-link mx-1"
                          href="#"
                          aria-label="Next"
                          onClick={(e) => { e.preventDefault(); if (PageNo < totalPages) setCurrentPage(PageNo + 1); }}
                        >
                          <i className="feather-icon icon-chevron-right" />
                        </a>
                      </li>
                    </ul>
                  </nav>


                </div>
              </div>
            </section>
          </div>
        </div>
      </div>


    </>
  )
}
