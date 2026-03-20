// import React from 'react'

// export default function Cart() {
//     return (
//         <>

//             <section className="mb-lg-14 mb-8 mt-8">
//                 <div className="container">
//                     {/* row */}
//                     <div className="row">
//                         <div className="col-12">
//                             {/* card */}
//                             <div className="card py-1 border-0 mb-8">
//                                 <div>
//                                     <h1 className="fw-bold">Shop Cart</h1>
//                                     <p className="mb-0">Shopping in 382480</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     {/* row */}
//                     <div className="row">
//                         <div className="col-lg-8 col-md-7">
//                             <div className="py-3">
//                                 {/* alert */}
//                                 <div className="alert alert-danger p-2" role="alert">
//                                     You’ve got FREE delivery. Start
//                                     <a href="#!" className="alert-link">
//                                         checkout now!
//                                     </a>
//                                 </div>
//                                 <ul className="list-group list-group-flush">
//                                     {/* list group */}
//                                     <li className="list-group-item py-3 ps-0 border-top">
//                                         {/* row */}
//                                         <div className="row align-items-center">
//                                             <div className="col-6 col-md-6 col-lg-7">
//                                                 <div className="d-flex">
//                                                     <img
//                                                         src="../assets/images/products/product-img-1.jpg"
//                                                         alt="Ecommerce"
//                                                         className="icon-shape icon-xxl"
//                                                     />
//                                                     <div className="ms-3">
//                                                         {/* title */}
//                                                         <a href="shop-single.html" className="text-inherit">
//                                                             <h6 className="mb-0">Haldiram's Sev Bhujia</h6>
//                                                         </a>
//                                                         <span>
//                                                             <small className="text-muted">.98 / lb</small>
//                                                         </span>
//                                                         {/* text */}
//                                                         <div className="mt-2 small lh-1">
//                                                             <a
//                                                                 href="#!"
//                                                                 className="text-decoration-none text-inherit"
//                                                             >
//                                                                 <span className="me-1 align-text-bottom">
//                                                                     <svg
//                                                                         xmlns="http://www.w3.org/2000/svg"
//                                                                         width={14}
//                                                                         height={14}
//                                                                         viewBox="0 0 24 24"
//                                                                         fill="none"
//                                                                         stroke="currentColor"
//                                                                         strokeWidth={2}
//                                                                         strokeLinecap="round"
//                                                                         strokeLinejoin="round"
//                                                                         className="feather feather-trash-2 text-success"
//                                                                     >
//                                                                         <polyline points="3 6 5 6 21 6" />
//                                                                         <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
//                                                                         <line x1={10} y1={11} x2={10} y2={17} />
//                                                                         <line x1={14} y1={11} x2={14} y2={17} />
//                                                                     </svg>
//                                                                 </span>
//                                                                 <span className="text-muted">Remove</span>
//                                                             </a>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             {/* input group */}
//                                             <div className="col-4 col-md-4 col-lg-3">
//                                                 {/* input */}
//                                                 {/* input */}
//                                                 <div className="input-group input-spinner">
//                                                     <input
//                                                         type="button"
//                                                         defaultValue="-"
//                                                         className="button-minus btn btn-sm"
//                                                         data-field="quantity"
//                                                     />
//                                                     <input
//                                                         type="number"
//                                                         step={1}
//                                                         max={10}
//                                                         defaultValue={1}
//                                                         name="quantity"
//                                                         className="quantity-field form-control-sm form-input"
//                                                     />
//                                                     <input
//                                                         type="button"
//                                                         defaultValue="+"
//                                                         className="button-plus btn btn-sm"
//                                                         data-field="quantity"
//                                                     />
//                                                 </div>
//                                             </div>
//                                             {/* price */}
//                                             <div className="col-2 text-lg-end text-start text-md-end col-md-2">
//                                                 <span className="fw-bold">$5.00</span>
//                                             </div>
//                                         </div>
//                                     </li>
//                                     {/* list group */}
//                                     <li className="list-group-item py-3 ps-0">
//                                         {/* row */}
//                                         <div className="row align-items-center">
//                                             <div className="col-6 col-md-6 col-lg-7">
//                                                 <div className="d-flex">
//                                                     <img
//                                                         src="../assets/images/products/product-img-2.jpg"
//                                                         alt="Ecommerce"
//                                                         className="icon-shape icon-xxl"
//                                                     />
//                                                     <div className="ms-3">
//                                                         <a href="shop-single.html" className="text-inherit">
//                                                             <h6 className="mb-0">NutriChoice Digestive</h6>
//                                                         </a>
//                                                         <span>
//                                                             <small className="text-muted">250g</small>
//                                                         </span>
//                                                         {/* text */}
//                                                         <div className="mt-2 small lh-1">
//                                                             <a
//                                                                 href="#!"
//                                                                 className="text-decoration-none text-inherit"
//                                                             >
//                                                                 <span className="me-1 align-text-bottom">
//                                                                     <svg
//                                                                         xmlns="http://www.w3.org/2000/svg"
//                                                                         width={14}
//                                                                         height={14}
//                                                                         viewBox="0 0 24 24"
//                                                                         fill="none"
//                                                                         stroke="currentColor"
//                                                                         strokeWidth={2}
//                                                                         strokeLinecap="round"
//                                                                         strokeLinejoin="round"
//                                                                         className="feather feather-trash-2 text-success"
//                                                                     >
//                                                                         <polyline points="3 6 5 6 21 6" />
//                                                                         <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
//                                                                         <line x1={10} y1={11} x2={10} y2={17} />
//                                                                         <line x1={14} y1={11} x2={14} y2={17} />
//                                                                     </svg>
//                                                                 </span>
//                                                                 <span className="text-muted">Remove</span>
//                                                             </a>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             {/* input group */}
//                                             <div className="col-4 col-md-4 col-lg-3">
//                                                 {/* input */}
//                                                 {/* input */}
//                                                 <div className="input-group input-spinner">
//                                                     <input
//                                                         type="button"
//                                                         defaultValue="-"
//                                                         className="button-minus btn btn-sm"
//                                                         data-field="quantity"
//                                                     />
//                                                     <input
//                                                         type="number"
//                                                         step={1}
//                                                         max={10}
//                                                         defaultValue={1}
//                                                         name="quantity"
//                                                         className="quantity-field form-control-sm form-input"
//                                                     />
//                                                     <input
//                                                         type="button"
//                                                         defaultValue="+"
//                                                         className="button-plus btn btn-sm"
//                                                         data-field="quantity"
//                                                     />
//                                                 </div>
//                                             </div>
//                                             {/* price */}
//                                             <div className="col-2 text-lg-end text-start text-md-end col-md-2">
//                                                 <span className="fw-bold text-danger">$20.00</span>
//                                                 <div className="text-decoration-line-through text-muted small">
//                                                     $26.00
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </li>
//                                     {/* list group */}
//                                     <li className="list-group-item py-3 ps-0">
//                                         {/* row */}
//                                         <div className="row align-items-center">
//                                             <div className="col-6 col-md-6 col-lg-7">
//                                                 <div className="d-flex">
//                                                     <img
//                                                         src="../assets/images/products/product-img-3.jpg"
//                                                         alt="Ecommerce"
//                                                         className="icon-shape icon-xxl"
//                                                     />
//                                                     <div className="ms-3">
//                                                         {/* title */}
//                                                         <a href="shop-single.html" className="text-inherit">
//                                                             <h6 className="mb-0">Cadbury 5 Star Chocolate</h6>
//                                                         </a>
//                                                         <span>
//                                                             <small className="text-muted">1 kg</small>
//                                                         </span>
//                                                         {/* text */}
//                                                         <div className="mt-2 small lh-1">
//                                                             <a
//                                                                 href="#!"
//                                                                 className="text-decoration-none text-inherit"
//                                                             >
//                                                                 <span className="me-1 align-text-bottom">
//                                                                     <svg
//                                                                         xmlns="http://www.w3.org/2000/svg"
//                                                                         width={14}
//                                                                         height={14}
//                                                                         viewBox="0 0 24 24"
//                                                                         fill="none"
//                                                                         stroke="currentColor"
//                                                                         strokeWidth={2}
//                                                                         strokeLinecap="round"
//                                                                         strokeLinejoin="round"
//                                                                         className="feather feather-trash-2 text-success"
//                                                                     >
//                                                                         <polyline points="3 6 5 6 21 6" />
//                                                                         <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
//                                                                         <line x1={10} y1={11} x2={10} y2={17} />
//                                                                         <line x1={14} y1={11} x2={14} y2={17} />
//                                                                     </svg>
//                                                                 </span>
//                                                                 <span className="text-muted">Remove</span>
//                                                             </a>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             {/* input group */}
//                                             <div className="col-4 col-md-4 col-lg-3">
//                                                 {/* input */}
//                                                 {/* input */}
//                                                 <div className="input-group input-spinner">
//                                                     <input
//                                                         type="button"
//                                                         defaultValue="-"
//                                                         className="button-minus btn btn-sm"
//                                                         data-field="quantity"
//                                                     />
//                                                     <input
//                                                         type="number"
//                                                         step={1}
//                                                         max={10}
//                                                         defaultValue={1}
//                                                         name="quantity"
//                                                         className="quantity-field form-control-sm form-input"
//                                                     />
//                                                     <input
//                                                         type="button"
//                                                         defaultValue="+"
//                                                         className="button-plus btn btn-sm"
//                                                         data-field="quantity"
//                                                     />
//                                                 </div>
//                                             </div>
//                                             {/* price */}
//                                             <div className="col-2 text-lg-end text-start text-md-end col-md-2">
//                                                 <span className="fw-bold">$15.00</span>
//                                                 <div className="text-decoration-line-through text-muted small">
//                                                     $20.00
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </li>
//                                     {/* list group */}
//                                     <li className="list-group-item py-3 ps-0">
//                                         {/* row */}
//                                         <div className="row align-items-center">
//                                             <div className="col-6 col-md-6 col-lg-7">
//                                                 <div className="d-flex">
//                                                     <img
//                                                         src="../assets/images/products/product-img-4.jpg"
//                                                         alt="Ecommerce"
//                                                         className="icon-shape icon-xxl"
//                                                     />
//                                                     <div className="ms-3">
//                                                         {/* title */}
//                                                         {/* title */}
//                                                         <a href="shop-single.html" className="text-inherit">
//                                                             <h6 className="mb-0">Onion Flavour Potato</h6>
//                                                         </a>
//                                                         <span>
//                                                             <small className="text-muted">250g</small>
//                                                         </span>
//                                                         {/* text */}
//                                                         <div className="mt-2 small lh-1">
//                                                             <a
//                                                                 href="#!"
//                                                                 className="text-decoration-none text-inherit"
//                                                             >
//                                                                 <span className="me-1 align-text-bottom">
//                                                                     <svg
//                                                                         xmlns="http://www.w3.org/2000/svg"
//                                                                         width={14}
//                                                                         height={14}
//                                                                         viewBox="0 0 24 24"
//                                                                         fill="none"
//                                                                         stroke="currentColor"
//                                                                         strokeWidth={2}
//                                                                         strokeLinecap="round"
//                                                                         strokeLinejoin="round"
//                                                                         className="feather feather-trash-2 text-success"
//                                                                     >
//                                                                         <polyline points="3 6 5 6 21 6" />
//                                                                         <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
//                                                                         <line x1={10} y1={11} x2={10} y2={17} />
//                                                                         <line x1={14} y1={11} x2={14} y2={17} />
//                                                                     </svg>
//                                                                 </span>
//                                                                 <span className="text-muted">Remove</span>
//                                                             </a>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             {/* input group */}
//                                             <div className="col-4 col-md-4 col-lg-3">
//                                                 {/* input */}
//                                                 {/* input */}
//                                                 <div className="input-group input-spinner">
//                                                     <input
//                                                         type="button"
//                                                         defaultValue="-"
//                                                         className="button-minus btn btn-sm"
//                                                         data-field="quantity"
//                                                     />
//                                                     <input
//                                                         type="number"
//                                                         step={1}
//                                                         max={10}
//                                                         defaultValue={1}
//                                                         name="quantity"
//                                                         className="quantity-field form-control-sm form-input"
//                                                     />
//                                                     <input
//                                                         type="button"
//                                                         defaultValue="+"
//                                                         className="button-plus btn btn-sm"
//                                                         data-field="quantity"
//                                                     />
//                                                 </div>
//                                             </div>
//                                             {/* price */}
//                                             <div className="col-2 text-lg-end text-start text-md-end col-md-2">
//                                                 <span className="fw-bold">$15.00</span>
//                                                 <div className="text-decoration-line-through text-muted small">
//                                                     $20.00
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </li>
//                                     {/* list group */}
//                                     <li className="list-group-item py-3 ps-0 border-bottom">
//                                         {/* row */}
//                                         <div className="row align-items-center">
//                                             <div className="col-6 col-md-6 col-lg-7">
//                                                 <div className="d-flex">
//                                                     <img
//                                                         src="../assets/images/products/product-img-5.jpg"
//                                                         alt="Ecommerce"
//                                                         className="icon-shape icon-xxl"
//                                                     />
//                                                     <div className="ms-3">
//                                                         {/* title */}
//                                                         <a href="shop-single.html" className="text-inherit">
//                                                             <h6 className="mb-0">Salted Instant Popcorn</h6>
//                                                         </a>
//                                                         <span>
//                                                             <small className="text-muted">100g</small>
//                                                         </span>
//                                                         {/* text */}
//                                                         <div className="mt-2 small lh-1">
//                                                             <a
//                                                                 href="#!"
//                                                                 className="text-decoration-none text-inherit"
//                                                             >
//                                                                 <span className="me-1 align-text-bottom">
//                                                                     <svg
//                                                                         xmlns="http://www.w3.org/2000/svg"
//                                                                         width={14}
//                                                                         height={14}
//                                                                         viewBox="0 0 24 24"
//                                                                         fill="none"
//                                                                         stroke="currentColor"
//                                                                         strokeWidth={2}
//                                                                         strokeLinecap="round"
//                                                                         strokeLinejoin="round"
//                                                                         className="feather feather-trash-2 text-success"
//                                                                     >
//                                                                         <polyline points="3 6 5 6 21 6" />
//                                                                         <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
//                                                                         <line x1={10} y1={11} x2={10} y2={17} />
//                                                                         <line x1={14} y1={11} x2={14} y2={17} />
//                                                                     </svg>
//                                                                 </span>
//                                                                 <span className="text-muted">Remove</span>
//                                                             </a>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             {/* input group */}
//                                             <div className="col-4 col-md-4 col-lg-3">
//                                                 {/* input */}
//                                                 {/* input */}
//                                                 <div className="input-group input-spinner">
//                                                     <input
//                                                         type="button"
//                                                         defaultValue="-"
//                                                         className="button-minus btn btn-sm"
//                                                         data-field="quantity"
//                                                     />
//                                                     <input
//                                                         type="number"
//                                                         step={1}
//                                                         max={10}
//                                                         defaultValue={1}
//                                                         name="quantity"
//                                                         className="quantity-field form-control-sm form-input"
//                                                     />
//                                                     <input
//                                                         type="button"
//                                                         defaultValue="+"
//                                                         className="button-plus btn btn-sm"
//                                                         data-field="quantity"
//                                                     />
//                                                 </div>
//                                             </div>
//                                             {/* price */}
//                                             <div className="col-2 text-lg-end text-start text-md-end col-md-2">
//                                                 <span className="fw-bold">$15.00</span>
//                                                 <div className="text-decoration-line-through text-muted small">
//                                                     $25.00
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </li>
//                                 </ul>
//                                 {/* btn */}
//                                 <div className="d-flex justify-content-between mt-4">
//                                     <a href="#!" className="btn btn-primary">
//                                         Continue Shopping
//                                     </a>
//                                     <a href="#!" className="btn btn-dark">
//                                         Update Cart
//                                     </a>
//                                 </div>
//                             </div>
//                         </div>
//                         {/* sidebar */}
//                         <div className="col-12 col-lg-4 col-md-5">
//                             {/* card */}
//                             <div className="mb-5 card mt-6">
//                                 <div className="card-body p-6">
//                                     {/* heading */}
//                                     <h2 className="h5 mb-4">Summary</h2>
//                                     <div className="card mb-2">
//                                         {/* list group */}
//                                         <ul className="list-group list-group-flush">
//                                             {/* list group item */}
//                                             <li className="list-group-item d-flex justify-content-between align-items-start">
//                                                 <div className="me-auto">
//                                                     <div>Item Subtotal</div>
//                                                 </div>
//                                                 <span>$70.00</span>
//                                             </li>
//                                             {/* list group item */}
//                                             <li className="list-group-item d-flex justify-content-between align-items-start">
//                                                 <div className="me-auto">
//                                                     <div>Service Fee</div>
//                                                 </div>
//                                                 <span>$3.00</span>
//                                             </li>
//                                             {/* list group item */}
//                                             <li className="list-group-item d-flex justify-content-between align-items-start">
//                                                 <div className="me-auto">
//                                                     <div className="fw-bold">Subtotal</div>
//                                                 </div>
//                                                 <span className="fw-bold">$67.00</span>
//                                             </li>
//                                         </ul>
//                                     </div>
//                                     <div className="d-grid mb-1 mt-4">
//                                         {/* btn */}
//                                         <button
//                                             className="btn btn-primary btn-lg d-flex justify-content-between align-items-center"
//                                             type="submit"
//                                         >
//                                             Go to Checkout
//                                             <span className="fw-bold">$67.00</span>
//                                         </button>
//                                     </div>
//                                     {/* text */}
//                                     <p>
//                                         <small>
//                                             By placing your order, you agree to be bound by the Freshcart
//                                             <a href="#!">Terms of Service</a>
//                                             and
//                                             <a href="#!">Privacy Policy.</a>
//                                         </small>
//                                     </p>
//                                     {/* heading */}
//                                     <div className="mt-8">
//                                         <h2 className="h5 mb-3">Add Promo or Gift Card</h2>
//                                         <form>
//                                             <div className="mb-2">
//                                                 {/* input */}
//                                                 <label htmlFor="giftcard" className="form-label sr-only">
//                                                     Email address
//                                                 </label>
//                                                 <input
//                                                     type="text"
//                                                     className="form-control"
//                                                     id="giftcard"
//                                                     placeholder="Promo or Gift Card"
//                                                 />
//                                             </div>
//                                             {/* btn */}
//                                             <div className="d-grid">
//                                                 <button type="submit" className="btn btn-outline-dark mb-1">
//                                                     Redeem
//                                                 </button>
//                                             </div>
//                                             <p className="text-muted mb-0">
//                                                 <small>Terms &amp; Conditions apply</small>
//                                             </p>
//                                         </form>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </>

