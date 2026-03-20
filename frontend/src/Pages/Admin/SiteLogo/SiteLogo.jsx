

// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import { format } from 'date-fns';
// import { showSuccessMsg, showErrorMsg } from '../../../utils/ShowMessage';
// import AddIcon from '@mui/icons-material/Add';
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
// import Box from '@mui/material/Box';
// import { DataGrid } from '@mui/x-data-grid';
// import Avatar from '@mui/material/Avatar'; // Avatar component from MUI
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import * as XLSX from "xlsx"

// import "../Category/category.css"
// import axiosInstance from '../../../ApiHendler/axiosInstance';
// import Config from '../../Comman/Config';

// export default function SiteLogo() {
//     const [logoName, setLogoName] = useState('')
//     const [logoUrl, setLogoUrl] = useState('')
//     const [file, setFile] = useState()

//     const [allSiteLogo, setAllSiteLogo] = useState([])
//     const [getId, setGetId] = useState()

//     const childcolumns = [
//         { field: 'id', headerName: 'ID',width:100 },
//         {
//             field: 'avatar', headerName: 'Avatar', width:200 ,renderCell: (params) => (
//                 <Avatar alt={params.row.Name} src={`/image/siteLogo/${params.row.Image}`} />
//             )
//         },
//         { field: 'logoName', headerName: 'Logo Name', editable: true ,width:250 },
//         { field: 'logoUrl', headerName: 'Logo Url', editable: true,width:300  },
//         { field: 'createAt', headerName: 'CreateAt', editable: true, width: 150 },
//         {
//             field: 'actions', headerName: 'Actions', width: 150, renderCell: (params) => (
//                 <div>
//                     <Button color="primary" onClick={() => handleEdit(params.row.dataId)} data-bs-toggle="modal" data-bs-target="#exampleModalEdit" data-bs-whatever="@mdo1"><EditIcon /></Button>
//                     <Button color="secondary" onClick={() => handleDelete(params.row.dataId)}><DeleteIcon /></Button>
//                 </div>
//             )
//         }
//     ]
//     const childrows = (allSiteLogo || []).map((compaigns, index) => ({

//         id: index + 1,
//         dataId: compaigns._id,
//         Image: compaigns.file,
//         logoName: compaigns.logoName,
//         logoUrl: compaigns.logoUrl,
//         createAt: compaigns.createdAt ? format(new Date(compaigns.createdAt), 'PPP') : 'N/A',

//     }));


//     const handleCompaingnsSubmit = async (e) => {
//         e.preventDefault();
//         console.log(file)
//         const myform = new FormData()
//         myform.append("logoName", logoName)
//         myform.append("logoUrl", logoUrl)
//         myform.append("file", file)

//         try {
//             // debugger
//             const response = await axiosInstance.post(Config.END_POINT_LIST["ADD_SITE_LOGO"], myform, { withCredentials: true });
//             // console.log(response)

//             if (response.data.success) {
//                 showSuccessMsg(response.data.message);
//                 //    debugger
//                 setAllSiteLogo((prevState) => [
//                     ...(Array.isArray(prevState) ? prevState : []),  // Ensure it's an array
//                     {
//                         ...response.data.siteLogo,
//                         logoUrl,
//                         logoName,
//                         file: response.data.siteLogo.file,
//                     },
//                 ]);
//             } else {
//                 showErrorMsg(response.data.message);
//             }
//         } catch (error) {
//             showErrorMsg(error.response.data.message);

//         }
//     }

//     useEffect(() => {

//         const fatchData = async () => {
//             try {
//                 //   debugger
//                 const response = await axiosInstance.get(Config.END_POINT_LIST["GET_ALL_SITE_LOGO"], { withCredentials: true })
//                 // console.log(response)
//                 if (response.data.success) {
//                     setAllSiteLogo(response.data.allSiteLogo)
//                 }
//                 else {
//                     showErrorMsg(response.data.message)
//                 }
//             } catch (error) {
//                 showErrorMsg(error.response.data.message);

