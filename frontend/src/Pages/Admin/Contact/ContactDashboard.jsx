
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import "../Category/category.css";
import axiosInstance from '../../../ApiHendler/axiosInstance';
import Config from '../../../Config/Config';
import { showErrorMsg, showSuccessMsg } from '../../../utils/ShowMessages';

export default function ContactDashboard() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [allContact, setAllContact] = useState([])

    useEffect(() => {

        const fatchData = async () => {
            try {
                //   debugger
                const response = await axiosInstance.get(Config.END_POINT_LIST["GET_ALL_CONTACT"], { withCredentials: true })
                // console.log(response)

                if (response.data.success) {
                    setAllContact(response.data.contactionList)
                }
                else {
                    showErrorMsg(response.data.message)
                }
            } catch (error) {
                showErrorMsg(error.response.data.message);

            }
        }

        fatchData();

    }, []);

    const handleDelete = async (id) => {
        try {
            //   debugger
            const response = await axiosInstance.delete(`${Config.END_POINT_LIST["DELETE_CONTACT"]}/${id}`, { withCredentials: true })
            // console.log(response)

            if (response.data.success) {
                showSuccessMsg(response.data.message)
                setAllContact((prevState) => prevState.filter((contactDetails) => contactDetails._id !== id));
            }
            else {
                showErrorMsg(response.data.message)
            }
        } catch (error) {
            showErrorMsg(error.response.data.message);

        }

    };

    const filteredContactList = (allContact || []).filter(contactDetails =>
        contactDetails.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredContactList.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredContactList.length / itemsPerPage);


    // Example for exporting to CSV
    const handleExport = () => {
        debugger
        const ws = XLSX.utils.json_to_sheet(allContact);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Contact Details");
        XLSX.writeFile(wb, "contact_details.xlsx");
    };

    return (
        <>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box">
                            <div className="page-title-right">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="#" className='text-primary'> Contact List</Link></li>
                                    <li className="breadcrumb-item active">Contact List</li>
                                </ol>
                            </div>
                            <h4 className="page-title"><i className="ri-align-left me-2"></i>Contact List</h4>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row mb-2">

                                    <div className="text-sm-end">
                                        <button type="button" className="btn btn-light mb-2 me-1">Import</button>
                                        <button type="button" className="btn btn-light mb-2" onClick={handleExport}>Export</button>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12 categoriesTable mb-3">
                                        <h3>Contact List</h3>
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
                                                        <th className='text-light fs-5'>Email</th>
                                                        <th className='text-light fs-5'>Phone</th>
                                                        <th className='text-light fs-5'>Subject</th>
                                                        <th className='text-light fs-5'>Message</th>
                                                        <th className='text-light fs-5'>CreateAt</th>
                                                        <th className='text-light fs-5'>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentItems.length > 0
                                                        ?
                                                        <>
                                                            {currentItems.map((contactDetails, index) => (
                                                                <tr key={contactDetails._id}>
                                                                    <td>{index + 1}</td>

                                                                    <td>{contactDetails.name}</td>
                                                                    <td>{contactDetails.email}</td>
                                                                    <td>{contactDetails.phone}</td>
                                                                    <td>{contactDetails.subject}</td>
                                                                    <td>{contactDetails.message}</td>

                                                                    <td>{contactDetails.createdAt ? format(new Date(contactDetails.createdAt), 'PPP') : 'N/A'}</td>


                                                                    <td>
                                                                        <div className="dropdown dropdownAction">
                                                                            <Tooltip title="Action" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                <IconButton>
                                                                                    <FormatListBulletedIcon />
                                                                                </IconButton>
                                                                            </Tooltip>
                                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                                <Link className="dropdown-item" onClick={() => handleDelete(contactDetails._id)}> <i className="mdi mdi-delete me-1"></i> Delete</Link>
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




        </>
    );
}
