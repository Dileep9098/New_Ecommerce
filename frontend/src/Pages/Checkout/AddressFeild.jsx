import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AddAddressModal from './AddAddressModal'
import axiosInstance from '../../ApiHendler/axiosInstance';
import Config from '../../Config/Config';
import { showSuccessMsg } from '../../utils/ShowMessages';
export default function AddressFeild({setSelectedAddress}) {
    const [addresses, setAddresses] = useState([]);

    const fetchAddresses = async () => {
        const res = await axiosInstance.get(Config.END_POINT_LIST['ADD_MY_ADDRESS'], { withCredentials: true });
        setAddresses(res.data.addresses || []);
        setSelectedAddress(res.data.addresses.find(addr => addr.isDefault)?._id || null);
    };

    useEffect(() => {
        fetchAddresses();
    }, []);
    console.log("Addresses:", addresses);

    const handleDefaultAddress = async (e) => {
        const addressId = addresses[e.target.id.split('-')[1]]._id;
        // debugger
        try {
            // const res = await axiosInstance.put(`${Config.END_POINT_LIST['ADD_DEFAULT_ADDRESS']}/${ addressId }`, { withCredentials: true });
            const res = await axiosInstance.post(`${Config.END_POINT_LIST['ADD_DEFAULT_ADDRESS']}`, { addressId }, { withCredentials: true });
            if (res.data.success) {
                showSuccessMsg("Default address updated successfully");
                fetchAddresses(); 
                setSelectedAddress(addressId);
            }
        } catch (error) {
            console.error("Error updating default address:", error);
            alert("Failed to update default address");
        }
    };
    return (
        <>
            <div className="accordion-item py-4">
                <div className="d-flex justify-content-between align-items-center">
                    <a href="#" className="fs-5 text-inherit collapsed h4" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="true" aria-controls="flush-collapseOne"  >
                        <i className="feather-icon icon-map-pin me-2 text-muted" />
                        Add delivery address
                    </a>
                    <a href="#" className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#addAddressModal"
                    > Add a new address
                    </a>
                </div>
                <div
                    id="flush-collapseOne"
                    className="accordion-collapse collapse show"
                    data-bs-parent="#accordionFlushExample"
                >
                    <div className="mt-5">
                        <div className="row">
                            {addresses.length === 0 ? (
                                <div className="text-center py-5">
                                    <h5 className="text-muted mb-3">No address found</h5>
                                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addAddressModal"   >
                                        + Add New Address
                                    </button>
                                </div>
                            ) : (
                                addresses.map((addr, index) => (
                                    <div key={index} className="col-xl-6 col-lg-12 col-md-6 col-12 mb-4"  >
                                        <div className="card card-body p-4 shadow-sm border border-light">
                                            <div className="d-flex justify-content-between align-items-start mb-3">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="selectedAddress" id={`address-${index}`} defaultChecked={addr.isDefault} onChange={handleDefaultAddress} />
                                                    <label className="form-check-label fw-semibold" htmlFor={`address-${index}`} >
                                                        {addr.businessName || "Address"}
                                                    </label>
                                                </div>
                                                {addr.isDefault && (
                                                    <span className="badge bg-danger">Default</span>
                                                )}
                                            </div>

                                            <address className="mb-0">
                                                <strong>{addr.firstName}</strong>
                                                <br />
                                                {addr.addressLine1}
                                                <br />
                                                {addr.city}, {addr.state}, {addr.country}
                                                <br />
                                                <abbr title="Phone">Phone:</abbr> {addr.phone}
                                            </address>
                                        </div>
                                    </div>
                                ))
                            )}


                        </div>
                    </div>
                </div>
            </div>
            <AddAddressModal onSuccess={fetchAddresses} />
        </>
    )
}
