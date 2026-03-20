

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


export default function BlogsDashboard() {


    // const [MakeDate, setMakeDate] = useState('')
    const [mainTitle, setMainTitle] = useState('')
    // const [ProductReviews, setProductReviews] = useState('')
    const [Descriptions, setDescriptions] = useState('')
    const [IsActive, setIsActive] = useState()
    const [file, setFile] = useState()
    const [AllBlogs, setAllBlogs] = useState([])
    const [getId, setGetId] = useState()

    const childcolumns = [
        { field: 'id', headerName: 'ID', },
        {
            field: 'avatar', headerName: 'Avatar', renderCell: (params) => (
                <Avatar alt={params.row.Name} src={`${params.row.Image}`} />
            )
        },
        // { field: 'MakeDate', headerName: 'MakeDate', editable: true },
        { field: 'mainTitle', headerName: 'Main Title', editable: true,width:200 },
        // { field: 'ProductReviews', headerName: 'ProductReviews', editable: true },

        { field: 'Descriptions', headerName: 'Descriptions', editable: true ,width:300},
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
    // debugger
    const childrows = (AllBlogs || []).map((blog, index) => ({

        id: index + 1,
        dataId: blog._id,
        
        Image: `${BASE_URL}/banner/${blog.file}`,
        // MakeDate: blog.MakeDate,
        mainTitle: blog.mainTitle,
        // ProductReviews: blog.ProductReviews,
        Descriptions: blog.Descriptions,
        IsActive: blog.IsActive === "true" ? "Active" : "In Active",
        createAt: blog.createdAt ? format(new Date(blog.createdAt), 'PPP') : 'N/A',

    }));


    const handleblogSubmit = async (e) => {
        // debugger
        e.preventDefault();
        console.log(file)
        const myform = new FormData()
        // myform.append("MakeDate", MakeDate)
        myform.append("mainTitle", mainTitle)
        // myform.append("ProductReviews", ProductReviews)
        myform.append("Descriptions", Descriptions)

        myform.append("file", file)
        myform.append("IsActive", IsActive)

        try {
            // debugger
            const response = await axiosInstance.post(Config.END_POINT_LIST["ADD_BLOGS"], myform, { withCredentials: true });
            // console.log(response)

            if (response.data.success) {
                showSuccessMsg(response.data.message);
                //    debugger
                setAllBlogs(prevState => [
                    ...prevState,
                    {
                        ...response.data.blog,
                        IsActive, mainTitle, Descriptions, file: response.data.blog.file
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
                const response = await axiosInstance.get(Config.END_POINT_LIST["GET_ALL_BLOGS"], { withCredentials: true })
                // console.log(response)
                if (response.data.success) {
                    setAllBlogs(response.data.AllBlogs)
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
            const response = await axiosInstance.delete(`${Config.END_POINT_LIST["DELETE_BLOGS"]}/${id}`, { withCredentials: true })
            // console.log(response)

            if (response.data.success) {
                showSuccessMsg(response.data.message)
                setAllBlogs((prevState) => prevState.filter((contactDetails) => contactDetails._id !== id));
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
            const blog = AllBlogs.find(blog => blog._id === id);

            if (blog) {

                // setMakeDate(blog.MakeDate)
                setMainTitle(blog.mainTitle)
                // setProductReviews(blog.ProductReviews||[])
                setDescriptions(blog.Descriptions)
               
                setIsActive(blog.IsActive)
                setFile(blog.file)

            }


        } catch (error) {
            console.log(error);
        }

    }

    const handleEditblogSubmit = async (e) => {
        e.preventDefault();
        try {
            const myform = new FormData()
            myform.append("mainTitle", mainTitle)
            // myform.append("ProductReviews", ProductReviews||[])
            myform.append("Descriptions", Descriptions)
          
            myform.append("IsActive", IsActive)
            if (file) {
                myform.append("file", file)

            }

            const response = await axiosInstance.put(`${Config.END_POINT_LIST["UPDATE_BLOGS"]}/${getId}`, myform, { withCredentials: true })

            if (response.data.success) {
                showSuccessMsg(response.data.message)
                // setAllBlogs((prevState) => prevState.filter((contactDetails) => contactDetails._id !== getId));

                setAllBlogs((prevState) =>
                    prevState.map((blog) =>
                        blog._id === getId
                            ? { ...blog, IsActive, mainTitle, Descriptions, file: response.data.response.file }
                            : blog
                    )
                );

               
            }
            else {
                showErrorMsg(response.data.message)
            }
        } catch (error) {
            showErrorMsg(error.response.data?.message);

        }
    }

    // Example for exporting to CSV
    const handleExport = () => {
        const ws = XLSX.utils.json_to_sheet(AllBlogs);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Blog");
        XLSX.writeFile(wb, "blog.xlsx");
    };


    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box">
                            <div className="page-title-right">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="#" className='text-primary'> Blogs</Link></li>
                                    <li className="breadcrumb-item active">Blogs</li>
                                </ol>
                            </div>
                            <h4 className="page-title"><i className="ri-align-left me-2"></i>Blogs</h4>
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
                                                            Add Blog
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
                                        <h3>Blog </h3>

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
                            <h5 className="modal-title" id="exampleModalLabel">New Blog</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleblogSubmit} encType="multipart/form-data">
                                <div className="row mb-2">
                                    <div className="col-12">
                                        <label htmlFor="" className=''> Main Title :</label>
                                        <input type="text" className="form-control" placeholder="Enter Main Title" name="mainTitle" onChange={(e) => setMainTitle(e.target.value)} />

                                    </div>

                                </div>
                                <div className="row mb-2">
                                    <div className="col-12">
                                        <label htmlFor="" className=''> Description</label>
                                        <textarea type="text" className="form-control" placeholder="Enter Description " name="Description" onChange={(e) => setDescriptions(e.target.value)} ></textarea>

                                    </div>

                                </div>


                                <div className="row mb-2">
                                    {/* <div className="col-lg-6">
                                        <label htmlFor="" className=''>  ProductReviews :</label>
                                        <input type="text" className="form-control" placeholder="Enter ProductReviews " name="ProductReviews" onChange={(e) => setProductReviews(e.target.value)} />

                                    </div> */}
                                    <div className="col-12">
                                        <label for="example-multiselect1" className="form-label">Is Active :</label>
                                        <select id="example-multiselect1" className="form-control" name="IsActive" onChange={(e) => setIsActive(e.target.value)} >
                                            <option value="" selected>Select One</option>
                                            <option value="true"> Active</option>
                                            <option value="false">In Active</option>

                                        </select>
                                    </div>

                                </div>

                                <div className="row mb-3">
                                    <div className="col-12">
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
                            <form onSubmit={handleEditblogSubmit} encType="multipart/form-data">
                                <div className="row mb-2">
                                    <div className="col-12">
                                        <label htmlFor="" className=''> Main Title :</label>
                                        <input type="text" className="form-control" placeholder="Enter Main Title" name="mainTitle" onChange={(e) => setMainTitle(e.target.value)} value={mainTitle} />

                                    </div>

                                </div>
                                <div className="row mb-2">
                                    <div className="col-12">
                                        <label htmlFor="" className=''> Description</label>
                                        <textarea type="text" className="form-control" placeholder="Enter Description " name="Description" onChange={(e) => setDescriptions(e.target.value)} value={Descriptions} ></textarea>

                                    </div>

                                </div>


                                <div className="row mb-2">
                                    {/* <div className="col-lg-6">
                                        <label htmlFor="" className=''>  ProductReviews :</label>
                                        <input type="text" className="form-control" placeholder="Enter ProductReviews " name="ProductReviews" onChange={(e) => setProductReviews(e.target.value)} />

                                    </div> */}
                                    <div className="col-12">
                                        <label for="example-multiselect1" className="form-label">Is Active :</label>
                                        <select id="example-multiselect1" className="form-control" name="IsActive" onChange={(e) => setIsActive(e.target.value)} value={IsActive}>
                                            {/* <option value="" selected>Select One</option> */}
                                            <option value="true"> Active</option>
                                            <option value="false">In Active</option>

                                        </select>
                                    </div>

                                </div>

                               
                                <div className="row mb-3">
                                   
                                    <div className="col-12">
                                        <label className="form-label">Image :</label>
                                        <input type="file" className="form-control" name='file' onChange={(e) => setFile(e.target.files[0])} />
                                        {file && <img src={`${file}`} alt="Current Blog Image" style={{ width: '80px', marginTop: '10px' }} />}
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

