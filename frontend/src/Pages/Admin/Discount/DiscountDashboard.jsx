import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { format, set } from 'date-fns';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import "../Category/category.css";
import * as XLSX from "xlsx"
import axiosInstance from '../../../ApiHendler/axiosInstance';
import Config from '../../../Config/Config';
import { showErrorMsg, showSuccessMsg } from '../../../utils/ShowMessages';

export default function DiscountDashboard() {
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [DiscountType, setDiscountType] = useState('')
    const [DiscountValueType, setDiscountValueType] = useState('')
    const [DiscountValue, setDiscountValue] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [IsActive, setIsActive] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [maxQuantity, setMaxQuantity] = useState('');

    const [getId, setGetId] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [allDiscountDetails, setAllDiscountDetails] = useState([])



    // Example for exporting to CSV
    const handleExport = () => {
        const ws = XLSX.utils.json_to_sheet(allDiscountDetails);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Discount Details");
        XLSX.writeFile(wb, "discount_details.xlsx");
    };


    useEffect(() => {

        const fatchData = async () => {
            try {
                const response = await axiosInstance.get(Config.END_POINT_LIST["GET_ALL_DISCOUNT_DETAILS"], { withCredentials: true })
                // console.log(response)

                if (response.data.success) {
                    setAllDiscountDetails(response.data.discountDetails)
                }
                else {
                    showErrorMsg(response.data.message)
                }
            } catch (error) {
                showErrorMsg(error.response.data.message);
            }
        }
        fatchData();

        console.log("All discountDetails me kya", allDiscountDetails)

    }, [dispatch]);






    const handleDiscout = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post(Config.END_POINT_LIST["ADD_DISCOUNT_DETAILS"], {
                IsActive, title, DiscountType, DiscountValue, DiscountValueType, couponCode, maxQuantity, startDate, endDate
            }, { withCredentials: true });

            if (response.data.success) {
                showSuccessMsg(response.data.message);

                setAllDiscountDetails(prevState => [
                    ...prevState,
                    {
                        ...response.data.discountDetails, // Assuming you get the full discount details back
                        IsActive, title, DiscountType, DiscountValue, DiscountValueType, couponCode, maxQuantity, startDate, endDate
                    }
                ]);
            } else {
                showErrorMsg(response.data.message);
            }
        } catch (error) {
            showErrorMsg(error.response.data.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            //   debugger
            const response = await axiosInstance.delete(`${Config.END_POINT_LIST["DELETE_DISCOUNT_DETAILS"]}/${id}`, { withCredentials: true })
            // console.log(response)

            if (response.data.success) {
                showSuccessMsg(response.data.message)
                setAllDiscountDetails((prevState) => prevState.filter((discountDetails) => discountDetails._id !== id));
            }
            else {
                showErrorMsg(response.data.message)
            }
        } catch (error) {
            showErrorMsg(error.response.data.message);

        }

    };
    
    const handleEdit = async (id) => {
        console.log(id)
        setGetId(id)

        try {
            const discountDetails = allDiscountDetails.find(discountDetails => discountDetails._id === id);
            //  debugger
            if (discountDetails) {
                setTitle(discountDetails.title);
                setIsActive(discountDetails.IsActive);
                setDiscountType(discountDetails.DiscountType);
                setDiscountValue(discountDetails.DiscountValue);
                setDiscountValueType(discountDetails.DiscountValueType);
                setCouponCode(discountDetails.couponCode);
                setStartDate(discountDetails.startDate);
                setEndDate(discountDetails.endDate);
                setMaxQuantity(discountDetails.maxQuantity);

            }

        } catch (error) {
            console.log(error);
        }
    };

    const handelEditDisCountDetails = async (e) => {
        e.preventDefault();
        try {
            //   debugger
            const response = await axiosInstance.put(`${Config.END_POINT_LIST["UPDATE_DISCOUNT_DETAILS"]}/${getId}`, {
                IsActive, title, DiscountType, DiscountValue, DiscountValueType, couponCode, maxQuantity, startDate, endDate
            }, { withCredentials: true })
            // console.log(response)

            if (response.data.success) {
                showSuccessMsg(response.data.message)
                setAllDiscountDetails((prevState) =>
                    prevState.map((discountDetails) =>
                        discountDetails._id === getId
                            ? { ...discountDetails, IsActive, title, DiscountType, DiscountValue, DiscountValueType, couponCode, maxQuantity, startDate, endDate }
                            : discountDetails
                    )
                );
            }
            else {
                showErrorMsg(response.data.message)
            }
        } catch (error) {
            showErrorMsg(error.response.data.message);

        }

    }

    const filteredDiscounts = (allDiscountDetails || []).filter(discount =>
        discount.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredDiscounts.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredDiscounts.length / itemsPerPage);

    return (
        <>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box">
                            <div className="page-title-right">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="#" className='text-primary'> Discount</Link></li>
                                    <li className="breadcrumb-item active">Discount</li>
                                </ol>
                            </div>
                            <h4 className="page-title"><i className="ri-align-left me-2"></i>Discount</h4>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row mb-2">
                                    <div className="col-sm-5">
                                        <div className="dropdown dropdownAction">
                                            <Button variant="contained" endIcon={<AddIcon />} data-bs-toggle="modal" data-bs-target="#exampleModal1">
                                                Add New
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="col-sm-7">
                                        <div className="text-sm-end">
                                            <button type="button" className="btn btn-light mb-2 me-1">Import</button>
                                            <button type="button" className="btn btn-light mb-2" onClick={handleExport}>Export</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12 categoriesTable mb-3">
                                        <h3>Discount Details</h3>
                                        <input
                                            type="text"
                                            style={{ float: "right", border: "2px solid gray", color: "black", fontStyle: "italic" }}
                                            className="form-control mb-3 w-25 "
                                            placeholder="Search manufactures.."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>

                                    <div className="table-responsive">


                                        <table className="table table-striped table-hover">
                                            <thead>
                                                <tr className="text-light" style={{ backgroundImage: "linear-gradient(to right, #243949 0%, #496b86 100%)", color: "white" }}>

                                                    <th className='text-light fs-5'>Sq.No</th>
                                                    <th className='text-light fs-5'>Title</th>
                                                    <th className='text-light fs-5'>Discount Type</th>
                                                    <th className='text-light fs-5'>Discount Value Type</th>
                                                    <th className='text-light fs-5'>Discount Value </th>
                                                    <th className='text-light fs-5'>Start Date</th>
                                                    <th className='text-light fs-5'>End Date</th>
                                                    <th className='text-light fs-5'>Coupon Code</th>
                                                    <th className='text-light fs-5'>Status</th>
                                                    <th className='text-light fs-5'>CreateAt</th>
                                                    <th className='text-light fs-5'>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentItems.length > 0 ?
                                                    <>
                                                        {currentItems.map((discountDetails, index) => (
                                                            <tr key={discountDetails._id}>
                                                                <td>{index + 1}</td>

                                                                <td>{discountDetails.title}</td>
                                                                <td>{discountDetails.DiscountType}</td>
                                                                <td>{discountDetails.DiscountValueType}</td>
                                                                <td>{discountDetails.DiscountValue}</td>
                                                                <td>{discountDetails.startDate ? format(new Date(discountDetails.startDate), 'PPP') : 'N/A'}</td>
                                                                <td>{discountDetails.endDate ? format(new Date(discountDetails.endDate), 'PPP') : 'N/A'}</td>
                                                                <td>{discountDetails.couponCode}</td>
                                                                <td ><span style={{ backgroundColor: discountDetails.IsActive ? '#66bb6a' : '#03a9f4', color: "white", padding: '3px 10px', borderRadius: '5px', textAlign: 'center', fontSize: "12px" }}>{discountDetails.IsActive ? "Active" : "InActive"}</span></td>
                                                                <td>{discountDetails.createdAt ? format(new Date(discountDetails.createdAt), 'PPP') : 'N/A'}</td>


                                                                <td>
                                                                    <div className="dropdown dropdownAction">
                                                                        <Tooltip title="Action" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                                                                            <IconButton>
                                                                                <FormatListBulletedIcon />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                        <div className="dropdown-menu dropdown-menu-end">

                                                                            <Link to="#" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() => handleEdit(discountDetails._id)}  > <i className="mdi mdi-square-edit-outline me-1"  ></i> Edit</Link>
                                                                            <Link className="dropdown-item" onClick={() => handleDelete(discountDetails._id)} > <i className="mdi mdi-delete me-1"></i> Delete</Link>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </>
                                                    :
                                                    <div className="">
                                                        <p style={{ fontSize: "20px", fontStyle: "italic", fontWeight: "600", color: "#00263e" }}>Data Not Found !!</p>
                                                    </div>
                                                }
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


            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Discount Details </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleDiscout}>
                                <div className="row mb-2">
                                    <div className="col-lg-6 mb-2">
                                        <label htmlFor="" className=''>Title :</label>
                                        <input type="text" className="form-control" placeholder="Enter Manufacturer Name " name="title" onChange={(e) => setTitle(e.target.value)} value={title} />
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <label for="example-multiselect1" className="form-label">Discount Type :</label>
                                        <select id="example-multiselect1" className="form-control" name="DiscountType" onChange={(e) => setDiscountType(e.target.value)} >
                                            <option value="" selected>Select a Discount Type</option>
                                            <option value=" Apply on products"> Apply on products</option>
                                            <option value="Apply on category"> Apply on category</option>
                                            <option value="Apply on total order">Apply on total order</option>

                                        </select>
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <label for="example-multiselect1" className="form-label">Discount Value Type :</label>
                                        <select id="example-multiselect1" className="form-control" name="DiscountValueType" onChange={(e) => setDiscountValueType(e.target.value)} >
                                            <option value="" selected>Select One</option>
                                            <option value="Fixed Value"> Fixed Value</option>
                                            <option value="Percantage value">Percantage value</option>

                                        </select>
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <label htmlFor="" className=''>Discount Value :</label>
                                        <input type="number" className="form-control" placeholder="Enter Discount Value " name="DiscountValue" onChange={(e) => setDiscountValue(e.target.value)} value={DiscountValue} />
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <label htmlFor="" className=''>Start Date :</label>
                                        <input type="datetime-local" className="form-control" name="startDate" onChange={(e) => setStartDate(e.target.value)} value={startDate} />
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <label htmlFor="" className=''>End Date :</label>
                                        <input type="datetime-local" className="form-control" name="endDate" onChange={(e) => setEndDate(e.target.value)} value={endDate} />
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <label htmlFor="" className=''>Coupon Code :</label>
                                        <input type="text" className="form-control" name="couponCode" onChange={(e) => setCouponCode(e.target.value)} value={couponCode} />
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <label htmlFor="" className=''>Max Quantity :</label>
                                        <input type="number" className="form-control" name="maxQuantity" onChange={(e) => setMaxQuantity(e.target.value)} value={maxQuantity} />
                                    </div>

                                    <div className="col-lg-6 mb-2">
                                        <label className="col-form-label" htmlFor="userName">Is Active</label>
                                        <div>
                                            <div className="form-check form-checkbox-info mb-2 fs-3">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="customCheckcolor3"
                                                    name="IsActive"
                                                    onChange={(e) => setIsActive(e.target.checked)}
                                                    checked={IsActive} // Make sure the state controls the checkbox checked state
                                                />
                                            </div>
                                        </div>
                                    </div>



                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Discount Details </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handelEditDisCountDetails}>
                                <div className="row mb-2">
                                    <div className="col-lg-6 mb-2">
                                        <label htmlFor="" className=''>Title :</label>
                                        <input type="text" className="form-control" placeholder="Enter Manufacturer Name " name="title" onChange={(e) => setTitle(e.target.value)} value={title} />
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <label for="example-multiselect1" className="form-label">Discount Type :</label>
                                        <select id="example-multiselect1" className="form-control" name="DiscountType" onChange={(e) => setDiscountType(e.target.value)}
                                            value={DiscountType}>
                                            <option selected >Select a Discount Type</option>
                                            <option value=" Apply on products"> Apply on products</option>
                                            <option value="Apply on category"> Apply on category</option>
                                            <option value="Apply on total order">Apply on total order</option>

                                        </select>
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <label for="example-multiselect1" className="form-label">Discount Value Type :</label>
                                        <select id="example-multiselect1" className="form-control" name="DiscountValueType" onChange={(e) => setDiscountValueType(e.target.value)} value={DiscountValueType}>
                                            <option value="" selected>Select One</option>
                                            <option value="Fixed Value"> Fixed Value</option>
                                            <option value="Percantage value">Percantage value</option>

                                        </select>
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <label htmlFor="" className=''>Discount Value :</label>
                                        <input type="number" className="form-control" placeholder="Enter Discount Value " name="DiscountValue" onChange={(e) => setDiscountValue(e.target.value)} value={DiscountValue} />
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <label htmlFor="" className=''>Start Date :</label>
                                        <input type="datetime-local" className="form-control" name="startDate" onChange={(e) => setStartDate(e.target.value)} value={startDate} />
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <label htmlFor="" className=''>End Date :</label>
                                        <input type="datetime-local" className="form-control" name="endDate" onChange={(e) => setEndDate(e.target.value)} value={endDate} />
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <label htmlFor="" className=''>Coupon Code :</label>
                                        <input type="text" className="form-control" name="couponCode" onChange={(e) => setCouponCode(e.target.value)} value={couponCode} />
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <label htmlFor="" className=''>Max Quantity :</label>
                                        <input type="number" className="form-control" name="maxQuantity" onChange={(e) => setMaxQuantity(e.target.value)} value={maxQuantity} />
                                    </div>

                                    <div className="col-lg-6 mb-2">
                                        <label className="col-form-label" htmlFor="userName">Is Active</label>
                                        <div>
                                            <div className="form-check form-checkbox-info mb-2 fs-3">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="customCheckcolor3"
                                                    name="IsActive"
                                                    onChange={(e) => setIsActive(e.target.checked)}
                                                    checked={IsActive} // Make sure the state controls the checkbox checked state
                                                />
                                            </div>
                                        </div>
                                    </div>



                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}