//             }
//         }
//         fatchData();

//     }, []);

//     const handleDelete = async (id) => {
//         try {
//             //   debugger
//             const response = await axiosInstance.delete(`${Config.END_POINT_LIST["DELETE_SITE_LOGO"]}/${id}`, { withCredentials: true })
//             // console.log(response)

//             if (response.data.success) {
//                 showSuccessMsg(response.data.message)
//                 setAllSiteLogo((prevState) => prevState.filter((contactDetails) => contactDetails._id !== id));
//             }
//             else {
//                 showErrorMsg(response.data.message)
//             }
//         } catch (error) {
//             showErrorMsg(error.response.data.message);

//         }

//     };

//     const handleEdit = (id) => {
//         // debugger
//         setGetId(id)
//         try {
//             const compaigns = allSiteLogo.find(compaigns => compaigns._id === id);
//             if (compaigns) {
//                 setLogoName(compaigns.logoName)
//                 setLogoUrl(compaigns.logoUrl)
//                 setFile(compaigns.file)

//             }

//         } catch (error) {
//             console.log(error);
//         }

//     }

//     const handleEditCompaingnsSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const myform = new FormData()
//             myform.append("logoName", logoName)
//             myform.append("logoUrl", logoUrl)
//             if (file) {
//                 myform.append("file", file)

//             }

//             const response = await axiosInstance.put(`${Config.END_POINT_LIST["UPDATE_SITE_LOGO"]}/${getId}`, myform, { withCredentials: true })
//             // debugger
//             if (response.data.success) {
//                 showSuccessMsg(response.data.message)


//                 setAllSiteLogo((prevState) =>
//                     prevState.map((homeBanner) =>
//                         homeBanner._id === getId
//                             ? { ...homeBanner, logoName, logoUrl, file: response.data.response.file }
//                             : homeBanner
//                     )
//                 );
//             }
//             else {
//                 showErrorMsg(response.data.message)
//             }
//         } catch (error) {
//             showErrorMsg(error.response.data.message);

//         }
//     }

//     // Example for exporting to CSV
//     const handleExport = () => {
//         const ws = XLSX.utils.json_to_sheet(allSiteLogo);
//         const wb = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(wb, ws, "Home Banner");
//         XLSX.writeFile(wb, "homeBanner.xlsx");
//     };

//     return (
//         <>
//             <div className="container-fluid">
//                 <div className="row">
//                     <div className="col-12">
//                         <div className="page-title-box">
//                             <div className="page-title-right">
//                                 <ol className="breadcrumb m-0">
//                                     <li className="breadcrumb-item"><Link to="#" className='text-primary'> Site Logo</Link></li>
//                                     <li className="breadcrumb-item active">Site Logo</li>
//                                 </ol>
//                             </div>
//                             <h4 className="page-title"><i className="ri-align-left me-2"></i>Site Logo</h4>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="row">
//                     <div className="col-12">
//                         <div className="card">
//                             <div className="card-body">
//                                 <div className="row mb-2">
//                                     <div className="col-sm-5">
//                                         <div className="dropdown dropdownAction">
//                                             <Tooltip title="Add Site Logo" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
//                                                 <IconButton>
//                                                     <Stack direction="row" spacing={2}>
//                                                         <Button variant="contained" endIcon={<AddIcon />} data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo1">
//                                                             Add Site Logo
//                                                         </Button>
//                                                     </Stack>
//                                                 </IconButton>
//                                             </Tooltip>

//                                         </div>
//                                     </div>
//                                     <div className="col-sm-7">
//                                         <div className="text-sm-end">
//                                             {/* <button type="button" className="btn btn-success mb-2 me-1">
//                                                 <i className="mdi mdi-cog-outline"></i>
//                                             </button> */}
//                                             <button type="button" className="btn btn-light mb-2 me-1">Import</button>
//                                             <button type="button" className="btn btn-light mb-2" onClick={handleExport}>Export</button>
//                                         </div>
//                                     </div>
//                                 </div>


