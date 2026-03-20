

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { format } from 'date-fns';
import { showSuccessMsg, showErrorMsg } from '../../../utils/ShowMessage';
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
import Config from '../../Comman/Config';

const BASE_URL = import.meta.env.VITE_IMG_URL;


export default function HomeBannerDashboard() {


    const [topTitle, setTopTitle] = useState('')
    const [mainTitle, setMainTitle] = useState('')
    const [bottomTitle, setBottomTitle] = useState('')
    const [leftButtonText, setleftButtonText] = useState('')
    const [rightButtonText, setrightButtonText] = useState('')
    const [leftButtonUrl, setleftButtonUrl] = useState('')
    const [rightButtonUrl, setrightButtonUrl] = useState('')
    const [DisplayNo, setDisplayNo] = useState('')
    const [IsActive, setIsActive] = useState()
    const [file, setFile] = useState()
    const [allHomeBanner, setAllHomeBanner] = useState([])
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
        { field: 'rightButtonText', headerName: 'Right Button Text', editable: true },
        { field: 'leftButtonText', headerName: 'Left Button Text', editable: true },
        {
            field: 'IsActive', headerName: 'Status', width: 150,
            renderCell: (params) => {
                // Apply inline styles directly here
                const isActive = params.value === "Active";
                return (
                    <div>
                        <span style={{
                            backgroundColor: isActive ? '#66bb6a' : '#03a9f4',
                            color: "white",
                            padding: '3px 10px',
                            borderRadius: '5px',
                            textAlign: 'center', fontSize: "12px",
                        }}>{params.value}</span>
                    </div>
                );
            },
        }, { field: 'createAt', headerName: 'CreateAt', editable: true, width: 150 },
        {
            field: 'actions', headerName: 'Actions', width: 150, renderCell: (params) => (
                <div>
                    <Button color="primary" onClick={() => handleEdit(params.row.dataId)} data-bs-toggle="modal" data-bs-target="#exampleModalEdit" data-bs-whatever="@mdo1"><EditIcon /></Button>
                    <Button color="secondary" onClick={() => handleDelete(params.row.dataId)}><DeleteIcon /></Button>
                </div>
            )
        }
    ]
    const childrows = (allHomeBanner || []).map((homeBanner, index) => ({

        id: index + 1,
        dataId: homeBanner._id,
        Image: homeBanner.file.url||`${BASE_URL}/${homeBanner.file}`, 
        topTitle: homeBanner.topTitle,
        mainTitle: homeBanner.mainTitle,
        bottomTitle: homeBanner.bottomTitle,
        rightButtonText: homeBanner.rightButtonText,
        leftButtonText: homeBanner.leftButtonText,
        IsActive: homeBanner.IsActive === "true" ? "Active" : "In Active",
        createAt: homeBanner.createdAt ? format(new Date(homeBanner.createdAt), 'PPP') : 'N/A',

    }));


    const handleHomeBannerSubmit = async (e) => {
        e.preventDefault();
        console.log(file)
        const myform = new FormData()
        myform.append("topTitle", topTitle)
        myform.append("mainTitle", mainTitle)
        myform.append("bottomTitle", bottomTitle)
        myform.append("leftButtonText", leftButtonText)
        myform.append("rightButtonText", rightButtonText)
        myform.append("leftButtonUrl", leftButtonUrl)
        myform.append("rightButtonUrl", rightButtonUrl)
        myform.append("DisplayNo", DisplayNo)
        myform.append("file", file)
        myform.append("IsActive", IsActive)

        try {
            // debugger
            const response = await axiosInstance.post(Config.END_POINT_LIST["ADD_HOME_BANNER"], myform, { withCredentials: true });
            // console.log(response)

            if (response.data.success) {
                showSuccessMsg(response.data.message);
                //    debugger
                setAllHomeBanner(prevState => [
                    ...prevState,
                    {
                        ...response.data.homeBanner, 
                        IsActive, topTitle, mainTitle, bottomTitle, leftButtonText, leftButtonUrl, rightButtonText, rightButtonUrl, DisplayNo, file:response.data.homeBanner.file
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
                const response = await axiosInstance.get(Config.END_POINT_LIST["GET_ALL_HOME_BANNER"], { withCredentials: true })
                // console.log(response)
                if (response.data.success) {
                    setAllHomeBanner(response.data.allHomeBanners)
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
            const response = await axiosInstance.delete(`${Config.END_POINT_LIST["DELETE_HOME_BANNER"]}/${id}`, { withCredentials: true })
            // console.log(response)

            if (response.data.success) {
                showSuccessMsg(response.data.message)
                setAllHomeBanner((prevState) => prevState.filter((contactDetails) => contactDetails._id !== id));
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
            const homeBanner = allHomeBanner.find(homeBanner => homeBanner._id === id);

            if (homeBanner) {

                setTopTitle(homeBanner.topTitle)
                setMainTitle(homeBanner.mainTitle)
                setBottomTitle(homeBanner.bottomTitle)
                setleftButtonText(homeBanner.leftButtonText)
                setrightButtonText(homeBanner.rightButtonText)
                setleftButtonText(homeBanner.leftButtonUrl)
                setrightButtonUrl(homeBanner.rightButtonUrl)
                setDisplayNo(homeBanner.DisplayNo)
                setIsActive(homeBanner.IsActive)
                setFile(homeBanner.file)

            }


        } catch (error) {
            console.log(error);
        }

    }

    const handleEditHomeBannerSubmit = async (e) => {
        e.preventDefault();
        try {
            const myform = new FormData()
            myform.append("topTitle", topTitle)
            myform.append("mainTitle", mainTitle)
            myform.append("bottomTitle", bottomTitle)
            myform.append("leftButtonText", leftButtonText)
            myform.append("rightButtonText", rightButtonText)
            myform.append("leftButtonUrl", leftButtonUrl)
            myform.append("rightButtonUrl", rightButtonUrl)
            myform.append("DisplayNo", DisplayNo)
            myform.append("IsActive", IsActive)
            if (file) {
                myform.append("file", file)

            }

            const response = await axiosInstance.put(`${Config.END_POINT_LIST["UPDATE_HOME_BANNER"]}/${getId}`, myform, { withCredentials: true })
         
            if (response.data.success) {
                showSuccessMsg(response.data.message)
                // setAllHomeBanner((prevState) => prevState.filter((contactDetails) => contactDetails._id !== getId));

                setAllHomeBanner((prevState) =>
                    prevState.map((homeBanner) =>
                        homeBanner._id === getId
                            ? { ...homeBanner, IsActive, topTitle, mainTitle, bottomTitle, leftButtonText, leftButtonUrl, rightButtonText, rightButtonUrl, DisplayNo, file:response.data.response.file }
                            : homeBanner
                    )
                );

                // setAllHomeBanner(prevState => [
                //     ...prevState,
                //     {
                //         ...response.data.response, 
                //         IsActive, topTitle, mainTitle, bottomTitle, leftButtonText, leftButtonUrl, rightButtonText, rightButtonUrl, DisplayNo, file:response.data.response.file
                //     }
                // ]);
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
            const ws = XLSX.utils.json_to_sheet(allHomeBanner);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Home Banner");
            XLSX.writeFile(wb, "homeBanner.xlsx");
        };
    

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box">
                            <div className="page-title-right">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="#" className='text-primary'> Home Banner</Link></li>
                                    <li className="breadcrumb-item active">Home Banner</li>
                                </ol>
                            </div>
                            <h4 className="page-title"><i className="ri-align-left me-2"></i>Home Banner</h4>
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
                                                            Add Home Banner
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
                                        <label htmlFor="" className=''>  Left Button Text :</label>
                                        <input type="text" className="form-control" placeholder="Enter Left Button Text " name="leftButtonText" onChange={(e) => setleftButtonText(e.target.value)} />

                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="" className=''> Left Button Url :</label>
                                        <input type="text" className="form-control" placeholder="Enter Left Button Url" name="leftButtonUrl" onChange={(e) => setleftButtonUrl(e.target.value)} />
                                    </div>

                                </div>
                                <div className="row mb-2">
                                    <div className="col-lg-6">
                                        <label htmlFor="" className=''>  Right Button Text :</label>
                                        <input type="text" className="form-control" placeholder="Enter Right Button Text " name="rightButtonText" onChange={(e) => setrightButtonText(e.target.value)} />

                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="" className=''> Right Button Url :</label>
                                        <input type="text" className="form-control" placeholder="Enter Right Button Url" name="rightButtonUrl" onChange={(e) => setrightButtonUrl(e.target.value)} />
                                    </div>

                                </div>

                                <div className="row mb-2">
                                    <div className="col-lg-6">
                                        <label htmlFor="" className=''>  Bottom Title :</label>
                                        <input type="text" className="form-control" placeholder="Enter Bottom Title " name="bottomTitle" onChange={(e) => setBottomTitle(e.target.value)} />

                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="" className=''> Display No :</label>
                                        <input type="number" className="form-control" placeholder="Enter Display No" name="DisplayNo" onChange={(e) => setDisplayNo(e.target.value)} />
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
                                        <label htmlFor="" className=''>  Left Button Text :</label>
                                        <input type="text" className="form-control" placeholder="Enter Left Button Text " name="leftButtonText" onChange={(e) => setleftButtonText(e.target.value)} value={leftButtonText} />

                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="" className=''> Left Button Url :</label>
                                        <input type="text" className="form-control" placeholder="Enter Left Button Url" name="leftButtonUrl" onChange={(e) => setleftButtonUrl(e.target.value)} value={leftButtonUrl} />
                                    </div>

                                </div>
                                <div className="row mb-2">
                                    <div className="col-lg-6">
                                        <label htmlFor="" className=''>  Right Button Text :</label>
                                        <input type="text" className="form-control" placeholder="Enter Right Button Text " name="rightButtonText" onChange={(e) => setrightButtonText(e.target.value)} value={rightButtonText} />

                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="" className=''> Right Button Url :</label>
                                        <input type="text" className="form-control" placeholder="Enter Right Button Url" name="rightButtonUrl" onChange={(e) => setrightButtonUrl(e.target.value)} value={rightButtonUrl} />
                                    </div>

                                </div>

                                <div className="row mb-2">
                                    <div className="col-lg-6">
                                        <label htmlFor="" className=''>  Bottom Title :</label>
                                        <input type="text" className="form-control" placeholder="Enter Bottom Title " name="bottomTitle" onChange={(e) => setBottomTitle(e.target.value)} value={bottomTitle} />

                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="" className=''> Display No :</label>
                                        <input type="number" className="form-control" placeholder="Enter Display No" name="DisplayNo" onChange={(e) => setDisplayNo(e.target.value)} value={DisplayNo} />
                                    </div>

                                </div>

                                <div className="row mb-3">
                                    <div className="col-lg-6">
                                        <label for="example-multiselect1" className="form-label">Is Active :</label>
                                        <select id="example-multiselect1" className="form-control" name="IsActive" onChange={(e) => setIsActive(e.target.value)} value={IsActive}>
                                            <option value="" selected>Select One</option>
                                            <option value="true"> Active</option>
                                            <option value="false">In Active</option>

                                        </select>
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="form-label">Image :</label>

                                        <input type="file" className="form-control" name='file' onChange={(e) => setFile(e.target.files[0])} />
                                        {file && <img src={file.url||`${BASE_URL}/${file}`} alt="Current Banner Image" style={{ width: '80px', marginTop: '10px' }} />}
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

