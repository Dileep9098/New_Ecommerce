// import React from 'react'
// import { useState } from 'react';
// import { useEffect } from 'react';
// import { AddCustomerWishList } from '../../utils/CartHelper';
// import { Link } from 'react-router-dom';

// export default function ProductBox({product}) {
//      const [isMobile, setIsMobile] = useState(false);

//     useEffect(() => {
//         const handleResize = () => {
//             setIsMobile(window.innerWidth <= 768);
//         };

//         window.addEventListener('resize', handleResize);

//         handleResize();

//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);




//     const HandleAddToWishList = ({ ProductId, ProductName, Price, IsShippingFree, ShippingCharge, OrderMaximumQuantity, StockQuantity, ProductPictures, DiscountPrice, CouponCode }) => {

//         let customerWishList = AddCustomerWishList(ProductId, ProductName, Price, IsShippingFree, ShippingCharge, OrderMaximumQuantity, StockQuantity, ProductPictures, DiscountPrice, CouponCode);
//         localStorage.setItem("customerWishList", customerWishList)

//     };
//     return (
//         <>
//             <div className="col">
//                 <div className="card card-product">
//                     <div className="card-body">
//                         <div className="text-center position-relative">
//                             <div className="position-absolute top-0 start-0">
//                                 <span className="badge bg-danger">Sale</span>
//                             </div>
//                             <a href="shop-single.html">
//                                 {/* img */}
//                                 <img
//                                     src="/assets/images/products/product-img-1.jpg"
//                                     alt="Grocery Ecommerce Template"
//                                     className="mb-3 img-fluid"
//                                 />
//                             </a>
//                             {/* action btn */}
//                             <div className="card-product-action">
//                                 <a
//                                     href="#!"
//                                     className="btn-action me-2"
//                                     data-bs-toggle="modal"
//                                     data-bs-target="#quickViewModal"
//                                 >
//                                     <i
//                                         className="bi bi-eye "
//                                         data-bs-toggle="tooltip"
//                                         data-bs-html="true"
//                                         title="Quick View"
//                                     />
//                                 </a>
//                                 <a
//                                     href="shop-wishlist.html"
//                                     className="btn-action me-2"
//                                     data-bs-toggle="tooltip"
//                                     data-bs-html="true"
//                                     title="Wishlist"
//                                 >
//                                     <i className="bi bi-heart" />
//                                 </a>
//                                 <a
//                                     href="#!"
//                                     className="btn-action"
//                                     data-bs-toggle="tooltip"
//                                     data-bs-html="true"
//                                     title="Compare"
//                                 >
//                                     <i className="bi bi-arrow-left-right" />
//                                 </a>
//                             </div>
//                         </div>

//                         <h2 className="fs-6">
//                             <a
//                                 href="shop-single.html"
//                                 className="text-inherit text-decoration-none"
//                             >
//                                 Haldiram's Sev Bhujia
//                             </a>
//                         </h2>
//                         <div>
//                             {/* rating */}
//                             <small className="text-warning">
//                                 <i className="bi bi-star-fill" />
//                                 <i className="bi bi-star-fill" />
//                                 <i className="bi bi-star-fill" />
//                                 <i className="bi bi-star-fill" />
//                                 <i className="bi bi-star-half" />
//                             </small>
//                             <span className="text-muted small">4.5(149)</span>
//                         </div>
//                         {/* price */}
//                         <div className="d-flex justify-content-between align-items-center mt-3">
//                             <div>
//                                 <span className="text-dark">$18</span>
//                                 <span className="text-decoration-line-through text-muted">
//                                     $24
//                                 </span>
//                             </div>
//                             {/* btn */}
//                             <div>
//                                 <a href="#!" className="btn btn-primary btn-sm">
//                                     <i class="bi bi-plus-lg me-2 "></i>
//                                     Add
//                                 </a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>



//         </>
//     )
// }






import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick'; // Importing react-slick for the image carousel
import './ProductBox.css';  // Import custom CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductRatingStars from './ProductRatingStars';
import { replaceWhiteSpacesWithDashSymbolInUrl } from '../../utils/ConversionHelper';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
// import { FaShoppingCart, FaHeart } from 'react-icons/fa'; // Import icons
import ShopIcon from '@mui/icons-material/Shop';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import CachedIcon from '@mui/icons-material/Cached';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { AddCustomerWishList } from '../../utils/CartHelper';
// import AutoCurrencyPrice from '../../../../CurrencyConvetor/AutoCurrencyPrice';
const BASE_URL = import.meta.env.VITE_IMG_URL;