//                                 <div className="row">
//                                     <div className="col-12 categoriesTable">
//                                         <h3>Site Logo </h3>

//                                         <Box sx={{ height: 400, width: '100%' }}>
//                                             <DataGrid
//                                                 rows={childrows}
//                                                 columns={childcolumns}
//                                                 initialState={{
//                                                     pagination: {
//                                                         paginationModel: {
//                                                             pageSize: 5,
//                                                         },
//                                                     },
//                                                 }}
//                                                 pageSizeOptions={[5]}
//                                                 // checkboxSelection
//                                                 disableRowSelectionOnClick
//                                             />
//                                         </Box>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>


//             <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//                 <div className="modal-dialog">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <h5 className="modal-title" id="exampleModalLabel">New Site Logo</h5>
//                             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                         </div>
//                         <div className="modal-body">
//                             <form onSubmit={handleCompaingnsSubmit} encType="multipart/form-data">
//                                 <div className="row mb-2">
//                                     <div className="col-lg-6">
//                                         <label htmlFor="" className=''> Logo Name :</label>
//                                         <input type="text" className="form-control" placeholder="Enter Logo Name" name="logoName" onChange={(e) => setLogoName(e.target.value)} />

//                                     </div>
//                                     <div className="col-lg-6">
//                                         <label htmlFor="" className=''>  Logo Url :</label>
//                                         <input type="text" className="form-control" placeholder="Enter Loge Url  " name="logoUrl" onChange={(e) => setLogoUrl(e.target.value)} />

//                                     </div>
//                                 </div>

//                                 <div className="row mb-3">
//                                     <div className="col-12">
//                                         <label className="form-label">Image :</label>

//                                         <input type="file" className="form-control" name='file' onChange={(e) => setFile(e.target.files[0])} />
//                                     </div>
//                                 </div>

//                                 <div className="modal-footer">
//                                     <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//                                     <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save</button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="modal fade" id="exampleModalEdit" tabIndex="-1" aria-labelledby="exampleModalEdit" aria-hidden="true">
//                 <div className="modal-dialog">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <h5 className="modal-title" id="exampleModalLabel">Update Site Logo</h5>
//                             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                         </div>
//                         <div className="modal-body">
//                             <form onSubmit={handleEditCompaingnsSubmit} encType="multipart/form-data">
//                                 <div className="row mb-2">
//                                     <div className="col-lg-6">
//                                         <label htmlFor="" className=''> Logo Name :</label>
//                                         <input type="text" className="form-control" placeholder="Enter Logo Name" name="logoName" onChange={(e) => setLogoName(e.target.value)}  value={logoName}/>
//                                     </div>
//                                     <div className="col-lg-6">
//                                         <label htmlFor="" className=''>  Logo Url :</label>
//                                         <input type="text" className="form-control" placeholder="Enter Loge Url  " name="logoUrl" onChange={(e) => setLogoUrl(e.target.value)} value={logoUrl}/>

//                                     </div>
//                                 </div>

//                                 <div className="row mb-3">
//                                     <div className="col-12">
//                                         <label className="form-label">Image :</label>

//                                         <input type="file" className="form-control" name='file' onChange={(e) => setFile(e.target.files[0])} />
//                                         {file && <img src={`/image/siteLogo/${file}`} alt="Current Site Logo Image" style={{ width: '80px', marginTop: '10px' }} />}
//                                     </div>
//                                 </div>

//                                 <div className="modal-footer">
//                                     <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//                                     <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save</button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>


//         </>
//     );
// }




import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
import * as XLSX from "xlsx";

import "../Category/category.css";
import axiosInstance from '../../../ApiHendler/axiosInstance';
import Config from '../../Comman/Config';

const BASE_URL = import.meta.env.VITE_IMG_URL;

