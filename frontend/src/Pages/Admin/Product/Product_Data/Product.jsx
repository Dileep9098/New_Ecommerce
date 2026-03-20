// import React from 'react'

// export default function Product() {
//     return (
//         <>
//             <div className="container-fluid">

//                 <div className="row">
//                     <div className="col-12">
//                         <div className="page-title-box">
//                             <div className="page-title-right">
//                                 <ol className="breadcrumb m-0">
//                                     <li className="breadcrumb-item"><Link to="#">Prodcut Catalog</Link></li>
//                                     <li className="breadcrumb-item active">Products</li>
//                                 </ol>
//                             </div>
//                             <h4 className="page-title">Products</h4>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="row">
//                     <div className="col-12">
//                         <div className="card">
//                             <div className="card-body">
//                                 <div className="row mb-2">
//                                     <div className="col-sm-5">
//                                         <Link to="#" className="btn btn-danger mb-2"><i className="mdi mdi-plus-circle me-2"></i> Add Products</Link>
//                                     </div>
//                                     <div className="col-sm-7">
//                                         <div className="text-sm-end">
//                                             <button type="button" className="btn btn-success mb-2 me-1"><i className="mdi mdi-cog-outline"></i></button>
//                                             <button type="button" className="btn btn-light mb-2 me-1">Import</button>
//                                             <button type="button" className="btn btn-light mb-2">Export</button>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="table-responsive">
//                                     <table className="table table-centered w-100 dt-responsive nowrap" id="products-datatable">
//                                         <thead className="table-light">
//                                             <tr>
//                                                 <th className="all" style={{width: "20px"}}>
//                                                     <div className="form-check">
//                                                         <input type="checkbox" className="form-check-input" id="customCheck1" />
//                                                         <label className="form-check-label" for="customCheck1">&nbsp;</label>
//                                                     </div>
//                                                 </th>
//                                                 <th className="all">Product</th>
//                                                 <th>Category</th>
//                                                 <th>Added Date</th>
//                                                 <th>Price</th>
//                                                 <th>Quantity</th>
//                                                 <th>Status</th>
//                                                 <th style={{width: "120px"}}>Action</th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>
{/* <tr>
    <td>
        <div className="form-check">
            <input type="checkbox" className="form-check-input" id="customCheck2" />
            <label className="form-check-label" for="customCheck2">&nbsp;</label>
        </div>
    </td>
    <td>
        <img src="/assets1/images/products/product-1.jpg" alt="contact-img" title="contact-img" className="rounded me-3" height="48" />
        <p className="m-0 d-inline-block align-middle font-16">
            <Link to="apps-ecommerce-products-details.html" className="text-body">Amazing Modern Chair</Link>
            <br />
            <span className="text-warning mdi mdi-star"></span>
            <span className="text-warning mdi mdi-star"></span>
            <span className="text-warning mdi mdi-star"></span>
            <span className="text-warning mdi mdi-star"></span>
            <span className="text-warning mdi mdi-star"></span>
        </p>
    </td>
    <td>
        Aeron Chairs
    </td>
    <td>
        09/12/2018
    </td>
    <td>
        $148.66
    </td>

    <td>
        254
    </td>
    <td>
        <span className="badge bg-success">Active</span>
    </td>

    <td className="table-action">
        <Link to="#" className="action-icon"> <i className="mdi mdi-eye"></i></Link>
        <Link to="#" className="action-icon"> <i className="mdi mdi-square-edit-outline"></i></Link>
        <Link to="#" className="action-icon"> <i className="mdi mdi-delete"></i></Link>
    </td>
</tr>

<tr>
    <td>
        <div className="form-check">
            <input type="checkbox" className="form-check-input" id="customCheck3" />
            <label className="form-check-label" for="customCheck3">&nbsp;</label>
        </div>
    </td>
    <td>
        <img src="/assets1/images/products/product-4.jpg" alt="contact-img" title="contact-img" className="rounded me-3" height="48" />
        <p className="m-0 d-inline-block align-middle font-16">
            <Link to="apps-ecommerce-products-details.html" className="text-body">Biblio Plastic Armchair</Link>
            <br />
            <span className="text-warning mdi mdi-star"></span>
            <span className="text-warning mdi mdi-star"></span>
            <span className="text-warning mdi mdi-star"></span>
            <span className="text-warning mdi mdi-star"></span>
            <span className="text-warning mdi mdi-star-half"></span>
        </p>
    </td>
    <td>
        Wooden Chairs
    </td>
    <td>
        09/08/2018
    </td>
    <td>
        $8.99
    </td>

    <td>
        1,874
    </td>
    <td>
        <span className="badge bg-success">Active</span>
    </td>
    <td className="table-action">
        <Link to="#" className="action-icon"> <i className="mdi mdi-eye"></i></Link>
        <Link to="#" className="action-icon"> <i className="mdi mdi-square-edit-outline"></i></Link>
        <Link to="#" className="action-icon"> <i className="mdi mdi-delete"></i></Link>
    </td>
</tr>
<tr>
    <td>
        <div className="form-check">
            <input type="checkbox" className="form-check-input" id="customCheck4" />
            <label className="form-check-label" for="customCheck4">&nbsp;</label>
        </div>
    </td>
    <td>
        <img src="/assets1/images/products/product-3.jpg" alt="contact-img" title="contact-img" className="rounded me-3" height="48" />
        <p className="m-0 d-inline-block align-middle font-16">
            <Link to="apps-ecommerce-products-details.html" className="text-body">Branded Wooden Chair</Link>
            <br />
            <span className="text-warning mdi mdi-star"></span>
            <span className="text-warning mdi mdi-star"></span>
            <span className="text-warning mdi mdi-star"></span>
            <span className="text-warning mdi mdi-star"></span>
            <span className="text-warning mdi mdi-star-outline"></span>
        </p>
    </td>
    <td>
        Dining Chairs
    </td>
    <td>
        09/05/2018
    </td>
    <td>
        $68.32
    </td>

    <td>
        2,541
    </td>
    <td>
        <span className="badge bg-success">Active</span>
    </td>

    <td className="table-action">
        <Link to="#" className="action-icon"> <i className="mdi mdi-eye"></i></Link>
        <Link to="#" className="action-icon"> <i className="mdi mdi-square-edit-outline"></i></Link>
        <Link to="#" className="action-icon"> <i className="mdi mdi-delete"></i></Link>
    </td>
</tr>



<tr>
    <td>
        <div className="form-check">
            <input type="checkbox" className="form-check-input" id="customCheck13" />
            <label className="form-check-label" for="customCheck13">&nbsp;</label>
        </div>
    </td>
    <td>
        <img src="/assets1/images/products/product-6.jpg" alt="contact-img" title="contact-img" className="rounded me-3" height="48" />
        <p className="m-0 d-inline-block align-middle font-16">
            <Link to="apps-ecommerce-products-details.html" className="text-body">Unpowered aircraft</Link>
            <br />
            <span className="text-warning mdi mdi-star"></span>
            <span className="text-warning mdi mdi-star"></span>
            <span className="text-warning mdi mdi-star"></span>
            <span className="text-warning mdi mdi-star"></span>
            <span className="text-warning mdi mdi-star-half"></span>
        </p>
    </td>
    <td>
        Wing Chairs
    </td>
    <td>
        03/24/2018
    </td>
    <td>
        $49
    </td>

    <td>
        204
    </td>
    <td>
        <span className="badge bg-danger">Deactive</span>
    </td>

    <td className="table-action">
        <Link to="#" className="action-icon"> <i className="mdi mdi-eye"></i></Link>
        <Link to="#" className="action-icon"> <i className="mdi mdi-square-edit-outline"></i></Link>
        <Link to="#" className="action-icon"> <i className="mdi mdi-delete"></i></Link>
    </td>
</tr>
                                        </tbody> */}
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
// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { deleteProduct, getAllProducts } from '../../../../Store/features/product/productSlice';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import { format } from 'date-fns';
// import AddIcon from '@mui/icons-material/Add';
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
// import Box from '@mui/material/Box';
// import { DataGrid } from '@mui/x-data-grid';
// import Avatar from '@mui/material/Avatar'; // Avatar component from MUI
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import * as XLSX from "xlsx";
// import "./product.css"
// import { showSuccessMsg ,showErrorMsg} from '../../../../utils/ShowMessage';
// import Loader from '../../../View/Loader/Loader';
// import axiosInstance from '../../../../ApiHendler/axiosInstance';
// import Config from '../../../Comman/Config';

