

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import Loader from '../../Loader/Loader';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import "../Category/category.css";

import axiosInstance from '../../../ApiHendler/axiosInstance';
import Config from '../../../Config/Config';
import { showErrorMsg, showSuccessMsg } from '../../../utils/ShowMessages';

export default function Manufactures() {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [displaySeqNo, setDisplaySeqNo] = useState('');
    const [IsActive, setIsActive] = useState('');
    const [getId, setGetId] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [allMenufactures, setAllMenufactures] = useState([])

    useEffect(() => {

        const fatchData = async () => {
            try {
                //   debugger
                const response = await axiosInstance.get(Config.END_POINT_LIST["GET_ALL_MENUFACTURES"], { withCredentials: true })
                // console.log(response)

                if (response.data.success) {
                    setAllMenufactures(response.data.menufactures)
                    //   dispatch(getAllSubCategory())
                }
                else {
                    showErrorMsg(response.data.message)
                }
            } catch (error) {
                showErrorMsg(error.response.data.message);

            }
        }

        fatchData();


        console.log("All Menufacturs me kya", allMenufactures)

    }, [dispatch]);

    const handleMenufatures = async (e) => {
        e.preventDefault();

        try {
            //   debugger
            const response = await axiosInstance.post(Config.END_POINT_LIST["ADD_MENUFATURES"], { IsActive, name, displaySeqNo ,address}, { withCredentials: true })
            // console.log(response)

            if (response.data.success) {
                showSuccessMsg(response.data.message)
                //   dispatch(getAllSubCategory())
            }
            else {
                showErrorMsg(response.data.message)
            }
        } catch (error) {
            showErrorMsg(error.response.data.message);

        }

    };

    const handleDelete = async (id) => {
        try {
            //   debugger
            const response = await axiosInstance.delete(`${Config.END_POINT_LIST["DELETE_MENUFACTURES"]}/${id}`, { withCredentials: true })
            // console.log(response)

            if (response.data.success) {
                showSuccessMsg(response.data.message)
                setAllMenufactures((prevState) => prevState.filter((category) => category._id !== id));
            }
            else {
                showErrorMsg(response.data.message)
            }
        } catch (error) {
            showErrorMsg(error.response.data.message);

        }

    };

    // debugger
    const handleEdit = async (id) => {
        console.log(id)
        setGetId(id)

        try {
            const category = allMenufactures.find(category => category._id === id);
            //  debugger
            if (category) {
                setName(category.name);
                setAddress(category.address?category.address:"");
                setIsActive(category.IsActive);
                setDisplaySeqNo(category.displaySeqNo);
            }

        } catch (error) {
            console.log(error);
        }
    };

    const handelEditManufactures = async (e) => {
        e.preventDefault();
        try {
            //   debugger
            const response = await axiosInstance.put(`${Config.END_POINT_LIST["UPDATE_MENUFACTURES"]}/${getId}`, { IsActive, name, displaySeqNo,address }, { withCredentials: true })
            // console.log(response)

            if (response.data.success) {
                showSuccessMsg(response.data.message)
                setAllMenufactures((prevState) =>
                    prevState.map((category) =>
                        category._id === getId
                            ? { ...category, name, IsActive, displaySeqNo,address } 
                            : category
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

    const filteredCategories = (allMenufactures || []).filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                                    <li className="breadcrumb-item"><Link to="#" className='text-primary'> Manufactures</Link></li>
                                    <li className="breadcrumb-item active">Manufactures</li>
                                </ol>
                            </div>
                            <h4 className="page-title"><i className="ri-align-left me-2"></i>Manufactures</h4>
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
                                            <button type="button" className="btn btn-light mb-2">Export</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12 categoriesTable mb-3">
                                        <h3>Manufactures</h3>
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

                                                        <th className='text-light fs-5'>ID</th>
                                                        <th className='text-light fs-5'>Name</th>
                                                        <th className='text-light fs-5'>Address</th>
                                                        <th className='text-light fs-5'>Status</th>
                                                        <th className='text-light fs-5'>CreateAt</th>
                                                        <th className='text-light fs-5'>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentItems.map((category, index) => (
                                                        <tr key={category._id}>
                                                            <td>{index + 1}</td>

                                                            <td>{category.name}</td>
                                                            <td>{category.address??"N/A"}</td>
                                                            <td ><span style={{ backgroundColor: category.IsActive === "true" ? '#66bb6a' : '#03a9f4', color: "white", padding: '3px 10px', borderRadius: '5px', textAlign: 'center', fontSize: "12px" }}>{category.IsActive === 'true' ? "Active" : "InActive"}</span></td>
                                                            <td>{category.createdAt ? format(new Date(category.createdAt), 'PPP') : 'N/A'}</td>


                                                            <td>
                                                                <div className="dropdown dropdownAction">
                                                                    <Tooltip title="Action" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                                                                        <IconButton>
                                                                            <FormatListBulletedIcon />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                    <div className="dropdown-menu dropdown-menu-end">

                                                                        <Link to="#" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() => handleEdit(category._id)} > <i className="mdi mdi-square-edit-outline me-1"  ></i> Edit</Link>
                                                                        <Link className="dropdown-item" onClick={() => handleDelete(category._id)}> <i className="mdi mdi-delete me-1"></i> Delete</Link>
                                                                    </div>
                                                                </div>
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


            {/* Add Category Modal */}
            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Menufactures </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleMenufatures}>
                                <div className="row mb-2">
                                    <div className="col-lg-6">
                                        <label htmlFor="" className=''>Manufacturer Name :</label>
                                        <input type="text" className="form-control" placeholder="Enter Manufacturer Name " name="name" onChange={(e) => setName(e.target.value)} value={name} />
                                    </div>
                                    <div className="col-lg-6">
                                        <label for="example-multiselect1" className="form-label">Is Active :</label>
                                        <select id="example-multiselect1" className="form-control" name="IsActive" onChange={(e) => setIsActive(e.target.value)} >
                                            <option value="" selected>Select One</option>
                                            <option value="true"> Active</option>
                                            <option value="false">In Active</option>

                                        </select>
                                    </div>
                                    <div className="col-lg-6 mt-2">
                                        <label htmlFor="" className='Display Seq No'>Display Seq No  :</label>
                                        <input type="number" className="form-control" placeholder="Display Seq No " name="displaySeqNo" onChange={(e) => setDisplaySeqNo(e.target.value)} value={displaySeqNo} />
                                    </div>
                                    <div className="col-lg-6 mt-2">
                                        <label htmlFor="" className='Address'>Address  :</label>
                                        <input type="text" className="form-control" placeholder="Address " name="address" onChange={(e) => setAddress(e.target.value)} value={address} />
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

            <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Menufactures </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handelEditManufactures}>
                                <div className="row mb-2">
                                    <div className="col-lg-6">
                                        <label htmlFor="" className=''>Manufacturer Name :</label>
                                        <input type="text" className="form-control" placeholder="Enter Manufacturer Name " name="name" onChange={(e) => setName(e.target.value)} value={name} />
                                    </div>
                                    <div className="col-lg-6">
                                        <label for="example-multiselect1" className="form-label">Is Active :</label>
                                        <select id="example-multiselect1" className="form-control" name="IsActive" onChange={(e) => setIsActive(e.target.value)} value={IsActive} >
                                            <option value="" selected>Select One</option>
                                            <option value="true"> Active</option>
                                            <option value="false">In Active</option>

                                        </select>
                                    </div>
                                    <div className="col-lg-6 mt-2">
                                        <label htmlFor="" className='Display Seq No'>Display Seq No  :</label>
                                        <input type="number" className="form-control" placeholder="Display Seq No " name="displaySeqNo" onChange={(e) => setDisplaySeqNo(e.target.value)} value={displaySeqNo} />
                                    </div>
                                    <div className="col-lg-6 mt-2">
                                        <label htmlFor="" className='Address'>Address  :</label>
                                        <input type="text" className="form-control" placeholder="Address " name="address" onChange={(e) => setAddress(e.target.value)} value={address} />
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
