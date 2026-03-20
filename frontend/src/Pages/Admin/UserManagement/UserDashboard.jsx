// import React, { useEffect } from 'react'
// import { Link } from 'react-router-dom';
// import DeleteIcon from '@mui/icons-material/Delete';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllUser } from '../../../Store/features/Admin/userSlice';
// export default function UserDashboard() {
//     const dispatch=useDispatch()
//     const{users,isLoading,isAuthentication}=useSelector((state)=>state.adminUser)
//     // useEffect(() => {
//     //     if (!$.fn.dataTable.isDataTable('#products-datatable')) {
//     //         $('#products-datatable').DataTable({
//     //             paging: true,        // Enable pagination
//     //             searching: true,     // Enable search box
//     //             ordering: true,      // Enable column sorting
//     //             info: true,          // Show table information (e.g., "Showing 1 to 10 of 50 entries")
//     //             autoWidth: false     // Adjust column widths automatically
//     //         });
//     //     }
//     // }, []);

//     useEffect(() => {
//         debugger
//         if (!users) {  // Prevent fetching if users are already fetched
//             dispatch(getAllUser());
//         }
//     }, [users, dispatch]);


//     return (
//         <>
//             <div className="container-fluid">

//                 <div className="row">
//                     <div className="col-12">
//                         <div className="page-title-box">
//                             <div className="page-title-right">
//                                 <ol className="breadcrumb m-0">
//                                     <li className="breadcrumb-item"><Link to="#">User Management</Link></li>
//                                     <li className="breadcrumb-item active">User</li>
//                                 </ol>
//                             </div>
//                             <h4 className="page-title"><i className="ri-align-left me-2"></i>User</h4>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="row">
//                     <div className="col-12">
//                         <div className="card">
//                             <div className="card-body">
//                                 <div className="row mb-2">
//                                     <div className="col-sm-5">
//                                         <Link to="/admin/add-product" className="btn adminAddBtn mb-2">
//                                             <i className="mdi mdi-plus-circle me-2"></i> Add User
//                                         </Link>
//                                     </div>
//                                     <div className="col-sm-7">
//                                         <div className="text-sm-end">
//                                             <button type="button" className="btn btn-success mb-2 me-1">
//                                                 <i className="mdi mdi-cog-outline"></i>
//                                             </button>
//                                             <button type="button" className="btn btn-light mb-2 me-1">Import</button>
//                                             <button type="button" className="btn btn-light mb-2">Export</button>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="table-responsive">
//                                     <table className="table table-centered w-100 dt-responsive nowrap" id="products-datatable">
//                                         <thead className="table-light">
//                                             <tr>
//                                                 <th className="all" style={{ width: "20px" }}>
//                                                     <div className="form-check">
//                                                         <input type="checkbox" className="form-check-input" id="customCheck1" />
//                                                         <label className="form-check-label" htmlhtmlFor="customCheck1">&nbsp;</label>
//                                                     </div>
//                                                 </th>
//                                                 <th>User ID</th>
//                                                 <th >User</th>
//                                                 <th>Full Name</th>
//                                                 <th>Email</th>
//                                                 <th>User Type</th>
//                                                 <th>Status</th>
//                                                 <th>Created On</th>
//                                                 <th style={{ width: "120px" }}>Action</th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>
//                                             <tr>
//                                                 <td>
//                                                     <div className="form-check">
//                                                         <input type="checkbox" className="form-check-input" id="customCheck2" />
//                                                         <label className="form-check-label" htmlhtmlFor="customCheck2">&nbsp;</label>
//                                                     </div>
//                                                 </td>
//                                                 <td>
//                                                     011
//                                                 </td>
//                                                 <td>
//                                                     <img src="/assets1/images/products/product-1.jpg" alt="contact-img" title="contact-img" className="rounded me-3" height="48" />