// const BASE_URL = import.meta.env.VITE_IMG_URL;


// export default function Product() {

//     const dispatch = useDispatch()
//     // const { isLoading, products, isDelete } = useSelector((state) => state.product)
//     const [searchQuery, setSearchQuery] = useState('');
//     const [getId, setGetId] = useState();
//     const [isLoading, setIsLoading] = useState(false);
//     // const [isDelete, setIsDelete] = useState(false);
//     const [file, setFile] = useState(null);
//     const [allProduct, setAllProduct] = useState([]);

//     useEffect(() => {
//         if (!$.fn.dataTable.isDataTable('#products-datatable')) {
//             $('#products-datatable').DataTable({
//                 paging: true,
//                 searching: true,
//                 ordering: true,
//                 info: true,
//                 autoWidth: false
//             });
//         }
//         const param = {
//             serach: searchQuery || ''
//         }

//         // dispatch(getAllProducts(param))

//         // const fetchData = async () => {
//         //     try {
//         //         const response = await axiosInstance.get(Config.END_POINT_LIST["GET_ALL_PRODUCTS"], { withCredentials: true });
//         //         setIsLoading(true)
//         //         if (response.data.success) {
//         //             setAllProduct(response.data.allProductsFeatures);
//         //             setIsLoading(false)
//         //         } else {
//         //             showErrorMsg(response.data.message);
//         //         }
//         //     } catch (error) {
//         //         showErrorMsg(error.response.data.message);
//         //     }
//         // };
//         // fetchData();

//     }, []);
//     const [page, setPage] = useState(0); // Page state, default to 0 for first page
//     const [productCount, setProductCount] = useState(0); // Total number of products


//     const [limit, setLimit] = useState(10); // Limit for pagination

//     // Fetch data with pagination
//     const fetchData = async (page = page, limit = limit) => {
//         try {
//             const response = await axiosInstance.get(Config.END_POINT_LIST["GET_ALL_PRODUCTS"], {
//                 params: { page, limit },
//                 withCredentials: true,
//             });
//             setIsLoading(true);
//             if (response.data.success) {
//                 setAllProduct(response.data.allProductsFeatures);
//                 setProductCount(response.data.productCount);
//                 setIsLoading(false);
//             } else {
//                 console.error(response.data.message);
//             }
//         } catch (error) {
//             console.error(error.response?.data?.message || error.message);
//         }
//     };

//     useEffect(() => {
//         fetchData(page + 1, limit); // Fetch data when page changes (1-based page number)
//     }, [page, limit]); // Ensure fetch data when either page or limit changes

//     // Handle page change event
//     const handlePageChange = (newPage) => {
//         setPage(newPage); // Update the page state with the new page
//     };

//     // Handle limit change event (page size)
//     const handleLimitChange = (event) => {
//         setLimit(event.target.value); // Update the limit (page size)
//         setPage(0); // Reset to first page when limit changes
//     };

//     const productColumns = [
//         { field: 'id', headerName: 'ID', width: 40 },
//         {
//             field: 'avatar', headerName: 'Image', width: 130, renderCell: (params) => (
//                 <Avatar alt={params.row.Name} src={`${BASE_URL}/${params.row.Image}`} sx={{ width: 100, height: 100 }} />
//             )
//         },
//         { field: 'Name', headerName: 'Name', editable: true, width: 350 },
//         {
//             field: 'Price', headerName: 'Price', editable: true, width: 100, renderCell: (params) => (
//                 <span style={{ color: "rgb(0, 33, 87)", fontSize: "16px", fontWeight: "600" }}>&#8377; {params.value}</span>
//             )
//         },
//         { field: 'StockQuantity', headerName: 'Stock Quantity', editable: true, width: 100 },
//         {
//             field: 'IsActive', headerName: 'Status', width: 150,
//             renderCell: (params) => {
//                 // Apply inline styles directly here
//                 const isActive = params.value === "Active";
//                 return (
//                     <div

//                     >
//                         <span style={{
//                             backgroundColor: isActive ? '#66bb6a' : '#03a9f4', // Light green for active, light red for inactive
//                             color: "white",
//                             padding: '3px 10px',
//                             borderRadius: '5px',
//                             textAlign: 'center', fontSize: "12px",
//                         }}>{params.value}</span>
//                     </div>
//                 );
//             },
//         },
//         { field: 'createAt', headerName: 'CreateAt', editable: true, width: 150 },
//         {
//             field: 'actions', headerName: 'Actions', width: 150, renderCell: (params) => (
//                 <div>
//                     <Link to={`/admin/update-product/${params.row.dataId}`} color="text-dark" style={{ color: "rgb(0, 33, 87)" }} ><EditIcon /></Link>
//                     <Button color="secondary" onClick={() => handleDelete(params.row.dataId)}><DeleteIcon /></Button>
//                 </div>
//             )
//         }
//     ];

//     const productRows = (Array.isArray(allProduct) ? allProduct : []).map((product, index) => ({
//         id: index + 1,
//         dataId: product._id,
//         Image: product.ProductPictures && product.ProductPictures.length > 0 ? product.ProductPictures[0] : "", // 🛠 Fix for undefined images
//         Name: product.ProductName || "No Name", // 🛠 Fix for missing names
//         Price: product.Price || 0, // 🛠 Default value if price is missing
//         StockQuantity: product.StockQuantity || "N/A", // 🛠 Handle missing stock quantity
//         IsActive: product.IsActive ? "Active" : "Inactive",
//         createAt: product.createdAt ? format(new Date(product.createdAt), 'PPP') : 'N/A',
//     }));


//     // Filter rows based on search query
//     const filteredRows = productRows.filter((row) => {

//         return (
//             (row.Name.toLowerCase().includes(searchQuery.toLowerCase())) ||
//             row.Price == searchQuery || row.StockQuantity == searchQuery
//         );
//     });

//     // const productRows = (products&&products || []).map((product, index) => ({
//     //     id: index + 1,
//     //     dataId: product._id,
//     //     Image: product.ProductPictures[0],
//     //     Name: product.ProductName,
//     //     Price: product.Price,
//     //     StockQuantity: product.StockQuantity,
//     //     IsActive: product.IsActive ? "Active" : "In Active",

//     //     createAt: product.createdAt ? format(new Date(product.createdAt), 'PPP') : 'N/A',
//     // }));


//     // const productRows = (Array.isArray(allProduct) ? allProduct : []).map((product, index) => ({
//     //     id: index + 1,
//     //     dataId: product._id,
//     //     Image: product.ProductPictures[0],
//     //     Name: product.ProductName,
//     //     Price: product.Price,
//     //     StockQuantity: product.StockQuantity,
//     //     IsActive: product.IsActive ? "Active" : "In Active",
//     //     createAt: product.CreatedOn ? format(new Date(product.CreatedOn), 'PPP') : 'N/A',
//     // }));





//     const handleExport = () => {
//         const ws = XLSX.utils.json_to_sheet(allProduct);
//         const wb = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(wb, ws, "Home Banner");
//         XLSX.writeFile(wb, "homeBanner.xlsx");
//     };

//     // const handleDelete = (id) => {

//     //     console.log("Hello")
//     //     console.log(id)

//     //     dispatch(deleteProduct(id))
//     //     setAllProduct((prevState) => prevState.filter((contactDetails) => contactDetails._id !== id));

//     // }


//     const handleDelete = async (id) => {
//         try {
//             // console.log("Hello");
//             // console.log(id);

//             // Await the result of the dispatch
//             const response = await dispatch(deleteProduct(id));

//             // Extract the message from the response payload
//             const successMessage = response.payload.message;

//             // Show the success message using showSuccessMsg
//             if (response.payload.success) {
//                 showSuccessMsg(successMessage);
//             }

//             // Update state after deletion
//             setAllProduct((prevState) => prevState.filter((contactDetails) => contactDetails._id !== id));
//         } catch (error) {
//             console.error("Error deleting product:", error);
//         }
//     };



//     // useEffect(() => {
//     //     if (isDelete) {
//     //         // setAllProduct((prevState) => prevState.filter((contactDetails) => contactDetails._id !== id));
//     //         showSuccessMsg("Product Deleted Successfully !!")

//     //     }
//     // }, [isDelete])



//     // Upload Excel Or CSV File

//     const handleFileChange = (e) => {
//       setFile(e.target.files[0]);
//     };

//      const hadleExcelFile = async (e) => {
//         const formData = new FormData();
//         formData.append('file', file);    
//             try {
//                 const response = await axiosInstance.post(Config.END_POINT_LIST["UPLOAD_BULK_EXCEL_FILE"],formData, { withCredentials: true });

//                 if (response.data.success) {
//                     showSuccessMsg(response.data.message);


//                 } else {
//                     showErrorMsg(response.data.message);
//                 }
//             } catch (error) {
//                 showErrorMsg(error.response.data.message);
//             }
//         };


//     return (
//         <>
//             {isLoading ? <Loader />

//                 :
//                 <div className="container-fluid">

//                     <div className="row">
//                         <div className="col-12">
//                             <div className="page-title-box">
//                                 <div className="page-title-right">
//                                     <ol className="breadcrumb m-0">
//                                         <li className="breadcrumb-item"><Link to="#">Product Catalog</Link></li>
//                                         <li className="breadcrumb-item active">Products</li>
//                                     </ol>
//                                 </div>
//                                 <h4 className="page-title"><i className="ri-align-left me-2"></i>Products</h4>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="row">
//                         <div className="col-12">
//                             <div className="card">
//                                 <div className="card-body">
//                                     <div className="row mb-2">
//                                         <div className="col-sm-5">
//                                             <Link to="/admin/add-product" className="btn adminAddBtn mb-2">
//                                                 <i className="mdi mdi-plus-circle me-2"></i> Add Products
//                                             </Link>
//                                         </div>
//                                         <div className="col-sm-7">
//                                             <div className="text-sm-end">
//                                                 <button type="button" className="btn adminAddBtn mb-2 me-1">
//                                                     <i className="mdi mdi-cog-outline"></i>
//                                                 </button>
//                                                 <button type="button" className="btn btn-light mb-2 me-1" data-bs-toggle="modal" data-bs-target="#exampleModal1">Import</button>
//                                                 <button type="button" className="btn btn-light mb-2" onClick={handleExport}>Export</button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="row mb-2">
//                                         <div className="col-sm-7">
//                                             <div className="categoriesTable">
//                                                 <h3>Product List</h3>
//                                             </div>
//                                         </div>
//                                         <div className="col-sm-5">
//                                             <div className="text-sm-end">
//                                                 <div className="app-search dropdown ">
//                                                     <form>
//                                                         <div className="input-group">
//                                                             <input type="search" className="form-control" placeholder="Search by Product Name or Price or Stock Quantity"
//                                                                 value={searchQuery}
//                                                                 onChange={(e) => setSearchQuery(e.target.value)} id="top-search" style={{ fontStyle: "italic" }} />
//                                                             <span className="mdi mdi-magnify search-icon"></span>
//                                                             <button className="input-group-text  adminAddBtn" type="submit">Search</button>
//                                                         </div>
//                                                     </form>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>



//                                     {/* <div className="table-responsive">
//                                <table className="table table-centered w-100 dt-responsive nowrap" id="products-datatable">
//                                    <thead className="table-light">
//                                        <tr>

//                                            <th>S</th>
//                                            <th className="all">Product</th>
//                                            <th>Category</th>
//                                            <th>Added Date</th>
//                                            <th>Price</th>
//                                            <th>Quantity</th>
//                                            <th>Status</th>
//                                            <th style={{ width: "120px" }}>Action</th>
//                                        </tr>
//                                    </thead>

//                                    <tbody>
//                                        {
//                                            products && products.length > 0 ?
//                                                <>
//                                                    {
//                                                        products.map((item, ind) => (
//                                                            <tr>

//                                                                <td>
//                                                                    <img src="/assets1/images/products/product-1.jpg" alt="contact-img" title="contact-img" className="rounded me-3" height="48" />
//                                                                    <p className="m-0 d-inline-block align-middle font-16">
//                                                                        <Link to="apps-ecommerce-products-details.html" className="text-body">Amazing Modern Chair</Link>
//                                                                    </p>
//                                                                </td>
//                                                                <td>Aeron Chairs</td>
//                                                                <td>09/12/2018</td>
//                                                                <td>$148.66</td>
//                                                                <td>254</td>
//                                                                <td><span className="badge bg-success">Active</span></td>
//                                                                <td className="table-action">
//                                                                    <Link to="#" className="action-icon"><i className="mdi mdi-eye"></i></Link>
//                                                                    <Link to="#" className="action-icon"><i className="mdi mdi-square-edit-outline"></i></Link>
//                                                                    <Link to="#" className="action-icon"><i className="mdi mdi-delete"></i></Link>
//                                                                </td>
//                                                            </tr>
//                                                        ))
//                                                    }

//                                                </>

//                                                : ""
//                                        }


//                                    </tbody>
//                                </table>
//                            </div> */}
//                                     <div className="row">
//                                         <div className="col-12 categoriesTable">
//                                             {/* <h3>Product List</h3> */}
//                                             <Box sx={{ height: 600, width: '100%' }}>

//                                                 {/* <DataGrid

//                                                     rows={filteredRows} // Use filtered rows
//                                                     columns={productColumns}
//                                                     initialState={{
//                                                         pagination: {
//                                                             paginationModel: {
//                                                                 pageSize: 10,
//                                                             },
//                                                         },
//                                                     }}
//                                                     pageSizeOptions={[5]}
//                                                     disableRowSelectionOnClick
//                                                     rowHeight={105}

//                                                 /> */}

// <DataGrid
//                 rows={filteredRows} // Use filtered rows
//                 columns={productColumns}
//                 pageSize={limit} // Page size set from limit state
//                 page={page} // Pass the page value here
//                 paginationMode="server"
//                 rowCount={productCount} // Total count of products
//                 onPageChange={handlePageChange} // Update the page on change
//                 onPageSizeChange={handleLimitChange} // Update page size (limit) on change
//                 disableRowSelectionOnClick
//                 rowHeight={105}
//             />
//                                             </Box>

//                                         </div>
//                                     </div>

//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>




//             }
// <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//     <div className="modal-dialog modal-lg">
//         <div className="modal-content">
//             {/* Modal Header */}
//             <div className="modal-header bg-dark text-white">
//                 <h5 className="modal-title" id="exampleModalLabel">
//                     <i className="fas fa-tags"></i>  Upload Bulk Products
//                 </h5>
//                 <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
//             </div>

//             {/* Modal Body */}
//             <div className="modal-body">
//                 <form onSubmit={hadleExcelFile} encType='multipart/form-data'>

//                     {/* File Upload - Drag & Drop */}
//                     <div className="mb-3">
//                         <label className="form-label fw-semibold">Upload Excel/CSV File:</label>
//                         <div className="border border-2 border-dashed rounded-3 p-4 text-center bg-light shadow-sm"
//                             id="drop-area"
//                             onClick={() => document.getElementById("fileUpload").click()} style={{ cursor: "pointer" }}>
//                             <i className="fas fa-file-upload fa-2x text-primary"></i>
//                             <p className="mt-2 mb-0 text-muted">Drag & Drop or Click to Upload</p>
//                         </div>
//                         <input type="file" id="fileUpload" className="form-control d-none" accept=".csv, .xls, .xlsx"
//                             onChange={ handleFileChange} required name='file' />
//                         <small className="text-muted">Supported formats: <strong>.csv, .xls, .xlsx</strong></small>
//                         <p id="file-name" className="mt-2 text-success"></p>
//                     </div>

//                     {/* Modal Footer */}
//                     <div className="modal-footer">
//                         <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
//                             <i className="fas fa-times"></i> Close
//                         </button>
//                         <button type="submit" className="btn btn-success">
//                             <i className="fas fa-save"></i> Save Discount
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     </div>
// </div>


//         </>
//     )
// }









// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { deleteProduct, getAllProducts } from '../../../../Store/features/product/productSlice';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import { format } from 'date-fns';
// import AddIcon from '@mui/icons-material/Add';
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
// import Box from '@mui/material/Box';
// import { DataGrid } from '@mui/x-data-grid';
// import Avatar from '@mui/material/Avatar'; // Avatar component from MUI
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import * as XLSX from "xlsx";
// import "./product.css"
// import { showSuccessMsg ,showErrorMsg} from '../../../../utils/ShowMessage';
// import Loader from '../../../View/Loader/Loader';
// import axiosInstance from '../../../../ApiHendler/axiosInstance';
// import Config from '../../../Comman/Config';

// const BASE_URL = import.meta.env.VITE_IMG_URL;


// export default function Product() {

//     const dispatch = useDispatch()
//     // const { isLoading, products, isDelete } = useSelector((state) => state.product)
//     const [searchQuery, setSearchQuery] = useState('');
//     const [getId, setGetId] = useState();
//     const [isLoading, setIsLoading] = useState(false);
//     // const [isDelete, setIsDelete] = useState(false);
//     const [file, setFile] = useState(null);
//     const [allProduct, setAllProduct] = useState([]);

//     useEffect(() => {
//         if (!$.fn.dataTable.isDataTable('#products-datatable')) {
//             $('#products-datatable').DataTable({
//                 paging: true,
//                 searching: true,
//                 ordering: true,
//                 info: true,
//                 autoWidth: false
//             });
//         }
//         const param = {
//             serach: searchQuery || ''
//         }

//     }, []);
//     const [page, setPage] = useState(0); // Page state, default to 0 for first page
//     const [productCount, setProductCount] = useState(0); // Total number of products


//     const [limit, setLimit] = useState(10); // Limit for pagination

//     // Fetch data with pagination
//     const fetchData = async (page = page, limit = limit) => {
//         try {
//             const response = await axiosInstance.get(Config.END_POINT_LIST["GET_ALL_PRODUCTS"], {
//                 params: { page, limit },
//                 withCredentials: true,
//             });
//             setIsLoading(true);
//             if (response.data.success) {
//                 setAllProduct(response.data.allProductsFeatures);
//                 setProductCount(response.data.productCount);
//                 setIsLoading(false);
//             } else {
//                 console.error(response.data.message);
//             }
//         } catch (error) {
//             console.error(error.response?.data?.message || error.message);
//         }
//     };

//     useEffect(() => {
//         fetchData(page + 1, limit); // Fetch data when page changes (1-based page number)
//     }, [page, limit]); // Ensure fetch data when either page or limit changes

//     const handlePageChange = (newPage) => {
//         setPage(newPage); // Update the page state with the new page
//     };

//     // Handle limit change event (page size)
//     const handleLimitChange = (event) => {
//         setLimit(event.target.value); // Update the limit (page size)
//         setPage(0); // Reset to first page when limit changes
//     };

//     const productColumns = [
//         { field: 'id', headerName: 'ID', width: 40 },
//         {
//             field: 'avatar', headerName: 'Image', width: 130, renderCell: (params) => (
//                 <Avatar alt={params.row.Name} src={`${BASE_URL}/${params.row.Image}`} sx={{ width: 100, height: 100 }} />
//             )
//         },
//         { field: 'Name', headerName: 'Name', editable: true, width: 350 },
//         {
//             field: 'Price', headerName: 'Price', editable: true, width: 100, renderCell: (params) => (
//                 <span style={{ color: "rgb(0, 33, 87)", fontSize: "16px", fontWeight: "600" }}>&#8377; {params.value}</span>
//             )
//         },
//         { field: 'StockQuantity', headerName: 'Stock Quantity', editable: true, width: 100 },
//         {
//             field: 'IsActive', headerName: 'Status', width: 150,
//             renderCell: (params) => {
//                 // Apply inline styles directly here
//                 const isActive = params.value === "Active";
//                 return (
//                     <div

//                     >
//                         <span style={{
//                             backgroundColor: isActive ? '#66bb6a' : '#03a9f4', // Light green for active, light red for inactive
//                             color: "white",
//                             padding: '3px 10px',
//                             borderRadius: '5px',
//                             textAlign: 'center', fontSize: "12px",
//                         }}>{params.value}</span>
//                     </div>
//                 );
//             },
//         },
//         { field: 'createAt', headerName: 'CreateAt', editable: true, width: 150 },
//         {
//             field: 'actions', headerName: 'Actions', width: 150, renderCell: (params) => (
//                 <div>
//                     <Link to={`/admin/update-product/${params.row.dataId}`} color="text-dark" style={{ color: "rgb(0, 33, 87)" }} ><EditIcon /></Link>
//                     <Button color="secondary" onClick={() => handleDelete(params.row.dataId)}><DeleteIcon /></Button>
//                 </div>
//             )
//         }
//     ];

//     const productRows = (Array.isArray(allProduct) ? allProduct : []).map((product, index) => ({
//         id: index + 1,
//         dataId: product._id,
//         Image: product.ProductPictures && product.ProductPictures.length > 0 ? product.ProductPictures[0] : "", // 🛠 Fix for undefined images
//         Name: product.ProductName || "No Name", // 🛠 Fix for missing names
//         Price: product.Price || 0, // 🛠 Default value if price is missing
//         StockQuantity: product.StockQuantity || "N/A", // 🛠 Handle missing stock quantity
//         IsActive: product.IsActive ? "Active" : "Inactive",
//         createAt: product.createdAt ? format(new Date(product.createdAt), 'PPP') : 'N/A',
//     }));

//        const filteredRows = productRows.filter((row) => {

//         return (
//             (row.Name.toLowerCase().includes(searchQuery.toLowerCase())) ||
//             row.Price == searchQuery || row.StockQuantity == searchQuery
//         );
//     });

//     const handleExport = () => {
//         const ws = XLSX.utils.json_to_sheet(allProduct);
//         const wb = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(wb, ws, "Home Banner");
//         XLSX.writeFile(wb, "homeBanner.xlsx");
//     };


//     const handleDelete = async (id) => {
//         try {

//             const response = await dispatch(deleteProduct(id));
//                 const successMessage = response.payload.message;
//                 if (response.payload.success) {
//                 showSuccessMsg(successMessage);
//             }

//             // Update state after deletion
//             setAllProduct((prevState) => prevState.filter((contactDetails) => contactDetails._id !== id));
//         } catch (error) {
//             console.error("Error deleting product:", error);
//         }
//     };


//     const handleFileChange = (e) => {
//       setFile(e.target.files[0]);
//     };

//      const hadleExcelFile = async (e) => {
//         const formData = new FormData();
//         formData.append('file', file);    
//             try {
//                 const response = await axiosInstance.post(Config.END_POINT_LIST["UPLOAD_BULK_EXCEL_FILE"],formData, { withCredentials: true });

//                 if (response.data.success) {
//                     showSuccessMsg(response.data.message);


//                 } else {
//                     showErrorMsg(response.data.message);
//                 }
//             } catch (error) {
//                 showErrorMsg(error.response.data.message);
//             }
//         };


//     return (
//         <>
//             {isLoading ? <Loader />

//                 :
//                 <div className="container-fluid">

//                     <div className="row">
//                         <div className="col-12">
//                             <div className="page-title-box">
//                                 <div className="page-title-right">
//                                     <ol className="breadcrumb m-0">
//                                         <li className="breadcrumb-item"><Link to="#">Product Catalog</Link></li>
//                                         <li className="breadcrumb-item active">Products</li>
//                                     </ol>
//                                 </div>
//                                 <h4 className="page-title"><i className="ri-align-left me-2"></i>Products</h4>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="row">
//                         <div className="col-12">
//                             <div className="card">
//                                 <div className="card-body">
//                                     <div className="row mb-2">
//                                         <div className="col-sm-5">
//                                             <Link to="/admin/add-product" className="btn adminAddBtn mb-2">
//                                                 <i className="mdi mdi-plus-circle me-2"></i> Add Products
//                                             </Link>
//                                         </div>
//                                         <div className="col-sm-7">
//                                             <div className="text-sm-end">
//                                                 <button type="button" className="btn adminAddBtn mb-2 me-1">
//                                                     <i className="mdi mdi-cog-outline"></i>
//                                                 </button>
//                                                 <button type="button" className="btn btn-light mb-2 me-1" data-bs-toggle="modal" data-bs-target="#exampleModal1">Import</button>
//                                                 <button type="button" className="btn btn-light mb-2" onClick={handleExport}>Export</button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="row mb-2">
//                                         <div className="col-sm-7">
//                                             <div className="categoriesTable">
//                                                 <h3>Product List</h3>
//                                             </div>
//                                         </div>
//                                         <div className="col-sm-5">
//                                             <div className="text-sm-end">
//                                                 <div className="app-search dropdown ">
//                                                     <form>
//                                                         <div className="input-group">
//                                                             <input type="search" className="form-control" placeholder="Search by Product Name or Price or Stock Quantity"
//                                                                 value={searchQuery}
//                                                                 onChange={(e) => setSearchQuery(e.target.value)} id="top-search" style={{ fontStyle: "italic" }} />
//                                                             <span className="mdi mdi-magnify search-icon"></span>
//                                                             <button className="input-group-text  adminAddBtn" type="submit">Search</button>
//                                                         </div>
//                                                     </form>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="row">
//                                         <div className="col-12 categoriesTable">
//                                             {/* <h3>Product List</h3> */}
//                                             <Box sx={{ height: 600, width: '100%' }}>


// <DataGrid
//                 rows={filteredRows} // Use filtered rows
//                 columns={productColumns}
//                 pageSize={limit} // Page size set from limit state
//                 page={page} // Pass the page value here
//                 paginationMode="server"
//                 rowCount={productCount} // Total count of products
//                 onPageChange={handlePageChange} // Update the page on change
//                 onPageSizeChange={handleLimitChange} // Update page size (limit) on change
//                 disableRowSelectionOnClick
//                 rowHeight={105}
//             />
//                                             </Box>

//                                         </div>
//                                     </div>

//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//             }
//             <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//                 <div className="modal-dialog modal-lg">
//                     <div className="modal-content">
//                         {/* Modal Header */}
//                         <div className="modal-header bg-dark text-white">
//                             <h5 className="modal-title" id="exampleModalLabel">
//                                 <i className="fas fa-tags"></i>  Upload Bulk Products
//                             </h5>
//                             <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
//                         </div>

//                         {/* Modal Body */}
//                         <div className="modal-body">
//                             <form onSubmit={hadleExcelFile} encType='multipart/form-data'>

//                                 {/* File Upload - Drag & Drop */}
//                                 <div className="mb-3">
//                                     <label className="form-label fw-semibold">Upload Excel/CSV File:</label>
//                                     <div className="border border-2 border-dashed rounded-3 p-4 text-center bg-light shadow-sm"
//                                         id="drop-area"
//                                         onClick={() => document.getElementById("fileUpload").click()} style={{ cursor: "pointer" }}>
//                                         <i className="fas fa-file-upload fa-2x text-primary"></i>
//                                         <p className="mt-2 mb-0 text-muted">Drag & Drop or Click to Upload</p>
//                                     </div>
//                                     <input type="file" id="fileUpload" className="form-control d-none" accept=".csv, .xls, .xlsx"
//                                         onChange={ handleFileChange} required name='file' />
//                                     <small className="text-muted">Supported formats: <strong>.csv, .xls, .xlsx</strong></small>
//                                     <p id="file-name" className="mt-2 text-success"></p>
//                                 </div>

//                                 {/* Modal Footer */}
//                                 <div className="modal-footer">
//                                     <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
//                                         <i className="fas fa-times"></i> Close
//                                     </button>
//                                     <button type="submit" className="btn btn-success">
//                                         <i className="fas fa-save"></i> Save Discount
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>


//         </>
//     )
// }
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, IconButton, Menu, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { format } from 'date-fns';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import * as XLSX from 'xlsx';

import { Pagination } from '@mui/material';
import './ProductTable.css';
import { Tooltip } from '@mui/material'; // Import Tooltip
import { useDispatch, useSelector } from 'react-redux';
import UploadIcon from '@mui/icons-material/Upload';  // Import the UploadIcon for Import button
import DownloadIcon from '@mui/icons-material/Download';  // Import the DownloadIcon for Export button
// import { setCurrentPage } from '../../../../Store/features/paginationSlice/paginationSlice';
import Loader from "../../../../UI/Loader/Loader"
import axiosInstance from '../../../../ApiHendler/axiosInstance';
import Config from '../../../../Config/Config';
import { showErrorMsg, showSuccessMsg } from '../../../../utils/ShowMessages';
import { setCurrentPage } from '../../../../Store/Feature/paginationSlice/paginationSlice';

const BASE_URL = import.meta.env.VITE_IMG_URL;

export default function Product() { 
    const [allProduct, setAllProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [file, setFile] = useState();
    // const [limit, setLimit] = useState(10);
    const [productCount, setProductCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const {currentPage,limit}=useSelector((state)=>state.pagination)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const fetchData = async (page = 1, limit = 10) => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.get(Config.END_POINT_LIST['GET_ALL_PRODUCTS'], {
                params: { page, limit },
                withCredentials: true,
            });
            if (response.data.success) {
                setAllProduct(response.data.allProductsFeatures);
                setProductCount(response.data.productCount);
            } else {
                console.error(response.data.message);
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error.response?.data?.message || error.message);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(currentPage, limit);
    }, [currentPage, limit]);

    const productRows = allProduct.map((product, index) => ({
        id: index + 1,
        dataId: product._id,
        Image: product.ProductPictures && product.ProductPictures.length > 0 ? product.ProductPictures[0] : '',
        Name: product.ProductName || 'No Name',
        Price: product.Price || 0,
        StockQuantity: product.StockQuantity || 'N/A',
        IsActive: product.IsActive ? 'Active' : 'Inactive',
        createAt: product.createdAt ? format(new Date(product.createdAt), 'PPP') : 'N/A',
    }));

    const filteredRows = productRows.filter((product) => {
        return (
            product.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.Price.toString().includes(searchQuery) ||
            product.StockQuantity.toString().includes(searchQuery)
        );
    });

    const handleExport = () => {
        const ws = XLSX.utils.json_to_sheet(allProduct);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Products');
        XLSX.writeFile(wb, 'products.xlsx');
    };

    // const handleDelete = async (id) => {
    //     try {
    //         const response = await axiosInstance.delete(
    //             `${Config.END_POINT_LIST['DELETE_PRODUCT']}/${id}`
    //         );
    //         if (response.data.success) {
    //             showSuccessMsg(response.data.message);
    //             setAllProduct((prevState) => prevState.filter((product) => product._id !== id));
    //         } else {
    //             showErrorMsg(response.data.message);
    //         }
    //     } catch (error) {
    //         showErrorMsg(error.response?.data?.message || error.message);
    //     }
    // };
    console.log("sdfsdfsd", allProduct)

    const handleDelete = async (id) => {
        try {
            // console.log("Hello");
            // console.log(id);

            // Await the result of the dispatch
            const response = await dispatch((id));

            // Extract the message from the response payload
            const successMessage = response.payload.message;

            // Show the success message using showSuccessMsg
            if (response.payload.success) {
                showSuccessMsg(successMessage);
            }

            // Update state after deletion
            setAllProduct((prevState) => prevState.filter((contactDetails) => contactDetails._id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };


    const handleMenuClick = (event, productId) => {
        setAnchorEl(event.currentTarget);
        setSelectedProductId(productId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        handleMenuClose();
        navigate(`/admin/update-product/${selectedProductId}`)

        // Navigate to edit page (if needed)
    };

    const handleDeleteFromMenu = () => {
        handleMenuClose();
        handleDelete(selectedProductId);
    };

    // Upload Excel Or CSV File

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        
        // Display file name
        const fileNameElement = document.getElementById("file-name");
        if (selectedFile) {
            fileNameElement.textContent = `Selected: ${selectedFile.name}`;
            fileNameElement.className = "mt-2 text-success";
        } else {
            fileNameElement.textContent = "";
        }
    };

    const handleExcelFile = async (e) => {
        e.preventDefault();
        debugger

        if (!file) {
            showErrorMsg("Please select a file first!");
            return;
        }

        // Validate file type
        const allowedTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
        if (!allowedTypes.includes(file.type)) {
            showErrorMsg("Please upload only Excel or CSV files!");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await axiosInstance.post(Config.END_POINT_LIST["UPLOAD_BULK_EXCEL_FILE"], formData, { withCredentials: true });

            if (response.data.success) {
                showSuccessMsg(response.data.message);
                // Clear file after successful upload
                setFile(null);
                // Clear file name display
                const fileNameElement = document.getElementById("file-name");
                fileNameElement.textContent = "";
                // Clear file input
                document.getElementById("fileUpload").value = "";
                // Close modal if needed
                // setModalOpen(false);

            } else {
                showErrorMsg(response.data.message);
            }
        } catch (error) {
            showErrorMsg(error.response?.data?.message || "Error uploading file");
        }
    };

console.log("All Product hai bhai",filteredRows);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="container mt-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <Typography variant="h4" className="font-weight-bold text-dark">
                            Product List
                        </Typography>
                        <Link to="/admin/add-product" className="btn btn-primary rounded-pill shadow-sm">
                            <i className="mdi mdi-plus-circle me-2"></i> Add Product
                        </Link>
                    </div>

                    <div className="d-flex justify-content-between mb-3">
                        <input
                            type="text"
                            className="form-control w-50 p-3 rounded-pill shadow-sm"
                            placeholder="Search by Name, Price, or Stock Quantity"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />


                        <div className="">
                            {/* Import Button */}
                            <Button
                                variant="contained"
                                color="secondary"
                                className="ms-3 rounded-pill shadow-sm"
                                data-bs-toggle="modal" data-bs-target="#exampleModal1"
                            >
                                <UploadIcon className="me-2" /> Import {/* Add the UploadIcon with some margin */}
                            </Button>

                            {/* Export Button */}
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleExport}
                                className="ms-3 rounded-pill shadow-sm"
                            >
                                <DownloadIcon className="me-2" /> Export {/* Add the DownloadIcon with some margin */}
                            </Button>
                        </div>
                    </div>

                    <TableContainer component={Paper} className="shadow-lg">
                        <Table aria-label="product table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Stock Quantity</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Create At</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredRows.length > 0 ? (
                                    filteredRows.map((product) => (
                                        <TableRow key={product.dataId} className="hover-row">
                                            <TableCell>{product.id}</TableCell>
                                            <TableCell>
                                                <img
                                                    src={`http://localhost:5000/uploads/${product.Image}`}
                                                    alt={""}
                                                    width="70"
                                                    height="70"
                                                    className="rounded shadow-sm"
                                                />
                                            </TableCell>

                                           
                                            <TableCell>
                                                <Tooltip title={product.Name} arrow>
                                                    <span className="admin-product-name">{product.Name.slice(0, 50)}</span>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell>&#8377; {product.Price}</TableCell>
                                            <TableCell>{product.StockQuantity}</TableCell>
                                            <TableCell>
                                                <span
                                                    className={`badge ${product.IsActive === 'Active' ? 'bg-success' : 'bg-danger'
                                                        }`}
                                                >
                                                    {product.IsActive}
                                                </span>
                                            </TableCell>
                                            <TableCell>{product.createAt}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={(e) => handleMenuClick(e, product.dataId)}>
                                                    <MoreVertIcon />
                                                </IconButton>
                                                <Menu
                                                    anchorEl={anchorEl}
                                                    open={Boolean(anchorEl)}
                                                    onClose={handleMenuClose}
                                                >
                                                    <MenuItem onClick={handleEdit}>
                                                        {/* <Link to={`/admin/update-product/${product.dataId}`}> */}
                                                        <EditIcon /> Edit
                                                        {/* </Link> */}
                                                    </MenuItem>
                                                    <MenuItem onClick={handleDeleteFromMenu}>
                                                        <DeleteIcon /> Delete
                                                    </MenuItem>
                                                </Menu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan="8" className="text-center">
                                            No products found!
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <div className="d-flex justify-content-center mt-4">
                        {/* <Pagination
                            count={Math.ceil(productCount / limit)}
                            page={page}
                            onChange={(event, value) => setPage(value)}
                            color="primary"
                            className="pagination"
                        /> */}
                        <Pagination
                            count={Math.ceil(productCount / limit)}
                            page={currentPage}
                            onChange={(event, value) => dispatch(setCurrentPage(value))}
                            color="primary"
                            className="pagination"
                        />
                    </div>
                </div>
            )}
            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header bg-dark text-white">
                            <h5 className="modal-title" id="exampleModalLabel">
                                <i className="fas fa-tags"></i>  Upload Bulk Products
                            </h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        {/* Modal Body */}
                        <div className="modal-body">
                            <form onSubmit={handleExcelFile} encType='multipart/form-data'>

                                {/* File Upload - Drag & Drop */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Upload Excel/CSV File:</label>
                                    <div className="border border-2 border-dashed rounded-3 p-4 text-center bg-light shadow-sm"
                                        id="drop-area"
                                        onClick={() => document.getElementById("fileUpload").click()} style={{ cursor: "pointer" }}>
                                        <i className="fas fa-file-upload fa-2x text-primary"></i>
                                        <p className="mt-2 mb-0 text-muted">Drag & Drop or Click to Upload</p>
                                    </div>
                                    <input type="file" id="fileUpload" className="form-control d-none" accept=".csv, .xls, .xlsx"
                                        onChange={handleFileChange} required name='file' />
                                    <small className="text-muted">Supported formats: <strong>.csv, .xls, .xlsx</strong></small>
                                    <p id="file-name" className="mt-2 text-success"></p>
                                </div>

                                {/* Modal Footer */}
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                                        <i className="fas fa-times"></i> Close
                                    </button>
                                    <button type="submit" className="btn btn-success">
                                        <i className="fas fa-upload"></i> Upload Products
                                    </button>
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
// import { Link } from 'react-router-dom';
// import { format } from 'date-fns';
// import * as XLSX from 'xlsx';
// import './product.css';
// import { showSuccessMsg, showErrorMsg } from '../../../../utils/ShowMessage';
// import Loader from '../../../View/Loader/Loader';
// import axiosInstance from '../../../../ApiHendler/axiosInstance';

// // Make sure you include Bootstrap CDN in your public/index.html
// // <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" />

// const BASE_URL = import.meta.env.VITE_IMG_URL;

// export default function Product() {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [allProduct, setAllProduct] = useState([]);
//     const [productCount, setProductCount] = useState(0); // Track total product count for pagination
//     const [page, setPage] = useState(1); // 1-based index for pagination
//     const [limit, setLimit] = useState(10); // Limit for pagination (items per page)

//     // Fetch data with pagination
//     const fetchData = async (page = 1, limit = 10) => {
//         try {
//             setIsLoading(true); // Show loader while fetching data
//             const response = await axiosInstance.get('http://localhost:5000/api/v1/admin/get-all-product-data-featured', {
//                 params: { page, limit },
//                 withCredentials: true,
//             });

//             if (response.data.success) {
//                 setAllProduct(response.data.allProductsFeatures);
//                 setProductCount(response.data.productCount); // Total product count for pagination
//             } else {
//                 console.error('Failed to fetch products');
//             }
//         } catch (error) {
//             console.error(error.response?.data?.message || error.message);
//         } finally {
//             setIsLoading(false); // Hide loader after data fetching
//         }
//     };

//     useEffect(() => {
//         fetchData(page, limit); // Fetch data when page or limit changes
//     }, [page, limit]);

//     // Handle page change from pagination
//     const handlePageChange = (newPage) => {
//         setPage(newPage); // Update the page state with the new page (1-based index)
//     };

//     // Handle page size (limit) change
//     const handleLimitChange = (event) => {
//         setLimit(Number(event.target.value)); // Set the limit (page size)
//         setPage(1); // Reset to first page when limit changes
//     };

//     const handleExport = () => {
//         const ws = XLSX.utils.json_to_sheet(allProduct);
//         const wb = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(wb, ws, 'Products');
//         XLSX.writeFile(wb, 'products.xlsx');
//     };

//     const handleDelete = async (id) => {
//         try {
//             const response = await axiosInstance.delete(`/product/${id}`);
//             if (response.data.success) {
//                 showSuccessMsg(response.data.message);
//                 setAllProduct((prevState) => prevState.filter((product) => product._id !== id));
//             }
//         } catch (error) {
//             console.error('Error deleting product:', error);
//             showErrorMsg('Failed to delete product');
//         }
//     };

//     // Convert product data into rows for the table
//     const productRows = allProduct.map((product, index) => ({
//         id: index + 1,
//         dataId: product._id,
//         Image: product.ProductPictures && product.ProductPictures.length > 0 ? product.ProductPictures[0] : '',
//         Name: product.ProductName || 'No Name',
//         Price: product.Price || 0,
//         StockQuantity: product.StockQuantity || 'N/A',
//         IsActive: product.IsActive ? 'Active' : 'Inactive',
//         createAt: product.createdAt ? format(new Date(product.createdAt), 'PPP') : 'N/A',
//     }));

//     // Pagination Logic
//     const totalPages = Math.ceil(productCount / limit); // Calculate total pages

//     // Handle page numbers for pagination
//     const renderPaginationItems = () => {
//         let items = [];
//         for (let i = 1; i <= totalPages; i++) {
//             items.push(
//                 <li
//                     key={i}
//                     className={`page-item ${i === page ? 'active' : ''}`}
//                     onClick={() => handlePageChange(i)}
//                     style={{ cursor: 'pointer' }}
//                 >
//                     <span className="page-link">{i}</span>
//                 </li>
//             );
//         }
//         return items;
//     };

//     return (
//         <>
//             {isLoading ? (
//                 <Loader />
//             ) : (
//                 <div className="container-fluid">
//                     <div className="row">
//                         <div className="col-12">
//                             <div className="d-flex justify-content-between align-items-center mb-4">
//                                 <h4 className="page-title">Products</h4>
//                                 <button
//                                     className="btn btn-success"
//                                     onClick={handleExport}
//                                 >
//                                     <i className="bi bi-download me-2"></i> Export to Excel
//                                 </button>
//                             </div>
//                             <div className="table-responsive mt-4 shadow-lg p-3 mb-5 bg-body rounded">
//                                 <table className="table table-striped table-bordered table-hover">
//                                     <thead className="table-dark">
//                                         <tr>
//                                             <th>ID</th>
//                                             <th>Image</th>
//                                             <th>Name</th>
//                                             <th>Price</th>
//                                             <th>Stock Quantity</th>
//                                             <th>Status</th>
//                                             <th>CreateAt</th>
//                                             <th>Actions</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {productRows.length > 0 ? (
//                                             productRows.map((product) => (
//                                                 <tr key={product.id}>
//                                                     <td>{product.id}</td>
//                                                     <td>
//                                                         <img
//                                                             alt={product.Name}
//                                                             src={`${BASE_URL}/${product.Image}`}
//                                                             width="100"
//                                                             height="100"
//                                                             className="rounded-circle"
//                                                         />
//                                                     </td>
//                                                     <td>{product.Name}</td>
//                                                     <td>&#8377; {product.Price}</td>
//                                                     <td>{product.StockQuantity}</td>
//                                                     <td>
//                                                         <span
//                                                             className={`badge ${
//                                                                 product.IsActive === 'Active' ? 'bg-success' : 'bg-danger'
//                                                             }`}
//                                                         >
//                                                             {product.IsActive}
//                                                         </span>
//                                                     </td>
//                                                     <td>{product.createAt}</td>
//                                                     <td>
//                                                         <Link to={`/admin/update-product/${product.dataId}`} className="btn btn-warning btn-sm me-2">
//                                                             Edit
//                                                         </Link>
//                                                         <button
//                                                             className="btn btn-danger btn-sm"
//                                                             onClick={() => handleDelete(product.dataId)}
//                                                         >
//                                                             Delete
//                                                         </button>
//                                                     </td>
//                                                 </tr>
//                                             ))
//                                         ) : (
//                                             <tr>
//                                                 <td colSpan="8" className="text-center">
//                                                     No products found.
//                                                 </td>
//                                             </tr>
//                                         )}
//                                     </tbody>
//                                 </table>
//                             </div>

//                             {/* Pagination */}
//                             <nav aria-label="Page navigation example" className="mt-4">
//                                 <ul className="pagination justify-content-center">
//                                     {renderPaginationItems()}
//                                 </ul>
//                             </nav>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }
