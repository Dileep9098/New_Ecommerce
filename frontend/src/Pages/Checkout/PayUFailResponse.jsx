

import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import './PayUFailResponse.css';
import { showErrorMsg, showSuccessMsg } from '../../utils/ShowMessages';
import axiosInstance from '../../ApiHendler/axiosInstance';
import Config from '../../Config/Config';
import { setCustomerCart, SetTotalCartItems } from '../../Store/Feature/cartSlice/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../UI/Loader/Loader';
import axios from 'axios';
// import MetaData from '../../utils/MetaTag';

export default function PayUFailResponse() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const hasOrderedRef = useRef(false);

    const [paramsData, setParamsData] = useState({});
    const { cartItems } = useSelector((state) => state.cart.cartItems);
    const { isLoading, user } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);

    const [shiproketToekn, setShiprocktToken] = useState(null);
    const [isTokenFetched, setIsTokenFetched] = useState(false);
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null); // Store order details for Shiprocket

    // useEffect(() => {
    //     if (!isTokenFetched) {
    //         const email = "dileepsahu0873@gmail.com";
    //         const password = "Dileep@0873";

    //         async function getTokenFromShiprockt() {
    //             try {
    //                 const response = await axios.post(
    //                     "https://apiv2.shiprocket.in/v1/external/auth/login",
    //                     { email, password }
    //                 );

    //                 const token = response.data.token;
    //                 if (token) {
    //                     setShiprocktToken(token);
    //                     setIsTokenFetched(true);
    //                 } else {
    //                     console.log("No token found in the response");
    //                 }
    //             } catch (error) {
    //                 console.log("Error fetching token:", error);
    //             }
    //         }

    //         getTokenFromShiprockt();
    //     }
    // }, [isTokenFetched]);

    // // ✅ UseEffect to check when token updates
    // useEffect(() => {
    //     if (shiproketToekn) {
    //         console.log("Shiprocket Token Set Successfully:", shiproketToekn);

    //         // If order was placed, create Shiprocket order
    //         if (isOrderPlaced && orderDetails) {
    //             createShiprocketOrder(orderDetails);
    //         }
    //     }
    // }, [shiproketToekn]);

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const params = {};
        query.forEach((value, key) => {
            params[key] = value;
        });
        setParamsData(params);

        console.log("Query Parameters:", params.status);

        if (params.status === "success" && params.mode !== "" && !isOrderPlaced && !hasOrderedRef.current) {
            hasOrderedRef.current = true;
            setLoading(true);
            PlaceAndConfirmCustomerOrder({
                amount: params.amount,
                bank_ref_num: params.bank_ref_num,
                mihpayid: params.mihpayid,
                txnid: params.txnid,
                payment_source: params.payment_source || 7
            }).finally(() => {
                setLoading(false);
                setIsOrderPlaced(true);
            });
        } else if (params.status !== "success") {
            showErrorMsg(params.error_Message || "Payment failed. Please try again.");
        }
    }, [location, isOrderPlaced]);

    const PlaceAndConfirmCustomerOrder = async (details) => {
        try {
            const paramSrip = {
                UserID: user._id,
                OrderNote: "",
                totalOrderPrice: details.amount || 0,
                cartJsonData: JSON.stringify(cartItems),
                CouponCode: "",
                PaymentMethod: 7,
                paymentToken: "",
                payPalOrderConfirmJson: "",
                bank_ref_num: details.bank_ref_num || 0,
                mihpayid: details.mihpayid || "",
                txnid: details.txnid || ""
            };

            const response = await axiosInstance.post(Config.END_POINT_LIST["ADD_NEW_ORDER"], paramSrip, { withCredentials: true });

            if (response?.status === 200 && response.data?.ResponseMsg === "Order Placed Successfully") {
                showSuccessMsg("Order Placed Successfully!");

                const orderData = response.data.order;
                const newOrderDetails = {
                    id: orderData._id,
                    customerName: user.name,
                    customerLastName: user.lname,
                    billingAddress: user.address,
                    billingCity: user.CityName,
                    billingPincode: user.PostalCode,
                    billingState: user.StateName,
                    billingCountry: user.CountryName,
                    billingEmail: user.email,
                    billingPhone: user.phone,
                    shippingName: user.name,
                    shippingLastName: user.lname,
                    shippingAddress: user.address,
                    shippingCity: user.CityName,
                    shippingPincode: user.PostalCode,
                    shippingCountry: user.CountryName,
                    shippingState: user.StateName,
                    shippingEmail: user.email,
                    shippingPhone: user.phone,
                    items: cartItems,
                    paymentMethod: "Prepaid",
                    subTotal: details.amount,
                    totalDiscount: 0,
                    length: 10,
                    breadth: 15,
                    height: 20,
                    weight: 2.5
                };

                setOrderDetails(newOrderDetails); // Save order details for Shiprocket
                dispatch(setCustomerCart('[]'));
                dispatch(SetTotalCartItems(0));
                localStorage.setItem("cartItems", "[]");

                // if (shiproketToekn) {
                //     createShiprocketOrder(newOrderDetails);
                // }
            } else {
                showErrorMsg("An error occurred. Please try again!");
            }
        } catch (err) {
            showErrorMsg("An error occurred. Please try again!");
            console.log(err.message);
        }
    };

    const createShiprocketOrder = async (orderDetails) => {
        if (!shiproketToekn) {
            console.log("Shiprocket token not available.");
            return;
        }

        try {
            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${shiproketToekn}`,
            };

            const params = {
                "order_id": `order_${orderDetails.id}`,
                "order_date": new Date().toISOString(),
                "pickup_location": "PARIJAT HANDICRAFT",
                "comment": "Reseller: M/s Goku",
                "billing_customer_name": orderDetails.customerName,
                "billing_last_name": orderDetails.customerLastName,
                "billing_address": orderDetails.billingAddress,
                "billing_city": orderDetails.billingCity,
                "billing_pincode": orderDetails.billingPincode,
                "billing_state": orderDetails.billingState,
                "billing_country": orderDetails.billingCountry,
                "billing_email": orderDetails.billingEmail,
                "billing_phone": orderDetails.billingPhone,
                "shipping_is_billing": true,
                "order_items": orderDetails.items.map(item => ({
                    name: item.ProductName,
                    sku: item.ProductId,
                    units: item.Quantity,
                    selling_price: item.Price || 0,
                })),
                "payment_method": orderDetails.paymentMethod,
                "sub_total": orderDetails.subTotal,
                "total_discount": orderDetails.totalDiscount || 0,
                "length": orderDetails.length || 10,
                "breadth": orderDetails.breadth || 15,
                "height": orderDetails.height || 20,
                "weight": orderDetails.weight || 2.5,
            };

            const response = await axios.post(
                'https://apiv2.shiprocket.in/v1/external/orders/create/adhoc',
                params,
                { headers }
            );

            console.log("Shiprocket Order Response: ", response.data);
        } catch (error) {
            console.error("Error sending order to Shiprocket:", error);
        }
    };

    return loading ? <Loader /> :
        <div>  <>
            {/* <MetaData title={"Payment Details"} /> */}


            <div className="container">
                <div className="row">

                    {paramsData.status === "success" ?
                        <div className="response-container">
                            <div className="response-header">Payment Successful</div>

                            <div className="success-container" >
                                <div className="circle"></div>
                                <div className="circle"></div>
                                <div className="circle"></div>
                                <div className="circle">
                                    <span className="checkmark">✔</span>
                                </div>
                            </div>

                            <div className="text">{paramsData.status === "success" && paramsData.mode !== ""
                                ? "Thank you for your order! Your payment has been processed successfully."
                                : "Unfortunately, your payment could not be processed. Please try again."
                            }</div>
                            <table className="payment-details-table">
                                <tbody>
                                    <tr>
                                        <td><b>Transaction Number</b></td>
                                        <td>
                                            <span style={{ fontWeight: "700" }}>
                                                {paramsData.txnid ? paramsData.txnid : paramsData.mihpayid}
                                            </span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td><b>Amount Paid</b></td>
                                        <td style={{ color: "#0a0062", fontWeight: "700" }}>&#8377;{paramsData.amount ?? "N/A"}</td>
                                    </tr>

                                    <tr>
                                        <td><b>Paid by</b></td>
                                        <td style={{ color: "#0a0062", fontWeight: "700" }}>{paramsData.payment_source ?? "Not Found"}</td>
                                    </tr>
                                </tbody>
                            </table>

                            {/* ✅ Redirect Message & Button */}
                            <p className="redirect-text text-center">
                                You will be redirected shortly. If not, click
                                {paramsData.status === "success" && paramsData.mode !== "" ? (
                                    <button onClick={() => navigate('/orders-history')} className="redirect-button">here</button>
                                ) : (
                                    <button onClick={() => navigate('/cart')} className="redirect-button">here</button>
                                )}
                            </p>
                        </div>
                        :
                        <div className="response-container">
                            <div className={`response-header`} style={{ backgroundColor: "#cc312e" }}>Payment Failed</div>

                            <div className="fail-container" >
                                <div className="fail-circle"></div>
                                <div className="fail-circle"></div>
                                <div className="fail-circle"></div>
                                <div className="fail-circle">
                                    <span className="crossmark">✖</span>
                                </div>
                            </div>

                            <div className="text">{paramsData.status === "success" && paramsData.mode !== ""
                                ? "Thank you for your order! Your payment has been processed successfully."
                                : "Unfortunately, your payment could not be processed. Please try again."
                            }</div>
                            <table className="payment-details-table">
                                <tbody>
                                    <tr>
                                        <td><b>Transaction Number</b></td>
                                        <td>
                                            <span style={{ fontWeight: "700" }}>
                                                {paramsData.txnid ? paramsData.txnid : paramsData.mihpayid}
                                            </span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td><b>Amount Paid</b></td>
                                        <td style={{ color: "#0a0062", fontWeight: "700" }}>&#8377;{paramsData.amount ?? "N/A"}</td>
                                    </tr>

                                    <tr>
                                        <td><b>Paid by</b></td>
                                        <td style={{ color: "#0a0062", fontWeight: "700" }}>{paramsData.payment_source ?? "Not Found"}</td>
                                    </tr>
                                </tbody>
                            </table>

                            {/* ✅ Redirect Message & Button */}
                            <p className="redirect-text text-center">
                                You will be redirected shortly. If not, click
                                {paramsData.status === "success" && paramsData.mode !== "" ? (
                                    <button onClick={() => navigate('/orders-history')} className="redirect-button">here</button>
                                ) : (
                                    <button onClick={() => navigate('/cart')} className="redirect-button">here</button>
                                )}
                            </p>


                        </div>

                    }
                </div>
            </div>
        </></div>;
}