//                                                 </td>
//                                                 <td>Aeron Chairs</td>
//                                                 <td>09/12/2018</td>
//                                                 <td>$148.66</td>
//                                                 <td>254</td>
//                                                 <td><span className="badge bg-success">Active</span></td>
//                                                 {/* <td className="table-action">
//                                                     <Link to="#" className="action-icon"><i className="mdi mdi-eye"></i></Link>
//                                                     <Link to="#" className="action-icon"><i className="mdi mdi-square-edit-outline"></i></Link>
//                                                     <Link to="#" className="action-icon"><i className="mdi mdi-delete"></i></Link>
//                                                 </td> */}
//                                                 <td>
//                                                     <div className="dropdown dropdownAction">
//                                                         {/* <Link to="#" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
//                                                             <i className="mdi mdi-dots-vertical"></i>
//                                                         </Link> */}
//                                                         <Tooltip title="Action" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
//                                                             <IconButton>
//                                                                 <FormatListBulletedIcon />
//                                                             </IconButton>
//                                                         </Tooltip>
//                                                         <div className="dropdown-menu dropdown-menu-end">

//                                                             <Link to="#" className="dropdown-item"> <i className="mdi mdi-eye me-1"></i> View</Link>

//                                                             <Link to="#" className="dropdown-item"> <i className="mdi mdi-square-edit-outline me-1"></i> Edit</Link>

//                                                             <Link to="#" className="dropdown-item"> <i className="mdi mdi-delete me-1"></i> Delete</Link>

//                                                         </div>
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                             {/* More rows here... */}<tr>
//                                                 <td>
//                                                     <div className="form-check">
//                                                         <input type="checkbox" className="form-check-input" id="customCheck2" />
//                                                         <label className="form-check-label" htmlFor="customCheck2">&nbsp;</label>
//                                                     </div>
//                                                 </td>
//                                                 <td>
//                                                     <img src="/assets1/images/products/product-1.jpg" alt="contact-img" title="contact-img" className="rounded me-3" height="48" />
//                                                     <p className="m-0 d-inline-block align-middle font-16">
//                                                         <Link to="apps-ecommerce-products-details.html" className="text-body">Amazing Modern Chair</Link>
//                                                         <br />
//                                                         <span className="text-warning mdi mdi-star"></span>
//                                                         <span className="text-warning mdi mdi-star"></span>
//                                                         <span className="text-warning mdi mdi-star"></span>
//                                                         <span className="text-warning mdi mdi-star"></span>
//                                                         <span className="text-warning mdi mdi-star"></span>
//                                                     </p>
//                                                 </td>
//                                                 <td>
//                                                     Aeron Chairs
//                                                 </td>
//                                                 <td>
//                                                     09/12/2018
//                                                 </td>
//                                                 <td>
//                                                     $148.66
//                                                 </td>

//                                                 <td>
//                                                     254
//                                                 </td>
//                                                 <td>
//                                                     <span className="badge bg-success">Active</span>
//                                                 </td>

//                                                 <td className="table-action">
//                                                     <Link to="#" className="action-icon"> <i className="mdi mdi-eye"></i></Link>
//                                                     <Link to="#" className="action-icon"> <i className="mdi mdi-square-edit-outline"></i></Link>
//                                                     <Link to="#" className="action-icon"> <i className="mdi mdi-delete"></i></Link>
//                                                 </td>
//                                             </tr>

//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }



// import React, { useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteUser, getAllUser } from '../../../Store/features/Admin/userSlice';
// import { format } from 'date-fns';
// import { showSuccessMsg } from '../../../utils/ShowMessage';
// import axiosInstance from '../../../ApiHendler/axiosInstance';

// // Inside your table rendering code


// export default function UserDashboard() {
//     const dispatch = useDispatch();
//     const navigate=useNavigate()
//     const { users, isLoading, isAuthentication,isDeleted } = useSelector((state) => state.adminUser);

//     const handleDelete= async(id)=>{
//         // console.log("kyare",id)
//         dispatch(deleteUser(id))
//         // const response=await axiosInstance.delete(`/api/v1/admin/user/${id}`,{withCredentials:true})
//         // console.log(response.data)
//         // navigate("/admin/user-management")


//     }
//     useEffect(() => {

//             dispatch(getAllUser());

//             // if(isDeleted){
//             //     showSuccessMsg("User Deleted Succssfully !!")
//             // }

//     }, [dispatch]);


