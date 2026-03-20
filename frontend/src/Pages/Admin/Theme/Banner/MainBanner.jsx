import React, { useEffect, useRef, useState } from 'react'
import axiosInstance from '../../../../ApiHendler/axiosInstance'
import Config from '../../../../Config/Config'
import { showErrorMsg, showSuccessMsg } from '../../../../utils/ShowMessages'
// import SliderStyle from '../../../../Comoponant/Theme/Home/SliderStyle'
import SliderStyle from '../../../../Comoponant/Home/SliderStyle'

export default function MainBanner() {
    const [topTitle, setTopTitle] = useState('')
    const [mainTitle, setMainTitle] = useState('')
    const [bottomTitle, setBottomTitle] = useState('')
    const [leftButtonText, setleftButtonText] = useState('')
    const [rightButtonText, setrightButtonText] = useState('')
    const [leftButtonUrl, setleftButtonUrl] = useState('')
    const [rightButtonUrl, setrightButtonUrl] = useState('')
    const [DisplayNo, setDisplayNo] = useState('')
    const [IsActive, setIsActive] = useState("active")
    const [file, setFile] = useState(null)
    const [allHomeBanner, setAllHomeBanner] = useState([])
    const [getId, setGetId] = useState()
    const [preview, setPreview] = useState();

    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);

    const toggleAccordion = () => {
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.style.maxHeight = isOpen
                ? `${contentRef.current.scrollHeight}px`
                : "0px";
        }
    }, [isOpen]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        console.log("dfdjhf", selectedFile)
        setFile(selectedFile);

        if (selectedFile) {
            // File preview banana
            const fileUrl = URL.createObjectURL(selectedFile);
            setPreview(fileUrl);
        }
    };

    const handleHomeBannerSubmit = async (e) => {
        e.preventDefault();

        const myform = new FormData();
        myform.append("topTitle", topTitle);
        myform.append("mainTitle", mainTitle);
        myform.append("bottomTitle", bottomTitle);
        myform.append("leftButtonText", leftButtonText);
        myform.append("rightButtonText", rightButtonText);
        myform.append("leftButtonUrl", leftButtonUrl);
        myform.append("rightButtonUrl", rightButtonUrl);
        myform.append("DisplayNo", DisplayNo);
        myform.append("IsActive", IsActive);
        if (file) myform.append("file", file);

        for (let [key, value] of myform.entries()) {
            console.log(key, value);
        }


        try {
            const response = await axiosInstance.post(
                Config.END_POINT_LIST["ADD_HOME_BANNER"],
                myform,
                {
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                showSuccessMsg(response.data.message);
                setAllHomeBanner((prevState) =>
                    prevState.map((homeBanner) =>
                        homeBanner._id === getId
                            ? { ...homeBanner, IsActive, topTitle, mainTitle, bottomTitle, leftButtonText, leftButtonUrl, rightButtonText, rightButtonUrl, DisplayNo, file: response.data.response.file }
                            : homeBanner
                    )
                );
            } else {
                showErrorMsg(response.data.message);
            }
        } catch (error) {
            console.error(error);
            showErrorMsg(error.response?.data?.message || "Something went wrong");
        }
    };


    useEffect(() => {

        const fatchData = async () => {
            try {
                //   debugger
                const response = await axiosInstance.get(Config.END_POINT_LIST["GET_ALL_HOME_BANNER"], { withCredentials: true })
                // console.log(response)
                if (response.data.success) {
                    setAllHomeBanner(response.data.allHomeBanners)
                }
                else {
                    showErrorMsg(response.data.message)
                }
            } catch (error) {
                showErrorMsg(error.response.data.message);

            }
        }
        fatchData();

    }, []);

    const handleDelete = async (id) => {
        try {
            //   debugger
            const response = await axiosInstance.delete(`${Config.END_POINT_LIST["DELETE_HOME_BANNER"]}/${id}`, { withCredentials: true })
            // console.log(response)

            if (response.data.success) {
                showSuccessMsg(response.data.message)
                setAllHomeBanner((prevState) => prevState.filter((contactDetails) => contactDetails._id !== id));
            }
            else {
                showErrorMsg(response.data.message)
            }
        } catch (error) {
            showErrorMsg(error.response.data.message);

        }

    };

    const handleEdit = (id) => {
        // debugger
        setGetId(id)
        try {
            const homeBanner = allHomeBanner.find(homeBanner => homeBanner._id === id);

            if (homeBanner) {

                setTopTitle(homeBanner.topTitle)
                setMainTitle(homeBanner.mainTitle)
                setBottomTitle(homeBanner.bottomTitle)
                setleftButtonText(homeBanner.leftButtonText)
                setrightButtonText(homeBanner.rightButtonText)
                setleftButtonText(homeBanner.leftButtonUrl)
                setrightButtonUrl(homeBanner.rightButtonUrl)
                setDisplayNo(homeBanner.DisplayNo)
                setIsActive(homeBanner.IsActive)
                setFile(homeBanner.file)

            }


        } catch (error) {
            console.log(error);
        }

    }

    const handleEditHomeBannerSubmit = async (e) => {
        e.preventDefault();
        try {
            const myform = new FormData()
            myform.append("topTitle", topTitle)
            myform.append("mainTitle", mainTitle)
            myform.append("bottomTitle", bottomTitle)
            myform.append("leftButtonText", leftButtonText)
            myform.append("rightButtonText", rightButtonText)
            myform.append("leftButtonUrl", leftButtonUrl)
            myform.append("rightButtonUrl", rightButtonUrl)
            myform.append("DisplayNo", DisplayNo)
            myform.append("IsActive", IsActive)
            if (file) {
                myform.append("file", file)

            }

            const response = await axiosInstance.put(`${Config.END_POINT_LIST["UPDATE_HOME_BANNER"]}/${getId}`, myform, { withCredentials: true })

            if (response.data.success) {
                showSuccessMsg(response.data.message)
                // setAllHomeBanner((prevState) => prevState.filter((contactDetails) => contactDetails._id !== getId));

                setAllHomeBanner((prevState) =>
                    prevState.map((homeBanner) =>
                        homeBanner._id === getId
                            ? { ...homeBanner, IsActive, topTitle, mainTitle, bottomTitle, leftButtonText, leftButtonUrl, rightButtonText, rightButtonUrl, DisplayNo, file: response.data.response.file }
                            : homeBanner
                    )
                );

                // setAllHomeBanner(prevState => [
                //     ...prevState,
                //     {
                //         ...response.data.response, 
                //         IsActive, topTitle, mainTitle, bottomTitle, leftButtonText, leftButtonUrl, rightButtonText, rightButtonUrl, DisplayNo, file:response.data.response.file
                //     }
                // ]);
            }
            else {
                showErrorMsg(response.data.message)
            }
        } catch (error) {
            showErrorMsg(error.response.data.message);

        }
    }

    // Example for exporting to CSV
    const handleExport = () => {
        const ws = XLSX.utils.json_to_sheet(allHomeBanner);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Home Banner");
        XLSX.writeFile(wb, "homeBanner.xlsx");
    };

    const [currentPage, setCurrentPage] = useState(1);
    const menusPerPage = 5;

    // ✅ Calculate current page menus
    const indexOfLast = currentPage * menusPerPage;
    const indexOfFirst = indexOfLast - menusPerPage;
    const currentMenus = allHomeBanner.slice(indexOfFirst, indexOfLast);

    // ✅ Total pages
    const totalPages = Math.ceil(allHomeBanner.length / menusPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <>
            <div className="slider-style-wrapper">
                <div className="accordion1-card shadow-sm">
                    {/* Header */}
                    <div className="accordion1-header" onClick={toggleAccordion}>
                        <h5 className="mb-0">Add Banner</h5>
                        <span className={`accordion1-icon ${isOpen ? "rotate" : ""}`}>
                            <i className="bi bi-chevron-down"></i>
                        </span>
                    </div>

                    {/* Collapsible content */}
                    <div ref={contentRef} className="accordion1-body-wrapper">
                        <div className="accordion1-body">
                            <div className="container py-4 shadow-2xl rounded-4 mb-5">

                                <div className="row mb-8">
                                    <div className="col-md-12">
                                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-4">

                                            <div>
                                                <button className="btn btn-primary" data-bs-toggle="modal"
                                                    data-bs-target="#customizeModal">Add Banner</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 mx-auto">
                                        <div className="card shadow rounded-4 border-0">
                                            <div className="card-header bg-white border-bottom-0 pb-0">
                                                <h5 className="mb-0 fw-semibold">Current Topbar Settings</h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="table-responsive">
                                                    <table className="table align-middle table-hover table-borderless mb-0">
                                                        <thead className="table-light">
                                                            <tr>
                                                                <th>Title</th>
                                                                <th>Banner</th>
                                                                <th>Display No</th>
                                                                <th>Status</th>
                                                                <th>Created At</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            {currentMenus.length > 0 ? (
                                                                currentMenus.map((item, index) => (
                                                                    <tr key={item._id || index}>
                                                                        {/* ✅ Title */}
                                                                        <td>
                                                                            <div>
                                                                                <strong>{item.mainTitle}</strong>
                                                                                <div className="text-muted small">{item.topTitle}</div>
                                                                            </div>
                                                                        </td>

                                                                        {/* ✅ Image */}
                                                                        <td>
                                                                            <img
                                                                                src={`${Config.ADMIN_BASE_URL}/uploads/banner/${item.file}`}
                                                                                alt={item.mainTitle}
                                                                                style={{
                                                                                    width: "80px",
                                                                                    height: "50px",
                                                                                    borderRadius: "6px",
                                                                                    objectFit: "cover",
                                                                                    border: "1px solid #ddd",
                                                                                }}
                                                                            />
                                                                        </td>

                                                                        {/* ✅ Display No */}
                                                                        <td>{item.DisplayNo}</td>

                                                                        {/* ✅ Status */}
                                                                        <td>
                                                                            <span
                                                                                className={`badge ${item.IsActive === "active" ? "bg-success" : "bg-danger"
                                                                                    }`}
                                                                            >
                                                                                {item.IsActive}
                                                                            </span>
                                                                        </td>

                                                                        {/* ✅ Date */}
                                                                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>

                                                                        {/* ✅ Action Buttons */}
                                                                        <td>
                                                                            <button className="btn btn-sm btn-outline-primary me-2"
                                                                                title="Edit Menu" data-bs-toggle="modal" data-bs-target="#exampleModalEdit" onClick={() => handleEdit(item._id)} >
                                                                                <i className="fa-solid fa-pen-to-square"></i>
                                                                            </button>
                                                                            <button
                                                                                className="btn btn-sm btn-outline-danger"
                                                                                title="Delete Menu" onClick={() => handleDelete(item._id)}
                                                                            >
                                                                                <i className="fa-solid fa-trash-can"></i>
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            ) : (
                                                                <tr>
                                                                    <td colSpan="6" className="text-center py-4">
                                                                        No Banners Found
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </tbody>


                                                    </table>
                                                </div>
                                                {/* ✅ Pagination Section */}
                                                {totalPages > 1 && (
                                                    <div className="d-flex justify-content-center mt-3">
                                                        <nav>
                                                            <ul className="pagination pagination-sm mb-0">
                                                                <li
                                                                    className={`page-item ${currentPage === 1 ? "disabled" : ""
                                                                        }`}
                                                                >
                                                                    <button
                                                                        className="page-link"
                                                                        onClick={() => handlePageChange(currentPage - 1)}
                                                                    >
                                                                        <i className="fa-solid fa-chevron-left"></i>
                                                                    </button>
                                                                </li>

                                                                {[...Array(totalPages)].map((_, i) => (
                                                                    <li
                                                                        key={i}
                                                                        className={`page-item ${currentPage === i + 1 ? "active" : ""
                                                                            }`}
                                                                    >
                                                                        <button
                                                                            className="page-link"
                                                                            onClick={() => handlePageChange(i + 1)}
                                                                        >
                                                                            {i + 1}
                                                                        </button>
                                                                    </li>
                                                                ))}

                                                                <li
                                                                    className={`page-item ${currentPage === totalPages ? "disabled" : ""
                                                                        }`}
                                                                >
                                                                    <button
                                                                        className="page-link"
                                                                        onClick={() => handlePageChange(currentPage + 1)}
                                                                    >
                                                                        <i className="fa-solid fa-chevron-right"></i>
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </nav>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>



                                {/* Model  */}

                                <div className="modal fade" id="customizeModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                                    <div className="modal-dialog modal-lg ">
                                        <div className="modal-content rounded-4 shadow">
                                            <div className="modal-header border-bottom-0">
                                                <h5 className="modal-title fw-bold" id="exampleModalLabel">
                                                    Add Banner
                                                </h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                                            </div>
                                            <form onSubmit={handleHomeBannerSubmit} >
                                                <div className="modal-body">

                                                    <div className="row g-3">
                                                        <div className="col-6 mb-3">
                                                            <label className="form-label fw-semibold">TopTitle</label>
                                                            <input type="text" className="form-control" placeholder="Enter Top Title" name="topTitle" onChange={(e) => setTopTitle(e.target.value)} />
                                                            {/* <small className="text-muted">Minimum 1 column required</small> */}
                                                        </div>
                                                        <div className="col-6 mb-3">
                                                            <label className="form-label fw-semibold">MainTitle</label>
                                                            <input type="text" className="form-control" placeholder="Enter Main Title" name="mainTitle" onChange={(e) => setMainTitle(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="row g-3">
                                                        <div className=" mb-3">
                                                            <label className="form-label fw-semibold">Bottom Title</label>
                                                            <input type="text" className="form-control" placeholder="Enter Bottom Title " name="bottomTitle" onChange={(e) => setBottomTitle(e.target.value)} />


                                                        </div>

                                                    </div>
                                                    <div className="row g-3">
                                                        <div className="col-6 mb-3">
                                                            <label className="form-label fw-semibold">Left ButtonText</label>
                                                            <input type="text" className="form-control" placeholder="Enter Left Button Text " name="leftButtonText" onChange={(e) => setleftButtonText(e.target.value)} />

                                                        </div>
                                                        <div className="col-6 mb-3">
                                                            <label className="form-label fw-semibold">Left ButtonUrl</label>
                                                            <input type="text" className="form-control" placeholder="Enter Left Button Url" name="leftButtonUrl" onChange={(e) => setleftButtonUrl(e.target.value)} />

                                                        </div>
                                                    </div>
                                                    <div className="row g-3">
                                                        <div className="col-6 mb-3">
                                                            <label className="form-label fw-semibold">Right ButtonText</label>
                                                            <input type="text" className="form-control" placeholder="Enter Right Button Text " name="rightButtonText" onChange={(e) => setrightButtonText(e.target.value)} />

                                                        </div>
                                                        <div className="col-6 mb-3">
                                                            <label className="form-label fw-semibold">Right ButtonUrl</label>
                                                            <input type="text" className="form-control" placeholder="Enter Right Button Url" name="rightButtonUrl" onChange={(e) => setrightButtonUrl(e.target.value)} />

                                                        </div>
                                                    </div>

                                                    <div className="row g-3 mb-3">

                                                        <div className="col-6">
                                                            <label className="form-label fw-semibold">Status</label>
                                                            <select
                                                                className="form-select"
                                                                name="IsActive"
                                                                value={IsActive}
                                                                onChange={(e) => setIsActive(e.target.value)}
                                                            >
                                                                <option value="active" >Active</option>
                                                                <option value="in-active">Inactive</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-6">
                                                            <label className="form-label fw-semibold">Display Number</label>
                                                            <input type="number" className="form-control" placeholder="Enter Display No" name="DisplayNo" onChange={(e) => setDisplayNo(e.target.value)} />

                                                        </div>
                                                    </div>
                                                    <div className="row mb-3 card-body d-flex flex-column gap-8 p-7" >
                                                        <div className="d-flex flex-column flex-md-row align-items-center mb-4 file-input-wrapper gap-2">
                                                            <div>
                                                                <img className="image avatar avatar-lg rounded-3" src={preview} alt="Image" />
                                                            </div>

                                                            <div className="file-upload btn btn-light ms-md-4">
                                                                <input type="file" className="file-input opacity-0" name='file' onChange={handleFileChange}
                                                                />
                                                                Upload Photo
                                                            </div>

                                                            <span className="ms-2">JPG, GIF or PNG. 1MB Max.</span>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="modal-footer border-top-0">
                                                    <button type="button" className="btn btn-light" data-bs-dismiss="modal" >
                                                        Close
                                                    </button>
                                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" >
                                                        Save Settings
                                                    </button>
                                                </div>
                                            </form>

                                        </div>
                                    </div>
                                </div>

                                {/* Edit Model  */}
                                <div className="modal fade" id="exampleModalEdit" tabIndex="-1" aria-labelledby="exampleModalEdit" aria-hidden="true" >
                                    <div className="modal-dialog modal-lg ">
                                        <div className="modal-content rounded-4 shadow">
                                            <div className="modal-header border-bottom-0">
                                                <h5 className="modal-title fw-bold" id="exampleModalLabel">
                                                    Add Banner
                                                </h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                                            </div>
                                            <form onSubmit={handleEditHomeBannerSubmit} >
                                                <div className="modal-body">

                                                    <div className="row g-3">
                                                        <div className="col-6 mb-3">
                                                            <label className="form-label fw-semibold">TopTitle</label>
                                                            <input type="text" className="form-control" placeholder="Enter Top Title" name="topTitle" onChange={(e) => setTopTitle(e.target.value)} value={topTitle} />
                                                            {/* <small className="text-muted">Minimum 1 column required</small> */}
                                                        </div>
                                                        <div className="col-6 mb-3">
                                                            <label className="form-label fw-semibold">MainTitle</label>
                                                            <input type="text" className="form-control" placeholder="Enter Main Title" name="mainTitle" onChange={(e) => setMainTitle(e.target.value)} value={mainTitle} />
                                                        </div>
                                                    </div>
                                                    <div className="row g-3">
                                                        <div className=" mb-3">
                                                            <label className="form-label fw-semibold">Bottom Title</label>
                                                            <input type="text" className="form-control" placeholder="Enter Bottom Title " name="bottomTitle" onChange={(e) => setBottomTitle(e.target.value)} value={bottomTitle} />

                                                        </div>

                                                    </div>
                                                    <div className="row g-3">
                                                        <div className="col-6 mb-3">
                                                            <label className="form-label fw-semibold">Left ButtonText</label>
                                                            <input type="text" className="form-control" placeholder="Enter Left Button Text " name="leftButtonText" onChange={(e) => setleftButtonText(e.target.value)} value={leftButtonText} />

                                                        </div>
                                                        <div className="col-6 mb-3">
                                                            <label className="form-label fw-semibold">Left ButtonUrl</label>
                                                            <input type="text" className="form-control" placeholder="Enter Left Button Url" name="leftButtonUrl" onChange={(e) => setleftButtonUrl(e.target.value)} value={leftButtonUrl} />

                                                        </div>
                                                    </div>
                                                    <div className="row g-3">
                                                        <div className="col-6 mb-3">
                                                            <label className="form-label fw-semibold">Right ButtonText</label>
                                                            <input type="text" className="form-control" placeholder="Enter Right Button Text " name="rightButtonText" onChange={(e) => setrightButtonText(e.target.value)} value={rightButtonText} />

                                                        </div>
                                                        <div className="col-6 mb-3">
                                                            <label className="form-label fw-semibold">Right ButtonUrl</label>
                                                            <input type="text" className="form-control" placeholder="Enter Right Button Url" name="rightButtonUrl" onChange={(e) => setrightButtonUrl(e.target.value)} value={rightButtonUrl} />

                                                        </div>
                                                    </div>

                                                    <div className="row g-3 mb-3">

                                                        <div className="col-6">
                                                            <label className="form-label fw-semibold">Status</label>
                                                            <select
                                                                className="form-select"
                                                                name="IsActive"
                                                                value={IsActive}
                                                                onChange={(e) => setIsActive(e.target.value)}
                                                            >
                                                                <option value="active" >Active</option>
                                                                <option value="in-active">Inactive</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-6">
                                                            <label className="form-label fw-semibold">Display Number</label>
                                                            <input type="number" className="form-control" placeholder="Enter Display No" name="DisplayNo" onChange={(e) => setDisplayNo(e.target.value)} value={DisplayNo} />

                                                        </div>
                                                    </div>
                                                    <div className="row mb-3 card-body d-flex flex-column gap-8 p-7" >
                                                        <div className="d-flex flex-column flex-md-row align-items-center mb-4 file-input-wrapper gap-2">
                                                            <div>
                                                                <img className="image avatar avatar-lg rounded-3" src={preview ? preview : `${Config.ADMIN_BASE_URL}/uploads/banner/${file}`} alt="Image" />
                                                            </div>

                                                            <div className="file-upload btn btn-light ms-md-4">
                                                                <input type="file" className="file-input opacity-0" name='file' onChange={handleFileChange}
                                                                />
                                                                Upload Photo
                                                            </div>

                                                            <span className="ms-2">JPG, GIF or PNG. 1MB Max.</span>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="modal-footer border-top-0">
                                                    <button type="button" className="btn btn-light" data-bs-dismiss="modal" >
                                                        Close
                                                    </button>
                                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" >
                                                        Save Settings
                                                    </button>
                                                </div>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>





            <div className="slider-style-wrapper">
                <div className="accordion1-card shadow-sm">

                    <SliderStyle allHomeBanner={allHomeBanner} />
                </div>
            </div>
        </>
    )
}