export default function SiteLogo() {
    const [logoName, setLogoName] = useState('');
    const [logoUrl, setLogoUrl] = useState('');
    const [file, setFile] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const [allSiteLogo, setAllSiteLogo] = useState([]);
    const [getId, setGetId] = useState();

    const childcolumns = [
        { field: 'id', headerName: 'ID', width: 100 },
        {
            field: 'avatar', headerName: 'Avatar', width: 200, renderCell: (params) => (
                <Avatar alt={params.row.Name} src={`${params.row.Image}`} />
            )
        },
        { field: 'logoName', headerName: 'Logo Name', editable: true, width: 250 },
        { field: 'logoUrl', headerName: 'Logo Url', editable: true, width: 300 },
        { field: 'createAt', headerName: 'CreateAt', editable: true, width: 150 },
        {
            field: 'actions', headerName: 'Actions', width: 150, renderCell: (params) => (
                <div>
                    <Button color="primary" onClick={() => handleEdit(params.row.dataId)} data-bs-toggle="modal" data-bs-target="#exampleModalEdit" data-bs-whatever="@mdo1"><EditIcon /></Button>
                    <Button color="secondary" onClick={() => handleDelete(params.row.dataId)}><DeleteIcon /></Button>
                </div>
            )
        }
    ];

    const childrows = (allSiteLogo || []).map((compaigns, index) => ({
        id: index + 1,
        dataId: compaigns._id,
        Image: compaigns.file.url||`${BASE_URL}/${compaigns.file}`,
        logoName: compaigns.logoName,
        logoUrl: compaigns.logoUrl,
        createAt: compaigns.createdAt ? format(new Date(compaigns.createdAt), 'PPP') : 'N/A',
    }));

    // Filter rows based on search query
    const filteredRows = childrows.filter((row) => {
        return (
            row.logoName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.logoUrl.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const handleCompaingnsSubmit = async (e) => {
        e.preventDefault();
        const myform = new FormData();
        myform.append("logoName", logoName);
        myform.append("logoUrl", logoUrl);
        myform.append("file", file);

        try {
            const response = await axiosInstance.post(Config.END_POINT_LIST["ADD_SITE_LOGO"], myform, { withCredentials: true });

            if (response.data.success) {
                showSuccessMsg(response.data.message);
                setAllSiteLogo((prevState) => [
                    ...(Array.isArray(prevState) ? prevState : []),
                    {
                        ...response.data.siteLogo,
                        logoUrl,
                        logoName,
                        file: response.data.siteLogo.file,
                    },
                ]);
            } else {
                showErrorMsg(response.data.message);
            }
        } catch (error) {
            showErrorMsg(error.response.data.message);
        }
    };

    useEffect(() => {
        const fatchData = async () => {
            try {
                const response = await axiosInstance.get(Config.END_POINT_LIST["GET_ALL_SITE_LOGO"], { withCredentials: true });

                if (response.data.success) {
                    setAllSiteLogo(response.data.allSiteLogo);
                } else {
                    showErrorMsg(response.data.message);
                }
            } catch (error) {
                showErrorMsg(error.response.data.message);
            }
        };
        fatchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await axiosInstance.delete(`${Config.END_POINT_LIST["DELETE_SITE_LOGO"]}/${id}`, { withCredentials: true });

            if (response.data.success) {
                showSuccessMsg(response.data.message);
                setAllSiteLogo((prevState) => prevState.filter((contactDetails) => contactDetails._id !== id));
            } else {
                showErrorMsg(response.data.message);
            }
        } catch (error) {
            showErrorMsg(error.response.data.message);
        }
    };

    const handleEdit = (id) => {
        setGetId(id);
        try {
            const compaigns = allSiteLogo.find(compaigns => compaigns._id === id);
            if (compaigns) {
                setLogoName(compaigns.logoName);
                setLogoUrl(compaigns.logoUrl);
                setFile(compaigns.file);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditCompaingnsSubmit = async (e) => {
        e.preventDefault();
        try {
            const myform = new FormData();
            myform.append("logoName", logoName);
            myform.append("logoUrl", logoUrl);
            if (file) {
                myform.append("file", file);
            }

            const response = await axiosInstance.put(`${Config.END_POINT_LIST["UPDATE_SITE_LOGO"]}/${getId}`, myform, { withCredentials: true });

            if (response.data.success) {
                showSuccessMsg(response.data.message);
                setAllSiteLogo((prevState) =>
                    prevState.map((homeBanner) =>
                        homeBanner._id === getId
                            ? { ...homeBanner, logoName, logoUrl, file: response.data.response.file }
                            : homeBanner
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
        const ws = XLSX.utils.json_to_sheet(allSiteLogo);
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
                                    <li className="breadcrumb-item"><Link to="#" className='text-primary'> Site Logo</Link></li>
                                    <li className="breadcrumb-item active">Site Logo</li>
                                </ol>
                            </div>
                            <h4 className="page-title"><i className="ri-align-left me-2"></i>Site Logo</h4>
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
                                            <Tooltip title="Add Site Logo" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                                                <IconButton>
                                                    <Stack direction="row" spacing={2}>
                                                        <Button variant="contained" endIcon={<AddIcon />} data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo1">
                                                            Add Site Logo
                                                        </Button>
                                                    </Stack>
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </div>
                                    <div className="col-sm-7">
                                        <div className="text-sm-end">
                                            <button type="button" className="btn btn-light mb-2 me-1">Import</button>
                                            <button type="button" className="btn btn-light mb-2" onClick={handleExport}>Export</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-2">
                                    <div className="col-sm-5">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search by Logo Name or URL"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12 categoriesTable">
                                        <h3>Site Logo</h3>
                                        <Box sx={{ height: 400, width: '100%' }}>
                                            <DataGrid
                                                rows={filteredRows} // Use filtered rows
                                                columns={childcolumns}
                                                initialState={{
                                                    pagination: {
                                                        paginationModel: {
                                                            pageSize: 5,
                                                        },
                                                    },
                                                }}
                                                pageSizeOptions={[5]}
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

            {/* Modal for Add Site Logo */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">New Site Logo</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleCompaingnsSubmit} encType="multipart/form-data">
                                <div className="row mb-2">
                                    <div className="col-lg-6">
                                        <label htmlFor="" className=''> Logo Name :</label>
                                        <input type="text" className="form-control" placeholder="Enter Logo Name" name="logoName" onChange={(e) => setLogoName(e.target.value)} />
                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="" className=''> Logo Url :</label>
                                        <input type="text" className="form-control" placeholder="Enter Logo Url" name="logoUrl" onChange={(e) => setLogoUrl(e.target.value)} />
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

            {/* Modal for Edit Site Logo */}
            <div className="modal fade" id="exampleModalEdit" tabIndex="-1" aria-labelledby="exampleModalEdit" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Site Logo</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleEditCompaingnsSubmit} encType="multipart/form-data">
                                <div className="row mb-2">
                                    <div className="col-lg-6">
                                        <label htmlFor="" className=''> Logo Name :</label>
                                        <input type="text" className="form-control" placeholder="Enter Logo Name" name="logoName" onChange={(e) => setLogoName(e.target.value)} value={logoName} />
                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="" className=''> Logo Url :</label>
                                        <input type="text" className="form-control" placeholder="Enter Logo Url" name="logoUrl" onChange={(e) => setLogoUrl(e.target.value)} value={logoUrl} />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-12">
                                        <label className="form-label">Image :</label>
                                        <input type="file" className="form-control" name='file' onChange={(e) => setFile(e.target.files[0])} />
                                        {file && <img src={`${BASE_URL}/${file}`} alt="Current Site Logo Image" style={{ width: '80px', marginTop: '10px' }} />}
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
