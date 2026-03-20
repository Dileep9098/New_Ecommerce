// import React, { useState } from 'react'

// export default function Profile() {
//     const[openSection,setOpenSection]=useState('address')
//     console.log(openSection);
//     return (
//         <div className="container">

//             <div className="row">

//                 <div className="col-12">
//                     <div className="d-flex justify-content-between align-items-center d-md-none py-4">

//                         <h3 className="fs-5 mb-0">Account Setting</h3>

//                         <button className="btn btn-outline-gray-400 text-muted d-md-none btn-icon btn-sm ms-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasAccount" aria-controls="offcanvasAccount"  >
//                             <i className="bi bi-text-indent-left fs-3" />
//                         </button>
//                     </div>
//                 </div>
//                 <div className="col-lg-3 col-md-4 col-12 border-end d-none d-md-block">
//                     <div className="pt-10 pe-lg-10">
//                         <ul className="nav flex-column nav-pills nav-pills-dark">
//                             <li className="nav-item">
//                                 <a className={`nav-link ${openSection=="order"?"active":""} `} aria-current="page" href="#" onClick={()=>setOpenSection("order")} >
//                                     <i className="feather-icon icon-shopping-bag me-2" />
//                                     Your Orders
//                                 </a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className={`nav-link ${openSection==="settings"?"active":""} `} href="#"onClick={()=>setOpenSection("settings")}>
//                                     <i className="feather-icon icon-settings me-2" />
//                                     Settings
//                                 </a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className={`nav-link ${openSection==="address"?"active":""} `} href="#" onClick={()=>setOpenSection("address")}>
//                                     <i className="feather-icon icon-map-pin me-2" />
//                                     Address
//                                 </a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className={`nav-link ${openSection==="paymentMethod"?"active":""} `} href="#" onClick={()=>setOpenSection("paymentMethod")}>
//                                     <i className="feather-icon icon-credit-card me-2" />
//                                     Payment Method
//                                 </a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className={`nav-link ${openSection==="notification"?"active":""} `} href="#" onClick={()=>setOpenSection("notification")}>
//                                     <i className="feather-icon icon-bell me-2" />
//                                     Notification
//                                 </a>
//                             </li>
//                             <li className="nav-item">
//                                 <hr />
//                             </li>
//                             <li className="nav-item">
//                                 <a className={`nav-link `} href="#">
//                                     <i className="feather-icon icon-log-out me-2" />
//                                     Log out
//                                 </a>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//                 <div className="col-lg-9 col-md-8 col-12">

//                     <div className="py-6 p-md-6 p-lg-10">
//                         <div className="d-flex justify-content-between mb-6">
//                             <h2 className="mb-0">Address</h2>
//                             <a href="#" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#addAddressModal">
//                                 Add a new address
//                             </a>
//                         </div>
//                         <div className="row">
//                             <div className="col-xl-5 col-lg-6 col-xxl-4 col-12 mb-4">
//                                 <div className="card">
//                                     <div className="card-body p-6">
//                                         <div className="form-check mb-4">
//                                             <input
//                                                 className="form-check-input"
//                                                 type="radio"
//                                                 name="flexRadioDefault"
//                                                 id="homeRadio"
//                                                 defaultChecked=""
//                                             />
//                                             <label
//                                                 className="form-check-label text-dark fw-semibold"
//                                                 htmlFor="homeRadio"
//                                             >
//                                                 Home
//                                             </label>
//                                         </div>
//                                         <p className="mb-6">
//                                             Jitu Chauhan
//                                             <br />
//                                             4450 North Avenue Oakland,
//                                             <br />
//                                             Nebraska, United States,
//                                             <br />
//                                             402-776-1106
//                                         </p>
//                                         <a href="#" className="btn btn-info btn-sm">
//                                             Default address
//                                         </a>
//                                         <div className="mt-4">
//                                             <a href="#" className="text-inherit">
//                                                 Edit
//                                             </a>
//                                             <a
//                                                 href="#"
//                                                 className="text-danger ms-3"
//                                                 data-bs-toggle="modal"
//                                                 data-bs-target="#deleteModal"
//                                             >
//                                                 Delete
//                                             </a>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="col-xk-5 col-lg-6 col-xxl-4 col-12 mb-4">
//                                 {/* input */}
//                                 <div className="card">
//                                     <div className="card-body p-6">
//                                         <div className="form-check mb-4">
//                                             <input
//                                                 className="form-check-input"
//                                                 type="radio"
//                                                 name="flexRadioDefault"
//                                                 id="officeRadio"
//                                             />
//                                             <label
//                                                 className="form-check-label text-dark fw-semibold"
//                                                 htmlFor="officeRadio"
//                                             >
//                                                 Office
//                                             </label>
//                                         </div>
//                                         {/* nav item */}
//                                         <p className="mb-6">
//                                             Nitu Chauhan
//                                             <br />
//                                             3853 Coal Road
//                                             <br />
//                                             Tannersville, Pennsylvania, 18372, United States
//                                             <br />
//                                             402-776-1106
//                                         </p>
//                                         {/* link */}
//                                         <a href="#" className="link-primary">
//                                             Set as Default
//                                         </a>
//                                         <div className="mt-4">
//                                             <a href="#" className="text-inherit">
//                                                 Edit
//                                             </a>
//                                             {/* btn */}
//                                             <a
//                                                 href="#"
//                                                 className="text-danger ms-3"
//                                                 data-bs-toggle="modal"
//                                                 data-bs-target="#deleteModal"
//                                             >
//                                                 Delete
//                                             </a>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </div>


