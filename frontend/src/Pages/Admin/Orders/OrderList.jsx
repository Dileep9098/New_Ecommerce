
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../ApiHendler/axiosInstance';
import Config from '../../../Config/Config';
import { showErrorMsg } from '../../../utils/ShowMessages';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';


export default function OrderList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [allOrders, setAllOrders] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(Config.END_POINT_LIST["GET_ALL_ORDERS"], { withCredentials: true });
                console.log('API Response:', response);

                if (response.data.success) {
                    setAllOrders(response.data.orders);
                    console.log("Updated orders state:", response.data.orders);
                } else {
                    showErrorMsg(response.data.message);
                }
            } catch (error) {
                console.log('Error:', error);
                showErrorMsg(error.response?.data?.message || 'An error occurred');
            }
        };

        fetchData();
    }, []);


    const filteredCategories = (allOrders || []).filter(order =>
        order.createdAt && order.createdAt.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);



    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box">
                            <div className="page-title-right">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="#" className='text-primary'> Order List</Link></li>
                                    <li className="breadcrumb-item active">Order List</li>
                                </ol>
                            </div>
                            <h4 className="page-title"><i className="ri-align-left me-2"></i>Order List</h4>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row mb-2">
                                    <div className="col">
                                        <div className="text-sm-end">
                                            <button type="button" className="btn btn-light mb-2 me-1">Import</button>
                                            <button type="button" className="btn btn-light mb-2">Export</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12 categoriesTable mb-3">
                                        <h3>Order List</h3>
                                        <input
                                            type="text"
                                            style={{ float: "right", border: "2px solid gray", color: "black", fontStyle: "italic" }}
                                            className="form-control mb-3 w-25 "
                                            placeholder="Search orders.."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                                                            </div>

                                        <div className="table-responsive">
                                            <table className="table table-striped table-hover">
                                                <thead>
                                                    <tr className="text-light" style={{ backgroundImage: "linear-gradient(to right, #243949 0%, #496b86 100%)", color: "white" }}>
                                                        <th className='text-light fs-5'>Order #</th>
                                                        <th className='text-light fs-5'>Order No</th>
                                                        <th className='text-light fs-5'>Status</th>
                                                        <th className='text-light fs-5'>Customer</th>
                                                        <th className='text-light fs-5'>Created On</th>
                                                        <th className='text-light fs-5'>Order Total</th>
                                                        <th className='text-light fs-5'>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentItems.map((order, index) => (
                                                        <tr key={order._id}>
                                                            <td>{index + 1}</td>
                                                            <td>{order.OrderNumber || 'N/A'}</td> {/* Display N/A if empty */}
                                                            <td>
                                                                <span
                                                                    style={{
                                                                        backgroundColor:
                                                                            order.Status === 'Active' ? '#66bb6a' :
                                                                                order.Status === 'Pending' ? '#ff9800' :
                                                                                    order.Status === 'Shipped' ? '#2196f3' :
                                                                                        order.Status === 'Completed' ? '#4caf50' :
                                                                                            order.Status === 'In Progress' ? '#ffeb3b' :
                                                                                                order.Status === 'Refunded' ? '#f44336' :
                                                                                                    order.Status === 'Returned' ? '#9c27b0' :
                                                                                                        '#03a9f4', // Default color
                                                                        color: "white",
                                                                        padding: '3px 10px',
                                                                        borderRadius: '5px',
                                                                        textAlign: 'center',
                                                                        fontSize: "12px"
                                                                    }}
                                                                >
                                                                    {order.Status}
                                                                </span>
                                                            </td>

                                                            <td>{[order.UserID?.name, " ", order.UserID?.lname] || 'Unknown'}</td> {/* Check for missing name */}
                                                            <td>{order.createdAt ? format(new Date(order.createdAt), 'PPP') : 'N/A'}</td>
                                                            <td>&#8377; {order.totalOrderPrice || '0'}</td> {/* Display 0 if price is missing */}
                                                            <td>
                                                                <Link to={`/admin/order-details/${order._id}`} className='' style={{ color: "rgb(0, 0, 88)", fontSize: "18px" }}>
                                                                    <i class="fa-solid fa-eye me-2"></i>
                                                                    <span style={{ color: "rgb(0, 0, 88)", fontWeight: "600", marginTop: "-10px" }}>View</span>
                                                                </Link>
                                                                {/* <div className="dropdown dropdownAction">
                                                                        <Tooltip title="Action" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                                                                            <IconButton>
                                                                                <FormatListBulletedIcon />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                        <div className="dropdown-menu dropdown-menu-end">
                                                                            <Link to="#" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal2" >
                                                                                <i className="mdi mdi-square-edit-outline me-1"></i> Edit
                                                                            </Link>
                                                                            <Link className="dropdown-item" >
                                                                                <i className="mdi mdi-delete me-1"></i> Delete
                                                                            </Link>
                                                                        </div>
                                                                    </div> */}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>

                                            </table>
                                        </div>
                                        {/* Pagination */}
                                        <nav aria-label="Page navigation">
                                            <ul className="pagination justify-content-center">
                                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                    <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>&laquo;</button>
                                                </li>
                                                {[...Array(totalPages)].map((_, index) => (
                                                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                                        <button className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                                                    </li>
                                                ))}
                                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                                    <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>&raquo;</button>
                                                </li>
                                            </ul>
                                        </nav>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
