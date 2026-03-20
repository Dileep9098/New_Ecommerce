

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { showErrorMsg, showSuccessMsg } from '../../../utils/ShowMessages';
const BASE_URL = import.meta.env.VITE_IMG_URL;


export default function HotDealBannerDashboard() {


    const [topTitle, setTopTitle] = useState('')
    const [mainTitle, setMainTitle] = useState('')
    const [bottomTitle, setBottomTitle] = useState('')
    const [dealMainText, setdealMainText] = useState('')
    const [dealMainUrl, setdealMainUrl] = useState('')
    const [IsActive, setIsActive] = useState()
    const [file, setFile] = useState()
    const [AvailableStartDate, setAvailableStartDate] = useState('')
    const [AvailableEndDate, setAvailableEndDate] = useState('')
    const [allHotDealBanner, setAllHotDealBanner] = useState([])
    const [getId, setGetId] = useState()

    const childcolumns = [
        { field: 'id', headerName: 'ID', },
        {
            field: 'avatar', headerName: 'Avatar', renderCell: (params) => (
                <Avatar alt={params.row.Name} src={`${params.row.Image}`} />
            )
        },
        { field: 'topTitle', headerName: 'Top Title', editable: true },
        { field: 'mainTitle', headerName: 'Main Title', editable: true },
        { field: 'bottomTitle', headerName: 'Bottom Title', editable: true },
        { field: 'dealMainText', headerName: 'Deal Main Text', editable: true },
        { field: 'dealMainUrl', headerName: 'Deal Main Url', editable: true },
        {
            field: 'IsActive', headerName: 'Status', width: 150,
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
        { field: 'AvailableStartDate', headerName: 'AvailableStartDate', editable: true, width: 150 },
        { field: 'AvailableEndDate', headerName: 'AvailableEndDate', editable: true, width: 150 },
        {
            field: 'actions', headerName: 'Actions', width: 150, renderCell: (params) => (
                <div>
                    <Button color="primary" onClick={() => handleEdit(params.row.dataId)} data-bs-toggle="modal" data-bs-target="#exampleModalEdit" data-bs-whatever="@mdo1"><EditIcon /></Button>
                    <Button color="secondary" onClick={() => handleDelete(params.row.dataId)}><DeleteIcon /></Button>
                </div>
            )
        }
    ]
    const childrows = (allHotDealBanner || []).map((hotDealBanner, index) => ({

        id: index + 1,
        dataId: hotDealBanner._id,
        Image: hotDealBanner.file.url||`${BASE_URL}/${hotDealBanner.file}` ,
        topTitle: hotDealBanner.topTitle,
        mainTitle: hotDealBanner.mainTitle,
        bottomTitle: hotDealBanner.bottomTitle,
        dealMainText: hotDealBanner.dealMainText,
        dealMainUrl: hotDealBanner.dealMainUrl,
        IsActive: hotDealBanner.IsActive === "true" ? "Active" : "In Active",
        AvailableEndDate: hotDealBanner.AvailableEndDate ? format(new Date(hotDealBanner.AvailableEndDate), 'PPP') : 'N/A',
        AvailableStartDate: hotDealBanner.AvailableStartDate ? format(new Date(hotDealBanner.AvailableStartDate), 'PPP') : 'N/A',

    }));


    const handleHomeBannerSubmit = async (e) => {
        e.preventDefault();
        console.log(file)
        const myform = new FormData()
        myform.append("topTitle", topTitle)
        myform.append("mainTitle", mainTitle)
        myform.append("bottomTitle", bottomTitle)
        myform.append("dealMainText", dealMainText)
        myform.append("dealMainUrl", dealMainUrl)
        myform.append("file", file)
        myform.append("IsActive", IsActive)
        myform.append("AvailableStartDate", AvailableStartDate);
        myform.append("AvailableEndDate", AvailableEndDate);

        try {
            // debugger
            const response = await axiosInstance.post(Config.END_POINT_LIST["ADD_HOT_DEAL_BANNER"], myform, { withCredentials: true });
            // console.log(response)

            if (response.data.success) {
                showSuccessMsg(response.data.message);
                //    debugger
                setAllHotDealBanner(prevState => [
                    ...(prevState || []),  // Ensure prevState is always an array, even if it’s undefined
                    {
                        ...response.data.hotDealBanner,
                        IsActive, topTitle, mainTitle, bottomTitle, dealMainText, dealMainUrl,AvailableEndDate, AvailableStartDate,file: response.data.hotDealBanner.file
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
                const response = await axiosInstance.get(Config.END_POINT_LIST["GET_ALL_HOT_DEAL_BANNER"], { withCredentials: true })
                // console.log(response)
                if (response.data.success) {
                    setAllHotDealBanner(response.data.allHotDealBanner)
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
            const response = await axiosInstance.delete(`${Config.END_POINT_LIST["DELETE_HOT_DEAL_BANNER"]}/${id}`, { withCredentials: true })
            // console.log(response)

            if (response.data.success) {
                showSuccessMsg(response.data.message)
                setAllHotDealBanner((prevState) => prevState.filter((contactDetails) => contactDetails._id !== id));
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
            const hotDealBanner = allHotDealBanner.find(hotDealBanner => hotDealBanner._id === id);

            if (hotDealBanner) {

                setTopTitle(hotDealBanner.topTitle)
                setMainTitle(hotDealBanner.mainTitle)
                setBottomTitle(hotDealBanner.bottomTitle)
                setdealMainText(hotDealBanner.dealMainText)
                setdealMainUrl(hotDealBanner.dealMainUrl)
                setIsActive(hotDealBanner.IsActive)
                setFile(hotDealBanner.file)

            }


        } catch (error) {
            console.log(error);
        }

    }

    const handleEditHomeBannerSubmit = async (e) => {
        e.preventDefault();
        try {
            const myform = new FormData();
            myform.append("topTitle", topTitle);
            myform.append("mainTitle", mainTitle);
            myform.append("bottomTitle", bottomTitle);
            myform.append("dealMainText", dealMainText);
            myform.append("dealMainUrl", dealMainUrl);
            myform.append("IsActive", IsActive);
            myform.append("AvailableStartDate", AvailableStartDate);
            myform.append("AvailableEndDate", AvailableEndDate);

            if (file) {
                myform.append("file", file);  // Only append file if it exists
            }

            const response = await axiosInstance.put(
                `${Config.END_POINT_LIST["UPDATE_HOT_DEAL_BANNER"]}/${getId}`,
                myform,
                { withCredentials: true }
            );

            if (response.data.success) {
                showSuccessMsg(response.data.message);
                // setAllHotDealBanner(prevState => [
                //     ...(prevState || []),
                //     {
                //         ...response.data.hotDealBanner,
                //         IsActive,
                //         topTitle,
                //         mainTitle,
                //         bottomTitle,
                //         dealMainText,
                //         dealMainUrl,
                //         file: response.data.hotDealBanner?.file || null  
                //     }
                // ]);

                setAllHotDealBanner((prevState) =>
                    prevState.map((hotDealBanner) =>
                        hotDealBanner._id === getId
                            ? {
                                ...hotDealBanner, IsActive, topTitle, mainTitle, bottomTitle, dealMainText,AvailableEndDate, AvailableStartDate,
                                dealMainUrl, file: response.data.response.file
                            }
                            : hotDealBanner
                    )
                );
            } else {
                showErrorMsg(response.data.message);
            }
        } catch (error) {
            showErrorMsg(error.response.data.message);
        }
    };

    // Example for exporting to CSV
    const handleExport = () => {
        const ws = XLSX.utils.json_to_sheet(allHotDealBanner);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Hot Deal Banner");
        XLSX.writeFile(wb, "hotDealBanner.xlsx");
    };


    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box">
                            <div className="page-title-right">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="#" className='text-primary'> Hot Deal Banner</Link></li>
                                    <li className="breadcrumb-item active">Hot Deal Banner</li>
                                </ol>
                            </div>
                            <h4 className="page-title"><i className="ri-align-left me-2"></i>Hot Deal Banner</h4>
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
                                            <Tooltip title="Add Categories" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                                                <IconButton>
                                                    <Stack direction="row" spacing={2}>
                                                        <Button variant="contained" endIcon={<AddIcon />} data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo1">
                                                            Add Hot Deal Banner
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
                                        <h3>Hot Deal Banner </h3>

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
                            <h5 className="modal-title" id="exampleModalLabel">New Deal Banner</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleHomeBannerSubmit} encType="multipart/form-data">
                                <div className="row mb-2">
                                    <div className="col-lg-6">
                                        <label htmlFor="" className=''> Top Title :</label>
                                        <input type="text" className="form-control" placeholder="Enter Top Title" name="topTitle" onChange={(e) => setTopTitle(e.target.value)} />

                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="" className=''> Main Title :</label>
                                        <input type="text" className="form-control" placeholder="Enter Main Title" name="mainTitle" onChange={(e) => setMainTitle(e.target.value)} />

                                    </div>

                                </div>
                                <div className="row mb-2">
                                    <div className="col-lg-6">
                                        <label htmlFor="" className=''> Deal Main Text:</label>
                                        <input type="text" className="form-control" placeholder="Enter Deal Main Text " name="dealMainText" onChange={(e) => setdealMainText(e.target.value)} />

                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="" className=''> Deal Main Url :</label>
                                        <input type="text" className="form-control" placeholder="Enter Left Button Url" name="dealMainUrl" onChange={(e) => setdealMainUrl(e.target.value)} />
                                    </div>

                                </div>

                                <div className="row mb-2">
                                    <div className="col-12">
                                        <label htmlFor="" className=''>  Bottom Title :</label>
                                        <input type="text" className="form-control" placeholder="Enter Bottom Title " name="bottomTitle" onChange={(e) => setBottomTitle(e.target.value)} />

                                    </div>


                                </div>
                                <div className="row mb-3">
                                    <div className="col-lg-6">
                                        <label className="form-label" for="userName"> Available Start Date </label>
                                        <input type="date" className="form-control" onChange={(e) => setAvailableStartDate(e.target.value)} name='AvailableStartDate' />
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="form-label" for="userName"> Available End Date </label>

                                        <input type="date" className="form-control" onChange={(e) => setAvailableEndDate(e.target.value)} name='AvailableEndDate' />

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
                            <form onSubmit={handleEditHomeBannerSubmit} encType="multipart/form-data">
                                <div className="row mb-2">
                                    <div className="col-lg-6">
                                        <label htmlFor="" className=''> Top Title :</label>
                                        <input type="text" className="form-control" placeholder="Enter Top Title" name="topTitle" onChange={(e) => setTopTitle(e.target.value)} value={topTitle} />

                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="" className=''> Main Title :</label>
                                        <input type="text" className="form-control" placeholder="Enter Main Title" name="mainTitle" onChange={(e) => setMainTitle(e.target.value)} value={mainTitle} />

                                    </div>

                                </div>
                                <div className="row mb-2">
                                    <div className="col-lg-6">
                                        <label htmlFor="" className=''> Deal Main Text:</label>
                                        <input type="text" className="form-control" placeholder="Enter Deal Main Text " name="dealMainText" onChange={(e) => setdealMainText(e.target.value)} value={dealMainText} />

                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="" className=''> Deal Main Url :</label>
                                        <input type="text" className="form-control" placeholder="Enter Left Button Url" name="dealMainUrl" onChange={(e) => setdealMainUrl(e.target.value)} value={dealMainUrl} />
                                    </div>

                                </div>


                                <div className="row mb-2">
                                    <div className="col-12">
                                        <label htmlFor="" className=''>  Bottom Title :</label>
                                        <input type="text" className="form-control" placeholder="Enter Bottom Title " name="bottomTitle" onChange={(e) => setBottomTitle(e.target.value)} value={bottomTitle} />

                                    </div>


                                </div>
                                <div className="row mb-3">
                                    <div className="col-lg-6">
                                        <label className="form-label" for="userName"> Available Start Date </label>
                                        <input type="date" className="form-control" onChange={(e) => setAvailableStartDate(e.target.value)} name='AvailableStartDate' value={AvailableStartDate} />
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="form-label" for="userName"> Available End Date </label>

                                        <input type="date" className="form-control" onChange={(e) => setAvailableEndDate(e.target.value)} name='AvailableEndDate' value={AvailableEndDate} />

                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-lg-6">
                                        <label for="example-multiselect1" className="form-label">Is Active :</label>
                                        <select id="example-multiselect1" className="form-control" name="IsActive" onChange={(e) => setIsActive(e.target.value)} value={IsActive}>
                                            {/* <option value="" selected>Select One</option> */}
                                            <option value="true"> Active</option>
                                            <option value="false">In Active</option>

                                        </select>
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="form-label">Image :</label>

                                        <input type="file" className="form-control" name='file' onChange={(e) => setFile(e.target.files[0])} />
                                        {file && <img src={`${BASE_URL}/${file}`} alt="Current Hot Deal Banner Image" style={{ width: '80px', marginTop: '10px' }} />}
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary " data-bs-dismiss="modal">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