//     )
// }



import React, { useState } from "react";
import ProfileOrderDetails from "../../Comoponant/Profie/ProfileOrderDetails";
import { useDispatch, useSelector } from "react-redux";
import AccountSetting from "../../Comoponant/Profie/AccountSetting";
import AddressSetting from "../../Comoponant/Profie/AddressSetting";
import { logoutUser } from "../../Store/Feature/auth/authSlice";
import { showSuccessMsg } from "../../utils/ShowMessages";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const [openSection, setOpenSection] = useState("order");
    const { user, error, isLoading, isAuthentication } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logout = () => {
        dispatch(logoutUser()).then((data) => {
            console.log(data.payload)
            if (data.payload.success) {
                showSuccessMsg(data.payload.message)
                navigate("/")
            }
        })
    }
    return (
        <div className="container">
            <div className="row">
                {/* ===== Sidebar ===== */}

                <div class="col-12">
                    <div class="d-flex justify-content-between align-items-center d-md-none py-4">
                        <h3 class="fs-5 mb-0">Account Setting</h3>
                        <button
                            class="btn btn-outline-gray-400 text-muted d-md-none btn-icon btn-sm ms-3"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasAccount"
                            aria-controls="offcanvasAccount">
                            <i class="bi bi-text-indent-left fs-3"></i>
                        </button>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-12 border-end d-none d-md-block">
                    <div className="pt-10 pe-lg-10">
                        <ul className="nav flex-column nav-pills nav-pills-dark">
                            {[
                                { id: "order", label: "Your Orders", icon: "shopping-bag" },
                                { id: "settings", label: "Settings", icon: "settings" },
                                { id: "address", label: "Address", icon: "map-pin" },
                                // { id: "paymentMethod", label: "Payment Method", icon: "credit-card" },
                                { id: "notification", label: "Notification", icon: "bell" },
                            ].map((item) => (
                                <li key={item.id} className="nav-item">
                                    <a
                                        href="#"
                                        onClick={() => setOpenSection(item.id)}
                                        className={`nav-link ${openSection === item.id ? "active" : ""}`}
                                    >
                                        <i className={`feather-icon icon-${item.icon} me-2`} />
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                            <li className="nav-item">
                                <hr />
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={logout}>
                                    <i className="feather-icon icon-log-out me-2" />
                                    Log out
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* ===== Content Section ===== */}
                <div className="col-lg-9 col-md-8 col-12 py-6 p-md-6 p-lg-10">

                    {openSection === "order" && (
                        <ProfileOrderDetails />
                    )}


                    {openSection === "settings" && (
                        <AccountSetting />
                    )}

                    {openSection === "address" && (
                        <AddressSetting />
                    )}

                    {openSection === "paymentMethod" && (
                        <div>
                            <h2 className="mb-4">Payment Method</h2>
                            <p>Manage your saved cards and payment preferences here.</p>
                            {/* Add payment form here */}
                        </div>
                    )}

                    {openSection === "notification" && (
                        <div>
                            <h2 className="mb-4">Notifications</h2>
                            <p>Control your notification preferences here.</p>
                            {/* Add notification settings here */}
                        </div>
                    )}
                </div>
            </div>

            <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasAccount" aria-labelledby="offcanvasAccountLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasAccountLabel">Offcanvas</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">

                    <ul className="nav flex-column nav-pills nav-pills-dark">
                        {[
                            { id: "order", label: "Your Orders", icon: "shopping-bag" },
                            { id: "settings", label: "Settings", icon: "settings" },
                            { id: "address", label: "Address", icon: "map-pin" },
                            { id: "paymentMethod", label: "Payment Method", icon: "credit-card" },
                            { id: "notification", label: "Notification", icon: "bell" },
                        ].map((item) => (
                            <li key={item.id} className="nav-item">
                                <a href="#" onClick={() => setOpenSection(item.id)} className={`nav-link ${openSection === item.id ? "active" : ""}`} data-bs-dismiss="offcanvas" aria-label="Close" >
                                    <i className={`feather-icon icon-${item.icon} me-2`} />
                                    {item.label}
                                </a>
                            </li>
                        ))}
                        <li className="nav-item">
                            <hr />
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <i className="feather-icon icon-log-out me-2" />
                                Log out
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