//     return (
//         <>
//             <div className="container-fluid">
//                 <div className="row">
//                     <div className="col-12">
//                         <div className="page-title-box">
//                             <div className="page-title-right">
//                                 <ol className="breadcrumb m-0">
//                                     <li className="breadcrumb-item"><Link to="#">User Management</Link></li>
//                                     <li className="breadcrumb-item active">User</li>
//                                 </ol>
//                             </div>
//                             <h4 className="page-title"><i className="ri-align-left me-2"></i>User</h4>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="row">
//                     <div className="col-12">
//                         <div className="card">
//                             <div className="card-body">
//                                 <div className="row mb-2">
//                                     <div className="col-sm-5">
//                                         <Link to="/admin/add-user" className="btn adminAddBtn mb-2">
//                                             <i className="mdi mdi-plus-circle me-2"></i> Add User
//                                         </Link>
//                                     </div>
//                                     <div className="col-sm-7">
//                                         <div className="text-sm-end">
//                                             <button type="button" className="btn btn-success mb-2 me-1">
//                                                 <i className="mdi mdi-cog-outline"></i>
//                                             </button>
//                                             <button type="button" className="btn btn-light mb-2 me-1">Import</button>
//                                             <button type="button" className="btn btn-light mb-2">Export</button>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="table-responsive">
//                                     <table className="table table-centered w-100 dt-responsive nowrap" id="products-datatable">
//                                         <thead className="table-light">
//                                             <tr>
//                                                 <th className="all" style={{ width: "20px" }}>
//                                                     <div className="form-check">
//                                                         <input type="checkbox" className="form-check-input" id="customCheck1" />
//                                                         <label className="form-check-label" htmlFor="customCheck1">&nbsp;</label>
//                                                     </div>
//                                                 </th>
//                                                 <th>User ID</th>
//                                                 <th>User</th>
//                                                 <th>Full Name</th>
//                                                 <th>Email</th>
//                                                 <th>User Type</th>
//                                                 <th>Status</th>
//                                                 <th>Created On</th>
//                                                 <th style={{ width: "120px" }}>Action</th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>
//                                             {Array.isArray(users) && users.map((user) => (
//                                                 <tr key={user._id}>
//                                                     <td>
//                                                         <div className="form-check">
//                                                             <input type="checkbox" className="form-check-input" id={`customCheck-${user._id}`} />
//                                                             <label className="form-check-label" htmlFor={`customCheck-${user._id}`}>&nbsp;</label>
//                                                         </div>
//                                                     </td>
//                                                     <td>{user._id}</td>
//                                                     <td>
//                                                         <img src={`/image/${user.file}`} alt="contact-img" title="user-img" className="rounded me-3" height="48" />
//                                                     </td>
//                                                     <td>{user.name} {user.lname}</td>
//                                                     <td>{user.email}</td>
//                                                     <td>{user.userType}</td>
//                                                     {/* <td><span className={`badge ${user.IsActiv? 'bg-success' : 'bg-danger'}`}></span></td> */}
//                                                     <td>
//                                                         {user.IsActive?
//                                                             <span className="badge bg-success">Active</span>                                                        :                                                     
//                                                             <span className="badge bg-danger">In Active</span>}
//                                                     </td>
//                                                     <td>{user.createdAt ? format(new Date(user.createdAt), 'PPP') : 'N/A'}</td>
//                                                     <td>
//                                                         <div className="dropdown dropdownAction">
//                                                             <Tooltip title="Action" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
//                                                                 <IconButton>
//                                                                     <FormatListBulletedIcon />
//                                                                 </IconButton>
//                                                             </Tooltip>
//                                                             <div className="dropdown-menu dropdown-menu-end">
//                                                                 <Link to="#" className="dropdown-item"> <i className="mdi mdi-eye me-1"></i> View</Link>
//                                                                 <Link to="#" className="dropdown-item"> <i className="mdi mdi-square-edit-outline me-1"></i> Edit</Link>
//                                                                 <Link className="dropdown-item" onClick={()=>handleDelete(user._id)}> <i className="mdi mdi-delete me-1"></i> Delete</Link>
//                                                             </div>
//                                                         </div>
//                                                     </td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }



import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUser } from '../../../Store/features/Admin/userSlice';
import { format } from 'date-fns';
import { showSuccessMsg, showErrorMsg } from '../../../utils/ShowMessage';
import Loader from '../../View/Loader/Loader';

const BASE_URL = import.meta.env.VITE_IMG_URL;


export default function UserDashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { users, isLoading, isAuthentication, isDeleted, error } = useSelector((state) => state.adminUser);


    // Handle user deletion
    const handleDelete = async (id) => {
        dispatch(deleteUser(id));
    };

    useEffect(() => {
        dispatch(getAllUser());


        if (isDeleted) {
            showSuccessMsg("User deleted successfully!");
        }

        if (error) {
            showErrorMsg(error);
        }

    }, [dispatch, isDeleted, error]);

    return (
        <>
            {
                isLoading ? <Loader />
                    :
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box">
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><Link to="#">User Management</Link></li>
                                            <li className="breadcrumb-item active">User</li>
                                        </ol>
                                    </div>
                                    <h4 className="page-title"><i className="ri-align-left me-2"></i>User</h4>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row mb-2">
                                            <div className="col-sm-5">
                                                <Link to="/admin/add-user" className="btn adminAddBtn mb-2">
                                                    <i className="mdi mdi-plus-circle me-2"></i> Add User
                                                </Link>
                                            </div>
                                            <div className="col-sm-7">
                                                <div className="text-sm-end">
                                                    <button type="button" className="btn btn-success mb-2 me-1">
                                                        <i className="mdi mdi-cog-outline"></i>
                                                    </button>
                                                    <button type="button" className="btn btn-light mb-2 me-1">Import</button>
                                                    <button type="button" className="btn btn-light mb-2">Export</button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="table-responsive">
                                            <table className="table table-centered w-100 dt-responsive nowrap" id="products-datatable">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th className="all" style={{ width: "20px" }}>
                                                            <div className="form-check">
                                                                <input type="checkbox" className="form-check-input" id="customCheck1" />
                                                                <label className="form-check-label" htmlFor="customCheck1">&nbsp;</label>
                                                            </div>
                                                        </th>
                                                        <th>User ID</th>
                                                        <th>User</th>
                                                        <th>Full Name</th>
                                                        <th>Email</th>
                                                        <th>User Type</th>
                                                        <th>Status</th>
                                                        <th>Created On</th>
                                                        <th style={{ width: "120px" }}>Action</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {Array.isArray(users) && users.map((user) => (
                                                        <tr key={user._id}>
                                                            <td>
                                                                <div className="form-check">
                                                                    <input type="checkbox" className="form-check-input" id={`customCheck-${user._id}`} />
                                                                    <label className="form-check-label" htmlFor={`customCheck-${user._id}`}>&nbsp;</label>
                                                                </div>
                                                            </td>
                                                            <td>{user._id}</td>
                                                            <td>
                                                                <img src={user.file.url||`${BASE_URL}/${user.file}`} alt="contact-img" title="user-img" className="rounded me-3" height="48" />
                                                            </td>
                                                            <td>{user.name} {user.lname}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.userType}</td>
                                                            <td>
                                                                {user.IsActive ?
                                                                    <span className="badge bg-success">Active</span> :
                                                                    <span className="badge bg-danger">In Active</span>}
                                                            </td>
                                                            <td>{user.createdAt ? format(new Date(user.createdAt), 'PPP') : 'N/A'}</td>
                                                            <td>
                                                                <div className="dropdown dropdownAction">
                                                                    <Tooltip title="Action" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                                                                        <IconButton>
                                                                            <FormatListBulletedIcon />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                    <div className="dropdown-menu dropdown-menu-end">
                                                                        <Link to="#" className="dropdown-item"> <i className="mdi mdi-eye me-1"></i> View</Link>
                                                                        <Link to={`/admin/edit-user-details/${user._id}`} className="dropdown-item"> <i className="mdi mdi-square-edit-outline me-1"></i> Edit</Link>
                                                                        <Link className="dropdown-item" onClick={() => handleDelete(user._id)}> <i className="mdi mdi-delete me-1"></i> Delete</Link>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    );
}
