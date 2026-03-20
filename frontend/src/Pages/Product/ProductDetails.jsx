import React, { useEffect, useRef, useState } from 'react'
import "./prductDetails.css"
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import ProductDetailsImages from './ProductDetailsImages';
import axiosInstance from '../../ApiHendler/axiosInstance';
import Config from '../../Config/Config';
import { replaceWhiteSpacesWithDashSymbolInUrl } from '../../utils/ConversionHelper';
import { showErrorMsg, showInfoMsg, showSuccessMsg, showWarningMsg } from '../../utils/ShowMessages';

import { AddCustomerWishList, AddProductToCart } from '../../utils/CartHelper';

import { setCustomerCart, SetTotalCartItems } from '../../Store/Feature/cartSlice/cartSlice';
import { getSingleProduct } from '../../Store/Feature/product/productSlice';
import ProductRatingStars from '../../Comoponant/Product/ProductRatingStars';

const BASE_URL = import.meta.env.VITE_IMG_URL;
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import RelatedProduct from '../../Comoponant/Product/RelatedProduct';

export default function ProductDetails() {
    // const { isLoading, products } = useSelector((state) => state.product)

    const { currency, rate } = useSelector((state) => state.currency);

    const [displayedProducts, setDisplayedProducts] = useState(10);
    const [ReviewerName, setReviewerName] = useState('');
    const [ReviewerEmail, setReviewerEmail] = useState('');
    const [ReviewTitle, setReviewTitle] = useState('');
    const [ReviewBody, setReviewBody] = useState('');
    const [ReviewRating, setReviewRating] = useState(1);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const params = useParams()
    const [allLatestProduct, setAllLatestProduct] = useState([])
    const [activeLatestProducts, setActiveLatestProducts] = useState([]);
    const [ProductID, setProductID] = useState(params.product_id ?? 0)

    console.log(ProductID)
    useEffect(() => {
        setProductID(params.product_id);
    }, [params.product_id]);

    console.log(ProductID);

    useEffect(() => {
        if (ProductID) {

            dispatch(getSingleProduct(ProductID))
        }
    }, [dispatch, ProductID])

    const { isLoading, products } = useSelector((state) => state.product)

    console.log(products)
    const loadMoreProducts = () => {
        setDisplayedProducts(displayedProducts + 10); // Load 10 more products
    };


    const handleThumbnailClick = (fullImage) => {
        setMainImage(fullImage);
    };

    var [quentyProduct, setQuentyProduct] = useState(1)

    const handelIncreaseQty = () => {
        if (products.OrderMaximumQuantity != undefined && products.OrderMaximumQuantity != null && products.OrderMaximumQuantity > 0) {
            if ((quentyProduct + 1) > products.OrderMaximumQuantity) {
                showInfoMsg(`Can not add more than ${products.OrderMaximumQuantity} for this product`);
            } else {
                setQuentyProduct(parseInt(quentyProduct) + 1)
            }
        } else {
            if (quentyProduct < 10) {
                setQuentyProduct(parseInt(quentyProduct) + 1)
            }
        }


        // setQuentyProduct(parseInt(quentyProduct) + 1)
    }

    const handelDreaseQty = () => { setQuentyProduct(quentyProduct - 1) }

    // useEffect(() => {
    //     // Initialize Owl Carousel when the component mounts
    //     $('.latest-product__slider').owlCarousel({
    //         loop: true,
    //         margin: 10,
    //         nav: true,
    //         autoplay: true,
    //         autoplayTimeout: 3000,
    //         autoplayHoverPause: true,
    //         smartSpeed: 1000,
    //         responsive: {
    //             0: {
    //                 items: 1,
    //             },
    //             600: {
    //                 items: 1,
    //             },
    //             1000: {
    //                 items: 1,
    //             },
    //         },
    //     });

    //     // Cleanup Owl Carousel on unmount
    //     return () => {
    //         $('.latest-product__slider').owlCarousel('destroy');
    //     };
    // }, []);

    const [showPopover, setShowPopover] = useState(false);
    const [copyurl, setCopyUrl] = useState(false);
    const popoverRef = useRef(null);


    const togglePopover = () => {
        setShowPopover(!showPopover);
    };



    const handleCopy = async () => {
        const urlViewDetailImage = `${Config.WEBSITE_IBASE_URL}product-details/${products._id}/${products.ProductsCategoriesMappings.map((category) => replaceWhiteSpacesWithDashSymbolInUrl(category.Name)).join('-') ?? "shop"}/${replaceWhiteSpacesWithDashSymbolInUrl(products.ProductName)}`;

        // console.log("Generated URL: ", urlViewDetailImage); // Debugging the generated URL
        try {
            await navigator.clipboard.writeText(urlViewDetailImage);

            setCopyUrl(true);
            setTimeout(() => {
                setCopyUrl(false);
                setShowPopover(false);
            }, 1500);

        } catch (err) {
            console.error('Failed to copy: ', err);
            alert('Failed to copy link. Please try again.');
        }
    };

    useEffect(() => {
        const fatchData = async () => {

            try {
                const getAllLetestProduct = await axiosInstance.get(Config.END_POINT_LIST["GET_ALL_PRODUCTS"], { withCredentials: true });
                if (getAllLetestProduct.data.success) {
                    setAllLatestProduct(getAllLetestProduct.data.allProductsFeatures);
                    setActiveLatestProducts(getAllLetestProduct.data.allProductsFeatures.filter(product => product.IsActive));
                } else {
                    showErrorMsg(getAllLetestProduct.data.message);
                }
            } catch (error) {
                console.error(error);
                showErrorMsg(error.message || error.response?.data?.message || "Failed to load products");
            }
        };

        fatchData();
    }, [dispatch]);


    const activeProducts = Array.isArray(allLatestProduct) ? allLatestProduct.filter(product => product.IsActive) : [];

    const relatedProduct = Array.isArray(allLatestProduct)
        ? allLatestProduct.filter(product => product.IsActive)
        : [];

    console.log("Latest Products:", relatedProduct);

    const matchedProducts = [];


    if (Array.isArray(relatedProduct)) {
        relatedProduct.forEach(product => {
            if (Array.isArray(product.ProductsCategoriesMappings)) {
                const isMatch = product.ProductsCategoriesMappings.some(productCategory => {
                    // Check if products.ProductsCategoriesMappings is defined and is an array
                    return Array.isArray(products?.ProductsCategoriesMappings) &&
                        products.ProductsCategoriesMappings.some(activeCategory =>
                            activeCategory._id === productCategory._id
                        );
                });

                if (isMatch) {
                    matchedProducts.push(product);
                }
            }
        });
    } else {
        console.error('relatedProduct is undefined or not an array');
    }

    // Display the matched products
    console.log("Matched Products:", matchedProducts);


    const chunkProducts = (allLatestProduct, chunkSize) => {
        let result = [];
        for (let i = 0; i < allLatestProduct.length; i += chunkSize) {
            result.push(allLatestProduct.slice(i, i + chunkSize));
        }
        return result;
    };

    const productChunks = chunkProducts(activeProducts, 6);

    // useEffect(() => {
    //     $('.latest-product__slider').owlCarousel({
    //         loop: true,
    //         margin: 10,
    //         nav: true,
    //         autoplay: true,
    //         autoplayTimeout: 3000,
    //         autoplayHoverPause: true,
    //         smartSpeed: 1000,
    //         responsive: {
    //             0: {
    //                 items: 1,
    //             },
    //             600: {
    //                 items: 1,
    //             },
    //             1000: {
    //                 items: 1,
    //             },
    //         },
    //     });

    //     return () => {
    //         $('.latest-product__slider').owlCarousel('destroy');
    //     };
    // }, [productChunks]);


    const handleClick = (newRating) => {
        setReviewRating(newRating)
    }

    const SubmitReviewForm = async (e) => {
        e.preventDefault()

        const param = {
            ProductID: ProductID,
            ReviewerName: ReviewerName,
            ReviewerEmail: ReviewerEmail,
            ReviewTitle: ReviewTitle,
            ReviewBody: ReviewBody,
            ReviewRating: ReviewRating
        }

        try {
            const response = await axiosInstance.post(Config.END_POINT_LIST["ADD_PRODUCT_REVIEWS"], param, { withCredentials: true });
            console.log(response)
            if (response.data.success) {
                showSuccessMsg(response.data.message)

            }

        } catch (error) {
            showErrorMsg(error)
        }


    }

    // const [mainImage, setMainImage] = useState( products?.ProductPictures.length > 0? `/image/products/${products?.ProductPictures[0]}`:0);


    const HandleAddToCart = (isBuyNowBtn) => {
        // debugger

        if (products == undefined || products._id == undefined || products._id < 1) {
            showErrorMsg("Invalid product!");
            return false;
        }


        if (products?.StockQuantity != null && products?.StockQuantity != undefined
            && products.StockQuantity < 1) {
            showInfoMsg("Product is out of stock. Can't add it in the cart!");
            return false;
        }


        //--check if quantity selected
        if (quentyProduct == undefined || quentyProduct < 1) {
            showInfoMsg("Select quantity!");
            return false;
        }
        // debugger

        let defaultImage = (products?.ProductPictures?.length > 0) ? products.ProductPictures[0] : '';
        let ProductName = products?.ProductName
        let Price = products?.Price
        let Sku = products?.Sku
        let Tax = products?.Tax?.tax_rate
        let IsShippingFree = products?.IsShippingFree
        let ShippingCharge = products?.ShippingCharge
        let OrderMaximumQuantity = products?.OrderMaximumQuantity
        let InternationCharge = products?.InternationCharge

        let cartItems = AddProductToCart(ProductID, quentyProduct, defaultImage, Price, ProductName, IsShippingFree, ShippingCharge, OrderMaximumQuantity, Tax, Sku, InternationCharge);

        dispatch(setCustomerCart(cartItems));
        dispatch(SetTotalCartItems(JSON.parse(cartItems).length));

        // dispatch(rootAction.cartAction.setCustomerCart(cartItems));
        // dispatch(rootAction.cartAction.SetTotalCartItems(JSON.parse(cartItems).length));

        if (isBuyNowBtn != undefined && isBuyNowBtn == true) {
            navigate('/cart');
            window.location.reload()

        }
    }

    const HandleAddToWishList = ({ ProductId, ProductName, Price, IsShippingFree, ShippingCharge, OrderMaximumQuantity, StockQuantity, ProductPictures, DiscountPrice, CouponCode, Sku, InternationCharge }) => {

        let customerWishList = AddCustomerWishList(ProductId, ProductName, Price, IsShippingFree, ShippingCharge, OrderMaximumQuantity, StockQuantity, ProductPictures, DiscountPrice, CouponCode, InternationCharge);
        localStorage.setItem("customerWishList", customerWishList)

    };

    return (
        <>
            {/* <MetaData title="Single Product" /> */}

            {/* <section className="breadcrumb-section set-bg" style={{
                backgroundImage: products?.ProductPictures && products.ProductPictures.length > 0
                    ? `url('${BASE_URL}/${products.ProductPictures[0]}')`
                    : 'url("/image/default.jpg")',
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundAttachment: "scroll"
            }}>

                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="breadcrumb__text">
                                <h2>Product Details</h2>
                                <div className="breadcrumb__option">
                                    <Link to="/" style={{ color: "#180150" }}>Home</Link>
                                    <Link to="/all-product/0/all-categories" style={{ color: "#180150" }}>Prodcut</Link>
                                    <span>Product Details</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            <section className="product-details spad mt-8">
                <div className="container-fluid px-lg-8">
                    <div className="row">

                        {/* <div className="col-lg-3 mostPopularProduct">
                            <div className="row">
                                <div className="sidebar__item">
                                    <div className="latest-product__text">
                                        <div className="letest-section-title">

                                            <h4>Popular Products</h4>
                                        </div>
                                        <div className="">
                                            {productChunks.map((chunk, index) => (
                                                <div key={index} className="">
                                                    {chunk.map((product, productIndex) => (
                                                        <Link to={`/product-details/${product._id}/${product.ProductsCategoriesMappings.map((category) => replaceWhiteSpacesWithDashSymbolInUrl(category.Name)).join('-') ?? "shop"}/${replaceWhiteSpacesWithDashSymbolInUrl(product.ProductName)}`} key={productIndex} className="latest-product__item" >
                                                            <div className="latest-product__item__pic">
                                                                <img src={
                                                                    product?.ProductPictures?.length
                                                                        ? product.ProductPictures[0]?.url || `${BASE_URL}/${product.ProductPictures[0]}`
                                                                        : 'fallback-image.jpg' // Replace with your fallback image
                                                                } alt={product.ProductName} />
                                                            </div>
                                                            <div className="latest-product__item__text">
                                                                <h6>{product.ProductName.slice(0, 50)}...</h6>
                                                                <span>&#8377; {product.Price}</span>
                                                                <span>&#8377;{product.Price} <sub><del>{product.OldPrice}</del></sub></span>
                                                                <span>
                                                                    <LinkutoCurrencyPrice Price={product.Price} />
                                                                    {product.OldPrice && <sub><del><LinkutoCurrencyPrice Price={product.OldPrice} /></del></sub>}
                                                                </span>

                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                        <div className="col-lg-6 col-md-5">
                            <div className="product__details__pic">
                                <div className="product__details__pic__item">

                                    <ProductDetailsImages ProductDetailsImages={products?.ProductPictures} />


                                    {/* </div> */}




                                    <div className="shareOnImage">

                                        <div className="shareBox">
                                            <span className="material-icons" onClick={togglePopover}>
                                                <span className="material-symbols-outlined">ios_share</span>
                                            </span>
                                            <div className="boxshare">
                                                <span>share</span>
                                            </div>
                                        </div>
                                        {showPopover && (
                                            <div ref={popoverRef} className="popover popover2">
                                                <header>
                                                    <button className="close-button" onClick={togglePopover} aria-label="Close Share Popup">
                                                        <span className="material-symbols-outlined">close</span>
                                                    </button>
                                                    <span className="material-symbols-outlined">share</span>
                                                </header>
                                                <div className="popover-body">
                                                    <ul className="share-options">
                                                        <li>
                                                            <Link className="share-option email" to="mailto:info@parijathandicraft.com" onClick={togglePopover}>
                                                                <span className="material-symbols-outlined text-dark me-2">mail</span>
                                                                <span className="label">Email</span>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link className="share-option pinterest" to="https://in.pinterest.com/handicraftparijat/" onClick={togglePopover}>
                                                                <i class="bi bi-pinterest me-2 fs-4 text-red-500"></i>
                                                                <span className="label">Pinterest</span>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link className="share-option facebook" to="https://www.facebook.com/prijathandicraft/" onClick={togglePopover}>
                                                                <i class="bi bi-facebook me-2 fs-4 text-blue-500"></i>
                                                                <span className="label">Facebook</span>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link className="share-option twitter" to="https://x.com/handicraftpari1" onClick={togglePopover}>
                                                                <i class="bi bi-twitter-x me-2 fs-4 text-dark"></i>
                                                                <span className="label">X</span>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link className="share-option copy" to="#" onClick={(e) => { e.preventDefault(); handleCopy(); }}>
                                                                <span className="material-symbols-outlined text-dark me-2">{copyurl ? <span style={{ color: "green" }}>done_all</span> : "content_copy"}</span>
                                                                <span className="label">{copyurl ? <span style={{ color: "green" }}>Link Copied!</span> : "Copy Link"}</span>
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                                {/* <div className="arrow"></div> */}
                                            </div>
                                        )}

                                    </div>

                                </div>
                                {/* <div className="product__details__pic__slider owl-carousel" id="owlCarousel4">
                                    {thumbnails.map((thumb, index) => (
                                        <img
                                            key={index}
                                            src={thumb.thumb}
                                            alt={`Thumbnail ${index + 1}`}
                                            data-imgbigurl={thumb.full}
                                            onClick={() => handleThumbnailClick(thumb.full)} // Set the main image on click
                                            style={{ cursor: 'pointer' }}
                                        />
                                    ))}
                                </div> */}
                            </div>

                        </div>
                        <div className="col-lg-6 col-md-5">
                            <div className="product__details__text mt-3">
                                <h3>{products?.ProductName}</h3>
                                <div className="product__details__price">
                                    <span>&#8377;{products?.Price} <sub><del>{products?.OldPrice}</del></sub></span>
                                    {/* <span>
                                        <LinkutoCurrencyPrice Price={products?.Price} />
                                        {products?.OldPrice && <sub><del><LinkutoCurrencyPrice Price={products?.OldPrice} /></del></sub>}
                                    </span> */}
                                </div>
                                <div className="product__details__rating">
                                    <i class="bi bi-star-fill"></i>
                                    <i class="bi bi-star-fill"></i>
                                    <i class="bi bi-star-fill"></i>
                                    <i class="bi bi-star-fill"></i>
                                    <i class="bi bi-star-half"></i>
                                    <span>({(products?.ProductReviews?.length > 0 ? products?.ProductReviews.length : 0)}) reviews</span>
                                </div>
                                {/* <hr className='horizentalLine' /> */}

                                <div className="moreDetails">
                                    <ul>
                                        <li><b>Vendor</b> <span style={{ fontWeight: "bold" }}>{products?.Menufacturs?.name}</span></li>

                                        <li><b>Availability</b> <span>In Stock {(() => {

                                            if (products?.DisplayStockQuantity != undefined && products.DisplayStockQuantity == true) {

                                                if (products.StockQuantity != null && products.StockQuantity != undefined && products.StockQuantity > 0) {
                                                    return (
                                                        <>

                                                            <span id="lbl_prd_det_instock" style={{ color: '#4CBB17' }}>

                                                                In Stock

                                                            </span>

                                                            <span className="product-info-custom-value"> ({products.StockQuantity} items)</span>

                                                        </>
                                                    );
                                                } else {
                                                    return (
                                                        <>
                                                            <span className="product-info-custom-value text-primary" >Out of stock</span>

                                                        </>
                                                    );
                                                }
                                            }
                                            else {
                                                return (
                                                    <>
                                                        <span id="lbl_prd_det_instock" style={{ color: 'red', fontWeight: "600" }}>
                                                            Out of stock
                                                        </span>
                                                    </>
                                                );
                                            }

                                        })()}</span></li>
                                        {/* <li><b>Shipping</b> <span>01 day shipping. <samp>Free pickup today</samp></span></li> */}
                                        <li><b>SKU</b> <span>{products?.Sku}</span></li>
                                        {/* {
                                            products?.IsShippingFree ?
                                                <li><b>Shipping Charge</b> <span  className='text-green'> Free shipping</span></li>
                                                : <li><b>Shipping Charge</b> <span><LinkutoCurrencyPrice Price={products?.ShippingCharge}/> </span></li>
                                        } */}

                                        {
                                            currency === "USD" && products?.ProductShippingMethodsMappings === "International Shipping" ? (
                                                <li>
                                                    {/* <b>Shipping Charge</b> <span><LinkutoCurrencyPrice Price={products?.InternationCharge||0} /></span> */}
                                                </li>
                                            ) : (
                                                products?.IsShippingFree ? (
                                                    <li>
                                                        <b>Shipping Charge</b> <span className='text-green'>Free shipping</span>
                                                    </li>
                                                ) : (
                                                    <li>
                                                        {/* <b>Shipping Charge</b> <span><LinkutoCurrencyPrice Price={products?.ShippingCharge} /></span> */}
                                                    </li>
                                                )
                                            )
                                        }

                                    </ul>
                                </div>
                                <hr className='horizentalLine' />

                                <div className="qty-container-main">
                                    <div className="letest-section-title mb-3">
                                        <h4>Quantity</h4>
                                    </div>
                                    <div className="qty-container">


                                        <button className="qty-btn-minus  btn-rounded mr-1" type="button" onClick={handelDreaseQty}><i className="fa fa-chevron-left"></i></button>
                                        <input type="number" name="qty" value={quentyProduct ?? 1} className="input-qty input-rounded" onChange={(e) => setQuentyProduct(e.target.value)} />
                                        <button className="qty-btn-plus  btn-rounded ml-1" type="button" onClick={handelIncreaseQty}><i className="fa fa-chevron-right"></i></button>
                                    </div>
                                </div>

                                <div className="productDetailBtn ">
                                    <Link className='btn productDetailBtnCart' onClick={(e) => {
                                        e.preventDefault();
                                        HandleAddToCart(false);
                                    }}>Add to cart</Link>
                                    <Link className='btn productDetailBtnBuyNow' to="#" onClick={(e) => {
                                        e.preventDefault();
                                        HandleAddToCart(true);
                                    }}>buy now</Link>
                                </div>

                                {/* <div className="product-details-manage">

                                    <div className="letest-section-title">

                                        <h4>Product Details</h4>
                                    </div>
                                    <div className="product-details-manage-container" dangerouslySetInnerHTML={{ __html: products?.FullDescription }} />

                                </div> */}



                                <hr className='horizentalLine' />
                                <div className="footer__widget d-flex">
                                    <div className="footer__widget__social social-icon" >
                                        <h6 className='text-dark'>follow us</h6>

                                        <Link to="https://www.facebook.com/prijathandicraft/" target="_blank" className="social-icon1">
                                            <i class="bi bi-facebook  "></i>
                                        </Link>

                                        <Link to="https://www.instagram.com/parijathandicraft/" target="_blank">
                                            <i class="bi bi-instagram "></i>
                                        </Link>

                                        <Link to="https://www.linkedin.com/in/parijat-handicraft-1a5134147/" target="_blank">
                                            <i class="bi bi-linkedin "></i>
                                        </Link>

                                        <Link to="https://x.com/handicraftpari1" target="_blank">
                                            <i class="bi bi-twitter-x "></i>
                                        </Link>

                                        <Link to="https://in.pinterest.com/handicraftparijat/" target="_blank">
                                            <i class="bi bi-pinterest "></i>
                                        </Link>

                                        <Link to="https://www.youtube.com/@Pari0617" target="_blank">
                                            <i class="bi bi-youtube " ></i>
                                        </Link>


                                    </div>
                                    <div className="singleProductWishList">

                                        <Link onClick={(e) => { e.preventDefault(); HandleAddToWishList({ ProductId: products._id, ProductName: products.ProductName, Price: products.Price, IsShippingFree: products.IsShippingFree, ShippingCharge: products.ShippingCharge, OrderMaximumQuantity: products.OrderMaximumQuantity, StockQuantity: products.StockQuantity, ProductPictures: products.ProductPictures[0], DiscountPrice: products.DiscountProductsMappings.DiscountValue, CouponCode: products.DiscountProductsMappings.couponCode, Sku: products.Sku }) }}>
                                            <i class="bi bi-bag-heart-fill me-2 fs-4"></i>Add to Wishlist

                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </div>


                        <section className="mt-lg-14 mt-8">
                            <div className="container-fluid px-lg-8">
                                <div className="row">
                                    <div className="col-md-12">
                                        <ul className="nav nav-pills nav-lb-tab" id="myTab" role="tablist">
                                            {/* nav item */}
                                            <li className="nav-item" role="presentation">
                                                {/* btn */}
                                                <button className="nav-link active" id="product-tab" data-bs-toggle="tab" data-bs-target="#product-tab-pane" type="button" role="tab" aria-controls="product-tab-pane" aria-selected="true">
                                                    Product Details
                                                </button>
                                            </li>
                                            {/* nav item */}
                                            <li className="nav-item" role="presentation">
                                                {/* btn */}
                                                <button className="nav-link" id="details-tab" data-bs-toggle="tab" data-bs-target="#details-tab-pane" type="button" role="tab" aria-controls="details-tab-pane" aria-selected="false" >
                                                    Information
                                                </button>
                                            </li>
                                            {/* nav item */}
                                            <li className="nav-item" role="presentation">
                                                {/* btn */}
                                                <button className="nav-link" id="reviews-tab" data-bs-toggle="tab" data-bs-target="#reviews-tab-pane" type="button" role="tab" aria-controls="reviews-tab-pane" aria-selected="false">
                                                    Reviews <span>({(products?.ProductReviews?.length > 0 ? products?.ProductReviews.length : 0)})</span>
                                                </button>
                                            </li>
                                            {/* nav item */}
                                            {/* <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="sellerInfo-tab" data-bs-toggle="tab" data-bs-target="#sellerInfo-tab-pane" type="button" role="tab" aria-controls="sellerInfo-tab-pane" aria-selected="false" disabled="">
                                                    Seller Info
                                                </button>
                                            </li> */}
                                        </ul>
                                        {/* tab content */}
                                        <div className="tab-content" id="myTabContent">
                                            {/* tab pane */}
                                            <div className="tab-pane fade show active" id="product-tab-pane" role="tabpanel" aria-labelledby="product-tab" tabIndex={0}>
                                                <div className="my-8">
                                                    <p>{products?.ShortDescription}</p>
                                                    <div className="product-details-manage-container "  dangerouslySetInnerHTML={{ __html: products?.FullDescription }} />

                                                </div>
                                                <div className="border-product mb-7" style={{marginTop:"-50px"}}>
                                                    <div className="row singleProductReturn">
                                                        <div className="col-lg-8 col-12">

                                                            <table className="singleProductReturn">
                                                                <tr>
                                                                    <th>Returns</th>
                                                                    <td>
                                                                        {products?.IsReturnAble ?
                                                                            <div>Returnable until 7 days</div> :
                                                                            <span style={{ fontWeight: "bolder", color: "red" }}>Return Not Available.</span>}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Payment</th>
                                                                    <td>Secure Payment   </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Support</th>
                                                                    <td>
                                                                        <span>Product support included</span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Packaging</th>
                                                                    <td>
                                                                        <span>Ship in product packaging</span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Support</th>
                                                                    <td>
                                                                        <span>Product support included</span>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                        <div className="col-lg-4 col-12"></div>

                                                    </div>
                                                </div>
                                            </div>
                                            {/* tab pane */}
                                            <div className="tab-pane fade" id="details-tab-pane" role="tabpanel" aria-labelledby="details-tab" tabIndex={0} >
                                                <div className="my-8">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <h4 className="mb-4">Details</h4>
                                                        </div>
                                                        <div className="col-12 col-lg-6">
                                                            <table className="table table-striped">
                                                                <tbody>
                                                                    <tr>
                                                                        <th>Weight</th>
                                                                        <td>{products?.ProductWeight} Grams</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Ingredient Type</th>
                                                                        <td>–</td> {/* Not in API, so leave blank or use fallback */}
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Brand</th>
                                                                        <td>{products?.VendorId || 'N/A'}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Manufacturer</th>
                                                                        <td>{products?.Menufacturs?.name || 'N/A'}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Form</th>
                                                                        <td>{products?.ProductSize?.fullName || 'N/A'}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Product Color</th>
                                                                        <td>
                                                                            <span
                                                                                style={{
                                                                                    display: 'inline-block',
                                                                                    width: '20px',
                                                                                    height: '20px',
                                                                                    backgroundColor: products?.ProductColor || '#ccc',
                                                                                    border: '1px solid #999',
                                                                                }}
                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Price</th>
                                                                        <td>₹{products?.Price}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>

                                                        <div className="col-12 col-lg-6">
                                                            <table className="table table-striped">
                                                                <tbody>
                                                                    <tr>
                                                                        <th>SKU</th>
                                                                        <td>{products?.Sku}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Available From</th>
                                                                        <td>{new Date(products?.AvailableStartDate).toLocaleDateString()}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Available Until</th>
                                                                        <td>{new Date(products?.AvailableEndDate).toLocaleDateString()}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Stock Quantity</th>
                                                                        <td>{products?.StockQuantity}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Shipping Charge</th>
                                                                        <td>
                                                                            {products?.IsShippingFree ? 'Free' : `₹${products?.ShippingCharge}`}
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            {/* tab pane */}
                                            <div
                                                className="tab-pane fade"
                                                id="reviews-tab-pane"
                                                role="tabpanel"
                                                aria-labelledby="reviews-tab"
                                                tabIndex={0}
                                            >
                                                <div className="my-8">
                                                    {/* row */}
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <div className="me-lg-12 mb-6 mb-md-0">
                                                                <div className="mb-5">
                                                                    {/* title */}
                                                                    <h4 className="mb-3">Customer reviews</h4>
                                                                    <span>
                                                                        {/* rating */}
                                                                        <small className="text-warning">
                                                                            <i className="bi bi-star-fill" />
                                                                            <i className="bi bi-star-fill" />
                                                                            <i className="bi bi-star-fill" />
                                                                            <i className="bi bi-star-fill" />
                                                                            <i className="bi bi-star-half" />
                                                                        </small>
                                                                        <span className="ms-3">4.1 out of 5</span>
                                                                        <small className="ms-3">11,130 global ratings</small>
                                                                    </span>
                                                                </div>
                                                                <div className="mb-8">
                                                                    {/* progress */}
                                                                    <div className="d-flex align-items-center mb-2">
                                                                        <div className="text-nowrap me-3 text-muted">
                                                                            <span className="d-inline-block align-middle text-muted">
                                                                                5
                                                                            </span>
                                                                            <i className="bi bi-star-fill ms-1 small text-warning" />
                                                                        </div>
                                                                        <div className="w-100">
                                                                            <div className="progress" style={{ height: 6 }}>
                                                                                <div
                                                                                    className="progress-bar bg-warning"
                                                                                    role="progressbar"
                                                                                    style={{ width: "60%" }}
                                                                                    aria-valuenow={60}
                                                                                    aria-valuemin={0}
                                                                                    aria-valuemax={100}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <span className="text-muted ms-3">53%</span>
                                                                    </div>
                                                                    {/* progress */}
                                                                    <div className="d-flex align-items-center mb-2">
                                                                        <div className="text-nowrap me-3 text-muted">
                                                                            <span className="d-inline-block align-middle text-muted">
                                                                                4
                                                                            </span>
                                                                            <i className="bi bi-star-fill ms-1 small text-warning" />
                                                                        </div>
                                                                        <div className="w-100">
                                                                            <div className="progress" style={{ height: 6 }}>
                                                                                <div
                                                                                    className="progress-bar bg-warning"
                                                                                    role="progressbar"
                                                                                    style={{ width: "50%" }}
                                                                                    aria-valuenow={50}
                                                                                    aria-valuemin={0}
                                                                                    aria-valuemax={50}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <span className="text-muted ms-3">22%</span>
                                                                    </div>
                                                                    {/* progress */}
                                                                    <div className="d-flex align-items-center mb-2">
                                                                        <div className="text-nowrap me-3 text-muted">
                                                                            <span className="d-inline-block align-middle text-muted">
                                                                                3
                                                                            </span>
                                                                            <i className="bi bi-star-fill ms-1 small text-warning" />
                                                                        </div>
                                                                        <div className="w-100">
                                                                            <div className="progress" style={{ height: 6 }}>
                                                                                <div
                                                                                    className="progress-bar bg-warning"
                                                                                    role="progressbar"
                                                                                    style={{ width: "35%" }}
                                                                                    aria-valuenow={35}
                                                                                    aria-valuemin={0}
                                                                                    aria-valuemax={35}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <span className="text-muted ms-3">14%</span>
                                                                    </div>
                                                                    {/* progress */}
                                                                    <div className="d-flex align-items-center mb-2">
                                                                        <div className="text-nowrap me-3 text-muted">
                                                                            <span className="d-inline-block align-middle text-muted">
                                                                                2
                                                                            </span>
                                                                            <i className="bi bi-star-fill ms-1 small text-warning" />
                                                                        </div>
                                                                        <div className="w-100">
                                                                            <div className="progress" style={{ height: 6 }}>
                                                                                <div
                                                                                    className="progress-bar bg-warning"
                                                                                    role="progressbar"
                                                                                    style={{ width: "22%" }}
                                                                                    aria-valuenow={22}
                                                                                    aria-valuemin={0}
                                                                                    aria-valuemax={22}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <span className="text-muted ms-3">5%</span>
                                                                    </div>
                                                                    {/* progress */}
                                                                    <div className="d-flex align-items-center mb-2">
                                                                        <div className="text-nowrap me-3 text-muted">
                                                                            <span className="d-inline-block align-middle text-muted">
                                                                                1
                                                                            </span>
                                                                            <i className="bi bi-star-fill ms-1 small text-warning" />
                                                                        </div>
                                                                        <div className="w-100">
                                                                            <div className="progress" style={{ height: 6 }}>
                                                                                <div
                                                                                    className="progress-bar bg-warning"
                                                                                    role="progressbar"
                                                                                    style={{ width: "14%" }}
                                                                                    aria-valuenow={14}
                                                                                    aria-valuemin={0}
                                                                                    aria-valuemax={14}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <span className="text-muted ms-3">7%</span>
                                                                    </div>
                                                                </div>
                                                                <div className="d-grid">
                                                                    <h4>Review this product</h4>
                                                                    <p className="mb-0">
                                                                        Share your thoughts with other customers.
                                                                    </p>
                                                                    <a
                                                                        href="#"
                                                                        className="btn btn-outline-gray-400 mt-4 text-muted"
                                                                    >
                                                                        Write the Review
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* col */}
                                                        <div className="col-md-8">
                                                            <div className="mb-10">
                                                                <div className="d-flex justify-content-between align-items-center mb-8">
                                                                    <div>
                                                                        {/* heading */}
                                                                        <h4>Reviews</h4>
                                                                    </div>
                                                                    <div>
                                                                        <select className="form-select">
                                                                            <option selected="">Top Reviews</option>
                                                                            <option value="Most Recent">Most Recent</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex border-bottom pb-6 mb-6">
                                                                    {/* img */}
                                                                    {/* img */}
                                                                    <img
                                                                        src="../assets/images/avatar/avatar-10.jpg"
                                                                        alt=""
                                                                        className="rounded-circle avatar-lg"
                                                                    />
                                                                    <div className="ms-5">
                                                                        <h6 className="mb-1">Shankar Subbaraman</h6>
                                                                        {/* select option */}
                                                                        {/* content */}
                                                                        <p className="small">
                                                                            <span className="text-muted">30 December 2022</span>
                                                                            <span className="text-primary ms-3 fw-bold">
                                                                                Verified Purchase
                                                                            </span>
                                                                        </p>
                                                                        {/* rating */}
                                                                        <div className="mb-2">
                                                                            <i className="bi bi-star-fill text-warning" />
                                                                            <i className="bi bi-star-fill text-warning" />
                                                                            <i className="bi bi-star-fill text-warning" />
                                                                            <i className="bi bi-star-fill text-warning" />
                                                                            <i className="bi bi-star-fill text-warning" />
                                                                            <span className="ms-3 text-dark fw-bold">
                                                                                Need to recheck the weight at delivery point
                                                                            </span>
                                                                        </div>
                                                                        {/* text*/}
                                                                        <p>
                                                                            Product quality is good. But, weight seemed less than
                                                                            1kg. Since it is being sent in open package, there is
                                                                            a possibility of pilferage in between. FreshCart sends
                                                                            the veggies and fruits through sealed plastic covers
                                                                            and Barcode on the weight etc. .
                                                                        </p>
                                                                        <div>
                                                                            <div className=" icon-shape icon-lg border-2">
                                                                                {/* img */}
                                                                                <img
                                                                                    src="../assets/images/products/product-img-1.jpg"
                                                                                    alt=""
                                                                                    className="img-fluid"
                                                                                />
                                                                            </div>
                                                                            <div className=" icon-shape icon-lg border-2 ms-1">
                                                                                {/* img */}
                                                                                <img
                                                                                    src="../assets/images/products/product-img-2.jpg"
                                                                                    alt=""
                                                                                    className="img-fluid"
                                                                                />
                                                                            </div>
                                                                            <div className=" icon-shape icon-lg border-2 ms-1">
                                                                                {/* img */}
                                                                                <img
                                                                                    src="../assets/images/products/product-img-3.jpg"
                                                                                    alt=""
                                                                                    className="img-fluid"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        {/* icon */}
                                                                        <div className="d-flex justify-content-end mt-4">
                                                                            <a href="#" className="text-muted">
                                                                                <i className="feather-icon icon-thumbs-up me-1" />
                                                                                Helpful
                                                                            </a>
                                                                            <a href="#" className="text-muted ms-4">
                                                                                <i className="feather-icon icon-flag me-2" />
                                                                                Report abuse
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex border-bottom pb-6 mb-6 pt-4">
                                                                    {/* img */}
                                                                    <img
                                                                        src="../assets/images/avatar/avatar-12.jpg"
                                                                        alt=""
                                                                        className="rounded-circle avatar-lg"
                                                                    />
                                                                    <div className="ms-5">
                                                                        <h6 className="mb-1">Robert Thomas</h6>
                                                                        {/* content */}
                                                                        <p className="small">
                                                                            <span className="text-muted">29 December 2022</span>
                                                                            <span className="text-primary ms-3 fw-bold">
                                                                                Verified Purchase
                                                                            </span>
                                                                        </p>
                                                                        {/* rating */}
                                                                        <div className="mb-2">
                                                                            <i className="bi bi-star-fill text-warning" />
                                                                            <i className="bi bi-star-fill text-warning" />
                                                                            <i className="bi bi-star-fill text-warning" />
                                                                            <i className="bi bi-star-fill text-warning" />
                                                                            <i className="bi bi-star text-warning" />
                                                                            <span className="ms-3 text-dark fw-bold">
                                                                                Need to recheck the weight at delivery point
                                                                            </span>
                                                                        </div>
                                                                        <p>
                                                                            Product quality is good. But, weight seemed less than
                                                                            1kg. Since it is being sent in open package, there is
                                                                            a possibility of pilferage in between. FreshCart sends
                                                                            the veggies and fruits through sealed plastic covers
                                                                            and Barcode on the weight etc. .
                                                                        </p>
                                                                        {/* icon */}
                                                                        <div className="d-flex justify-content-end mt-4">
                                                                            <a href="#" className="text-muted">
                                                                                <i className="feather-icon icon-thumbs-up me-1" />
                                                                                Helpful
                                                                            </a>
                                                                            <a href="#" className="text-muted ms-4">
                                                                                <i className="feather-icon icon-flag me-2" />
                                                                                Report abuse
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex border-bottom pb-6 mb-6 pt-4">
                                                                    {/* img */}
                                                                    <img
                                                                        src="../assets/images/avatar/avatar-9.jpg"
                                                                        alt=""
                                                                        className="rounded-circle avatar-lg"
                                                                    />
                                                                    <div className="ms-5">
                                                                        <h6 className="mb-1">Barbara Tay</h6>
                                                                        {/* content */}
                                                                        <p className="small">
                                                                            <span className="text-muted">28 December 2022</span>
                                                                            <span className="text-danger ms-3 fw-bold">
                                                                                Unverified Purchase
                                                                            </span>
                                                                        </p>
                                                                        {/* rating */}
                                                                        <div className="mb-2">
                                                                            <i className="bi bi-star-fill text-warning" />
                                                                            <i className="bi bi-star-fill text-warning" />
                                                                            <i className="bi bi-star-fill text-warning" />
                                                                            <i className="bi bi-star-fill text-warning" />
                                                                            <i className="bi bi-star text-warning" />
                                                                            <span className="ms-3 text-dark fw-bold">
                                                                                Need to recheck the weight at delivery point
                                                                            </span>
                                                                        </div>
                                                                        <p>
                                                                            Everytime i ordered from fresh i got greenish yellow
                                                                            bananas just like i wanted so go for it , its happens
                                                                            very rare that u get over riped ones.
                                                                        </p>
                                                                        {/* icon */}
                                                                        <div className="d-flex justify-content-end mt-4">
                                                                            <a href="#" className="text-muted">
                                                                                <i className="feather-icon icon-thumbs-up me-1" />
                                                                                Helpful
                                                                            </a>
                                                                            <a href="#" className="text-muted ms-4">
                                                                                <i className="feather-icon icon-flag me-2" />
                                                                                Report abuse
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex border-bottom pb-6 mb-6 pt-4">
                                                                    {/* img */}
                                                                    <img
                                                                        src="../assets/images/avatar/avatar-8.jpg"
                                                                        alt=""
                                                                        className="rounded-circle avatar-lg"
                                                                    />
                                                                    <div className="ms-5 flex-grow-1">
                                                                        <h6 className="mb-1">Sandra Langevin</h6>
                                                                        {/* content */}
                                                                        <p className="small">
                                                                            <span className="text-muted">8 December 2022</span>
                                                                            <span className="text-danger ms-3 fw-bold">
                                                                                Unverified Purchase
                                                                            </span>
                                                                        </p>
                                                                        {/* rating */}
                                                                        <div className="mb-2">
                                                                            <i className="bi bi-star-fill text-warning" />
                                                                            <i className="bi bi-star-fill text-warning" />
                                                                            <i className="bi bi-star-fill text-warning" />
                                                                            <i className="bi bi-star-fill text-warning" />
                                                                            <i className="bi bi-star text-warning" />
                                                                            <span className="ms-3 text-dark fw-bold">
                                                                                Great product
                                                                            </span>
                                                                        </div>
                                                                        <p>
                                                                            Great product &amp; package. Delivery can be
                                                                            expedited.
                                                                        </p>
                                                                        {/* icon */}
                                                                        <div className="d-flex justify-content-end mt-4">
                                                                            <a href="#" className="text-muted">
                                                                                <i className="feather-icon icon-thumbs-up me-1" />
                                                                                Helpful
                                                                            </a>
                                                                            <a href="#" className="text-muted ms-4">
                                                                                <i className="feather-icon icon-flag me-2" />
                                                                                Report abuse
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <a
                                                                        href="#"
                                                                        className="btn btn-outline-gray-400 text-muted"
                                                                    >
                                                                        Read More Reviews
                                                                    </a>
                                                                </div>
                                                            </div>

                                                            {
                                                                products?.AllowCustomerReviews ?


                                                                    <div className='mt-4'>
                                                                        <h5 style={{ color: "black", fontWeight: "600", fontSize: "24px", borderBottom: "1px solid gray" }}>Write a Review</h5>
                                                                        <form action="" onSubmit={SubmitReviewForm}>
                                                                            <div className="row submitProductReview ">
                                                                                <div className="col-lg-8 col-12">
                                                                                    <div className="row">
                                                                                        <div className="col-lg-12 col-12 mt-3">
                                                                                            <label htmlFor="">Rating</label>
                                                                                            <div className="star-rating-review-form">
                                                                                                {[1, 2, 3, 4, 5].map((num) => (
                                                                                                    <span
                                                                                                        key={num}
                                                                                                        className={num == 1 || num <= ReviewRating ? 'star-filled' : 'star-empty'}
                                                                                                        onClick={() => handleClick(num)}
                                                                                                    >
                                                                                                        &#9733;
                                                                                                    </span>
                                                                                                ))}
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-lg-6 col-12 mt-3">
                                                                                            <label htmlFor="">Name</label>
                                                                                            <input type="text" className='form-control' placeholder='Enter Your Name ' name='ReviewerName' onChange={(e) => setReviewerName(e.target.value)} />
                                                                                        </div>
                                                                                        <div className="col-lg-6 col-12 mt-3">
                                                                                            <label htmlFor="">Email</label>
                                                                                            <input type="email" className='form-control' placeholder='Enter Your Email ' name='ReviewerEmail' onChange={(e) => setReviewerEmail(e.target.value)} />
                                                                                        </div>
                                                                                        <div className="col-lg-12 col-12 mt-3">
                                                                                            <label htmlFor="">Review Title</label>
                                                                                            <input type="text" className='form-control' placeholder='Enter  your Review Subjects ' name='ReviewerTitle' onChange={(e) => setReviewTitle(e.target.value)} />
                                                                                        </div>
                                                                                        <div className="col-lg-12 col-12 mt-3">
                                                                                            <label htmlFor="">Body of Review(1000)</label>
                                                                                            <textarea type="text" className='form-control' placeholder='Write your Testimonial here  ' rows='5' name='ReviewerBody' onChange={(e) => setReviewBody(e.target.value)} />
                                                                                        </div>

                                                                                    </div>
                                                                                    <input type="submit" value="Submit Review " className='btn  mt-3 reviewSubmitBtn' style={{ backgroundColor: "#002642", padding: "8px 10px", color: "white", fontWeight: "600" }} />
                                                                                </div>
                                                                                <div className="col-lg-4"></div>
                                                                            </div>
                                                                        </form>


                                                                    </div>

                                                                    : <div>
                                                                        <h2>Customer Not Allow ?? </h2>
                                                                    </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* tab pane */}
                                            <div
                                                className="tab-pane fade"
                                                id="sellerInfo-tab-pane"
                                                role="tabpanel"
                                                aria-labelledby="sellerInfo-tab"
                                                tabIndex={0}
                                            >
                                                ...
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            </section>



            <section className="related-product">
                <div className="container-fluid px-lg-8">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title related__product__title">
                                {/* <h2>Related Product</h2> */}
                                 <div class="premium-heading">
                            <div class="lines top-line"></div>
                                <h2>Related Product</h2>
                            <div class="lines bottom-line"></div>
                            {/* <span class="view-all">View All →</span> */}
                        </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {matchedProducts && matchedProducts.length > 0 ? (
                            <div className='row'>
                                {matchedProducts.slice(0, displayedProducts).map((item, ind) => (
                                    // <div className="col-lg-2 col-md-3 col-sm-6 col-6" key={ind}>
                                    //     <div className="product__item" >
                                    //         <Link to={`/product-details/${item._id}/${item.ProductsCategoriesMappings.map((category) => replaceWhiteSpacesWithDashSymbolInUrl(category.Name)).join('-') ?? "shop"}/${replaceWhiteSpacesWithDashSymbolInUrl(item.ProductName)}`} key={ind} className="latest-product__item" >
                                    //             <div className="product__item__pic set-bg" data-setbg={
                                    //                 item?.ProductPictures?.length
                                    //                     ? item.ProductPictures[0]?.url || `${BASE_URL}/${item.ProductPictures[0]}`
                                    //                     : 'fallback-image.jpg' // Replace with your fallback image
                                    //             }>
                                    //                 <img
                                    //                     src={
                                    //                         item?.ProductPictures?.length
                                    //                             ? item.ProductPictures[0]?.url || `${BASE_URL}/${item.ProductPictures[0]}`
                                    //                             : 'fallback-image.jpg' // Replace with your fallback image
                                    //                     }
                                    //                     alt={item?.ProductName}
                                    //                     style={{ width: "100%", height: "100%", }}
                                    //                 />
                                    //                 <ul className="product__item__pic__hover">
                                    //                     <li><Link to="#"><i className="fa fa-heart"></i></Link></li>
                                    //                     <li><Link to="#"><i className="fa fa-retweet"></i></Link></li>
                                    //                     <li><Link to="#"><i className="fa fa-shopping-cart"></i></Link></li>
                                    //                 </ul>
                                    //             </div>
                                    //             <div className="product__item__text">
                                    //                 <h6><Link to="#">{item.ProductName.slice(0, 80)}...</Link></h6>
                                    //             </div>
                                    //         </Link>
                                    //     </div>
                                    // </div>
                                    <div className="col-lg-2 col-md-3 col-sm-6 col-6 mt-2" key={ind}>
                                        <RelatedProduct item={item} />

                                    </div>
                                ))}
                                {matchedProducts.length > displayedProducts && (
                                    <div className="text-center">
                                        <button onClick={loadMoreProducts} className="btn viewMore">
                                            View More <i className="ri-arrow-down-s-line"></i>
                                        </button>
                                    </div>
                                )}

                            </div>
                        ) : (
                            <p>No related products found.</p>
                        )}
                    </div>
                </div>
            </section>


        </>
    )
}
