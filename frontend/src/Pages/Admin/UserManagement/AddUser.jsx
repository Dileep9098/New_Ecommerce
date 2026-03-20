
import React, { useEffect, useState } from 'react'

import { useDropzone } from "react-dropzone";

import { useParams, Link, useNavigate } from 'react-router-dom';
import { Country, State, City } from 'country-state-city';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { showSuccessMsg, showErrorMsg } from '../../../utils/ShowMessage';
import axiosInstance from '../../../ApiHendler/axiosInstance';

// import "./product.css";
export default function AddUser() {
    const [value, setValue] = useState('');
    console.log(value)


    const [files, setFiles] = useState([]);
    const [previewFiles, setPreviewFiles] = useState([]);

    // Handle file selection and preview
    const onDrop = (acceptedFiles) => {
        const filePreviews = acceptedFiles.map((file) => ({
            file: file,
            previewUrl: URL.createObjectURL(file),
        }));
        setFiles(acceptedFiles);
        setPreviewFiles(filePreviews);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: "image/*",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, isAuthentication, user } = useSelector((state) => state.auth);

    const [name, setName] = useState('');
    const [mname, setMName] = useState('');
    const [lname, setLastName] = useState('');
    const [email, setEmailAddress] = useState('');
    const [userType, setUserType] = useState('');
    const [role, setRole] = useState('');
    const [file, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [phone, setPhone] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [address, setAddressLineOne] = useState('');
    const [address1, setAddressLineOne1] = useState('');
    const [DOB, setDOB] = useState('');
    const [gender, setGender] = useState('');
    const [IsActive, setIsActive] = useState(false);
    const [IsVerified, setIsVerified] = useState(false);
    const [PostalCode, setPostalCode] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');


    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [countryList, setCountryList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);

    const [countryrid, setCountryId] = useState(null); // State to store country ID0
    const [staterid, setStateId] = useState(null);
    const [cityrid, setCityrId] = useState(null); // State to store city ID

    const [CityName, setCityByPincode] = useState('')
    const [StateName, setStateByPincode] = useState('')
    const [CountryName, setCountryName] = useState()


    console.log("rtgfdgbfgfff sdfdsdfd", selectedCountry)
    console.log("rtgfdgbfgfff",)

    console.log(selectedState)
    console.log(selectedCity)

    useEffect(() => {
        const countries = Country.getAllCountries();
        setCountryList(countries);
        console.log(countries)
    }, []);


    // const handleCountryChange = async (event) => {
    //     const countryCode = event.target.value;
    //     setSelectedCountry(countryCode);

    //     setSelectedState('');
    //     const states = State.getStatesOfCountry(countryCode);
    //     setStateList(states);

    //     // Set the country ID based on selected country index
    //     const countryId = countryList.findIndex(country => country.isoCode === countryCode) + 1;
    //     setCountryId(countryId);
    //     console.log("Selected Country Code:", countryCode);
    //     console.log("Country ID:", countryId);
    //     console.log("sldflsd",cnt)
    // };

    const handleCountryChange = async (event) => {
        const countryCode = event.target.value;
        setSelectedCountry(countryCode);

        setSelectedState('');
        const states = State.getStatesOfCountry(countryCode);
        setStateList(states);

        // Set the country ID based on selected country index
        const countryId = countryList.findIndex(country => country.isoCode === countryCode) + 1;
        setCountryId(countryId);

        // Find the country name based on isoCode
        const selectedCountry = countryList.find(country => country.isoCode === countryCode);
        const countryName = selectedCountry ? selectedCountry.name : '';

        // Set the country name to cnt
        setCountryName(countryName);

        console.log("Selected Country Code:", countryCode);
        console.log("Country ID:", countryId);
        console.log("Country Name:", countryName);  // This will log the country name
    };


    // const handleStateChange = (event) => {
    //     const stateCode = event.target.value;
    //     setSelectedState(stateCode);
    //     const cities = City.getCitiesOfState(selectedCountry, stateCode);
    //     setCityList(cities);

    //     // Set the state ID based on selected state index
    //     const stateId = stateList.findIndex(state => state.isoCode === stateCode) + 1;
    //     setStateId(stateId);
    //     console.log("Selected State Code:", stateCode);
    //     console.log("State ID:", stateId);
    // };

    // const handleCityChange = (event) => {
    //     const cityName = event.target.value;
    //     setCityrId(cityList.findIndex(city => city.name === cityName) + 1);
    //     console.log("Selected City Name:", cityName);
    //     console.log("City ID:", cityrid);
    // };


    const [errorMsg, setErrorMsg] = useState('');

    const showErrorMsg2 = (message) => {
        setErrorMsg(message);
    };

    useEffect(() => {
        if (selectedCountry && PostalCode) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`https://api.zippopotam.us/${selectedCountry}/${PostalCode}`);
                    console.log("Response:", response);

                    if (response.data && response.data.places && response.data.places.length > 0) {
                        setCityByPincode(response.data.places[0]['place name']);
                        setStateByPincode(response.data.places[0]['state']);
                        // setErrorMsg(''); // Clear any previous error message
                    } else {
                        showErrorMsg2("Pincode does not match the country");
                    }
                } catch (error) {
                    console.error("Error fetching data:", error);
                    showErrorMsg2("Pincode Error or not found");
                }
            };

            fetchData();
        } else {
            // If either country or postal code is not selected, show an error
            // showErrorMsg("Please select both Country and Pincode");
        }
    }, [selectedCountry, PostalCode]);


    console.log("PinCode accordding State kya mila hai", CityName)
    console.log("PinCode accordding City Name kya mila hai", StateName)

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // Set preview of the image
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(`
            name :      ${name} 
            lname :      ${lname} 
            email :      ${email} 
            phone :      ${phone} 
            addrees :      ${address} 
            PostalCode :      ${PostalCode} 
            selectedCountry :      ${CountryName} 
            selectedState :      ${StateName} 
            selectedCity :      ${CityName} 
            image :      ${file} 
            mname:   ${mname}
            userType:   ${userType}
            role:   ${role}
            mobileNo:   ${mobileNo}
            address1:   ${address1}
            gender:   ${gender}
            DOB:   ${DOB}
            IsActive:   ${IsActive}
            IsVerified :   ${IsVerified}
            password :   ${password}
            cpassword :   ${cpassword}

            `)

        const myform = new FormData


        myform.append("name", name)
        myform.append("lname", lname)
        myform.append("mname", mname)
        myform.append("email", email)
        myform.append("phone", phone)
        myform.append("mobileNo", mobileNo)
        myform.append("address", address)
        myform.append("address1", address1)
        myform.append("PostalCode", PostalCode)
        myform.append("CountryName", CountryName)
        myform.append("CityName", CityName)
        myform.append("StateName", StateName)
        myform.append("file", file)
        myform.append("role", role)
        myform.append("userType", userType)
        myform.append("gender", gender)
        myform.append("DOB", DOB)
        myform.append("password", password)
        myform.append("cpassword", cpassword)
        myform.append("IsActive", IsActive)
        myform.append("IsVerified", IsVerified)

        // myform.forEach((value, key) => {
        //     console.log(`${key}: ${value}`);
        // });

        // dispatch(updateUser(myform)).then((data) => {
        //     console.log(data.payload)
        //     if (data.payload.success) {
        //         showSuccessMsg("Profile update Succefully !!")
        //         navigate("/")

        //     }
        // })

        try {
            const response = await axiosInstance.post("/api/v1/admin/add/user", myform, { withCredentials: true });
            console.log(response.data);
            if (response.data.success) {
                showSuccessMsg(response.data.message);
                navigate("/admin/user-management");
            }
        } catch (error) {
            // Check for specific error code (duplicate key error)
            if (error.response && error.response.data.message.includes('duplicate key')) {
                showErrorMsg('This email is already in use. Please use a different email address.');
            } else {
                showErrorMsg(error.response ? error.response.data.message : 'An unexpected error occurred');
            }
            console.log(error.response ? error.response.data.message : 'An unexpected error occurred');
        }





    }

    // useEffect(() => {

    //     if (user) {
    //         setName(user.name)
    //         setLastName(user.lname)
    //         setAddressLineOne(user.address)
    //         setShippingAddress(user.shippingAddress)
    //         setMobileNo(user.phone)
    //         setImage(user.file)
    //         setCityByPincode(user.CityName)
    //         setEmailAddress(user.email)
    //         setPostalCode(user.PostalCode)
    //         setStateByPincode(user.StateName)
    //         setCountryName(user.CountryName)

    //     }
    // }, [])


    return (
        <>
            <div className="container-fluid">

                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box">
                            <div className="page-title-right">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="/admin/user-management" className='text-dark'>User Management</Link></li>
                                    <li className="breadcrumb-item active">Create User</li>
                                </ol>
                            </div>
                            <h4 className="page-title"><i className="ri-align-left me-2"></i> Create User</h4>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">

                                <h4 className="header-title mb-3"> Create User</h4>

                                <form onSubmit={handleSubmit}>
                                    <div id="basicwizard" className=''>
                                        <ul className="nav nav-pills form-wizard-header mb-4" style={{ display: 'flex', overflowX: 'auto' }}>
                                            <li className="nav-item">
                                                <a href="#basictab1" data-bs-toggle="tab" data-toggle="tab" className="nav-link rounded-0 py-2 ">
                                                    <i className="mdi mdi-tag-multiple font-18 align-middle me-1"></i>
                                                    <span className="d-none d-sm-inline">User Info</span>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#basictab2" data-bs-toggle="tab" data-toggle="tab" className="nav-link rounded-0 py-2">
                                                    {/* <i className="mdi mdi-currency-inr font-18 align-middle me-1"></i> */}
                                                    <i className="ri-contacts-book-3-line font-18 align-middle me-1"></i>
                                                    <span className="d-none d-sm-inline">Address</span>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#basictab3" data-bs-toggle="tab" data-toggle="tab" className="nav-link rounded-0 py-2">
                                                    <i className="mdi mdi-image-multiple font-18 align-middle me-1"></i>
                                                    <span className="d-none d-sm-inline">Pictures</span>
                                                </a>
                                            </li>
                                            {/* <li className="nav-item">
                        <a href="#basictab4" data-bs-toggle="tab" data-toggle="tab" className="nav-link rounded-0 py-2">
                          <i className="mdi mdi-store font-18 align-middle me-1"></i>
                          <span className="d-none d-sm-inline">Inventory</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#basictab5" data-bs-toggle="tab" data-toggle="tab" className="nav-link rounded-0 py-2">
                          <i className="mdi mdi-image-multiple font-18 align-middle me-1"></i>
                          <span className="d-none d-sm-inline">Pictures</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#basictab6" data-bs-toggle="tab" data-toggle="tab" className="nav-link rounded-0 py-2">
                          <i className="mdi mdi-desktop-mac-dashboard font-18 align-middle me-1"></i>
                          <span className="d-none d-sm-inline">SEO</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#basictab7" data-bs-toggle="tab" data-toggle="tab" className="nav-link rounded-0 py-2">
                          <i className="mdi mdi-monitor font-18 align-middle me-1"></i>
                          <span className="d-none d-sm-inline">Product Attributes</span>
                        </a>
                      </li> */}
                                        </ul>

                                        <div className="tab-content b-0 mb-0">
                                            <div className="tab-pane" id="basictab1">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="row mb-3">
                                                            <label className="col-md-3 col-form-label" for="userName"> First Name <span className="text-danger">*</span>
                                                            </label>

                                                            <div className="col-md-9">
                                                                <input type="text" className="form-control" id="userName" name="name" onChange={(e) => setName(e.target.value)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="row mb-3">
                                                            <label className="col-md-3 col-form-label" for="shortDescription">Middle Name</label>
                                                            <div className="col-md-9">
                                                                <input type="text" className="form-control" id="shortDescription" name="mname" onChange={(e) => setMName(e.target.value)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="row mb-3">
                                                            <label className="col-md-3 col-form-label" for="shortDescription">Last Name <span className="text-danger">*</span></label>
                                                            <div className="col-md-9">
                                                                <input type="text" className="form-control" id="shortDescription" name="lname" onChange={(e) => setLastName(e.target.value)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="row mb-3">
                                                            <label className="col-md-3 col-form-label" for="shortDescription">Email Address <span className="text-danger">*</span></label>
                                                            <div className="col-md-9">
                                                                <input type="text" className="form-control" id="shortDescription" name="email" onChange={(e) => setEmailAddress(e.target.value)} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="row mb-3">
                                                            <label for="example-select" className="col-md-3 col-form-label">User Type <span className="text-danger">*</span> </label>
                                                            <div className="col-md-9">
                                                                <select className="form-select" id="example-select" name='userType' onChange={(e) => setUserType(e.target.value)}>
                                                                    <option value="vendor">Vendor</option>
                                                                    <option value="shipper">Shipper</option>
                                                                    <option value="admin">Admin</option>
                                                                    <option value="customer">Customer</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 ">
                                                        <div className="row mb-3">
                                                            <label for="example-select" className="col-md-3 col-form-label">User Role </label>
                                                            <div className="col-md-9">
                                                                <select className="form-select" id="example-select" name='role' onChange={(e) => setRole(e.target.value)}>
                                                                    <option value="vender">Vendor</option>
                                                                    <option value="superAdmin">Super Admin</option>
                                                                    <option value="admin">Admin</option>

                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>




                                                    <div className="col-12">
                                                        <div className="row mb-3">
                                                            <label className="col-md-3 col-form-label" for="userName">Phone</label>
                                                            <div className="col-md-9">
                                                                <input type="number" className="form-control" id="userName" name="phone" onChange={(e) => setPhone(e.target.value)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="row mb-3">
                                                            <label className="col-md-3 col-form-label" for="userName">Mobile No</label>
                                                            <div className="col-md-9">
                                                                <input type="number" className="form-control" id="userName" name="mobileNo" onChange={(e) => setMobileNo(e.target.value)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="row mb-3">
                                                            <label className="col-md-3 col-form-label" for="userName"> Date of Birth </label>
                                                            <div className="col-md-9">
                                                                <div className=" position-relative" id="datepicker2">
                                                                    <input type="date" className="form-control" name='DOB' onChange={(e) => setDOB(e.target.value)} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="row mb-3">
                                                            <label for="example-select" className="col-md-3 col-form-label">Gander  <span className="text-danger">*</span></label>
                                                            <div className="col-md-9">
                                                                <select className="form-select" id="example-select" name='gander' onChange={(e) => setGender(e.target.value)}>
                                                                    <option value="male">Male</option>
                                                                    <option value="female">Female</option>
                                                                    <option value="other">Other</option>

                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="row mb-3">
                                                            <label className="col-md-3 col-form-label" for="shortDescription">Password <span className="text-danger">*</span></label>
                                                            <div className="col-md-9">
                                                                <input type="text" className="form-control" id="shortDescription" name="password" onChange={(e) => setPassword(e.target.value)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="row mb-3">
                                                            <label className="col-md-3 col-form-label" for="shortDescription">Confirm Password <span className="text-danger">*</span></label>
                                                            <div className="col-md-9">
                                                                <input type="text" className="form-control" id="shortDescription" name="cpassword" onChange={(e) => setCPassword(e.target.value)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="row mb-3">
                                                            <label className="col-md-3 col-form-label" for="userName">IsActive</label>
                                                            <div className="col-md-9">
                                                                <div className="form-check form-checkbox-info mb-2 fs-3">
                                                                    <input type="checkbox" className="form-check-input" id="customCheckcolor3" name='IsActive' onChange={(e) => setIsActive(e.target.value)} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="row mb-3">
                                                            <label className="col-md-3 col-form-label" for="userName">Is Verified</label>
                                                            <div className="col-md-9">
                                                                <div className="form-check form-checkbox-info mb-2 fs-3">
                                                                    <input type="checkbox" className="form-check-input" id="customCheckcolor3" name='IsVerified' onChange={(e) => setIsVerified(e.target.value)} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                            <div className="tab-pane" id="basictab2">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="row mb-3">
                                                            <label className="col-md-3 col-form-label" for="userName">Country  <span className="text-danger">*</span></label>
                                                            <div className="col-md-9">
                                                                <select onChange={handleCountryChange} value={selectedCountry} className="form-control"
                                                                    name="CountryName"
                                                                    id="CountryName"
                                                                    required={true}>
                                                                    <option value={user?.CountryName}>{user ? user?.CountryName : "Select Country"}</option>
                                                                    {countryList.map((country, index) => {
                                                                        const countryId = index + 1;
                                                                        return (
                                                                            <option key={countryId} value={country.isoCode}>
                                                                                {country.name}


                                                                            </option>
                                                                        );
                                                                    })}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="row mb-3">
                                                            <label className="col-md-3 col-form-label" for="userName">Postal Code</label>
                                                            <div className="col-md-9">
                                                                <input type="text" className="form-control" id="userName" name="PostalCode" onChange={(e) => setPostalCode(e.target.value)} />
                                                                {errorMsg && <div style={{ color: 'red' }}>{errorMsg}</div>}

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="row mb-3">
                                                            <label className="col-md-3 col-form-label" for="userName">State</label>
                                                            <div className="col-md-9">
                                                                <input type="text" className="form-control" id="userName" name="StateName" value={StateName} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="row mb-3">
                                                            <label className="col-md-3 col-form-label" for="userName">City</label>
                                                            <div className="col-md-9">
                                                                <input type="text" className="form-control" id="userName" name="CityName" value={CityName} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="row mb-3">
                                                            <label className="col-md-3 col-form-label" for="userName">Address Line One <span className="text-danger">*</span></label>
                                                            <div className="col-md-9">
                                                                <input type="text" className="form-control" id="userName" name="address" onChange={(e) => setAddressLineOne(e.target.value)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="row mb-3">
                                                            <label className="col-md-3 col-form-label" for="userName">Address Line Two</label>
                                                            <div className="col-md-9">
                                                                <input type="text" className="form-control" id="userName" name="address1" onChange={(e) => setAddressLineOne1(e.target.value)} />
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>

                                            <div className="tab-pane" id="basictab3">
                                                <div className="file-upload-container">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="row mb-3">
                                                                <label className="col-md-3 col-form-label">Upload User Image</label>
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="card">
                                                                    <div className="card-body">
                                                                        <input type="file" name="file" id="" className='form-control w-50' onChange={handleImageChange} />


                                                                        {/* Display image previews */}
                                                                        <div className="dropzone-previews mt-3">
                                                                            {previewFiles.map((filePreview, index) => (
                                                                                <div key={index} className="dz-preview dz-file-preview">
                                                                                    <div className="dz-image">
                                                                                        <img src={filePreview.previewUrl} alt={filePreview.file.name} />
                                                                                    </div>
                                                                                    <div className="dz-details">
                                                                                        <div className="dz-filename">
                                                                                            <span>{filePreview.file.name}</span>
                                                                                        </div>
                                                                                        <div className="dz-size">
                                                                                            <span>{(filePreview.file.size / 1024).toFixed(2)} KB</span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>


                                        </div>

                                        {/* {add button save} */}
                                        <div className="form-save-btn">

                                            <Link to="/admin/add-product" className="btn btn-secondary me-3 mb-2">
                                                <i className="ri-reset-right-line"></i> Reset
                                            </Link>
                                            <button type='submit' className="btn adminAddBtn mb-2">
                                                <i className="mdi mdi-send me-2"></i> Create USer
                                            </button>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div >

            </div >
        </>
    );
}
