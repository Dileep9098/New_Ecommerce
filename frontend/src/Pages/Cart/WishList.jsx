import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "./cartStyle.css"
const BASE_URL = import.meta.env.VITE_IMG_URL;
import ProductRatingStars from "../../Comoponant/Product/ProductRatingStars"
import { getSingleProduct } from '../../Store/Feature/product/productSlice';
import axiosInstance from '../../ApiHendler/axiosInstance';
import Config from '../../Config/Config';
import { makePriceRoundToTwoPlaces, replaceWhiteSpacesWithDashSymbolInUrl } from '../../utils/ConversionHelper';
import { showErrorMsg, showSuccessMsg } from '../../utils/ShowMessages';
import { setCustomerCart, SetTotalCartItems } from '../../Store/Feature/cartSlice/cartSlice';
import AutoCurrencyPrice from '../../Comoponant/CurrencyConvetor/AutoCurrencyPrice';

export default function WishList() {
    const { cartItems } = useSelector((state) => state.cart.cartItems);


    const [showPopover, setShowPopover] = useState(false);
    const [copyurl, setCopyUrl] = useState(false);
  
    const popoverRef = useRef(null);
    const [CartChanged, setCartChangedStatusCount] = useState(0);
    const [popoverStates, setPopoverStates] = useState(0);

    const dispatch = useDispatch()



    const togglePopover = (productId) => {
        setPopoverStates(prev => ({
            ...prev,
            [productId]: !prev[productId]
        }))
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

   

    const handleRemove = (ProductId) => {
        // Ensure cartItems is an array
        let wishilist = JSON.parse(localStorage.getItem("customerWishList") || "[]");

        // Filter out the product to be removed
        let updatedProductsList = wishilist.filter(item => item.ProductId !== ProductId);

        // Update localStorage and dispatch state
        localStorage.setItem("customerWishList", JSON.stringify(updatedProductsList));
        setWishListProduct(updatedProductsList)
        
    
        // Show success message
        showSuccessMsg("Wishlist Item Deleted Successfully");
    }


 const[wishListProduct,setWishListProduct]=useState(0)

    useEffect(()=>{
        const wishilist = localStorage.getItem("customerWishList");
        
        if (wishilist) {
            const wishlistArray = JSON.parse(wishilist);
            setWishListProduct(wishlistArray)
    
    } else {
        console.log("Wishlist is empty or doesn't exist.");
    }

    },[])

    return (
        <>
            <section className="breadcrumb-section set-bg bg-dark" data-setbg="img/breadcrumb.jpg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="breadcrumb__text">
                                <h2>My Wishlist</h2>
                                <div className="breadcrumb__option">
                                    <Link to="/">Home</Link>
                                    <span>My Wishlist</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cartItemSection">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 col-md-9 col-12">

                            {
                                wishListProduct && wishListProduct.length > 0 ? (
                                    <>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }} clas>
                                            <h2>My Wishlist</h2>
                                            {/* <p className='quantityButton1'>Total Price: </p> */}
                                        </div>
                                        <div className="row border-top border-bottom">
                                            {wishListProduct.map((item, ind) => (
                                                <>

                                                    <div className=" col-12 mt-3 mb-3 productInfo" key={ind}>
                                                        <div className="d-flex ">
                                                            <div className="CartImageProduct">    
                                                                 <Link to={`${Config.WEBSITE_IBASE_URL}product-details/${item?.ProductId}/${item?.ProductsCategoriesMappings ?? "shop"}/${replaceWhiteSpacesWithDashSymbolInUrl(item?.ProductName)}`} >
                                                                <img src={item?.DefaultImage.url||`${BASE_URL}/${item?.DefaultImage}`} alt="cart" className=" " />
                                                            </Link>
                                                            </div>
                                                            <div className="mx-4">
                                                                <h4 className='product-name'>
                                                                    {item?.ProductName}</h4>

                                                                <h5>&#8377; {item.Price} </h5>
                                                                <span> {item.Quantity ? <span style={{ color: "green" }}>In Stock</span> : <span style={{ color: "red" }}>out of Stock</span>}</span> <br />
                                                                <span>
                                                                    {item.IsShippingFree ? <span style={{ color: "green", fontWeight: "bolder" }}>Free Shipping</span>
                                                                        :
                                                                        (
                                                                            item.ShippingCharges ? <span>Shipping Charge :<span style={{ color: "#1B2061", fontWeight: "600" }} >&#8377;{item.ShippingCharges}</span></span> : <span>
                                                                                Free Shipping</span>
                                                                        )
                                                                    }
                                                                </span>
                                                                <p><ProductRatingStars Rating={4} /></p>
                                                                <div className="">

                                                                    <div className="d-flex quantityButton">
                                                                        <div className="input-group mt-2">
                                                                         

                                                                            <div className="me-2" style={{ borderLeft: "1px solid #D2D2D0" }}></div>

                                                                            <Link to="#" className="icon DeleteButton me-2" onClick={(e) => { e.preventDefault(); handleRemove(item.ProductId) }}>
                                                                                Delete
                                                                            </Link>

                                                                            <div className="me-2" style={{ borderLeft: "1px solid #D2D2D0" }}></div>

                                                                            <div className=''>

                                                                                <div className="shareOnImage">

                                                                                    <div className="shareBox">
                                                                                        <span className="material-icons" onClick={() => togglePopover(item.ProductId)}>
                                                                                            <span className="material-symbols-outlined">ios_share</span>
                                                                                        </span>
                                                                                        <div className="boxshare">
                                                                                            <span>share</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    {popoverStates[item.ProductId] && (
                                                                                        <div ref={popoverRef} className="popover popover2">
                                                                                            <header>
                                                                                                <button className="close-button" onClick={() => togglePopover(item.ProductId)} aria-label="Close Share Popup">
                                                                                                    <span className="material-symbols-outlined">close</span>
                                                                                                </button>
                                                                                                <span className="material-symbols-outlined">share</span>
                                                                                            </header>
                                                                                            <div className="popover-body">
                                                                                                <ul className="share-options">
                                                                                                    <li>
                                                                                                        <a className="share-option email" href="mailto:info@parijathandicraft.com" onClick={() => togglePopover(item.ProductId)}>
                                                                                                            <span className="material-symbols-outlined text-dark me-2">mail</span>
                                                                                                            <span className="label">Email</span>
                                                                                                        </a>
                                                                                                    </li>
                                                                                                    <li>
                                                                                                        <a className="share-option pinterest" href="https://in.pinterest.com/handicraftparijat/" onClick={() => togglePopover(item.ProductId)}>
                                                                                                            <i class="bi bi-pinterest me-2 fs-4 text-red-500"></i>
                                                                                                            <span className="label">Pinterest</span>
                                                                                                        </a>
                                                                                                    </li>
                                                                                                    <li>
                                                                                                        <a className="share-option facebook" href="https://www.facebook.com/prijathandicraft/" onClick={() => togglePopover(item.ProductId)}>
                                    <i class="bi bi-facebook me-2 fs-4 text-blue-500"></i>
                                                                                                            <span className="label">Facebook</span>
                                                                                                        </a>
                                                                                                    </li>
                                                                                                    <li>
                                                                                                        <a className="share-option twitter" href="https://x.com/handicraftpari1" onClick={() => togglePopover(item.ProductId)}>
                                   <i class="bi bi-twitter-x me-2 fs-4 text-dark"></i>
                                                                                                            <span className="label">X</span>
                                                                                                        </a>
                                                                                                    </li>
                                                                                                    <li>
                                                                                                        <a className="share-option copy" href="#" onClick={async (e) => {
                                                                                                            e.preventDefault();
                                                                                                            const urlViewDetailImage = `${Config.WEBSITE_IBASE_URL}product-details/${item.ProductId}/shop/${replaceWhiteSpacesWithDashSymbolInUrl(item.ProductName)}`;

                                                                                                            // console.log("Generated URL: ", urlViewDetailImage); // Debugging the generated URL
                                                                                                            try {
                                                                                                                await navigator.clipboard.writeText(urlViewDetailImage);
                                                                                                                setCopyUrl(true);
                                                                                                                setTimeout(() => {
                                                                                                                    setCopyUrl(false);
                                                                                                                    setShowPopover(false);
                                                                                                                    togglePopover(item.ProductId)
                                                                                                                }, 1500);
                                                                                                            } catch (err) {
                                                                                                                console.error('Failed to copy: ', err);
                                                                                                                alert('Failed to copy link. Please try again.');
                                                                                                            }
                                                                                                        }}>
                                                                                                            <span className="material-symbols-outlined text-dark me-2">{copyurl ? <span style={{ color: "green" }}>done_all</span> : "content_copy"}</span>
                                                                                                            <span className="label">{copyurl ? <span style={{ color: "green" }}>Link Copied!</span> : "Copy Link"}</span>
                                                                                                        </a>
                                                                                                    </li>
                                                                                                </ul>
                                                                                            </div>
                                                                                            {/* <div className="arrow"></div> */}
                                                                                        </div>
                                                                                    )}

                                                                                </div>
                                                                            </div>



                                                                        </div>
                                                                    </div>

                                                                </div>

                                                            </div>

                                                        </div>

                                                    </div>

                                                </>
                                            ))}
                                        </div>


                                    </>
                                ) : (
                                    <div className="col-sm-12">
                                        <div className="col-sm-12 empty-cart-cls text-center">
                                            <img src="/path/to/empty-cart-image.jpg" className="img-fluid mb-4" alt="Empty Cart" />
                                            <h3>
                                                <strong>Your Wish List is Empty</strong>
                                            </h3>
                                            <h4>Explore more and shortlist some items.</h4>
                                        </div>
                                    </div>
                                )}
                        </div>
                        <div className="col-lg-3 col-md-3 d-block d-sm-none">

                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}
