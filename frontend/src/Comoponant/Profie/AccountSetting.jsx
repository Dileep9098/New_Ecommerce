import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import axiosInstance from "../../ApiHendler/axiosInstance";
import Config from "../../Config/Config";
import { showErrorMsg } from "../../utils/ShowMessages";

export default function AccountSetting() {
    // 👇 Redux se auth state le rahe hain
    const { user, isLoading, isAuthentication } = useSelector((state) => state.auth);

    // 👇 Prefilled form ke liye state
    const [accountDetails, setAccountDetails] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const [passwords, setPasswords] = useState({
        password: "",
        oldPassword:""
    });

    // 👇 User ke data ko prefill karne ke liye
    useEffect(() => {
        if (user) {
            setAccountDetails({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
            });
        }
    }, [user]);

    // 👇 input handle karne ke liye
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccountDetails({ ...accountDetails, [name]: value });
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords({ ...passwords, [name]: value });
    };

    // ✅ Account Update API
    const handleAccountSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.put(`${Config.END_POINT_LIST["UPDATE_USER_DETAILS_DATA"]}/${user._id}`, accountDetails );
            console.log("Account Update Response:", res.data);
            alert("Account details updated successfully!");
        } catch (error) {
            console.error("Error updating account:", error);
            alert("Failed to update account details!");
        }
    };

    // ✅ Password Update API password
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        // debugger
        
        try {
           
            const res = await axiosInstance.put(`${Config.END_POINT_LIST["UPDATE_USER_PASSWORD"]}/${user._id}`, passwords );


            console.log("Password Update Response:", res.data);
            alert("Password updated successfully!");
        } catch (error) {
            console.error("Error updating password:", error);
           showErrorMsg(error.response?.data?.message || "Failed to update password!");
        }
    };

    return (
        <div className="py-6 p-md-6 p-lg-10">
            <div className="mb-6">
                <h2 className="mb-0">Account Setting</h2>
            </div>

            {/* Account Details Form */}
            <div>
                <h5 className="mb-4">Account details</h5>
                <form name="accountDetailsForm" onSubmit={handleAccountSubmit}>
                    <div className="mb-3 col-lg-6">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Enter your name"
                            value={accountDetails.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3 col-lg-6">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="example@gmail.com"
                            value={accountDetails.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-5 col-lg-6">
                        <label className="form-label">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            className="form-control"
                            placeholder="Phone number"
                            value={accountDetails.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Save Details
                    </button>
                </form>
            </div>

            <hr className="my-10" />

            {/* Password Change Form */}
            <div className="pe-lg-14">
                <h5 className="mb-4">Password</h5>
                <form name="passwordUpdateForm" onSubmit={handlePasswordSubmit}>
                    <div className="mb-3 col">
                        <label className="form-label">Old Password</label>
                        <input
                            type="password"
                            name="oldPassword"
                            className="form-control"
                            placeholder="**********"
                            onChange={handlePasswordChange}
                        />
                    </div>
                    
                    <div className="mb-3 col">
                        <label className="form-label">New Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="**********"
                            onChange={handlePasswordChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Save Password
                    </button>
                </form>
            </div>
        </div>
    );
}
