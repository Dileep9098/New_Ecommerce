
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './singleOrderDetails.css';
import axiosInstance from '../../ApiHendler/axiosInstance';
import Config from '../../Config/Config';
import Loader from '../../UI/Loader/Loader';
// import MetaData from '../../utils/MetaTag';
const BASE_URL = import.meta.env.VITE_IMG_URL;


export default function SingleOrderDetails() {
    const [getOrderDetails, setGetOrderDetails] = useState(null);
    const [shippingDetails, setShippingDetails] = useState(null);
    const param = useParams();

    useEffect(() => {
        const fetchSingleOrder = async () => {
            try {
                const response = await axiosInstance.get(
                    `${Config.END_POINT_LIST["GET_SINGLE_ORDER"]}/${param.id}`,
                    { withCredentials: true }
                );

                const shippingDeatils = await axiosInstance.get(
                    `${Config.END_POINT_LIST["GET_ORDER_SHIPPING_DEATILS"]}/${param.id}`,
                    { withCredentials: true }
                );

                if (response.data.success) {
                    setGetOrderDetails(response.data.order);
                    setShippingDetails(shippingDeatils.data.shippingDetails[0]);
                }
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        fetchSingleOrder();
    }, [param.id]);

    console.log(getOrderDetails);

    // Safely render the content only after the data is loaded
    if (!getOrderDetails) {
        return <Loader />; // Or a custom loading spinner
    }

    // Parse cartJsonData if it's a string
    const cartData = getOrderDetails.cartJsonData && Array.isArray(getOrderDetails.cartJsonData) && getOrderDetails.cartJsonData.length > 0
        ? JSON.parse(getOrderDetails.cartJsonData[0])
        : [];

    // Determine shipping charge logic
    let shippingCharge = 0;
    let shippingChargeAdded = false;

    // If CouponCode exists, check if we have shipping charges in cartJsonData
    if (getOrderDetails.CouponCode || cartData.length > 0) {
        for (let item of cartData) {
            if (item.IsShippingFree && getOrderDetails.totalOrderPrice < 200) {
                shippingCharge = 0

            }
            else {
                if (item.ShippingCharges && !shippingChargeAdded) {
                    shippingCharge += parseFloat(item.ShippingCharges);
                    shippingChargeAdded = true;
                }
            }
        }
    }

    if (!shippingChargeAdded) {
        shippingCharge = shippingDetails?.shippingCharge || 0;
    }

    // Calculate the total order price including shipping and tax
    // const totalAmount = parseFloat(getOrderDetails.totalOrderPrice) + shippingCharge + parseFloat(shippingDetails?.estimatedTax || 0);

    return (
        <>
            {/* <MetaData title={"Order Details"} /> */}

            <section className="breadcrumb-section set-bg bg-dark" data-setbg="img/breadcrumb.jpg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="breadcrumb__text">
                                <h2>Order Details</h2>
                                <div className="breadcrumb__option">
                                    <Link to="/profile"> Order</Link>
                                    <span>Order Details</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="container mt-5 mb-5">

                    <div className="row justify-content-center mb-5">
                        <div className="col-lg-7 col-md-10 col-sm-11">
                            <div className="horizontal-steps mt-4 mb-4 pb-5">
                                <div className="horizontal-steps-content">
                                    <div className="step-item">
                                        <span>Order Placed</span>
                                    </div>
                                    <div className="step-item current">
                                        <span>Order Confirmation</span>
                                    </div>
                                    <div className="step-item">
                                        <span>Packed</span>
                                    </div>
                                    <div className="step-item">
                                        <span>Shipped</span>
                                    </div>
                                    <div className="step-item">
                                        <span>Delivered</span>
                                    </div>
                                </div>
                                <div className="process-line" style={{ width: '25%' }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-8">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="header-title mb-3 fs-4">
                                        Items from Order <span style={{ color: "blueviolet", fontWeight: "700" }}>
                                            {getOrderDetails?.OrderNumber ? getOrderDetails?.OrderNumber : "######"}
                                        </span>
                                    </h4>

                                    <div className="table-responsive">
                                        <table className="table mb-0">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>Image</th>
                                                    <th>Item</th>
                                                    <th>Quantity</th>
                                                    <th>Price</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cartData.length > 0 ? (
                                                    cartData.map((item, ind) => (
                                                        <tr key={ind}>
                                                            <td className="text-center" style={{ width: "150px" }}>
                                                                <img
                                                                    src={item.DefaultImage.url||`${BASE_URL}/${item.DefaultImage}`}
                                                                    alt={item.ProductName}
                                                                    width="150"
                                                                    height="100"
                                                                    className="rounded border shadow-sm"
                                                                />
                                                            </td>
                                                            <td>{item.ProductName.slice(0, 50)}...</td>
                                                            <td>{item.Quantity}</td>
                                                            <td>&#8377;{item.Price}</td>
                                                            <td>&#8377;{(item.Quantity * item.Price).toFixed(2)}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="5" className="text-center">No Products Found</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="header-title mb-3">Order Summary</h4>

                                    <div className="table-responsive">
                                        <table className="table mb-0">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>Description</th>
                                                    <th>Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Grand Total :</td>
                                                    <td> &#8377;{cartData.reduce((total, item) => total + (item.Price * item.Quantity), 0).toFixed(2)}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Shipping Charge :</td>
                                                    <td> &#8377; {shippingCharge}</td>
                                                </tr>
                                                <tr>
                                                    <td>Estimated Tax :</td>
                                                    <td> &#8377; {shippingDetails?.estimatedTax || '0.00'}</td>
                                                </tr>
                                                <tr>
                                                    <th>Total :</th>
                                                    <th>&#8377; {getOrderDetails.totalOrderPrice}</th>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Shipping, Billing, Delivery info can be shown similarly */}

            </section >
        </>
    );
}

