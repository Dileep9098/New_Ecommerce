import { useEffect, useState } from "react";
import axiosInstance from "../../ApiHendler/axiosInstance";
import Config from "../../Config/Config";
import { showErrorMsg, showInfoMsg, showSuccessMsg } from "../../utils/ShowMessages";
import { format } from 'date-fns';
import "./orderHistory.css"
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import AutoCurrencyPrice from "../CurrencyConvetor/AutoCurrencyPrice";

export default function ProfileOrderDetails() {
    const { user, error, isLoading, isAuthentication } = useSelector((state) => state.auth)

    const [allOrders, setAllOrders] = useState([]);
    const [displayedOrders, setDisplayedOrders] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const loadMoreOrders = () => {
        setDisplayedOrders(displayedOrders + 10); // Load 10 more orders
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleStatusChange = (e) => {
        setStatusFilter(e.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!user?._id) return; // Prevent calling API with empty user

            try {
                const response = await axiosInstance.post(
                    Config.END_POINT_LIST["GET_ALL_MY_ORDERS"],
                    { UserID: user._id },
                    { withCredentials: true }
                );
                if (response.data.success) {
                    setAllOrders(response.data.orders);
                } else {
                    showErrorMsg(response.data.message);
                }
            } catch (error) {
                showErrorMsg(error.response?.data?.message || "Failed to load orders");
                console.error(error);
            }
        };

        fetchData();
    }, [user]);


    // Filtering orders based on search query and status filter
    const filteredOrders = allOrders.filter(order => {
        const matchesSearch = (order.OrderNumber || order.PaymentMethod?.toLowerCase() || '').includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter ?
            (order.Status?.toLowerCase() === statusFilter.toLowerCase() ||
                order.PaymentMethod?.toLowerCase() === statusFilter.toLowerCase())
            : true;

        return matchesSearch && matchesStatus;
    });

    const totalFilterOrder = filteredOrders.length;
    // console.log("Count Kya hai", totalFilterOrder);

    const getBadgeClass = (status) => {
        switch (status) {
            case 'Active':
                return 'bg-light-info text-dark-info';
            case 'Pandding': // Typo hai — "Pending" hona chahiye 😅
                return 'bg-light-secondary text-dark-secondary';
            case 'Shipped':
                return 'bg-light-primary text-dark-primary';
            case 'Completed':
                return 'bg-light-success text-dark-success';
            case 'Delivered':
                return 'bg-light-success text-dark-success';
            case 'In Progress':
                return 'bg-light-warning text-dark-warning';
            case 'Refund':
                return 'bg-light-danger text-dark-danger';
            case 'Return':
                return 'bg-light-danger text-dark-danger';
            default:
                return 'bg-light-secondary text-dark-secondary';
        }

    }
    const handleDelete = async (id) => {
        // Ensure 'id' and 'order._id' are of the same type (if needed)
        const filteredOrders = allOrders.filter(order => order._id == id); // use == for loose comparison if necessary

        if (filteredOrders.length > 0) {
            console.log("Delete", filteredOrders);

            // Check order status
            if (filteredOrders[0].Status === "Delivered" || filteredOrders[0].Status === "Completed") {
                console.log("You can delete the order");

                try {
                    // Send DELETE request with the order ID in the body
                    const response = await axiosInstance.delete(Config.END_POINT_LIST["DELETE_MY_ORDERS"], {
                        data: { id },  // Make sure you send id as part of the data object in the body
                        withCredentials: true
                    });

                    console.log("Response from deleting order:", response);

                    // Update the state to remove the deleted order from the list
                    if (response.data.success) {
                        setAllOrders(allOrders.filter(order => order._id !== id));  // Remove the deleted order from the state
                        showSuccessMsg("Order deleted successfully.");
                    } else {
                        showErrorMsg(response.data.message || "Failed to delete the order.");
                    }
                } catch (error) {
                    console.error("Error while deleting the order:", error);
                    showErrorMsg("An error occurred while deleting the order.");
                }
            } else {
                // Show a message if the order cannot be deleted
                showInfoMsg('Order not delivered.\nYou can only cancel this');
            }
        } else {
            console.log("Order not found");
        }
    };
    return (
        <>
            <div className=" ">
                <h2 className="mb-6">Your Orders</h2>

                <section className="mt-4">
                    <div className="container">
                        {/* Search and Filter Section */}
                        <div className="row mb-2">
                            <div className="col-xl-8">
                                <form className="row gy-2 gx-2 align-items-center justify-content-xl-start justify-content-between">
                                    <div className="col-auto d-none d-md-block">
                                        <label htmlFor="searchInput" className="visually-hidden">Search</label>
                                        <input
                                            type="search"
                                            className="form-control"
                                            id="searchInput"
                                            placeholder="Search by Order ID..."
                                            value={searchQuery}
                                            onChange={handleSearch}
                                        />
                                    </div>
                                    <div className="col-auto">
                                        <div className="d-flex align-items-center">
                                            <label htmlFor="status-select" className="me-2">Status</label>
                                            <select
                                                className="form-select"
                                                id="status-select"
                                                value={statusFilter}
                                                onChange={handleStatusChange}
                                            >
                                                <option value="">Choose...</option>
                                                <option value="Payment failed">Payment failed</option>
                                                <option value="2">Cash on Delivery</option>
                                                <option value="7">PayU</option>
                                                <option value="Active">Active</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Return">Return</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Delivered">Delivered</option>
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Order Table Section */}
                        <div className="table-responsive">
                            <table className="table table-centered table-nowrap mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Date</th>
                                        <th>Payment Status</th>
                                        <th>Total</th>
                                        <th>Payment Method</th>
                                        <th>Order Status</th>
                                        <th style={{ width: '125px' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.slice(0, displayedOrders).map((order, index) => (
                                        <tr key={index}>
                                            <td><Link to={`/order-details/${order?.OrderNumber}`} className="text-body fw-bold">{order?.OrderNumber ? order?.OrderNumber : "N/A"}</Link></td>
                                            <td>
                                                {order?.createdAt ? (
                                                    <>
                                                        <div>{format(new Date(order?.createdAt), 'PPP')}</div>
                                                        <small className="text-muted">
                                                            {format(new Date(order?.createdAt), 'hh:mm a')}
                                                        </small>
                                                    </>
                                                ) : (
                                                    'N/A'
                                                )}
                                            </td>
                                            <td>
                                                <h5>
                                                    <span className={`badge ${order.PaymentMethod == '7' ? 'bg-primary' : 'bg-warning'}`}>
                                                        <i className="mdi mdi-bitcoin"></i> {order.PaymentMethod == '7' ? "Paid" : "Pending"}
                                                    </span>
                                                </h5>
                                            </td>
                                            {/* <td>&#8377;{order?.totalOrderPrice}</td> */}
                                            <td><AutoCurrencyPrice Price={order?.totalOrderPrice} /></td>
                                            <td>
                                                {order?.PaymentMethod == "2" ? "Cash on Delivery" :
                                                    order?.PaymentMethod == "7" ? "PayU" : "N/A"}
                                            </td>
                                            <td>
                                                <h5>
                                                    <span className={`badge ${getBadgeClass(order?.Status)}`}>
                                                        {order?.Status}
                                                    </span>
                                                </h5>
                                            </td>
                                            <td>
                                                <div className="d-flex">

                                                <Link to={`/single-order-details/${order._id}`} className="action-icon me-2 viewOrderDetails">

                                                    <div className="viewOrderDetails">

                                                        <i class="fa-solid fa-eye"></i>
                                                    </div>
                                                </Link>
                                                {/* <Link to="#" className="action-icon"> <i className="mdi mdi-square-edit-outline"></i></Link> */}
                                                <Link to="#" onClick={() => handleDelete(order._id)}
                                                    className="action-icon ">
                                                    <div className="deleteOrderDetails">
                                                        <i class="fa-solid fa-trash "></i>
                                                    </div>
                                                </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* Total Orders Count */}
                        </div>
                        {filteredOrders.length > 0 && (
                            <div className="total-orders-count">
                                <p>Total Orders: {totalFilterOrder}</p>
                            </div>
                        )}

                        {/* Show "No Orders Found" Message */}
                        {totalFilterOrder === 0 && (
                            <div className="text-center mt-4">
                                <img src="/assets/img/empty-search.jpg" alt="No Orders Found" style={{ width: '200px' }} />
                                <p>No Orders Found</p>
                            </div>
                        )}

                        {/* Load More Button */}
                        {filteredOrders.length > displayedOrders && (
                            <div className="text-center mt-4">
                                <button onClick={loadMoreOrders} className="btn btn-light viewMore mb-3">Load More Orders</button>
                            </div>
                        )}


                    </div>
                </section>
            </div>
        </>

    )
}
