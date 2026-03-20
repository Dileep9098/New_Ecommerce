import React from 'react'
import { Link } from 'react-router-dom'

export default function UploadBulkProduct() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box">
                            <div className="page-title-right">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="/admin/product">Product Catalog</Link></li>
                                    <li className="breadcrumb-item active">Product Bulk Upload </li>
                                </ol>
                            </div>
                            <h4 className="page-title"><i className="ri-align-left me-2"></i>Bulk Upload</h4>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body py-0 mb-3 p-4 " data-simplebar >
                                <div className="timeline-alt py-3">
                                    <div className="timeline-item ">
                                        <i className="mdi mdi-arrow-right-thin  bg-info-lighten text-info timeline-icon"></i>
                                        <div className="timeline-item-info" style={{ marginBottom: "10px" }}>
                                            <small>1. You can import multiple products into your system from the excel file. </small>
                                        </div>
                                    </div>

                                    <div className="timeline-item">
                                        <i className="mdi mdi-arrow-right-thin bg-primary-lighten text-primary timeline-icon"></i>
                                        <div className="timeline-item-info" style={{ marginBottom: "10px" }}>

                                            <small>2. Download the excel format file from this link:  <a href='/assets/img/ProductsBulkUploadExcelFormat.xlsx' download className="btn  mx-2 " style={{ backgroundColor: "#4caf50", color: "white", padding: "5px" }}><i className="mdi mdi-file-excel me-1"></i> <span>Excel Format</span> </a>
                                            </small>

                                        </div>
                                    </div>

                                    <div className="timeline-item">
                                        <i className="mdi mdi-arrow-right-thin bg-info-lighten text-info timeline-icon"></i>
                                        <div className="timeline-item-info">

                                            <small>
                                                3. Once you donwload above excel file format then fill data about your products in the excel file and upload in below option. Keep in mind that you have not to remove the top header row of the excel file because it is format for uploading the data. If you change any header column text then you will not be able to upload the data.
                                            </small>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card w-50">
                            <form action="">

                                <div className="card-body">
                                    <label htmlFor="">Your Excel File : </label>
                                    <input type="file" className='form-control' />
                                    <span className='mx-1'>Accepted formats: .xlsx </span>
                                </div>
                                <button type="button" className="btn btn-info me-1 mb-3 " style={{ float: "right" }}><span>Upload Excel</span>  <i className='ri-send-plane-fill'></i> </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
