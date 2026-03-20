

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { format } from 'date-fns';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar'; // Avatar component from MUI
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import * as XLSX from "xlsx"

import "../Category/category.css"
import axiosInstance from '../../../ApiHendler/axiosInstance';
import Config from '../../../Config/Config';
import { showErrorMsg, showSuccessMsg } from '../../../utils/ShowMessages';;

const BASE_URL = import.meta.env.VITE_IMG_URL;


export default function Compaingns() {


    const [mainTitle, setMainTitle] = useState('')
    const [DiscountTitle, setDiscountTitle] = useState('')
    const [body, setBody] = useState('')
    const [displayStartDate, setDisplayStartDate] = useState()
    const [displayEndDate, setDisplayEndDate] = useState()
    const [IsActive, setIsActive] = useState()
    const [file, setFile] = useState()

    const [allCompaingns, setAllCompaingns] = useState([])
    const [getId, setGetId] = useState()

    const childcolumns = [
        { field: 'id', headerName: 'ID', },
        {
            field: 'avatar', headerName: 'Avatar', renderCell: (params) => (
                <Avatar alt={params.row.Name} src={`${params.row.Image}`} />
            )
        },
        { field: 'mainTitle', headerName: 'Main Title', editable: true },
        { field: 'DiscountTitle', headerName: 'Discount Title', editable: true },
        { field: 'body', headerName: 'Body', editable: true },
        { field: 'displayStartDate', headerName: 'Display Start Date', editable: true, width: 150 },
        { field: 'displayEndDate', headerName: 'Display End Date', editable: true, width: 150 },
        {
            field: 'IsActive', headerName: 'Status', width: 100,
            renderCell: (params) => {
                // Apply inline styles directly here
                const isActive = params.value === "Active";
                return (
                    <div>
                        <span style={{
                            backgroundColor: isActive ? '#66bb6a' : '#03a9f4', // Light green for active, light red for inactive
                            color: "white",
                            padding: '3px 10px',
                            borderRadius: '5px',
                            textAlign: 'center', fontSize: "12px",
                        }}>{params.value}</span>
                    </div>
                );
            },
        },
        { field: 'createAt', headerName: 'CreateAt', editable: true, width: 150 },
        {
            field: 'actions', headerName: 'Actions', width: 150, renderCell: (params) => (
                <div>
                    <Button color="primary" onClick={() => handleEdit(params.row.dataId)} data-bs-toggle="modal" data-bs-target="#exampleModalEdit" data-bs-whatever="@mdo1"><EditIcon /></Button>
                    <Button color="secondary" onClick={() => handleDelete(params.row.dataId)}><DeleteIcon /></Button>
                </div>
            )
        }
    ]
    const childrows = (allCompaingns || []).map((compaigns, index) => ({

        id: index + 1,
        dataId: compaigns._id,
        Image: compaigns.file.url||`${BASE_URL}/${compaigns.file}`,
        mainTitle: compaigns.mainTitle,
        body: compaigns.body,
        DiscountTitle: compaigns.DiscountTitle,
        displayStartDate: compaigns.displayStartDate ? format(new Date(compaigns.displayStartDate), 'PPP') : 'N/A',
        displayEndDate: compaigns.displayEndDate ? format(new Date(compaigns.displayEndDate), 'PPP') : 'N/A',

        IsActive: compaigns.IsActive === "true" ? "Active" : "In Active",
        createAt: compaigns.createdAt ? format(new Date(compaigns.createdAt), 'PPP') : 'N/A',

    }));


    const handleCompaingnsSubmit = async (e) => {
        e.preventDefault();
        console.log(file)
        const myform = new FormData()
        myform.append("mainTitle", mainTitle)
        myform.append("DiscountTitle", DiscountTitle)
        myform.append("displayEndDate", displayEndDate)
        myform.append("displayStartDate", displayStartDate)
        myform.append("body", body)
        myform.append("file", file)
        myform.append("IsActive", IsActive)

        try {
            // debugger
            const response = await axiosInstance.post(Config.END_POINT_LIST["ADD_COMPAINGNS"], myform, { withCredentials: true });
            // console.log(response)

            if (response.data.success) {
                showSuccessMsg(response.data.message);
                //    debugger
                setAllCompaingns(prevState => [
                    ...prevState,
                    {
                        ...response.data.compaigns,
                        IsActive, mainTitle, file: response.data.compaingns.file, DiscountTitle, body, displayEndDate, displayStartDate
                    }
                ]);
            } else {
                showErrorMsg(response.data.message);
            }
        } catch (error) {
            showErrorMsg(error.response.data.message);

        }
    }

    useEffect(() => {

        const fatchData = async () => {
            try {
                //   debugger
                const response = await axiosInstance.get(Config.END_POINT_LIST["GET_ALL_COMPAINGNS"], { withCredentials: true })
                // console.log(response)
                if (response.data.success) {
                    setAllCompaingns(response.data.allCompaingns)
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
            const response = await axiosInstance.delete(`${Config.END_POINT_LIST["DELETE_COMPAINGNS"]}/${id}`, { withCredentials: true })
            // console.log(response)

            if (response.data.success) {
                showSuccessMsg(response.data.message)
                setAllCompaingns((prevState) => prevState.filter((contactDetails) => contactDetails._id !== id));
            }
            else {
                showErrorMsg(response.data.message)
            }
        } catch (error) {
            showErrorMsg(error.response.data.message);

        }

    };

    const handleEdit = (id) => {
        // debugger
        setGetId(id)
        try {
            const compaigns = allCompaingns.find(compaigns => compaigns._id === id);
            if (compaigns) {
                setMainTitle(compaigns.mainTitle)
                setIsActive(compaigns.IsActive)
                setFile(compaigns.file)
                setBody(compaigns.body)
                setDisplayStartDate(compaigns.displayStartDate)
                setDisplayEndDate(compaigns.displayEndDate)
                setDiscountTitle(compaigns.DiscountTitle)
            }

        } catch (error) {
            console.log(error);
        }

    }

    const handleEditCompaingnsSubmit = async (e) => {
        e.preventDefault();
        try {
            const myform = new FormData()
            myform.append("mainTitle", mainTitle)
            myform.append("DiscountTitle", DiscountTitle)
            myform.append("displayEndDate", displayEndDate)
            myform.append("displayStartDate", displayStartDate)
            myform.append("body", body)
            myform.append("IsActive", IsActive)
            if (file) {
                myform.append("file", file)

            }

            const response = await axiosInstance.put(`${Config.END_POINT_LIST["UPDATE_COMPAINGNS"]}/${getId}`, myform, { withCredentials: true })
            // debugger
            if (response.data.success) {
                showSuccessMsg(response.data.message)


                setAllCompaingns((prevState) =>
                    prevState.map((homeBanner) =>
                        homeBanner._id === getId
                            ? { ...homeBanner, IsActive, mainTitle, body, DiscountTitle, displayEndDate, displayStartDate, file: response.data.response.file }
                            : homeBanner
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

    // Example for exporting to CSV
    const handleExport = () => {
        const ws = XLSX.utils.json_to_sheet(allCompaingns);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Home Banner");
        XLSX.writeFile(wb, "homeBanner.xlsx");
    };


//    useEffect(() => {
//     const checkDate = Date.now(); // Current date and time in milliseconds

//     allCompaingns.forEach((item) => {
//         const endDate = new Date(item.displayEndDate).getTime();

//         // Only update if the campaign end date has passed and IsActive is not already "false"
//         if (checkDate > endDate && item.IsActive !== "false") {
//             console.log("End date is in the past, trigger update method");

//             const update = { IsActive: "false" }; // Assuming the update should be an object
//             const updateEndDate = async () => {
//                 try {
//                     const response = await axiosInstance.put(
//                         `${Config.END_POINT_LIST["UPDATE_ISACTIVE_COMPAINGNS"]}/${item._id}`,
//                         update,
//                         { withCredentials: true }
//                     );

//                     if (response.data.success) {
//                         showSuccessMsg(response.data.message);

//                         // Update the local state for the campaign
//                         setAllCompaingns((prevState) =>
//                             prevState.map((homeBanner) =>
//                                 homeBanner._id === item._id
//                                     ? { ...homeBanner, IsActive: "false" } // Mark it as inactive
//                                     : homeBanner
//                             )
//                         );
//                     } else {
//                         showErrorMsg(response.data.message);
//                     }
//                 } catch (error) {
//                     console.error("Error updating campaign:", error);
//                     showErrorMsg("An error occurred while updating the campaign.");
//                 }
//             };

//             updateEndDate(); // Call the async function
//         } else {
//             console.log("Campaign is still active or already inactive");
//         }
//     });
// }, [allCompaingns]);

    

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box">
                            <div className="page-title-right">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="#" className='text-primary'> Compaingns</Link></li>
                                    <li className="breadcrumb-item active">Compaingns</li>
                                </ol>
                            </div>
                            <h4 className="page-title"><i className="ri-align-left me-2"></i>Compaingns</h4>
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
                                            <Tooltip title="Add Compaingns" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                                                <IconButton>
                                                    <Stack direction="row" spacing={2}>
                                                        <Button variant="contained" endIcon={<AddIcon />} data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo1">
                                                            Add Compaingns
                                                        </Button>
                                                    </Stack>
                                                </IconButton>
                                            </Tooltip>

                                        </div>
                                    </div>
                                    <div className="col-sm-7">
                                        <div className="text-sm-end">
                                            {/* <button type="button" className="btn btn-success mb-2 me-1">
                                                <i className="mdi mdi-cog-outline"></i>
                                            </button> */}
                                            <button type="button" className="btn btn-light mb-2 me-1">Import</button>
                                            <button type="button" className="btn btn-light mb-2" onClick={handleExport}>Export</button>
                                        </div>
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col-12 categoriesTable">
                                        <h3>Home Banner </h3>

                                        <Box sx={{ height: 400, width: '100%' }}>
                                            <DataGrid
                                                rows={childrows}
                                                columns={childcolumns}
                                                initialState={{
                                                    pagination: {
                                                        paginationModel: {
                                                            pageSize: 5,
                                                        },
                                                    },
                                                }}
                                                pageSizeOptions={[5]}
                                                // checkboxSelection
                                                disableRowSelectionOnClick
                                            />
                                        </Box>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">New Home Banner</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleCompaingnsSubmit} encType="multipart/form-data">
                                <div className="row mb-2">
                                    <div className="col-lg-6">
                                        <label htmlFor="" className=''> Main Title :</label>
                                        <input type="text" className="form-control" placeholder="Enter Main Title" name="mainTitle" onChange={(e) => setMainTitle(e.target.value)} />

                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="" className=''>  Discount Value :</label>
                                        <input type="text" className="form-control" placeholder="Enter Discount  " name="DiscountTitle" onChange={(e) => setDiscountTitle(e.target.value)} />

                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-12">
                                        <label htmlFor="" className=''> Body :</label>
                                        <input type="text" className="form-control" placeholder="Enter Body Text" name="body" onChange={(e) => setBody(e.target.value)} />
                                    </div>

                                </div>
                                <div className="row mb-2">
                                    <div className="col-lg-6">
                                        <label htmlFor="" className=''> Display Start Date :</label>
                                        <input type="date" className="form-control" name="displayStartDate" onChange={(e) => setDisplayStartDate(e.target.value)} />
                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="" className=''> Display End Date :</label>
                                        <input type="date" className="form-control" name="displayEndDate" onChange={(e) => setDisplayEndDate(e.target.value)} />
                                    </div>

                                </div>
                                <div className="row mb-3">
                                    <div className="col-lg-6">
                                        <label for="example-multiselect1" className="form-label">Is Active :</label>
                                        <select id="example-multiselect1" className="form-control" name="IsActive" onChange={(e) => setIsActive(e.target.value)} >
                                            <option value="" selected>Select One</option>
                                            <option value="true"> Active</option>
                                            <option value="false">In Active</option>

                                        </select>
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="form-label">Image :</label>

                                        <input type="file" className="form-control" name='file' onChange={(e) => setFile(e.target.files[0])} />
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModalEdit" tabIndex="-1" aria-labelledby="exampleModalEdit" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Home Banner</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleEditCompaingnsSubmit} encType="multipart/form-data">
                                <div className="row mb-2">
                                    <div className="col-lg-6">
                                        <label htmlFor="" className=''>Main Title :</label>
                                        <input type="text" className="form-control" placeholder="Enter Main Title" name="mainTitle" onChange={(e) => setMainTitle(e.target.value)} value={mainTitle} />
                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="" className=''>Discount Value :</label>
                                        <input type="text" className="form-control" placeholder="Enter Discount" name="DiscountTitle" onChange={(e) => setDiscountTitle(e.target.value)} value={DiscountTitle} />
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-12">
                                        <label htmlFor="" className=''>Body :</label>
                                        <input type="text" className="form-control" placeholder="Enter Body Text" name="body" onChange={(e) => setBody(e.target.value)} value={body} />
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-lg-6">
                                        <label htmlFor="" className=''>Display Start Date :</label>
                                        <input type="date" className="form-control" name="displayStartDate" onChange={(e) => setDisplayStartDate(e.target.value)} value={displayStartDate ? displayStartDate.split('T')[0] : ''} />
                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="" className=''>Display End Date :</label>
                                        <input type="date" className="form-control" name="displayEndDate" onChange={(e) => setDisplayEndDate(e.target.value)} value={displayEndDate ? displayEndDate.split('T')[0] : ''} />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-lg-6">
                                        <label htmlFor="example-multiselect1" className="form-label">Is Active :</label>
                                        <select id="example-multiselect1" className="form-control" name="IsActive" onChange={(e) => setIsActive(e.target.value)} value={IsActive}>
                                            <option value="" selected>Select One</option>
                                            <option value="true">Active</option>
                                            <option value="false">Inactive</option>
                                        </select>
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="form-label">Image :</label>
                                        <input type="file" className="form-control" name="file" onChange={(e) => setFile(e.target.files[0])} />
                                        {file && <img src={`${BASE_URL}/${file}`} alt="Current Compaingns Image" style={{ width: '80px', marginTop: '10px' }} />}
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