export default function ProductBox({ product }) {
    // debugger
    const [isMobile, setIsMobile] = useState(false);


    console.log("Hello bhai kaisa hai re tu", product)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };


    const HandleAddToWishList = ({ ProductId, ProductName, Price, IsShippingFree, ShippingCharge, OrderMaximumQuantity, StockQuantity, ProductPictures, DiscountPrice, CouponCode }) => {

        let customerWishList = AddCustomerWishList(ProductId, ProductName, Price, IsShippingFree, ShippingCharge, OrderMaximumQuantity, StockQuantity, ProductPictures, DiscountPrice, CouponCode);
        localStorage.setItem("customerWishList", customerWishList)

    };

    console.log("Product in ProductBox", product)
    return (
        <>
            {
                product.length === 0 ? <>
                    <h1>fgf</h1>
                </> :
                    <div className="card custom-card">
                        {
                            product.ProductPictures.length > 1 ?
                                <div className="product-image">
                                    <Link to={`/product-details/${product._id}/${product.ProductsCategoriesMappings.map((category) => replaceWhiteSpacesWithDashSymbolInUrl(category.Name)).join('-') ?? "shop"}/${replaceWhiteSpacesWithDashSymbolInUrl(product.ProductName)}`}>
                                        <img className="card-img-top" src={`${BASE_URL}/${product.ProductPictures[0]}`} />

                                    </Link>
                                </div>
                                :
                                <div className="product-image">
                                    <Link to={`/product-details/${product._id}/${product.ProductsCategoriesMappings.map((category) => replaceWhiteSpacesWithDashSymbolInUrl(category.Name)).join('-') ?? "shop"}/${replaceWhiteSpacesWithDashSymbolInUrl(product.ProductName)}`}>
                                        {/*                             <img className="card-img-top" src={product.ProductPictures[0].url} alt={`Product image`} /> */}
                                        <img
                                            className="card-img-top"
                                            src={
                                                product?.ProductPictures?.[0]?.url ||
                                                `${BASE_URL}/${product?.ProductPictures?.[0]}` ||
                                                '/images/fallback.jpg'
                                            }
                                            alt="Product image"
                                        />

                                    </Link>
                                </div>
                        }
                        <div className="card-body">
                            <h5 className="card-title">
                                <Link to={`/product-details/${product._id}/${product.ProductsCategoriesMappings.map((category) => replaceWhiteSpacesWithDashSymbolInUrl(category.Name)).join('-') ?? "shop"}/${replaceWhiteSpacesWithDashSymbolInUrl(product.ProductName)}`}>  {product.ProductName.slice(0, isMobile ? 45 : 75)}...</Link>
                            </h5>

                            <div className="card-price-show ">

                                <ProductRatingStars Rating={product?.Rating == 0 || product.Rating == null ? 5 : product.Rating} />
                                <p className="product-price">
                                    <span>&#8377;{product.Price} <sub><del>{product.OldPrice}</del></sub></span>
                                    {/* <span>
                            <AutoCurrencyPrice Price={product.Price} />
                            {product.OldPrice && <sub><del><AutoCurrencyPrice Price={product.OldPrice} /></del></sub>}      
                        </span> */}
                                </p>
                            </div>

                        </div>
                        <div className="product-hover-icons">
                            {/* <i className="ri-shopping-cart-fill hover-icon cart-icon"></i> 
                <i className="ri-heart-fill hover-icon wishlist-icon"></i>   */}
                            <Tooltip title="Add to Card" placement="left">
                                <IconButton>
                                    <Link to={`/product-details/${product._id}/${product.ProductsCategoriesMappings.map((category) => replaceWhiteSpacesWithDashSymbolInUrl(category.Name)).join('-') ?? "shop"}/${replaceWhiteSpacesWithDashSymbolInUrl(product.ProductName)}`} className='hover-icon-link'> <ShopIcon className='hover-icon' /></Link>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Add to Wishlist" placement="left">
                                <IconButton>
                                    <Link to="#" onClick={(e) => { e.preventDefault(); HandleAddToWishList({ ProductId: product._id, ProductName: product.ProductName, Price: product.Price, IsShippingFree: product.IsShippingFree, ShippingCharge: product.ShippingCharge, OrderMaximumQuantity: product.OrderMaximumQuantity, StockQuantity: product.StockQuantity, ProductPictures: product.ProductPictures[0], DiscountPrice: product.DiscountProductsMappings.DiscountValue, CouponCode: product.DiscountProductsMappings.couponCode, }) }}
                                        className='hover-icon-link'> <FavoriteIcon className='hover-icon' /></Link>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Quick View" placement="left">
                                <IconButton>
                                    <Link to={`/product-details/${product._id}/${product.ProductsCategoriesMappings.map((category) => replaceWhiteSpacesWithDashSymbolInUrl(category.Name)).join('-') ?? "shop"}/${replaceWhiteSpacesWithDashSymbolInUrl(product.ProductName)}`} className='hover-icon-link'> <VisibilityIcon className='hover-icon' /></Link>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Compare" placement="left">
                                <IconButton>
                                    <Link to="/add-to-wishlist" className='hover-icon-link'> <CachedIcon className='hover-icon' /></Link>
                                </IconButton>
                            </Tooltip>
                            {/* <i className="ri-align-justify hover-icon compare-icon"></i>    */}
                        </div>


                    </div>
            }

        </>
    );
}
