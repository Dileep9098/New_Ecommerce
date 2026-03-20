

import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { useDropzone } from "react-dropzone";
import "./product.css";
import { useDispatch } from 'react-redux';
import { set } from 'date-fns';
import SelectCategory from './SelectCategory';
import Config from '../../../../Config/Config';
import { createProduct } from '../../../../Store/Feature/product/productSlice';
import { showErrorMsg, showSuccessMsg } from '../../../../utils/ShowMessages';
import axiosInstance from '../../../../ApiHendler/axiosInstance';
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default function AddProduct() {

  const [files, setFiles] = useState([]);
  const [previewFiles, setPreviewFiles] = useState([]);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [allMenufactures, setAllMenufactures] = useState([])
  const [allDiscountDetails, setAlldiscountDetails] = useState([])
  const [allProductSize, setAllProductSize] = useState([])
  const [allTaxDetails, setAllTaxDetails] = useState([])


  const [ProductName, setProductName] = useState('')
  const [AttachmentURL, setAttachmentURL] = useState('')
  const [IsDiscountCreatePageSearchEnabled, setIsDiscountCreatePageSearchEnabled] = useState()
  const [Rating, setRating] = useState('')
  const [ShortDescription, setShortDescription] = useState('')
  const [FullDescription, setFullDescription] = useState('')
  const [VendorId, setVendorId] = useState('')
  const [Menufacturs, setMenufacturs] = useState('')
  const [MetaTitle, setMetaTitle] = useState('')
  const [MetaKeywords, setMetaKeywords] = useState('')
  const [MetaDescription, setMetaDescription] = useState('')
  const [OldPrice, setOldPrice] = useState('')
  const [Price, setPrice] = useState(0)
  const [IsTaxExempt, setIsTaxExempt] = useState(false)
  const [IsShippingFree, setIsShippingFree] = useState(true)
  const [ShippingCharge, setShippingCharge] = useState('')
  const [EstimatedShippingDays, setEstimatedShippingDays] = useState('')
  const [ShowOnHomePage, setShowOnHomePage] = useState('')
  const [AllowCustomerReviews, setAllowCustomerReviews] = useState('')
  const [IsReturnAble, setIsReturnAble] = useState(true)
  const [IsDigitalProduct, setIsDigitalProduct] = useState(false)
  const [IsDiscountAllowed, setIsDiscountAllowed] = useState(false)
  const [Sku, setSku] = useState('')
  const [WarehouseId, setWarehouseId] = useState('')
  const [InventoryMethodId, setInventoryMethodId] = useState('')
  const [StockQuantity, setStockQuantity] = useState('')
  const [IsBoundToStockQuantity, setIsBoundToStockQuantity] = useState(false)
  const [DisplayStockQuantity, setDisplayStockQuantity] = useState(false)
  const [OrderMinimumQuantity, setOrderMinimumQuantity] = useState('')
  const [OrderMaximumQuantity, setOrderMaximumQuantity] = useState('')
  const [MarkAsNew, setMarkAsNew] = useState(false)
  const [DisplaySeqNo, setDisplaySeqNo] = useState('')
  const [IsActive, setIsActive] = useState(true)
  const [DiscountProductsMappings, setDiscountProductsMappings] = useState('')
  const [ProductDigitalFileMappings, setProductDigitalFileMappings] = useState()
  const [ProductPictures, setProductPictures] = useState([])
  const [ProductReviews, setProductReviews] = useState('')
  const [ProductsCategoriesMappings, setProductsCategoriesMappings] = useState('')
  const [ProductShippingMethodsMappings, setProductShippingMethodsMappings] = useState('')
  const [ProductsTag, setProductsTag] = useState()
  const [AvailableStartDate, setAvailableStartDate] = useState('')
  const [AvailableEndDate, setAvailableEndDate] = useState('')
  const [ProductSize, setProductSize] = useState('')
  const [Tax, setTax] = useState('')
  const [ProductColor, setProductColor] = useState('')
  const [ProductWeight, setProductWeight] = useState('')

  const [CustomProductSize, setCustomProductSize] = useState('');
  const [showCustomSizeInput, setShowCustomSizeInput] = useState(false);

  // Handle file selection and preview
  const onDrop = (acceptedFiles) => {
    const filePreviews = acceptedFiles.map((file) => ({
      file: file,
      previewUrl: URL.createObjectURL(file),
    }));
    setProductPictures(acceptedFiles);
    setPreviewFiles(filePreviews);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
  });

  // Get All Product Category
  useEffect(() => {
    const fatchData = async () => {
      try {
        const response = await axiosInstance.get(Config.END_POINT_LIST["GET_ALL_MENUFACTURES"], { withCredentials: true })
        const discountDetails = await axiosInstance.get(Config.END_POINT_LIST["GET_ALL_DISCOUNT_DETAILS"], { withCredentials: true })
        const productSize = await axiosInstance.get(Config.END_POINT_LIST["GET_ALL_PRODUCT_SIZE"], { withCredentials: true })
        const taxDetail = await axiosInstance.get(Config.END_POINT_LIST["GET_ALL_TAX_DETAILS"], { withCredentials: true })

        if (response.data.success) {
          setAllMenufactures(response.data.menufactures)
        }
        else {
          showErrorMsg(response.data.message)
        }
        if (discountDetails.data.success) {
          setAlldiscountDetails(discountDetails.data.discountDetails)
        }
        else {
          showErrorMsg(discountDetails.data.message)
        }
        if (productSize.data.success) {
          setAllProductSize(productSize.data.ProdcutSizes)
        }
        if (taxDetail.data.success) {
          setAllTaxDetails(taxDetail.data.taxDetails)
        }
      } catch (error) {
        showErrorMsg(error.response.data.message);

      }
    }

    fatchData();
  }, [dispatch])


  const [selectedCategories, setSelectedCategories] = useState([])

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions)
    setProductsCategoriesMappings(selectedOptions)
  }



  /// Discount Allowed 

  const discountAllowCheck = () => {
    setIsDiscountAllowed((prevState) => !prevState); // Toggle the state
  };

  // Free Shipping Allowed 
  const freeShippingAllowCheck = () => {
    setIsShippingFree((prevState) => !prevState); // Toggle the state
  };



  console.log("Discount kya hai bhai DiscountProductsMappings", DiscountProductsMappings);
  console.log("Discount kya hai bhai allDiscountDetails", allDiscountDetails);

  // const discount = allDiscountDetails.find(discount => discount._id === DiscountProductsMappings);

  // console.log("Discount details found:", discount);

  // if (discount) {
  //   const discountAmount = (discount.DiscountValue / 100) * OldPrice;
  //   const finalPrice = OldPrice - discountAmount;

  //   console.log("Bhai mere FinalPrice Kya hai:", finalPrice);

  //   setPrice(finalPrice)
  // } else {
  //   console.log("No matching discount found!");
  // }



  const calculateFinalPrice = () => {
    const discount = allDiscountDetails.find(discount => discount._id === DiscountProductsMappings);

    console.log("Discount details found:", discount);

    if (discount) {

      const discountAmount = (discount.DiscountValue / 100) * OldPrice;
      const finalPrice = OldPrice - discountAmount;

      console.log("Bhai mere FinalPrice Kya hai:", finalPrice);

      setPrice(finalPrice); // Set the final price
    } else {
      console.log("No matching discount found!");
    }
  };

  useEffect(() => {
    calculateFinalPrice();
  }, [allDiscountDetails, DiscountProductsMappings]);






  const handleSubmitProduct = (e) => {
    e.preventDefault();
    // Create a new FormData object
    const myform = new FormData();


    // Append each state variable to the FormData object
    myform.append("ProductName", ProductName);
    myform.append("AttachmentURL", AttachmentURL);
    myform.append("IsDiscountCreatePageSearchEnabled", IsDiscountCreatePageSearchEnabled);
    myform.append("Rating", Rating);
    myform.append("ShortDescription", ShortDescription);
    myform.append("FullDescription", FullDescription);
    myform.append("VendorId", VendorId);
    myform.append("Menufacturs", Menufacturs);
    myform.append("MetaTitle", MetaTitle);
    myform.append("MetaKeywords", MetaKeywords);
    myform.append("MetaDescription", MetaDescription);
    myform.append("OldPrice", OldPrice);
    myform.append("Price", Price);
    myform.append("IsTaxExempt", IsTaxExempt);
    myform.append("IsShippingFree", IsShippingFree);
    myform.append("ShippingCharge", ShippingCharge);
    myform.append("EstimatedShippingDays", EstimatedShippingDays);
    myform.append("ShowOnHomePage", ShowOnHomePage);
    myform.append("AllowCustomerReviews", AllowCustomerReviews);
    myform.append("IsReturnAble", IsReturnAble);
    myform.append("IsDigitalProduct", IsDigitalProduct);
    myform.append("IsDiscountAllowed", IsDiscountAllowed);
    myform.append("Sku", Sku);
    myform.append("WarehouseId", WarehouseId);
    myform.append("InventoryMethodId", InventoryMethodId);
    myform.append("StockQuantity", StockQuantity);
    myform.append("IsBoundToStockQuantity", IsBoundToStockQuantity);
    myform.append("DisplayStockQuantity", DisplayStockQuantity);
    myform.append("OrderMinimumQuantity", OrderMinimumQuantity);
    myform.append("OrderMaximumQuantity", OrderMaximumQuantity);
    myform.append("MarkAsNew", MarkAsNew);
    myform.append("DisplaySeqNo", DisplaySeqNo);
    myform.append("IsActive", IsActive);
    myform.append("DiscountProductsMappings", DiscountProductsMappings);
    myform.append("ProductDigitalFileMappings", ProductDigitalFileMappings);
    myform.append("ProductReviews", ProductReviews);
    // myform.append("ProductsCategoriesMappings", ProductsCategoriesMappings);
    myform.append("ProductShippingMethodsMappings", ProductShippingMethodsMappings);
    myform.append("ProductsTag", ProductsTag);
    myform.append("AvailableStartDate", AvailableStartDate);
    myform.append("AvailableEndDate", AvailableEndDate);
    myform.append("ProductSize", ProductSize);
    myform.append("Tax", Tax);
    myform.append("CustomProductSize", CustomProductSize);
    myform.append("ProductColor", ProductColor);
    myform.append("ProductWeight", ProductWeight);
    if (ProductPictures && ProductPictures.length > 0) {
      ProductPictures.forEach((file, index) => {
        myform.append("ProductPictures", file);
      });
    }

    if (ProductsCategoriesMappings && ProductsCategoriesMappings.length > 0) {
      ProductsCategoriesMappings.forEach((category, index) => {
        // debugger
        myform.append("ProductsCategoriesMappings", category?._id);
        console.log(category)
      });
    }



    myform.forEach((value, key) => {
      console.log(`${key}: ${value}`)
    })
debugger
    dispatch(createProduct(myform)).then((data) => {
      console.log(data.payload.success)
      if (data.payload.success) {
        showSuccessMsg(data.payload.message)
        navigate("/admin/product")

      }
      else {
        showErrorMsg(data.payload.message)
      }
    })

    // You can now send the 'myform' FormData object with a fetch request or any other method
  }

  // console.log("DisCount Allowed", IsDiscountAllowed)
  // console.log("DisCount Allowed", allDiscountDetails)
  // console.log("DisCount Kya hai", DiscountProductsMappings)


  // console.log("Category Kya kya hai",ProductsCategoriesMappings)

  // Replace with your actual data

  const handleSizeChange = (e) => {
    const value = e.target.value;
    setProductSize(value);

    if (value === 'other') {
      setShowCustomSizeInput(true);
    } else {
      setShowCustomSizeInput(false);
      setCustomSize(''); // Reset the custom size if another option is selected
    }
  };



  useEffect(() => {
    const editorElement = document.querySelector("#editor");

    if (editorElement && !editorElement.__quill_initialized) {
      editorElement.__quill_initialized = true;

      const quill = new Quill(editorElement, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
          ],
        },
      });

      // Quill ka change event yahan handle kar
      quill.on("text-change", () => {
        const html = editorElement.querySelector(".ql-editor").innerHTML;
        setFullDescription(html); // ye tera state me value store karega
      });
    }
  }, []);
    const tabs = [
    { id: 'basictab1', icon: 'mdi-tag-multiple', label: 'Product Basic Info' },
    { id: 'basictab2', icon: 'mdi-currency-inr', label: 'Prices' },
    { id: 'basictab3', icon: 'mdi-truck-fast-outline', label: 'Shipping' },
    { id: 'basictab4', icon: 'mdi-store', label: 'Inventory' },
    { id: 'basictab5', icon: 'mdi-image-multiple', label: 'Pictures' },
    { id: 'basictab6', icon: 'mdi-desktop-mac-dashboard', label: 'SEO' },
    { id: 'basictab7', icon: 'mdi-monitor', label: 'Product Attributes' },
  ];

  return (
    <>
      <div className="container-fluid">

        <div className="row">
          <div className="col-12 mb-2">
            <div className="page-title-box">
              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item"><Link to="/admin/product" className='text-dark'>Product</Link></li>
                  <li className="breadcrumb-item active">Create Product</li>
                </ol>
              </div>
              <h3 className="page-title"><i class="bi bi-text-left"></i> Create Product</h3>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">


                <form encType="multipart/form-data" onSubmit={handleSubmitProduct}>
                  <div id="basicwizard">
                    <ul
                      className="nav nav-pills form-wizard-header mb-4"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        overflowX: "auto",
                        whiteSpace: "nowrap",
                        gap: "0.5rem",
                      }}
                    >
                      {[
                        { id: "basictab1", icon: "mdi-tag-multiple", label: "Product Basic Info" },
                        { id: "basictab2", icon: "mdi-currency-inr", label: "Prices" },
                        { id: "basictab3", icon: "mdi-truck-fast-outline", label: "Shipping" },
                        { id: "basictab4", icon: "mdi-store", label: "Inventory" },
                        { id: "basictab5", icon: "mdi-image-multiple", label: "Pictures" },
                        { id: "basictab6", icon: "mdi-desktop-mac-dashboard", label: "SEO" },
                        { id: "basictab7", icon: "mdi-monitor", label: "Product Attributes" },
                      ].map((tab, index) => (
                        <li key={index} className="nav-item flex-fill text-center">
                          <a
                            href={`#${tab.id}`}
                            data-bs-toggle="tab"
                            className={`nav-link rounded-0 py-2 ${index === 0 ? "active" : ""}`}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexDirection: "column",
                              minWidth: "120px",
                            }}
                          >
                            <i className={`mdi ${tab.icon} font-18 mb-1`}></i>
                            <span className="d-none d-sm-inline">{tab.label}</span>
                          </a>
                        </li>
                      ))}
                    </ul>


                    <div className="tab-content b-0 mb-0">

                      <div className="tab-pane active" id="basictab1">
                        <div className="row">
                          <div className="col-12">
                            <div className="row mb-3">
                              <label className="col-md-3 col-form-label" htmlFor="userName">Product name</label>
                              <div className="col-md-9">
                                <input type="text" className="form-control" id="userName" name="ProductName" onChange={(e) => setProductName(e.target.value)} />
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="row mb-3">
                              <label className="col-md-3 col-form-label" htmlFor="shortDescription">Short Description</label>
                              <div className="col-md-9">
                                <input type="text" className="form-control" id="shortDescription" name="ShortDescription" onChange={(e) => setShortDescription(e.target.value)} />
                              </div>
                            </div>
                          </div>

                          <div className="col-12">
                            <div className="row mb-9">
                              <label className="col-md-3 col-form-label" htmlFor="shortDescription">Full Description</label>
                              <div className="col-md-9">
                                {/* <ReactQuill theme="snow" value={FullDescription} onChange={setFullDescription} style={{ height: "150px" }} /> */}
                                {/* <input type="text" /> */}

                                <div class="py-8" id="editor" ></div>

                              </div>
                            </div>
                          </div>
                          <div className="col-12 mt-4">
                            <div className="row mb-3">
                              <label htmlFor="example-select" className="col-md-3 col-form-label">Manufacturer </label>
                              <div className="col-md-9">
                                <select className="form-select" id="example-select" name='Menufacturs' onChange={(e) => setMenufacturs(e.target.value)} >
                                  <option >Select Menufactures</option>

                                  {allMenufactures && allMenufactures.map((menufacture, ind) => (
                                    <option key={ind} value={menufacture._id}>
                                      {menufacture.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 ">
                            <div className="row mb-3">
                              <label htmlFor="example-select" className="col-md-3 col-form-label">Vendor </label>
                              <div className="col-md-9">
                                <select className="form-select" id="example-select" onChange={(e) => setVendorId(e.target.value)} name='VendorId'>
                                  <option value={"Parijat Handcraft"}>Parijat Handcraft</option>
                                  <option value={"Parijat Handcraft"}>Parijat Handcraft</option>
                                  <option value={"Parijat Handcraft"}>Parijat Handcraft 3</option>
                                  <option value={"Parijat Handcraft"}>Parijat Handcraft 4</option>
                                  <option value={"Parijat Handcraft"}>Parijat Handcraft 5</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 ">
                            <div className="row mb-3">
                              <label htmlFor="example-select" className="col-md-3 col-form-label">Categories </label>
                              <div className="col-md-9">
                                <SelectCategory onCategoryChange={handleCategoryChange} />
                              </div>

                            </div>
                          </div>

                          <div className="col-12">
                            <div className="row mb-3">
                              <label className="col-md-3 col-form-label" htmlFor="ProductsTag">Tags</label>
                              <div className="col-md-9">
                                <input type="text" className="form-control" id="ProductsTag" name="ProductsTag" onChange={(e) => setProductsTag(e.target.value)} />
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="row mb-3">
                              <label className="col-md-3 col-form-label" htmlFor="userName">IsActive</label>
                              <div className="col-md-9">
                                <div className="form-check form-checkbox-info mb-2 fs-3">
                                  <input type="checkbox" className="form-check-input" id="customCheckcolor3" onChange={(e) => setIsActive(e.target.checked)} name='IsActive' checked={IsActive} />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="row mb-3">
                              <label className="col-md-3 col-form-label" htmlFor="userName">Show on home Page</label>
                              <div className="col-md-9">
                                <div className="form-check form-checkbox-info mb-2 fs-3">
                                  <input type="checkbox" className="form-check-input" id="customCheckcolor3" onChange={(e) => setShowOnHomePage(e.target.checked)} name='ShowOnHomePage' checked={ShowOnHomePage} />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="row mb-3">
                              <label className="col-md-3 col-form-label" htmlFor="userName">Mark as new</label>
                              <div className="col-md-9">
                                <div className="form-check form-checkbox-info mb-2 fs-3">
                                  <input type="checkbox" className="form-check-input" id="customCheckcolor3" onChange={(e) => setMarkAsNew(e.target.checked)} name='MarkAsNew' checked={MarkAsNew} />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="row mb-3">
                              <label className="col-md-3 col-form-label" htmlFor="userName">Allow customer reviews</label>
                              <div className="col-md-9">
                                <div className="form-check form-checkbox-info mb-2 fs-3">
                                  <input type="checkbox" className="form-check-input" id="customCheckcolor3" onChange={(e) => setAllowCustomerReviews(e.target.checked)} name='AllowCustomerReviews' checked={AllowCustomerReviews} />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-12">
                            <div className="row mb-3">
                              <label className="col-md-3 col-form-label" htmlFor="userName"> Available Start Date </label>
                              <div className="col-md-9">
                                <div className=" position-relative" id="datepicker2">
                                  <input type="date" className="form-control" onChange={(e) => setAvailableStartDate(e.target.value)} name='AvailableStartDate' />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="row mb-3">
                              <label className="col-md-3 col-form-label" htmlFor="userName"> Available End Date </label>
                              <div className="col-md-9">
                                <div className="position-relative" id="datepicker2">
                                  <input type="date" className="form-control" onChange={(e) => setAvailableEndDate(e.target.value)} name='AvailableEndDate' />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-12">
                            <div className="row mb-3">
                              <label className="col-md-3 col-form-label" htmlFor="Sku">Sku</label>
                              <div className="col-md-9">
                                <input type="text" className="form-control" id="Sku" name="Sku" onChange={(e) => setSku(e.target.value)} />
                              </div>
                            </div>
                          </div>

                          {/* <div className="col-12">
                              <div className="row mb-3">
                                <div className="col-md-3">
                                  <label className="col-md-3 col-form-label" htmlFor="fullDescription">Full Description</label>
                                </div>
                                <div className="col-md-9">
                                <ReactQuill theme="snow" value={value} onChange={setValue} />
                                 
                                </div>
                              </div>


                            </div> */}

                        </div>

                        {/* <ul className="list-inline wizard mb-0">
                            <li className="next list-inline-item float-end">
                              <a href="javascript:void(0);" className="btn btn-info">Add More Info <i className="mdi mdi-arrow-right ms-1"></i></a>
                            </li>
                          </ul> */}
                      </div>
                      <div className="tab-pane" id="basictab2">
                        <div className="row">
                          <div className="col-12">
                            <div className="row mb-3">
                              <label className="col-md-3 col-form-label" htmlFor="OldPrice">Base Price</label>
                              <div className="col-md-9">
                                <input type="text" className="form-control" id="OldPrice" name="OldPrice" onChange={(e) => setOldPrice(e.target.value)} />
                              </div>
                            </div>
                          </div>

                          <div className="col-12">
                            <div className="row mb-3">
                              <label className="col-md-3 col-form-label" htmlhtmlFor="userName">
                                Is Discount Allowed?
                              </label>
                              <div className="col-md-9">
                                <div className="form-check form-checkbox-info mb-2 fs-3">
                                  {/* Use `onClick` instead of `onChange` to make it work immediately */}
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="customCheckcolor3"
                                    onClick={discountAllowCheck} // Use onClick here for immediate toggle
                                    checked={IsDiscountAllowed} // Bind the checkbox directly to the state
                                    name="IsDiscountAllowed"
                                  />
                                </div>
                              </div>
                            </div>

                          </div>

                          {IsDiscountAllowed && (
                            <div className="col-12">
                              <div className="row mb-3">
                                <label htmlhtmlFor="example-select" className="col-md-3 col-form-label">
                                  Discount
                                </label>
                                <div className="col-md-9">

                                  <select className="form-select text-dark" id="example-select" onChange={(e) => setDiscountProductsMappings(e.target.value)} name="DiscountProductsMappings">
                                    <option >Select Discount</option>

                                    {allDiscountDetails && allDiscountDetails.map((discount, ind) => (
                                      <option key={ind} value={discount._id}>
                                        {discount.title}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="col-12">
                            <div className="row mb-3">
                              <label className="col-md-3 col-form-label" htmlFor="Price">Price</label>
                              <div className="col-md-9">
                                <input type="text" className="form-control" id="Price " name="Price" value={Price} onChange={(e) => setPrice(e.target.value)} />
                              </div>
                            </div>
                          </div>


                          <div className="col-12">
                            <div className="row mb-3">
                              <label className="col-md-3 col-form-label" htmlFor="example-select">Tax Details</label>
                              <div className="col-md-9">

                                <select className="form-select" id="example-select" name='Tax' onChange={(e) => setTax(e.target.value)} >
                                  <option >Select Tax Details</option>

                                  {allTaxDetails && allTaxDetails.map((tax, ind) => (
                                    <option key={ind} value={tax?._id}>
                                      {tax?.tax_name} || {tax?.tax_rate} %
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>


                        </div>
                      </div>
                      <div className="tab-pane" id="basictab3">
                        <div className="row">
                          <div className="col-12">
                            <div className="row mb-3">
                              <label className="col-md-3 col-form-label" htmlFor="userName">Free Shipping</label>
                              <div className="col-md-9">
                                <div className="form-check form-checkbox-info mb-2 fs-3">
                                  <input type="checkbox" className="form-check-input" id="customCheckcolor3" onChange={(e) => freeShippingAllowCheck(e.target.checked)} name='IsShippingFree' />
                                </div>
                              </div>
                            </div>
                          </div>
                          {IsShippingFree ?
                            <div className="col-12">
                              <div className="row mb-3">
                                <label className="col-md-3 col-form-label" htmlFor="ShippingCharge">Shipping Charges</label>
                                <div className="col-md-9">
                                  <input type="text" className="form-control" id="ShippingCharge" name="ShippingCharge" onChange={(e) => setShippingCharge(e.target.value)} />
                                </div>
                              </div>
                            </div>
                            : ""}
                          <div className="col-12">
                            <div className="row mb-3">
                              <label htmlFor="example-select" className="col-md-3 col-form-label">Shipping Methods </label>
                              <div className="col-md-9">
                                <select className="form-select" id="example-select" onChange={(e) => setProductShippingMethodsMappings(e.target.value)} name='ProductShippingMethodsMappings'>
                                  <option value="Same day delivery">Same day delivery</option>
                                  <option value="International Shipping">International Shipping</option>
                                  <option value="Local Shipping">Local Shipping</option>
                                  <option value="Real-time Carrier Rates">Real-time Carrier Rates</option>
                                  <option value="Flat-rate shipping">Flat-rate shipping</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="row mb-3">
                              <label className="col-md-3 col-form-label" htmlFor="IsReturnAble">Return Able</label>
                              <div className="col-md-9">
                                <div className="form-check form-checkbox-info mb-2 fs-3">
                                  <input type="checkbox" className="form-check-input" id="IsReturnAble" onChange={(e) => setIsReturnAble(e.target.checked)} name='IsReturnAble' checked={IsReturnAble} />
                                </div>
                              </div>
                            </div>
                          </div>


                        </div>
                      </div>
                      <div className="tab-pane" id="basictab4">
                        <div className="row">
                          <div className="col-12">
                            <div className="row mb-3">
                              <label htmlFor="example-select" className="col-md-3 col-form-label">Inventory Method </label>
                              <div className="col-md-9">
                                <select className="form-select" id="example-select" onChange={(e) => setInventoryMethodId(e.target.value)} name='InventoryMethodId' >
                                  <option >Select Inventory Method...</option>
                                  <option value="LIFO(last in first out)">LIFO(last in first out)</option>
                                  <option value="FIFO(first in first out)">FIFO(first in first out)</option>
                                  <option value="Specific identification method">Specific identification method</option>
                                  <option value="WAC (weighted average cost)" >WAC (weighted average cost)</option>
                                  <option value="Flat-rate shipping">Flat-rate shipping</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="row mb-3">
                              <label htmlFor="example-select" className="col-md-3 col-form-label">Warehouse  </label>
                              <div className="col-md-9">
                                <select className="form-select" id="example-select" onChange={(e) => setWarehouseId(e.target.value)} name='WarehouseId'>
                                  <option  >Select Inventory Method...</option>

                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="row mb-3">
                              <label className="col-md-3 col-form-label" htmlFor="StockQuantity">Stock Quantity</label>
                              <div className="col-md-9">
                                <input type="text" className="form-control" id="StockQuantity" name="StockQuantity" onChange={(e) => setStockQuantity(e.target.value)} />
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="row mb-3">
                              <label className="col-md-3 col-form-label" htmlFor="IsBoundToStockQuantity">Bound To Stock Quantity</label>
                              <div className="col-md-9">
                                <div className="form-check form-checkbox-info mb-2 fs-3">
                                  <input type="checkbox" className="form-check-input" id="IsBoundToStockQuantity" onChange={(e) => setIsBoundToStockQuantity(e.target.checked)} name='IsBoundToStockQuantity' />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="row mb-3">
                              <label className="col-md-3 col-form-label" htmlFor="userName">Display To Stock Quantity</label>
                              <div className="col-md-9">
                                <div className="form-check form-checkbox-info mb-2 fs-3">
                                  <input type="checkbox" className="form-check-input" id="customCheckcolor3" onChange={(e) => setDisplayStockQuantity(e.target.checked)} name='DisplayStockQuantity' />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="row mb-3">
                              <label className="col-md-3 col-form-label" htmlFor="OrderMinimumQuantity">Order Minimum Cart Quantity</label>
                              <div className="col-md-9">
                                <input type="text" className="form-control" id="OrderMinimumQuantity" name="OrderMinimumQuantity" onChange={(e) => setOrderMinimumQuantity(e.target.value)} />
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="row mb-3">
                              <label className="col-md-3 col-form-label" htmlFor="OrderMaximumQuantity">Order Maximum Cart Quantity</label>
                              <div className="col-md-9">
                                <input type="text" className="form-control" id="OrderMaximumQuantity" name="OrderMaximumQuantity" onChange={(e) => setOrderMaximumQuantity(e.target.value)} />
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                      <div className="tab-pane" id="basictab5">
                        <div className="file-upload-container">
                          <div className="row">
                            <div className="col-12">
                              <div className="row mb-3">
                                <label className="col-md-3 col-form-label">Upload Product Images</label>
                              </div>
                              <div className="col-12">
                                <div className="card">
                                  <div className="card-body">
                                    <div {...getRootProps()} className="dropzone">
                                      <input {...getInputProps()} />
                                      <div className="dz-message needsclick">
                                        <i className="h1 text-muted ri-upload-cloud-2-line"></i>
                                        <h3>Drop files here or click to upload.</h3>
                                        <span className="text-muted font-13">
                                          (You can upload multiple image files.)
                                        </span>
                                      </div>
                                    </div>

                                    {/* Display image previews */}
                                    <div className="dropzone-previews mt-3">
                                      {previewFiles.map((filePreview, index) => (
                                        <div key={index} className="dz-preview dz-file-preview">
                                          <div className="dz-image">
                                            <img src={filePreview.previewUrl} alt={filePreview.file.name} />
                                          </div>
                                          <div className="dz-details">
                                            <div className="dz-filename">
                                              <span>{filePreview.file.name}</span>
                                            </div>
                                            <div className="dz-size">
                                              <span>{(filePreview.file.size / 1024).toFixed(2)} KB</span>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="row mb-3">
                                <label className="col-md-3 col-form-label" htmlFor="IsDigitalProduct">Is Digital Product</label>
                                <div className="col-md-9">
                                  <div className="form-check form-checkbox-info mb-2 fs-3">
                                    <input type="checkbox" className="form-check-input" id="IsDigitalProduct" onChange={(e) => setIsDigitalProduct(e.target.checked)} name='IsDigitalProduct' checked={IsDigitalProduct} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>


                      </div>
                      <div className="tab-pane" id="basictab6">
                        <div className="row">
                          <div className="col-12">
                            <div className="row mb-3">
                              <label className="col-md-3 col-form-label" htmlFor="MetaTitle">Meta Title</label>
                              <div className="col-md-9">
                                <input type="text" className="form-control" id="MetaTitle" name="MetaTitle" onChange={(e) => setMetaTitle(e.target.value)} />
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="row mb-3">
                              <label className="col-md-3 col-form-label" htmlFor="MetaKeywords">Meta Keywords</label>
                              <div className="col-md-9">
                                <input type="text" className="form-control" id="MetaKeywords" name="MetaKeywords" onChange={(e) => setMetaKeywords(e.target.value)} />
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="row mb-3">
                              <label className="col-md-3 col-form-label" htmlFor="MetaDescription">Meta Description</label>
                              <div className="col-md-9">
                                <textarea rows={4} type="text" className="form-control" id="MetaDescription" name="MetaDescription" onChange={(e) => setMetaDescription(e.target.value)} />
                              </div>
                            </div>
                          </div>


                        </div>
                      </div>
                      <div className="tab-pane" id="basictab7">
                        <div className="row">
                          {/* <div className="col-12">
                            <div className="row mb-3">
                              <label htmlFor="example-select" className="col-md-3 col-form-label">Attribute </label>
                              <div className="col-md-9">
                                <select className="form-select" id="example-select">
                                  <option selected>Select Inventory Method...</option>
                                  <option>LIFO(last in first out)</option>
                                  <option>FIFO(first in first out)</option>
                                  <option>Specific identification method</option>
                                  <option>WAC (weighted average cost)</option>
                                  <option>Flat-rate shipping</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="row mb-3">
                              <label htmlFor="example-select" className="col-md-3 col-form-label">Price Adjustment Type  </label>
                              <div className="col-md-9">
                                <select className="form-select" id="example-select">
                                  <option selected>Select Inventory Method...</option>

                                </select>
                              </div>
                            </div>
                          </div> */}
                          {/* <div className="col-12">
                            <div className="row mb-3">
                              <label className="col-md-3 col-form-label" htmlFor="ProductSize">Size</label>
                              <div className="col-md-9">

                                <select className="form-select" id="example-select" name='Menufacturs' onChange={(e) => setProductSize(e.target.value)} >
                                  <option selected>Select Size</option>

                                  {allProductSize && allProductSize.map((productSize, ind) => (
                                    <option key={ind} value={productSize?._id}>
                                      {productSize?.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div> */}


                          <div className="col-12">
                            <div className="row mb-3">
                              <label className="col-md-3 col-form-label" htmlhtmlFor="ProductSize">Size</label>
                              <div className="col-md-9">
                                <select
                                  className="form-select"
                                  id="example-select"
                                  name="Menufacturs"
                                  value={ProductSize}
                                  onChange={handleSizeChange}
                                >
                                  <option value="">Select Size</option>
                                  {allProductSize && allProductSize.map((productSize, ind) => (
                                    <option key={ind} value={productSize._id}>
                                      {productSize.name}
                                    </option>
                                  ))}
                                  <option value="other">Other</option>
                                </select>

                                {showCustomSizeInput && (
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter custom size"
                                      value={CustomProductSize}
                                      name='CustomProductSize'
                                      onChange={(e) => setCustomProductSize(e.target.value)}
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="col-12">
                            <div className="row mb-3">
                              <label className="col-md-3 col-form-label" htmlFor="ProductColor">Color</label>
                              <div className="col-md-9">
                                <input className="form-control" id="ProductColor" type="color" onChange={(e) => setProductColor(e.target.value)} name='ProductColor' ></input>
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="row mb-3">
                              <label className="col-md-3 col-form-label" htmlFor="ProductWeight">Weight</label>
                              <div className="col-md-9">
                                <input type="text" className="form-control" id="ProductWeight" name="ProductWeight" placeholder='Weight in Gram' onChange={(e) => setProductWeight(e.target.value)} />
                              </div>
                            </div>
                          </div>



                        </div>
                      </div>

                    </div>

                    {/* {add button save} */}
                    <div className="form-save-btn text-end">

                      <Link to="/admin/add-product" className="btn btn-secondary me-3 mb-2">
                        <i class="bi bi-arrow-clockwise"></i> Reset
                      </Link>
                      <button className="btn adminAddBtn mb-2 btn-primary" type='submit'>
                        <i class="bi bi-send-fill me-2"></i> Add Products
                      </button>
                    </div>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div >

      </div >
    </>
  );
}



// import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// export default function AddProduct() {
//   const [value, setValue] = useState('');

//   return <ReactQuill theme="snow" value={value} onChange={setValue} />;
// }