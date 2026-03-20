

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import axiosInstance from '../../../ApiHendler/axiosInstance';
import Config from '../../../Config/Config';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import "./orderDetails.css"
import { showErrorMsg, showSuccessMsg } from '../../../utils/ShowMessages';

const BASE_URL = import.meta.env.VITE_IMG_URL;


const OrderDetails = () => {

    const [getOrderDetails, setGetOrderDetails] = useState();
    const [activeTab, setActiveTab] = useState('basictab1'); // Initially set to 'basictab1'
    const param = useParams();

    const [Shipper, setShipper] = useState()
    const [length, setLength] = useState()
    const [breadth, setBreadth] = useState()
    const [height, setHeight] = useState()
    const [weight, setWeight] = useState()
    const [shippingMethod, setshippingMethod] = useState()
    const [ShippingStatus, setShippingStatus] = useState()
    const [departureDate, setdepartureDate] = useState()
    const [receivedDate, setreceivedDate] = useState()
    const [receiverName, setreceiverName] = useState()
    const [receiverMobile, setreceiverMobile] = useState()
    const [receiverIdentityNo, setreceiverIdentityNo] = useState()
    const [TrackingNumber, setTrackingNumber] = useState()
    const [shippingDetails, setShippingDetails] = useState()



    useEffect(() => {
        const fetchSingleOrder = async () => {
            // debugger
            const response = await axiosInstance.get(`${Config.END_POINT_LIST["GET_SINGLE_ORDER"]}/${param.id}`, { withCredentials: true });
            const shippingDeatils = await axiosInstance.get(`${Config.END_POINT_LIST["GET_ORDER_SHIPPING_DEATILS"]}/${param.id}`, { withCredentials: true });
            if (response.data.success) {
                setGetOrderDetails(response.data.order);
                setShippingDetails(shippingDeatils.data.shippingDetails[0])

                setShipper(shippingDeatils.data.shippingDetails[0].shipper);
                setLength(shippingDeatils.data.shippingDetails[0].length);
                setWeight(shippingDeatils.data.shippingDetails[0].weight);
                setBreadth(shippingDeatils.data.shippingDetails[0].breadth);
                setHeight(shippingDeatils.data.shippingDetails[0].height);
                setshippingMethod(shippingDeatils.data.shippingDetails[0].shippingMethod);
                setShippingStatus(shippingDeatils.data.shippingDetails[0].shippingStatus);
                setdepartureDate(shippingDeatils.data.shippingDetails[0].departure_date);
                setreceivedDate(shippingDeatils.data.shippingDetails[0].receiver_date);
                setreceiverName(shippingDeatils.data.shippingDetails[0].receiver_name);
                setreceiverMobile(shippingDeatils.data.shippingDetails[0].receiver_mobile);
                setreceiverIdentityNo(shippingDeatils.data.shippingDetails[0].receiver_indentity_no);
                setTrackingNumber(shippingDeatils.data.shippingDetails[0].TrackingNumber);
            }
        };
        fetchSingleOrder();
    }, [param.id]);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    const handleShippingDetails = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.put(`${Config.END_POINT_LIST["UPDATE_ORDER_SHIPPING_DEATILS"]}/${param.id}`, {
                Shipper,
                length,
                height,
                breadth,
                weight,
                shippingMethod,
                ShippingStatus,
                departureDate,
                receivedDate,
                receiverName,
                receiverMobile,
                receiverIdentityNo,
                TrackingNumber
            }, { withCredentials: true });

            if (response.data.success) {
                showSuccessMsg("Shipping details Save Successfully ")
                setShippingDetails(response.data.shippingDetails[0]);  // update shipping details
                // Optionally, update other states if necessary
                setShipper(response.data.shippingDetails[0].shipper);
                setLength(response.data.shippingDetails[0].length);
                setWeight(response.data.shippingDetails[0].weight);
                setHeight(response.data.shippingDetails[0].height);
                setBreadth(response.data.shippingDetails[0].breadth);
                setshippingMethod(response.data.shippingDetails[0].shippingMethod);
                setShippingStatus(response.data.shippingDetails[0].shippingStatus);
                setdepartureDate(response.data.shippingDetails[0].departureDate);
                setreceivedDate(response.data.shippingDetails[0].receivedDate);
                setreceiverName(response.data.shippingDetails[0].receiverName);
                setreceiverMobile(response.data.shippingDetails[0].receiverMobile);
                setreceiverIdentityNo(response.data.shippingDetails[0].receiverIdentityNo);
                setTrackingNumber(response.data.shippingDetails[0].TrackingNumber);

            }
        } catch (error) {
            console.error(error);
        }
    };


    console.log("Shipping Details me mila kya kuch", shippingDetails)

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item"><Link to="/admin/order-list" className='text-dark'> Order</Link></li>
                                <li className="breadcrumb-item active">Order Details</li>
                            </ol>
                        </div>
                        <h4 className="page-title"><i className="ri-align-left me-2"></i> Order Details</h4>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            {/* Tab Navigation */}


                            <ul className="nav nav-pills form-wizard-header mb-4" style={{ display: 'flex', overflowX: 'auto' }} role="tablist">
                                <li className="nav-item ">
                                    <a href="#basictab1" data-bs-toggle="tab" data-toggle="tab" className="nav-link rounded-0 py-2 active ">
                                        <i className="mdi mdi-tag-multiple font-18 align-middle me-1"></i>
                                        <span className="d-none d-sm-inline">Order Info</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#basictab2" data-bs-toggle="tab" data-toggle="tab" className="nav-link rounded-0 py-2">
                                        {/* <i className="mdi mdi-currency-inr font-18 align-middle me-1"></i> */}
                                        <i className="ri-contacts-book-3-line font-18 align-middle me-1"></i>
                                        <span className="d-none d-sm-inline">Shipping Details</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#basictab3" data-bs-toggle="tab" data-toggle="tab" className="nav-link rounded-0 py-2">
                                        <i className="ri-sticky-note-fill font-18 align-middle me-1"></i>
                                        <span className="d-none d-sm-inline">Order Note</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#basictab4" data-bs-toggle="tab" data-toggle="tab" className="nav-link rounded-0 py-2">
                                        <i className="ri-money-rupee-circle-fill font-18 align-middle me-1"></i>
                                        <span className="d-none d-sm-inline">Payment Details</span>
                                    </a>
                                </li>
                            </ul>

                            {/* Tab Content */}
                            <div className="tab-content b-0 mb-0">
                                <div className="tab-pane active" id="basictab1">
                                    <div className="row">
                                        <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                                            <div className="mb-3">
                                                <label className="form-label">Order Id</label>
                                                <input type="text" className="form-control" value={getOrderDetails?._id} readOnly />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                                            <div className="mb-3">
                                                <label className="form-label">Order Number</label>
                                                <input type="text" className="form-control" value={getOrderDetails?.OrderNumber} readOnly />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                                            <div className="mb-3">
                                                <label className="form-label">Order Status</label>
                                                <input type="text" className="form-control" value={getOrderDetails?.Status} readOnly />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                                            <div className="mb-3">
                                                <label className="form-label">Customer</label>
                                                <input type="text" className="form-control" value={getOrderDetails?.UserID?.name} readOnly />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                                            <div className="mb-3">
                                                <label className="form-label">Order Date</label>
                                                <input type="text" className="form-control" value={getOrderDetails?.createdAt ? format(new Date(getOrderDetails?.createdAt), 'PPP') : 'N/A'} readOnly />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                                            <div className="mb-3">
                                                <label className="form-label">Order Total</label>
                                                <input type="text" className="form-control" value={`₹${getOrderDetails?.totalOrderPrice}`} readOnly />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="table-responsive">
                                            <table className="table table-striped table-hover">
                                                <thead>
                                                    <tr className="text-light" style={{ backgroundImage: "linear-gradient(to right, #243949 0%, #496b86 100%)", color: "white" }}>
                                                        <th className='text-light fs-5'>Order ID</th>
                                                        <th className='text-light fs-5'>Product Image</th>
                                                        <th className='text-light fs-5'>Product</th>
                                                        <th className='text-light fs-5'>Vendor Name</th>
                                                        <th className='text-light fs-5'>Price</th>
                                                        <th className='text-light fs-5'>Quantity</th>
                                                        <th className='text-light fs-5'>Order Item Total</th>
                                                        <th className='text-light fs-5'>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {getOrderDetails?.products?.map((product, index) => {
                                                        const cartData = JSON.parse(getOrderDetails.cartJsonData[0]);

                                                        const cartItem = cartData.find(item => item.ProductId === product._id);

                                                        return (
                                                            <tr key={product._id}>
                                                                <td>{getOrderDetails?.OrderNumber}</td>
                                                                <td>
                                                                    <img src={`${BASE_URL}/${product.ProductPictures[0]}` || `${BASE_URL}/${product.ProductPictures[0]}`} alt={product.ProductName} width="100" height="100" />
                                                                </td>
                                                                <td>{product.ProductName.slice(0, 20)}...</td>
                                                                <td>{product.VendorId}</td>
                                                                <td>₹{product.Price}</td>
                                                                <td>{cartItem ? cartItem.Quantity : 0}</td>
                                                                {/* <td>₹{product.Price * (cartItem ? cartItem.Quantity : 0)}</td> */}
                                                                <td>₹{product.discountedPrice ? product.discountedPrice : product.Price * (cartItem ? cartItem.Quantity : 0)}</td>
                                                                <td>
                                                                    {/* Add actions if needed */}
                                                                    <Tooltip title="View Details">
                                                                        <IconButton color="primary">
                                                                            <FormatListBulletedIcon />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}


                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                </div>

                                <div className="tab-pane" id="basictab2">
                                    <div className="row">

                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="mb-3">
                                                <label className="form-label">Address Line 1</label>
                                                <input type="text" className="form-control" value={shippingDetails?.AddressID?.addressLine1} readOnly />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="mb-3">
                                                <label className="form-label">Shipping Address</label>
                                                <input type="text" className="form-control" value={getOrderDetails?.UserID?.shippingAddress} readOnly />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                                            <div className="mb-3">
                                                <label className="form-label">Country</label>
                                                <input type="text" className="form-control" value={getOrderDetails?.UserID?.CountryName} readOnly />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                                            <div className="mb-3">
                                                <label className="form-label">State</label>
                                                <input type="text" className="form-control" value={getOrderDetails?.UserID?.StateName} readOnly />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                                            <div className="mb-3">
                                                <label className="form-label">City</label>
                                                <input type="text" className="form-control" value={getOrderDetails?.UserID?.CityName} readOnly />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                                            <div className="mb-3">
                                                <label className="form-label">Postal Code</label>
                                                <input type="text" className="form-control" value={getOrderDetails?.UserID?.PostalCode} readOnly />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                                            <div className="mb-3">
                                                <label className="form-label">Email</label>
                                                <input type="text" className="form-control" value={getOrderDetails?.UserID?.email} readOnly />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-6 col-6">
                                            <div className="mb-3">
                                                <label className="form-label">Mobile</label>
                                                <input type="text" className="form-control" value={getOrderDetails?.UserID?.phone} readOnly />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row shippingItemDetails1">
                                        <form onSubmit={handleShippingDetails}>

                                            <div className="shippingItemDetails">
                                                <h4>Shipping Items Details </h4>
                                                <button className='btn shippingItemDetailsbtn' type='submit'>Save Shipping Info</button>

                                            </div>
                                            <div className="table-responsive">
                                                <table className="table table-striped table-hover">
                                                    <thead>
                                                        <tr
                                                            className="text-light"
                                                            style={{
                                                                backgroundImage: "linear-gradient(to right, #243949 0%, #496b86 100%)",
                                                                color: "white",
                                                                fontWeight: "bold"
                                                            }}
                                                        >
                                                            <th className="text-light">Shipping ID</th>
                                                            <th className="text-light">Product Image</th>
                                                            <th className="text-light">Product Name</th>
                                                            <th className="text-light">Shipper Full Name</th>
                                                            <th className="text-light">Item Shipping Method</th>
                                                            <th className="text-light">Shipping Status</th>
                                                            <th className="text-light">Departure Date</th>
                                                            <th className="text-light">Received Date</th>
                                                            <th className="text-light">Receiver Name</th>
                                                            <th className="text-light">Lenght</th>
                                                            <th className="text-light">Weight</th>
                                                            <th className="text-light">Height</th>
                                                            <th className="text-light">Breadth</th>

                                                            <th className="text-light">Receiver Mobile</th>
                                                            <th className="text-light">Receiver Identity No</th>
                                                            <th className="text-light">Tracking Number</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {getOrderDetails?.products?.map((product, index) => {
                                                            const cartData = JSON.parse(getOrderDetails.cartJsonData[0]);
                                                            const cartItem = cartData.find(item => item.ProductId === product._id);

                                                            return (
                                                                <tr key={product._id} style={{ transition: "all 0.3s ease" }}>
                                                                    <td>{index + 1}</td>
                                                                    <td className="text-center" style={{ width: "150px" }}>
                                                                        <img
                                                                            src={`${BASE_URL}/${product.ProductPictures[0]}` || `${BASE_URL}/${product.ProductPictures[0]}`}
                                                                            alt={product.ProductName}
                                                                            width={100}
                                                                            height="100"
                                                                            className="rounded border shadow-sm"
                                                                        />
                                                                    </td>

                                                                    <td className="text-center" style={{ width: "200px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                                        {product.ProductName.slice(0, 20)}...
                                                                    </td>

                                                                    <td>
                                                                        <select
                                                                            name="Shipper"
                                                                            id=""
                                                                            className="form-control"
                                                                            style={{
                                                                                borderColor: "#496b86",
                                                                                backgroundColor: "#f1f1f1",
                                                                                width: "180px",
                                                                                padding: "0.5rem",
                                                                                fontSize: "1rem",
                                                                            }}
                                                                            onChange={(e) => setShipper(e.target.value)}
                                                                            value={Shipper}


                                                                        >
                                                                            {/* <option selected>Select One</option> */}
                                                                            <option value="Rohan">Rohan</option>
                                                                            <option value="Mohan">Mohan</option>
                                                                            <option value="Raj">Raj</option>
                                                                        </select>
                                                                    </td>
                                                                    <td>
                                                                        <select
                                                                            name="shippingMethod"
                                                                            id=""
                                                                            className="form-control"
                                                                            style={{
                                                                                borderColor: "#496b86",
                                                                                backgroundColor: "#f1f1f1",
                                                                                width: "180px",
                                                                                padding: "0.5rem",
                                                                                fontSize: "1rem",
                                                                            }}
                                                                            onChange={(e) => setshippingMethod(e.target.value)}
                                                                            value={shippingMethod}


                                                                        >
                                                                            {/* <option selected>Select One</option> */}
                                                                            <option value="International Shipping">International Shipping</option>
                                                                            <option value="Flat Rate Shipping">Flat Rate Shipping</option>
                                                                        </select>
                                                                    </td>
                                                                    <td>
                                                                        <select
                                                                            name="ShippingStatus"
                                                                            id=""
                                                                            className="form-control"
                                                                            style={{
                                                                                borderColor: "#496b86",
                                                                                backgroundColor: "#f1f1f1",
                                                                                width: "180px",
                                                                                padding: "0.5rem",
                                                                                fontSize: "1rem",
                                                                            }}
                                                                            onChange={(e) => setShippingStatus(e.target.value)}
                                                                            value={ShippingStatus}


                                                                        >
                                                                            <option value="Active">Active</option>
                                                                            <option value="Pandding">Pandding</option>
                                                                            <option value="Shipped">Shipped</option>
                                                                            <option value="Completed">Completed</option>
                                                                            <option value="Delivered">Delivered</option>
                                                                            <option value="In Progress">In Progress</option>
                                                                            <option value="Return">Return</option>
                                                                        </select>
                                                                    </td>
                                                                    <td>
                                                                        <input
                                                                            type={departureDate ? "text" : "date"}
                                                                            name="departureDate"
                                                                            id=""
                                                                            className="form-control"
                                                                            style={{
                                                                                borderColor: "#496b86",
                                                                                backgroundColor: "#f1f1f1",
                                                                                width: "180px",
                                                                                padding: "0.5rem",
                                                                                fontSize: "1rem",
                                                                            }}
                                                                            onChange={(e) => setdepartureDate(e.target.value)}
                                                                            value={departureDate}
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <input
                                                                            type={receivedDate ? "text" : "date"}
                                                                            name="receivedDate"
                                                                            id=""
                                                                            className="form-control"
                                                                            style={{
                                                                                borderColor: "#496b86",
                                                                                backgroundColor: "#f1f1f1",
                                                                                width: "180px",
                                                                                padding: "0.5rem",
                                                                                fontSize: "1rem",

                                                                            }}
                                                                            onChange={(e) => setreceivedDate(e.target.value)}

                                                                            value={receivedDate}
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <input type="text" name="receiverName" id="" className="form-control" style={{ borderColor: "#496b86", backgroundColor: "#f1f1f1", width: "180px", padding: "0.5rem", fontSize: "1rem", }}
                                                                            onChange={(e) => setreceiverName(e.target.value)}
                                                                            value={receiverName}
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <input type="text" name="length" id="" className="form-control" style={{ borderColor: "#496b86", backgroundColor: "#f1f1f1", width: "180px", padding: "0.5rem", fontSize: "1rem", }}
                                                                            onChange={(e) => setLength(e.target.value)}
                                                                            value={length}
                                                                            placeholder="eg. 0.5cm"
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <input type="text" name="height" id="" className="form-control" style={{ borderColor: "#496b86", backgroundColor: "#f1f1f1", width: "180px", padding: "0.5rem", fontSize: "1rem", }}
                                                                            onChange={(e) => setWeight(e.target.value)}
                                                                            value={weight}
                                                                            placeholder="eg. 0.50kg"
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <input type="text" name="weight" id="" className="form-control" style={{ borderColor: "#496b86", backgroundColor: "#f1f1f1", width: "180px", padding: "0.5rem", fontSize: "1rem", }}
                                                                            onChange={(e) => setHeight(e.target.value)}
                                                                            value={height}
                                                                            placeholder="eg. 0.5cm"
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <input type="text" name="breadth" id="" className="form-control" style={{ borderColor: "#496b86", backgroundColor: "#f1f1f1", width: "180px", padding: "0.5rem", fontSize: "1rem", }}
                                                                            onChange={(e) => setBreadth(e.target.value)}
                                                                            value={breadth}
                                                                            placeholder="eg. 0.5cm"
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <input
                                                                            type="text"
                                                                            name="receiverMobile"
                                                                            id=""
                                                                            className="form-control"
                                                                            style={{
                                                                                borderColor: "#496b86",
                                                                                backgroundColor: "#f1f1f1",
                                                                                width: "180px",
                                                                                padding: "0.5rem",
                                                                                fontSize: "1rem",
                                                                            }}
                                                                            onChange={(e) => setreceiverMobile(e.target.value)}
                                                                            value={receiverMobile}

                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <input
                                                                            type="text"
                                                                            name="receiverIdentityNo"
                                                                            id=""
                                                                            className="form-control"
                                                                            style={{
                                                                                borderColor: "#496b86",
                                                                                backgroundColor: "#f1f1f1",
                                                                                width: "180px",
                                                                                padding: "0.5rem",
                                                                                fontSize: "1rem",
                                                                            }}
                                                                            onChange={(e) => setreceiverIdentityNo(e.target.value)}

                                                                            value={receiverIdentityNo}

                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <input
                                                                            type="text"
                                                                            name="TrackingNumber"
                                                                            id=""
                                                                            className="form-control"
                                                                            style={{
                                                                                borderColor: "#496b86",
                                                                                backgroundColor: "#f1f1f1",
                                                                                width: "180px",
                                                                                padding: "0.5rem",
                                                                                fontSize: "1rem",
                                                                            }}
                                                                            onChange={(e) => setTrackingNumber(e.target.value)}

                                                                            value={TrackingNumber}

                                                                        />
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </form>



                                    </div>
                                </div>


                                <div className="tab-pane" id="basictab3">
                                    <div className="row">
                                        <div className="comment-box">
                                            <div className="comment">
                                                <div className="avatarmessage">DR</div>
                                                <div className="comment-content">
                                                    <div className="comment-name">{getOrderDetails?.UserID?.name} {getOrderDetails?.UserID?.lname}</div>
                                                    <div className="comment-text">{getOrderDetails?.OrderNote} </div>
                                                </div>
                                                <div className="comment-date me-2">{getOrderDetails?.createdAt ? format(new Date(getOrderDetails?.createdAt), 'PPP') : 'N/A'} </div> <br />
                                                <i className="ri-edit-box-line"></i>
                                            </div>
                                            {/* <div className="comment">
                                                <div className="avatarmessage">AA</div>
                                                <div className="comment-content">
                                                    <div className="comment-name">Admin Admin</div>
                                                    <div className="comment-text">okay</div>
                                                </div>
                                                <div className="comment-date">21 Feb, 2025</div>
                                                <img className="edit-icon" src="edit-icon.png" alt="Edit"/>
                                            </div> */}
                                        </div>
                                    </div>

                                </div>


                                <div className="tab-pane" id="basictab4">

                                    <div className="row">
                                        <div className="table-responsive">
                                            <table className="table table-striped table-hover">
                                                <thead>
                                                    <tr className="text-light" style={{ backgroundImage: "linear-gradient(to right, #243949 0%, #496b86 100%)", color: "white" }}>
                                                        <th className='text-light fs-5'>Payment Method Name</th>
                                                        <th className='text-light fs-5'>Bank Refference ID</th>
                                                        <th className='text-light fs-5'>Mileston Value</th>
                                                        <th className='text-light fs-5'>Payment Date</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {getOrderDetails?.products?.slice(0, 1).map((product, index) => {
                                                        const cartData = JSON.parse(getOrderDetails.cartJsonData[0]);

                                                        const cartItem = cartData.find(item => item.ProductId === product._id);

                                                        return (
                                                            <tr key={product._id}>
                                                                <td>{getOrderDetails?.paymentDetails[0].name}</td>
                                                                <td>{getOrderDetails?.bank_ref_num ? getOrderDetails?.bank_ref_num : "Milestone 1"}</td>

                                                                <td>₹ {getOrderDetails?.totalOrderPrice}</td>
                                                                <td>{getOrderDetails?.createdAt ? format(new Date(getOrderDetails?.createdAt), 'PPP') : 'N/A'}</td>

                                                            </tr>
                                                        );
                                                    })}


                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                </div>

                            </div>

                            {/* Save and Reset Buttons */}
                            {/* <div className="row mt-4">
                                    <div className="col-sm-12 text-end">
                                        <button type="submit" className="btn btn-success">
                                            Save Changes
                                        </button>
                                    </div>
                                </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