//     )
// }




import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "./cartStyle.css"
import ProductRatingStars from "../../Comoponant/Product/ProductRatingStars"
import { getSingleProduct } from '../../Store/Feature/product/productSlice';
import axiosInstance from '../../ApiHendler/axiosInstance';
import Config from '../../Config/Config';
import { makePriceRoundToTwoPlaces, replaceWhiteSpacesWithDashSymbolInUrl } from '../../utils/ConversionHelper';
import { showErrorMsg, showSuccessMsg } from '../../utils/ShowMessages';
import { setCustomerCart, SetTotalCartItems } from '../../Store/Feature/cartSlice/cartSlice';
import AutoCurrencyPrice from '../../Comoponant/CurrencyConvetor/AutoCurrencyPrice';
const BASE_URL = import.meta.env.VITE_IMG_URL;


export default function Cart() {
    // Extract cartItems from state properly (adjusting based on Redux structure)
    const { cartItems } = useSelector((state) => state.cart.cartItems);
    

    // let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];


    // console.log("Cart data is: ", cartItems);
    const [showPopover, setShowPopover] = useState(false);
    const [copyurl, setCopyUrl] = useState(false);
    const [CartSubTotal, setCartSubTotal] = useState(0);
    const [ShippingSubTotal, setShippingSubTotal] = useState(0);
    const [InternationalShippingSubTotal, setInsternationalShippingSubTotal] = useState(0);
    const [OrderTotal, setOrderTotal] = useState(0);
    const [TaxTotal, setTaxTotal] = useState(0)
    const popoverRef = useRef(null);
    const [CartChanged, setCartChangedStatusCount] = useState(0);
    const [popoverStates, setPopoverStates] = useState(0);
    const { currency, rate } = useSelector((state) => state.currency);


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

   const handleQtyUpdate = (ProductId, OrderMaximumQuantity, newValue) => {
  newValue = Number(newValue) || 1;

  let updatedCartItems = [...cartItems];
  const productIndex = updatedCartItems.findIndex(x => x.ProductId === ProductId);

  if (productIndex === -1) {
    showErrorMsg("Product not found in the cart.");
    return;
  }

  if (OrderMaximumQuantity && OrderMaximumQuantity > 0 && newValue > OrderMaximumQuantity) {
    showErrorMsg(`Cannot add more than ${OrderMaximumQuantity} for this product`);
    return;
  }

  updatedCartItems[productIndex] = {
    ...updatedCartItems[productIndex],
    Quantity: newValue,
  };

  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  dispatch(setCustomerCart([...updatedCartItems])); // 👈 force new array ref
  setCartTotalSubTotalShippingTotalAfterUpdate();
};


    const handleRemove = (ProductId) => {
        // Ensure cartItems is an array
        let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

        // Filter out the product to be removed
        let updatedProductsList = cartItems.filter(item => item.ProductId !== ProductId);

        // Update localStorage and dispatch state
        localStorage.setItem("cartItems", JSON.stringify(updatedProductsList));
        dispatch(setCustomerCart(updatedProductsList));
        dispatch(SetTotalCartItems(updatedProductsList.length));

        // Update the total and status
        setCartTotalSubTotalShippingTotalAfterUpdate();
        setCartChangedStatusCount(CartChanged + 1);

        // Show success message
        showSuccessMsg("Cart Item Deleted Successfully");
    }



    const calculateItemSubTotal = (item) => {
        return (item.Price) * (item.Quantity ?? 1);
    };

    const calculateItemTaxTotal = (item) => {
        return ((item.Price * ((item.Tax ? item.Tax : 0) / 100)) * (item.Quantity ?? 1)); // Tax % calculate
    };


    const applyShippingCharge = (item, shippingChargeApplied) => {
        if (!shippingChargeApplied && item.ShippingCharges) {
            return { charge: parseInt(item.ShippingCharges), applied: true };
        }
        return { charge: 0, applied: shippingChargeApplied };
    };

    const setCartTotalSubTotalShippingTotalAfterUpdate = () => {
        if (!cartItems || cartItems.length === 0) return;

        let CartSubTotalDummy = 0;
        let ShippingSubTotalDummy = 0;
        let InternationalShippingSubTotalDummy = 0;
        let OrderTotalDummy = 0;
        let TaxTotalDummy = 0;

        let shippingChargeApplied = false;

        cartItems.forEach(item => {
            const itemSubTotal = calculateItemSubTotal(item);
            const itemTaxTotal = calculateItemTaxTotal(item);

            console.log('Item SubTotal:', itemSubTotal);
            console.log('Item Tax Total:', itemTaxTotal);

            CartSubTotalDummy += itemSubTotal;
            TaxTotalDummy += itemTaxTotal || 0; // ✅ Tax ko add kar diya
            // InternationalShippingSubTotalDummy+=(item.InternationCharge==="undefine"?0:item.InternationChange)
            InternationalShippingSubTotalDummy += item?.InternationCharge || 0;

            const shipping = applyShippingCharge(item, shippingChargeApplied);
            console.log('Shipping Charge:', shipping.charge);
            ShippingSubTotalDummy = shipping.charge;
            shippingChargeApplied = shipping.applied;
        });

        // Order total me ab subtotal + tax bhi include hoga
        OrderTotalDummy = CartSubTotalDummy + TaxTotalDummy + (currency === "USD" ? InternationalShippingSubTotalDummy : 0);

        console.log('Cart SubTotal:', CartSubTotalDummy);
        console.log('Tax SubTotal:', TaxTotalDummy);
        console.log('Shipping SubTotal:', ShippingSubTotalDummy);
        console.log('Order Total:', OrderTotalDummy);
        console.log('Order InternationalShippingSubTotalDummy:', InternationalShippingSubTotalDummy);

        // Agar Order Total ₹500 se kam hai to ₹100 shipping charge add hoga
        if (OrderTotalDummy < 500) {
            ShippingSubTotalDummy = ShippingSubTotalDummy > 0 ? ShippingSubTotalDummy : 100; // Add ₹100 shipping charge
            OrderTotalDummy += ShippingSubTotalDummy; // Shipping charge ko Order Total me add karo
            console.log('Order Total after adding shipping charge (if below ₹500):', OrderTotalDummy);
        }

        // Ensure the totals are correctly rounded and updated
        setCartSubTotal(makePriceRoundToTwoPlaces(CartSubTotalDummy));
        setTaxTotal(makePriceRoundToTwoPlaces(TaxTotalDummy)); // ✅ Tax total state me set kar diya
        setShippingSubTotal(makePriceRoundToTwoPlaces(ShippingSubTotalDummy));
        setInsternationalShippingSubTotal(makePriceRoundToTwoPlaces(InternationalShippingSubTotalDummy));
        setOrderTotal(makePriceRoundToTwoPlaces(OrderTotalDummy));
    };

    useEffect(() => {
        setCartTotalSubTotalShippingTotalAfterUpdate();
    }, [cartItems]);


    return (
        <>
            <section className="breadcrumb-section set-bg bg-dark" data-setbg="img/breadcrumb.jpg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="breadcrumb__text">
                                <h2>Shopping Cart</h2>
                                <div className="breadcrumb__option">
                                    <Link to="/">Home</Link>
                                    <span>Shopping Cart</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cartItemSection">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-9 col-md-9 col-12">

                            {
                                cartItems && cartItems.length > 0 ? (
                                    <>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }} clas>
                                            <h2>Shopping Cart</h2>
                                            <p className='quantityButton1'>Total Price: </p>
                                        </div>
                                        <div className="row border-top border-bottom">
                                            {cartItems.map((item, ind) => (
                                                <>

                                                    <div className="col-lg-9 col-md-9 col-sm-12 col-12 mt-3 mb-3 productInfo">
                                                        <div className="d-flex ">
                                                            <div className="CartImageProduct">     <Link to="#" onClick={(e) => e.preventDefault()}>
                                                                <img src={item?.DefaultImage.url || `${BASE_URL}/${item?.DefaultImage}`} alt="cart" className=" " />
                                                            </Link>
                                                            </div>
                                                            <div className="mx-4">
                                                                <h4 className='product-name'>
                                                                    {item?.ProductName}</h4>

                                                                <h5><AutoCurrencyPrice Price={item.Price} /></h5>
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
                                                                            <input
                                                                                type="number"
                                                                                min="1"
                                                                                max={10}
                                                                                name="quantity"
                                                                                onChange={(e) => handleQtyUpdate(item.ProductId, item.OrderMaximumQuantity, e.target.value)}
                                                                                className="form-control input-number"
                                                                                value={item.Quantity}
                                                                                style={{ maxWidth: '60px', maxHeight: "30px", marginRight: "10px", borderRadius: "5px" }} // Adjust the maxWidth as per your design
                                                                            />

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
                                                    <div className="col-lg-3 col-md-3 mt-3 quantityButton1 ">
                                                        <p className='totalPrice'>
                                                            {(() => {
                                                                let itemSubTotal = (item.Price != undefined && item.Price > 0 ? item.Price : "jg") * (item.Quantity)
                                                                return (
                                                                    <div className="">
                                                                        {/* &#8377; {itemSubTotal.toFixed(2)} */}
                                                                        <AutoCurrencyPrice Price={itemSubTotal} />

                                                                    </div>
                                                                )

                                                            })}
                                                            {/* &#8377;   {(item.Price * item.Quantity).toFixed(2)} */}
                                                            <AutoCurrencyPrice Price={(item.Price * item.Quantity).toFixed(2)} />
                                                        </p>

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
                                                <strong>Your Cart is Empty</strong>
                                            </h3>
                                            <h4>Explore more and shortlist some items.</h4>
                                        </div>
                                    </div>
                                )}
                        </div>
                        <div className="col-lg-3 col-md-3 ">

                        
                             <div class="mb-5 card ">
                                    <div class="card-body p-6">
                                        <h2 class="h5 mb-4">Summary</h2>
                                        <div class="card mb-2">
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item d-flex justify-content-between align-items-start">
                                                    <div class="me-auto">
                                                        <div>Item Subtotal</div>
                                                    </div>
                                                    <span><AutoCurrencyPrice Price={CartSubTotal} /></span>
                                                </li>

                                                <li class="list-group-item d-flex justify-content-between align-items-start">
                                                    <div class="me-auto">
                                                        <div>Service Fee</div>
                                                    </div>
                                                    <span>{
                                                        currency === "USD" ? (
                                                            <AutoCurrencyPrice Price={InternationalShippingSubTotal} />
                                                        ) : (
                                                            <AutoCurrencyPrice Price={ShippingSubTotal} />
                                                        )
                                                    }</span>
                                                </li>
                                                <li class="list-group-item d-flex justify-content-between align-items-start">
                                                    <div class="me-auto">
                                                        <div>Tax</div>
                                                    </div>
                                                    <span> <AutoCurrencyPrice Price={TaxTotal} /></span>
                                                </li>
                                                <li class="list-group-item d-flex justify-content-between align-items-start">
                                                    <div class="me-auto">
                                                        <div class="fw-bold">Subtotal</div>
                                                    </div>
                                                    <span class="fw-bold">  <AutoCurrencyPrice Price={OrderTotal} /></span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="d-grid mb-1 mt-4">
                                            <Link class="btn btn-primary btn-lg d-flex justify-content-between align-items-center" to="/checkout">
                                                Go to Checkout
                                                <span class="fw-bold"> <AutoCurrencyPrice Price={OrderTotal} /></span>
                                            </Link>
                                        </div>
                                         <div class="d-grid mt-2"><Link to='/all-product/0/all-categories' class="btn btn-outline-dark mb-1"> Continue Shopping</Link></div>
                                        <p>
                                            <small>
                                                By placing your order, you agree to be bound by the Freshcart
                                                <a href="#!">Terms of Service</a>
                                                and
                                                <a href="#!">Privacy Policy.</a>
                                            </small>
                                        </p>

                                        <div class="mt-8">
                                            <h2 class="h5 mb-3">Add Promo or Gift Card</h2>
                                            <form>
                                                <div class="mb-2">
                                                    <label for="giftcard" class="form-label sr-only">Email address</label>
                                                    <input type="text" class="form-control" id="giftcard" placeholder="Promo or Gift Card" />
                                                </div>
                                                <div class="d-grid"><button type="submit" class="btn btn-outline-dark mb-1">Redeem</button></div>
                                                <p class="text-muted mb-0"><small>Terms & Conditions apply</small></p>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                        </div>

                    </div>


                </div>
            </section>
        </>
    );
}



