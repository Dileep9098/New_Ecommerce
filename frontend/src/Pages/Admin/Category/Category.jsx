

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import Loader from '../../Loader/Loader';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar'; 
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const BASE_URL = import.meta.env.VITE_IMG_URL;


import { createSubCategory, deleteParentCategory, getAllParentCategory, getAllSubCategory, parentCategory, updateParentCategory } from "../../../Store/Feature/category/categorySlice"

import "./category.css"
import axiosInstance from '../../../ApiHendler/axiosInstance';
import { showErrorMsg, showSuccessMsg } from '../../../utils/ShowMessages';



export default function Category() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, parentCategories, error, childCategories } = useSelector((state) => state.category);


    // ===== Parent Category 

    const [parentCategoryName, setParentCategoryName] = useState()
    const [parentCategoryImage, setParentCategoryId] = useState(null)
    const [getId, setGetId] = useState()

    const handleMainCategotry = async (e) => {
        e.preventDefault();

        const myform = new FormData();
        myform.append("pname", parentCategoryName);
        myform.append("file", parentCategoryImage);
        try {
            dispatch(parentCategory(myform)).then((data) => {
                if (data.payload.success) {
                    showSuccessMsg("Parent Category added successfully!");
                    dispatch(getAllParentCategory())
                }
            });
        } catch (error) {
            showErrorMsg("Failed to add Parent Category.");
        }
    }

    useEffect(() => {
        dispatch(getAllParentCategory())
        dispatch(getAllSubCategory())
    }, [])

    const parentcolumns = [
        
        { field: 'id', headerName: 'ID', },
        {
            field: 'avatar', headerName: 'Avatar', width: 150, renderCell: (params) => (
                
                <Avatar alt={params.row.Name} src={`${params.row.Image}`} />
               
            )
        },

        { field: 'Name', headerName: 'Name', width: 300 },
        { field: 'createAt', headerName: 'CreateAt', width: 200 },
        {
            field: 'actions', headerName: 'Actions', width: 150, renderCell: (params) => (
                <div>
                    <Button color="primary" onClick={() => handleEdit(params.row.dataId)} data-bs-toggle="modal" data-bs-target="#exampleModalEdit" data-bs-whatever="@mdo1"><EditIcon /></Button>
                    <Button color="secondary" onClick={() => handleDelete(params.row.dataId)}><DeleteIcon /></Button>
                </div>
            )
        }
    ]
    
    // const rows = (parentCategories || []).map((category, index) => ({
        
    //     id: index + 1,
    //     dataId: category._id,
    //     Image: `${BASE_URL}/${category.file}`||category.file.url,
    //     Name: category.Name,
    //     createAt: category.createdAt ? format(new Date(category.createdAt), 'PPP') : 'N/A',

    // }));

    const rows = (parentCategories || []).map((category, index) => {
    let imageUrl = '';

    if (typeof category.file === 'string') {
        imageUrl = `${BASE_URL}/category/${category.file}`;
    } else if (category.file) {
        imageUrl = category.file;
    } 

    return {
        id: index + 1,
        dataId: category._id,
        Image: imageUrl,
        Name: category.Name,
        createAt: category.createdAt 
            ? format(new Date(category.createdAt), 'PPP') 
            : 'N/A',
    };
});


    const handleDelete = (id) => {
        console.log(id)
        try {
            dispatch(deleteParentCategory(id)).then((data) => {
                if (data.payload.success) {
                    showSuccessMsg(data.payload.message)
                    dispatch(getAllParentCategory())
                }
                else {
                    showErrorMsg(data.payload.message)
                }
            })
        } catch (error) {
            showErrorMsg(error)
        }

    }

    // const handleEdit = (id) => {
    //     try {
    //         const category = parentCategories.find(category => category._id === id);

    //         if (category) {
    //             setParentCategoryName(category.name); 
    //             setParentCategoryId(category.file); 
    //         }
    //         const myform = new FormData()
    //         myform.append("pname",parentCategoryName)
    //         myform.append("file",parentCategoryImage)

    //         dispatch(updateParentCategory({id,myform}))

    //     } catch (error) {

    //         console.log(error)

    //     }

    // };

    const handleEdit = (id) => {
        setGetId(id)
        try {
            const category = parentCategories.find(category => category._id === id);

            if (category) {
                setParentCategoryName(category.Name);
                setParentCategoryId(category.file);
            }

        } catch (error) {
            console.log(error);
        }

    }

    const handleSubmitEdit = (e) => {
        e.preventDefault();
        try {
            const myform = new FormData();
            myform.append("pname", parentCategoryName);
            if (parentCategoryImage) {
                myform.append("file", parentCategoryImage);
            }
            //     myform.forEach((value, key) => {
            //     console.log(`${key}: ${value}`);
            // });

            dispatch(updateParentCategory({ getId, myform })).then((data) => {
                console.log(data.payload)
                if (data.payload.success) {
                    showSuccessMsg(data.payload.message)
                    dispatch(getAllParentCategory())
                }
            });

        } catch (error) {
            console.log(error);
        }
    };

    // ============== Child Category ===========

    const childcolumns = [
        { field: 'id', headerName: 'ID', },
        {
            field: 'avatar', headerName: 'Avatar', renderCell: (params) => (
                <Avatar alt={params.row.Name} src={`${params.row.Image}`} />
            )
        },
        { field: 'Name', headerName: 'Name', editable: true, width: 250 },
        { field: 'parentCategory', headerName: 'Parent Category', editable: true, width: 250 },
        {
            field: 'IsActive', headerName: 'Status', width: 150,
            renderCell: (params) => {
                // Apply inline styles directly here
                const isActive = params.value === "Active";
                return (
                    <div
                       
                    >
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
                    <Button color="primary" onClick={() => handleChildCategoryEdit(params.row.dataId)} data-bs-toggle="modal" data-bs-target="#exampleModalEdit1" data-bs-whatever="@mdo1"><EditIcon /></Button>
                    <Button color="secondary" onClick={() => handleChildCategoryDelete(params.row.dataId)}><DeleteIcon /></Button>
                </div>
            )
        }
    ]
    // const childrows = (childCategories || []).map((category, index) => ({

    //     id: index + 1,
    //     dataId: category._id,
    //     Image: category.file.url||`${BASE_URL}/${category.file}`,
    //     Name: category.Name,
    //     parentCategory: category.parentCategory ? category.parentCategory.Name : 'N/A', // Extracting name from parentCategory
    //     IsActive: category.IsActive === "true" ? "Active" : "In Active",
    //     createAt: category.CreatedOn ? format(new Date(category?.CreatedOn), 'PPP') : 'N/A',

    // }));


const childrows = (childCategories || []).map((category, index) => {
    // Determine image URL
    let imageUrl = '';
    if (typeof category.file === 'string') {
        imageUrl = `${BASE_URL}/category/${category.file}`;
    } else if (category.file?.url) {
        imageUrl = category.file.url;
    } 

    return {
        id: index + 1,
        dataId: category._id,
        Image: imageUrl,
        Name: category.Name,
        parentCategory: category.parentCategory?.Name || category.ParentCategoryName || 'N/A',
        IsActive: category.IsActive === "true" ? "Active" : "In Active",
        createAt: category.createdAt 
            ? format(new Date(category.createdAt), 'PPP') 
            : 'N/A',
    };
});


    const [childCategoryName, setChildCategoryName] = useState()
    const [parentCategoryChoose, setParentCategoryChoose] = useState()
    const [childCategoryImage, setChildCategoryImage] = useState()
    const [childCategoryIsActive, setChildCategoryIsActive] = useState()


    const handleChildCategorySubmit = async (e) => {
        e.preventDefault()
        console.log(childCategoryImage, childCategoryIsActive, childCategoryName, parentCategoryChoose)

        const myform = new FormData()

        myform.append("name", childCategoryName)
        myform.append("parentCategory", parentCategoryChoose)
        myform.append("IsActive", childCategoryIsActive)
        myform.append("file", childCategoryImage)
        try {
            dispatch(createSubCategory(myform)).then((data) => {
                if (data.payload.success) {
                    showSuccessMsg("Sub Category added successfully!");
                    dispatch(getAllParentCategory())
                }
            });

        } catch (error) {
            showErrorMsg("Failed to add Sub Category.");
        }

    }

    const handleChildCategoryDelete = async (id) => {

        try {
            const response = await axiosInstance.delete(`/api/v1/admin/delete-child-category/${id}`, { withCredentials: true })
            console.log(response)
            if (response.data.success) {
                showSuccessMsg(response.data.message)
                dispatch(getAllSubCategory())
            }
            else {
                showErrorMsg(response.data.message)
            }

        } catch (error) {
            console.log(error)

        }

    }

    const handleChildCategoryEdit = (id) => {
        setGetId(id)
        try {
            const category = childCategories.find(category => category._id === id);

            if (category) {

                setChildCategoryName(category.Name);
                setChildCategoryImage(category.file);
                setChildCategoryIsActive(category.IsActive)
                setParentCategoryChoose(category.parentCategory._id)

            }
            console.log(parentCategoryChoose)
            console.log(childCategoryName)

        } catch (error) {
            console.log(error);
        }

    }
    const handleEditChildCategorySubmit= async(e)=>{
        e.preventDefault();
        try {
            const myform = new FormData();
            myform.append("name", childCategoryName)
            myform.append("parentCategory", parentCategoryChoose)
            myform.append("IsActive", childCategoryIsActive)
            if (childCategoryImage) {
                myform.append("file", childCategoryImage);
            }
            //     myform.forEach((value, key) => {
            //     console.log(`${key}: ${value}`);
            // });



            // dispatch(updateParentCategory({ getId, myform })).then((data) => {
            //     console.log(data.payload)
            //     if (data.payload.success) {
            //         showSuccessMsg(data.payload.message)
            //         dispatch(getAllParentCategory())
            //     }
            // });
            const response = await axiosInstance.put(`/api/v1/admin/update-child-category/${getId}`,myform, { withCredentials: true })
            console.log(response)
            if (response.data.success) {
                showSuccessMsg(response.data.message)
                dispatch(getAllSubCategory())
            }
            else {
                showErrorMsg(response.data.message)
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {isLoading ? <Loader /> : (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box">
                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><Link to="#" className='text-primary'> Category</Link></li>
                                        <li className="breadcrumb-item active">Category</li>
                                    </ol>
                                </div>
                                <h4 className="page-title"><i className="ri-align-left me-2"></i>Category</h4>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row mb-3">
                                        <div className="col-sm-5">
                                            <div className="dropdown dropdownAction">
                                                <Tooltip title="Add Categories" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <IconButton>
                                                        <Stack direction="row" spacing={2}>
                                                            <Button variant="contained" endIcon={<AddIcon />}>
                                                                Add Category
                                                            </Button>
                                                        </Stack>
                                                    </IconButton>
                                                </Tooltip>
                                                <div className="dropdown-menu dropdown-menu-start" style={{boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"}}>
                                                    <Link to="#" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal1" data-bs-whatever="@mdo1"> <i className="mdi mdi-ray-vertex me-1"></i> Main Category</Link>

                                                    <Link to="#" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"> <i className="mdi mdi-relation-many-to-one me-1"></i> Sub Category</Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-7">
                                            <div className="text-sm-end">
                                                <button type="button" className="btn btn-success mb-2 me-1">
                                                    <i className="bi bi-gear-fill"></i>
                                                </button>
                                                <button type="button" className="btn btn-light mb-2 me-1">Import</button>
                                                <button type="button" className="btn btn-primary mb-2">Export</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 categoriesTable mb-3">
                                            <h3>Main Category</h3>
                                            <Box sx={{ height:600, width: '100%' }}>
                                                <DataGrid
                                                    rows={rows}
                                                    columns={parentcolumns}
                                                    initialState={{
                                                        pagination: {
                                                            paginationModel: {
                                                                pageSize: 10,
                                                            },
                                                        },
                                                    }}
                                                    pageSizeOptions={[10]}
                                                    checkboxSelection
                                                    disableRowSelectionOnClick
                                                />
                                            </Box>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 categoriesTable">
                                            <h3>Sub Category</h3>

                                            <Box sx={{ height: 600, width: '100%' }}>
                                                <DataGrid
                                                    rows={childrows}
                                                    columns={childcolumns}
                                                    initialState={{
                                                        pagination: {
                                                            paginationModel: {
                                                                pageSize: 10,
                                                            },
                                                        },
                                                    }}
                                                    pageSizeOptions={[10]}
                                                    checkboxSelection
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
            )}

            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel"> Add Parent Category</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleMainCategotry} enctype="multipart/form-data">
                                <div className="row mb-2">
                                    <div className="col-lg-6">
                                        <label htmlFor="" className=''> Category Name :</label>
                                        <input type="text" className="form-control" placeholder="Enter Category Name" name="pname" onChange={(e) => setParentCategoryName(e.target.value)} value={parentCategoryName} />

                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="" className=''> Parent Category Image :</label>
                                        <input type="file" className="form-control" name="file" onChange={(e) => setParentCategoryId(e.target.files[0])} />

                                    </div>

                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" >Save Category</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModalEdit" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Parent Category</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmitEdit} encType="multipart/form-data">
                                <div className="row mb-2">
                                    <div className="col-lg-6">
                                        <label htmlFor="" className="">Category Name:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Category Name"
                                            name="pname"
                                            onChange={(e) => setParentCategoryName(e.target.value)} // Update name
                                            value={parentCategoryName} // Bind state to input
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="" className="">Parent Category Image:</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            name="file"
                                            onChange={(e) => setParentCategoryId(e.target.files[0])} // Update image file
                                        />
                                        {/* If there is an existing image, display it */}
                                        {parentCategoryImage && <img src={`${BASE_URL}/${parentCategoryImage}`} alt="Current Category Image" style={{ width: '80px', marginTop: '10px' }} />}
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save Category</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">New Sub Category</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleChildCategorySubmit} enctype="multipart/form-data">
                                <div className="row mb-2">
                                    <div className="col-lg-6">
                                        <label htmlFor="" className=''> Category Name :</label>
                                        <input type="text" className="form-control" placeholder="Enter Category Name" name="name" onChange={(e) => setChildCategoryName(e.target.value)} />

                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="example-multiselect" className="form-label">Parent Category :</label>
                                        <select
                                            id="example-multiselect"
                                            className="form-control"
                                            name="parentCategory"
                                            onChange={(e) => setParentCategoryChoose(e.target.value)}
                                        >
                                            <option selected>Select Parent Category</option>
                                            {parentCategories && parentCategories.map((parentCategory, ind) => (
                                                <option key={ind} value={parentCategory._id}>
                                                    {parentCategory.Name}
                                                </option>
                                            ))}
                                        </select>

                                    </div>

                                </div>

                                <div className="row mb-3">
                                    <div className="col-lg-6">
                                        <label for="example-multiselect1" className="form-label">Is Active :</label>
                                        <select id="example-multiselect1" className="form-control" name="IsActive" onChange={(e) => setChildCategoryIsActive(e.target.value)} >
                                            <option value="" selected>Select One</option>
                                            <option value="true"> Active</option>
                                            <option value="false">In Active</option>

                                        </select>
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="form-label">Image :</label>

                                        <input type="file" className="form-control" name='file' onChange={(e) => setChildCategoryImage(e.target.files[0])} />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">Save Category</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModalEdit1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">New Sub Category</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleEditChildCategorySubmit} enctype="multipart/form-data">
                                <div className="row mb-2">
                                    <div className="col-lg-6">
                                        <label htmlFor="" className=''> Category Name :</label>
                                        <input type="text" className="form-control" placeholder="Enter Category Name" name="name" onChange={(e) => setChildCategoryName(e.target.value)} value={childCategoryName} />

                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="example-multiselect" className="form-label">Parent Category :</label>
                                        <select
                                            id="example-multiselect"
                                            className="form-control"
                                            name="parentCategory"
                                            onChange={(e) => setParentCategoryChoose(e.target.value)}
                                            value={parentCategoryChoose}
                                        >
                                            <option selected>Select Parent Category</option>
                                            {parentCategories && parentCategories.map((parentCategory, ind) => (
                                                <option key={ind} value={parentCategory._id}>
                                                    {parentCategory.Name}
                                                </option>
                                            ))}
                                        </select>

                                    </div>

                                </div>

                                <div className="row mb-3">
                                    <div className="col-lg-6">
                                        <label for="example-multiselect1" className="form-label">Is Active :</label>
                                        <select id="example-multiselect1" className="form-control" name="IsActive" onChange={(e) => setChildCategoryIsActive(e.target.value)} value={childCategoryIsActive}>
                                            <option value="" selected>Select One</option>
                                            <option value="true"> Active</option>
                                            <option value="false">In Active</option>

                                        </select>
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="form-label">Image :</label>

                                        <input type="file" className="form-control" name='file' onChange={(e) => setChildCategoryImage(e.target.files[0])} />
                                        {childCategoryImage && <img src={`/image/category/${childCategoryImage}`} alt="Current Category Image" style={{ width: '80px', marginTop: '10px' }} />}
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary"  data-bs-dismiss="modal">Save Category</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import AddIcon from '@mui/icons-material/Add';
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
// import { useDispatch, useSelector } from 'react-redux';
// import { showSuccessMsg, showErrorMsg } from '../../../utils/ShowMessage';
// import Loader from '../../View/Loader/Loader';
// import { parentCategory } from "../../../Store/features/category/categorySlice"

// export default function Category() {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { isLoading } = useSelector((state) => state.adminUser);

//     // State for parent category
//     const [parentCategoryName, setParentCategoryName] = useState('');
//     const [parentCategoryImage, setParentCategoryId] = useState('');

//     // State for search functionality
//     const [searchQuery, setSearchQuery] = useState('');
//     const [filteredData, setFilteredData] = useState([]);

//     // Dummy data for table (you should replace this with actual data from your store)
//     const dummyData = [
//         { userId: 1, userName: "John Doe", userType: "Admin", status: "Active", createdOn: "2025-01-21" },
//         { userId: 2, userName: "Jane Smith", userType: "Editor", status: "Inactive", createdOn: "2025-01-20" },
//         { userId: 3, userName: "Mike Johnson", userType: "User", status: "Active", createdOn: "2025-01-18" },
//         { userId: 4, userName: "Emma Brown", userType: "Admin", status: "Active", createdOn: "2025-01-17" },
//         { userId: 5, userName: "Olivia White", userType: "Editor", status: "Inactive", createdOn: "2025-01-16" },
//         { userId: 6, userName: "Liam Green", userType: "User", status: "Active", createdOn: "2025-01-15" },
//         { userId: 7, userName: "Sophia Black", userType: "Admin", status: "Active", createdOn: "2025-01-14" },
//         { userId: 8, userName: "Lucas Blue", userType: "Editor", status: "Inactive", createdOn: "2025-01-13" },
//         { userId: 9, userName: "Mason Gray", userType: "User", status: "Active", createdOn: "2025-01-12" },
//         { userId: 10, userName: "Isabella Red", userType: "Admin", status: "Inactive", createdOn: "2025-01-11" },
//         // Add more rows as needed
//         { userId: 1, userName: "John Doe", userType: "Admin", status: "Active", createdOn: "2025-01-21" },
//         { userId: 2, userName: "Jane Smith", userType: "Editor", status: "Inactive", createdOn: "2025-01-20" },
//         { userId: 3, userName: "Mike Johnson", userType: "User", status: "Active", createdOn: "2025-01-18" },
//         { userId: 4, userName: "Emma Brown", userType: "Admin", status: "Active", createdOn: "2025-01-17" },
//         { userId: 5, userName: "Olivia White", userType: "Editor", status: "Inactive", createdOn: "2025-01-16" },
//         { userId: 6, userName: "Liam Green", userType: "User", status: "Active", createdOn: "2025-01-15" },
//         { userId: 7, userName: "Sophia Black", userType: "Admin", status: "Active", createdOn: "2025-01-14" },
//         { userId: 8, userName: "Lucas Blue", userType: "Editor", status: "Inactive", createdOn: "2025-01-13" },
//         { userId: 9, userName: "Mason Gray", userType: "User", status: "Active", createdOn: "2025-01-12" },
//         { userId: 10, userName: "Isabella Red", userType: "Admin", status: "Inactive", createdOn: "2025-01-11" },
//         // Add more rows as needed
//         { userId: 11, userName: "John Doe", userType: "Admin", status: "Active", createdOn: "2025-01-21" },
//         { userId: 12, userName: "Jane Smith", userType: "Editor", status: "Inactive", createdOn: "2025-01-20" },
//         { userId: 13, userName: "Mike Johnson", userType: "User", status: "Active", createdOn: "2025-01-18" },
//         { userId: 14, userName: "Emma Brown", userType: "Admin", status: "Active", createdOn: "2025-01-17" },
//         { userId: 15, userName: "Olivia White", userType: "Editor", status: "Inactive", createdOn: "2025-01-16" },
//         { userId: 16, userName: "Liam Green", userType: "User", status: "Active", createdOn: "2025-01-15" },
//         { userId: 17, userName: "Sophia Black", userType: "Admin", status: "Active", createdOn: "2025-01-14" },
//         { userId: 18, userName: "Lucas Blue", userType: "Editor", status: "Inactive", createdOn: "2025-01-13" },
//         { userId: 19, userName: "Mason Gray", userType: "User", status: "Active", createdOn: "2025-01-12" },
//         { userId: 20, userName: "Isabella Red", userType: "Admin", status: "Inactive", createdOn: "2025-01-11" },
//         // Add more rows as needed
//         { userId: 1, userName: "John Doe", userType: "Admin", status: "Active", createdOn: "2025-01-21" },
//         { userId: 2, userName: "Jane Smith", userType: "Editor", status: "Inactive", createdOn: "2025-01-20" },
//         { userId: 3, userName: "Mike Johnson", userType: "User", status: "Active", createdOn: "2025-01-18" },
//         { userId: 4, userName: "Emma Brown", userType: "Admin", status: "Active", createdOn: "2025-01-17" },
//         { userId: 5, userName: "Olivia White", userType: "Editor", status: "Inactive", createdOn: "2025-01-16" },
//         { userId: 6, userName: "Liam Green", userType: "User", status: "Active", createdOn: "2025-01-15" },
//         { userId: 7, userName: "Sophia Black", userType: "Admin", status: "Active", createdOn: "2025-01-14" },
//         { userId: 8, userName: "Lucas Blue", userType: "Editor", status: "Inactive", createdOn: "2025-01-13" },
//         { userId: 9, userName: "Mason Gray", userType: "User", status: "Active", createdOn: "2025-01-12" },
//         { userId: 10, userName: "Isabella Red", userType: "Admin", status: "Inactive", createdOn: "2025-01-11" },
//         // Add more rows as needed
//     ];

//     const rowsPerPage = 5; // Number of rows per page
//     const [currentPage, setCurrentPage] = useState(1);

//     // Handle form submission for adding parent category
//     const handleMainCategotry = async (e) => {
//         e.preventDefault();

//         const myform = new FormData();
//         myform.append("pname", parentCategoryName);
//         myform.append("file", parentCategoryImage);
//         try {
//             dispatch(parentCategory(myform)).then((data) => {
//                 if (data.payload.success) {
//                     showSuccessMsg("Parent Category added successfully!");
//                     setParentCategoryName('');   // Reset state
//                     setParentCategoryId('');  // Reset state
//                 }
//             });
//         } catch (error) {
//             showErrorMsg("Failed to add Parent Category.");
//         }
//     };

//     // Filter data based on search query
//     useEffect(() => {
//         if (searchQuery) {
//             setFilteredData(dummyData.filter(item =>
//                 item.userName.toLowerCase().includes(searchQuery.toLowerCase())
//             ));
//         } else {
//             setFilteredData(dummyData);
//         }
//     }, [searchQuery]);

//     // Paginate data
//     const handlePageChange = (page) => {
//         setCurrentPage(page);
//     };

//     const indexOfLastRow = currentPage * rowsPerPage;
//     const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//     const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

//     // Create page numbers
//     const totalPages = Math.ceil(filteredData.length / rowsPerPage);
//     const pageNumbers = [];
//     for (let i = 1; i <= totalPages; i++) {
//         pageNumbers.push(i);
//     }

//     return (
//         <>
//             {isLoading ? <Loader /> : (
//                 <div className="container-fluid">
//                     <div className="row">
//                         <div className="col-12">
//                             <div className="page-title-box">
//                                 <div className="page-title-right">
//                                     <ol className="breadcrumb m-0">
//                                         <li className="breadcrumb-item"><Link to="#" className='text-primary'> Category</Link></li>
//                                         <li className="breadcrumb-item active">Category</li>
//                                     </ol>
//                                 </div>
//                                 <h4 className="page-title"><i className="ri-align-left me-2"></i>Category</h4>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="row">
//                         <div className="col-12">
//                             <div className="card">
//                                 <div className="card-body">
//                                     <div className="row mb-2">
//                                         <div className="col-sm-5">
//                                             <div className="dropdown dropdownAction">
//                                                 <Tooltip title="Add Categories" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
//                                                     <IconButton>
//                                                         <Stack direction="row" spacing={2}>
//                                                             <Button variant="contained" endIcon={<AddIcon />}>
//                                                                 Add Category
//                                                             </Button>
//                                                         </Stack>
//                                                     </IconButton>
//                                                 </Tooltip>
//                                                 <div className="dropdown-menu dropdown-menu-start">
//                                                     <Link to="#" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal1" data-bs-whatever="@mdo1"> <i className="mdi mdi-ray-vertex me-1"></i> Main Category</Link>
//                                                     <Link to="#" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"> <i className="mdi mdi-relation-many-to-one me-1"></i> Sub Category</Link>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <div className="col-sm-7">
//                                             <div className="text-sm-end">
//                                                 <input
//                                                     type="text"
//                                                     className="form-control mb-2"
//                                                     placeholder="Search by User"
//                                                     value={searchQuery}
//                                                     onChange={(e) => setSearchQuery(e.target.value)}
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="table-responsive">
//                                         <table className="table table-centered w-100 dt-responsive nowrap" id="products-datatable">
//                                             <thead className="table-light">
//                                                 <tr>
//                                                     <th className="all" style={{ width: "20px" }}>
//                                                         <div className="form-check">
//                                                             <input type="checkbox" className="form-check-input" id="customCheck1" />
//                                                             <label className="form-check-label" htmlFor="customCheck1">&nbsp;</label>
//                                                         </div>
//                                                     </th>
//                                                     <th>User ID</th>
//                                                     <th>User</th>
//                                                     <th>User Type</th>
//                                                     <th>Status</th>
//                                                     <th>Created On</th>
//                                                     <th style={{ width: "120px" }}>Action</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {currentRows.map(row => (
//                                                     <tr key={row.userId}>
//                                                         <td>
//                                                             <div className="form-check">
//                                                                 <input type="checkbox" className="form-check-input" id={`customCheck${row.userId}`} />
//                                                                 <label className="form-check-label" htmlFor={`customCheck${row.userId}`}>&nbsp;</label>
//                                                             </div>
//                                                         </td>
//                                                         <td>{row.userId}</td>
//                                                         <td>{row.userName}</td>
//                                                         <td>{row.userType}</td>
//                                                         <td><span className="badge bg-success">{row.status}</span></td>
//                                                         <td>{new Date(row.createdOn).toLocaleDateString()}</td>
//                                                         <td>
//                                                             <div className="dropdown">
//                                                                 <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
//                                                                     Actions
//                                                                 </button>
//                                                                 <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
//                                                                     <li><a className="dropdown-item" href="#">View</a></li>
//                                                                     <li><a className="dropdown-item" href="#">Edit</a></li>
//                                                                     <li><a className="dropdown-item" href="#">Delete</a></li>
//                                                                 </ul>
//                                                             </div>
//                                                         </td>
//                                                     </tr>
//                                                 ))}
//                                             </tbody>
//                                         </table>
//                                     </div>

//                                     {/* Pagination Controls - Show Page Numbers */}
//                                     <div className="d-flex justify-content-center mt-3">
//                                         {pageNumbers.map(number => (
//                                             <button
//                                                 key={number}
//                                                 className={`btn btn-light me-2 ${currentPage === number ? 'active' : ''}`}
//                                                 onClick={() => handlePageChange(number)}
//                                             >
//                                                 {number}
//                                             </button>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Modal for adding parent category */}
//             <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//                 <div className="modal-dialog">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <h5 className="modal-title" id="exampleModalLabel"> Add Parent Category</h5>
//                             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                         </div>
//                         <div className="modal-body">
//                             <form onSubmit={handleMainCategotry} encType="multipart/form-data">
//                                 <div className="row mb-2">
//                                     <div className="col-lg-6">
//                                         <label htmlFor=""> Category Name :</label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             placeholder="Enter Category Name"
//                                             name="pname"
//                                             onChange={(e) => setParentCategoryName(e.target.value)}
//                                             value={parentCategoryName}
//                                         />
//                                     </div>
//                                     <div className="col-lg-6">
//                                         <label htmlFor=""> Parent Category Image :</label>
//                                         <input
//                                             type="file"
//                                             className="form-control"
//                                             name="file"
//                                             onChange={(e) => setParentCategoryId(e.target.files[0])}
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className="modal-footer">
//                                     <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//                                     <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save Category</button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }
