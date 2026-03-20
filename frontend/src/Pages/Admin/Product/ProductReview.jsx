import React from 'react'
import { Link } from "react-router-dom"
export default function ProductReview() {
    
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box">
                            <div className="page-title-right">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="/admin/product">Product Catalog</Link></li>
                                    <li className="breadcrumb-item active">Product Review</li>
                                </ol>
                            </div>
                            <h4 className="page-title"><i className="ri-align-left me-2"></i>Product Review</h4>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row mb-2">
                                    <div className="col-sm-5">
                                        {/* <Link to="/admin/add-product" className="btn adminAddBtn mb-2">
                                            <i className="mdi mdi-plus-circle me-2"></i> Add Products
                                        </Link> */}
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
                                                <th className="all">Product Id</th>
                                                <th>Picture</th>
                                                <th>Name</th>
                                                <th>Rating</th>
                                                <th>Total Reviews</th>
                                                <th style={{ width: "120px" }}>Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>


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
                                            <tr>
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


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}



// import React, { useEffect } from 'react'
// import { Link } from 'react-router-dom';

// export default function ProductReview() {
    // useEffect(() => {
    //     if (!$.fn.dataTable.isDataTable('#products-datatable')) {
    //         $('#products-datatable').DataTable({
    //             paging: true,
    //             searching: true,
    //             ordering: true,
    //             info: true,
    //             autoWidth: false
    //         });
    //     }
    // }, []);
//     return (
//         <>
//             <div className="container-fluid">

// <div className="row">
//     <div className="col-12">
//         <div className="page-title-box">
//             <div className="page-title-right">
//                 <ol className="breadcrumb m-0">
//                     <li className="breadcrumb-item"><Link to="javascript: void(0);">Product Catalog</Link></li>
//                     <li className="breadcrumb-item active">Product Review</li>
//                 </ol>
//             </div>
//             <h4 className="page-title"><i className="ri-align-left me-2"></i>Product Review</h4>
//         </div>
//     </div>
// </div>

// <div className="row">
//     <div className="col-12">
//         <div className="card">
//             <div className="card-body">
//                 <div className="row mb-2">
//                     <div className="col-sm-5">
//                         {/* <Link to="/admin/add-product" className="btn adminAddBtn mb-2">
//                             <i className="mdi mdi-plus-circle me-2"></i> Add Products
//                         </Link> */}
//                     </div>
//                     <div className="col-sm-7">
//                         <div className="text-sm-end">
//                             <button type="button" className="btn btn-success mb-2 me-1">
//                                 <i className="mdi mdi-cog-outline"></i>
//                             </button>
//                             <button type="button" className="btn btn-light mb-2 me-1">Import</button>
//                             <button type="button" className="btn btn-light mb-2">Export</button>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="table-responsive">
//                     <table className="table table-centered w-100 dt-responsive nowrap" id="products-datatable">
//                         <thead className="table-light">
//                             <tr>
//                                 <th className="all" style={{ width: "20px" }}>
//                                     <div className="form-check">
//                                         <input type="checkbox" className="form-check-input" id="customCheck1" />
//                                         <label className="form-check-label" htmlFor="customCheck1">&nbsp;</label>
//                                     </div>
//                                 </th>
//                                 <th className="all">Product Id</th>
//                                 <th>Picture</th>
//                                 <th>Name</th>
//                                 <th>Rating</th>
//                                 <th>Total Reviews</th>
//                                 <th style={{ width: "120px" }}>Action</th>
//                             </tr>
//                         </thead>

//                         <tbody>


//                             <tr>
//                                 <td>
//                                     <div className="form-check">
//                                         <input type="checkbox" className="form-check-input" id="customCheck13" />
//                                         <label className="form-check-label" for="customCheck13">&nbsp;</label>
//                                     </div>
//                                 </td>
//                                 <td>
//                                     <img src="/assets1/images/products/product-6.jpg" alt="contact-img" title="contact-img" className="rounded me-3" height="48" />
//                                     <p className="m-0 d-inline-block align-middle font-16">
//                                         <Link to="apps-ecommerce-products-details.html" className="text-body">Unpowered aircraft</Link>
//                                         <br />
//                                         <span className="text-warning mdi mdi-star"></span>
//                                         <span className="text-warning mdi mdi-star"></span>
//                                         <span className="text-warning mdi mdi-star"></span>
//                                         <span className="text-warning mdi mdi-star"></span>
//                                         <span className="text-warning mdi mdi-star-half"></span>
//                                     </p>
//                                 </td>
//                                 <td>
//                                     Wing Chairs
//                                 </td>
//                                 <td>
//                                     03/24/2018
//                                 </td>
//                                 <td>
//                                     $49
//                                 </td>

//                                 <td>
//                                     204
//                                 </td>
//                                 <td>
//                                     <span className="badge bg-danger">Deactive</span>
//                                 </td>

//                                 <td className="table-action">
//                                     <Link to="#" className="action-icon"> <i className="mdi mdi-eye"></i></Link>
//                                     <Link to="#" className="action-icon"> <i className="mdi mdi-square-edit-outline"></i></Link>
//                                     <Link to="#" className="action-icon"> <i className="mdi mdi-delete"></i></Link>
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td>
//                                     <div className="form-check">
//                                         <input type="checkbox" className="form-check-input" id="customCheck2" />
//                                         <label className="form-check-label" for="customCheck2">&nbsp;</label>
//                                     </div>
//                                 </td>
//                                 <td>
//                                     <img src="/assets1/images/products/product-1.jpg" alt="contact-img" title="contact-img" className="rounded me-3" height="48" />
//                                     <p className="m-0 d-inline-block align-middle font-16">
//                                         <Link to="apps-ecommerce-products-details.html" className="text-body">Amazing Modern Chair</Link>
//                                         <br />
//                                         <span className="text-warning mdi mdi-star"></span>
//                                         <span className="text-warning mdi mdi-star"></span>
//                                         <span className="text-warning mdi mdi-star"></span>
//                                         <span className="text-warning mdi mdi-star"></span>
//                                         <span className="text-warning mdi mdi-star"></span>
//                                     </p>
//                                 </td>
//                                 <td>
//                                     Aeron Chairs
//                                 </td>
//                                 <td>
//                                     09/12/2018
//                                 </td>
//                                 <td>
//                                     $148.66
//                                 </td>

//                                 <td>
//                                     254
//                                 </td>
//                                 <td>
//                                     <span className="badge bg-success">Active</span>
//                                 </td>

//                                 <td className="table-action">
//                                     <Link to="#" className="action-icon"> <i className="mdi mdi-eye"></i></Link>
//                                     <Link to="#" className="action-icon"> <i className="mdi mdi-square-edit-outline"></i></Link>
//                                     <Link to="#" className="action-icon"> <i className="mdi mdi-delete"></i></Link>
//                                 </td>
//                             </tr>

//                             <tr>
//                                 <td>
//                                     <div className="form-check">
//                                         <input type="checkbox" className="form-check-input" id="customCheck3" />
//                                         <label className="form-check-label" for="customCheck3">&nbsp;</label>
//                                     </div>
//                                 </td>
//                                 <td>
//                                     <img src="/assets1/images/products/product-4.jpg" alt="contact-img" title="contact-img" className="rounded me-3" height="48" />
//                                     <p className="m-0 d-inline-block align-middle font-16">
//                                         <Link to="apps-ecommerce-products-details.html" className="text-body">Biblio Plastic Armchair</Link>
//                                         <br />
//                                         <span className="text-warning mdi mdi-star"></span>
//                                         <span className="text-warning mdi mdi-star"></span>
//                                         <span className="text-warning mdi mdi-star"></span>
//                                         <span className="text-warning mdi mdi-star"></span>
//                                         <span className="text-warning mdi mdi-star-half"></span>
//                                     </p>
//                                 </td>
//                                 <td>
//                                     Wooden Chairs
//                                 </td>
//                                 <td>
//                                     09/08/2018
//                                 </td>
//                                 <td>
//                                     $8.99
//                                 </td>

//                                 <td>
//                                     1,874
//                                 </td>
//                                 <td>
//                                     <span className="badge bg-success">Active</span>
//                                 </td>
//                                 <td className="table-action">
//                                     <Link to="#" className="action-icon"> <i className="mdi mdi-eye"></i></Link>
//                                     <Link to="#" className="action-icon"> <i className="mdi mdi-square-edit-outline"></i></Link>
//                                     <Link to="#" className="action-icon"> <i className="mdi mdi-delete"></i></Link>
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td>
//                                     <div className="form-check">
//                                         <input type="checkbox" className="form-check-input" id="customCheck4" />
//                                         <label className="form-check-label" for="customCheck4">&nbsp;</label>
//                                     </div>
//                                 </td>
//                                 <td>
//                                     <img src="/assets1/images/products/product-3.jpg" alt="contact-img" title="contact-img" className="rounded me-3" height="48" />
//                                     <p className="m-0 d-inline-block align-middle font-16">
//                                         <Link to="apps-ecommerce-products-details.html" className="text-body">Branded Wooden Chair</Link>
//                                         <br />
//                                         <span className="text-warning mdi mdi-star"></span>
//                                         <span className="text-warning mdi mdi-star"></span>
//                                         <span className="text-warning mdi mdi-star"></span>
//                                         <span className="text-warning mdi mdi-star"></span>
//                                         <span className="text-warning mdi mdi-star-outline"></span>
//                                     </p>
//                                 </td>
//                                 <td>
//                                     Dining Chairs
//                                 </td>
//                                 <td>
//                                     09/05/2018
//                                 </td>
//                                 <td>
//                                     $68.32
//                                 </td>

//                                 <td>
//                                     2,541
//                                 </td>
//                                 <td>
//                                     <span className="badge bg-success">Active</span>
//                                 </td>

//                                 <td className="table-action">
//                                     <Link to="#" className="action-icon"> <i className="mdi mdi-eye"></i></Link>
//                                     <Link to="#" className="action-icon"> <i className="mdi mdi-square-edit-outline"></i></Link>
//                                     <Link to="#" className="action-icon"> <i className="mdi mdi-delete"></i></Link>
//                                 </td>
//                             </tr>


//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>
//             </div>


//         </>
//     )
// }
