import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../../ApiHendler/axiosInstance';
import Config from '../../../../Config/Config';
import MainBar from '../../../../Comoponant/Theme/Layout/MainBar';

export default function TopbarManage() {
    // Topbar state
    const [settings, setSettings] = useState({
        numberOfColumns: 1,
        texts: ["Welcome to My Store!Super Value Deals - Save more with coupons", ""],
        backgroundColor: "#007bff",
        textColor: "#ffffff",
        language: "English",
        status: "Active",
    });

    const [bgType, setBgType] = useState("solid");
    const [gradient, setGradient] = useState({
        color1: "#0d6efd",
        color2: "#6610f2",
        direction: "to right"
    });
    const [searchBgType, setSearchBgType] = useState("solid");

    const [searchGradient, setSearchGradient] = useState({
        color1: "#ffffff",
        color2: "#e0e0e0",
        direction: "to right"
    });
    // Search bar state
    const [searchBoxSettings, setSearchBoxSettings] = useState({
        placeholderText: "Search for products...",
        backgroundColor: "#ffffff",
        textColor: "#000000",
        borderColor: "#ced4da",
        status: "Active",
        logo: "logo.png",
        icons: [
            { name: "cart", link: "" },
            { name: "shop", link: "" }
        ]
    });

    const [file, setFile] = useState(null);

    // Icon handlers
    // const handleIconChange = (idx, field, value) => {
    //     setSearchBoxSettings(prev => ({
    //         ...prev,
    //         icons: prev.icons.map((icon, i) =>
    //             i === idx ? { ...icon, [field]: value } : icon
    //         )
    //     }));
    // };
    const handleIconChange = (index, key, value) => {
        const updatedIcons = [...searchBoxSettings.icons];
        updatedIcons[index][key] = value;
        setSearchBoxSettings({ ...searchBoxSettings, icons: updatedIcons });
    };


    const handleAddIcon = () => {
        setSearchBoxSettings(prev => ({
            ...prev,
            icons: [...prev.icons, { name: "", link: "" }]
        }));
    };
    const handleRemoveIcon = (idx) => {
        setSearchBoxSettings(prev => ({
            ...prev,
            icons: prev.icons.filter((_, i) => i !== idx)
        }));
    };


    // Topbar gradient effect
    useEffect(() => {
        if (bgType === "gradient") {
            setSettings((prev) => ({
                ...prev,
                backgroundColor: `linear-gradient(${gradient.direction}, ${gradient.color1}, ${gradient.color2})`
            }));
        }
    }, [gradient, bgType]);

    // Search bar gradient effect
    useEffect(() => {
        if (searchBgType === "gradient") {
            setSearchBoxSettings((prev) => ({
                ...prev,
                backgroundColor: `linear-gradient(${searchGradient.direction}, ${searchGradient.color1}, ${searchGradient.color2})`
            }));
        }
    }, [searchGradient, searchBgType]);

    // Topbar fetch
    useEffect(() => {
        const tooltipTriggerList = Array.from(
            document.querySelectorAll('[data-bs-toggle="tooltip"]')
        );
        tooltipTriggerList.forEach((el) => {
            new window.bootstrap.Tooltip(el);
        });
        const fetchSettings = async () => {
            try {
                const response = await axiosInstance.get(Config.END_POINT_LIST["GET_THEME_TOPBAR"], { withCredentials: true });
                const searchResponse = await axiosInstance.get(Config.END_POINT_LIST["GET_THEME_SEARCHBAR"], { withCredentials: true });
                if (response.data.success && response.data.setting) {
                    setSettings(response.data.setting);

                    if (response.data.setting.backgroundColor?.startsWith("linear-gradient")) {
                        setBgType("gradient");
                        const match = response.data.setting.backgroundColor.match(/linear-gradient\(([^,]+),\s*([^,]+),\s*([^)]+)\)/);
                        if (match) {
                            setGradient({
                                direction: match[1].trim(),
                                color1: match[2].trim(),
                                color2: match[3].trim()
                            });
                        }
                    } else {
                        setBgType("solid");
                        setGradient((g) => ({ ...g, color1: response.data.setting.backgroundColor || "#0d6efd" }));
                    }
                }
                if (searchResponse.data.success && searchResponse.data.setting) {
                    setSearchBoxSettings(searchResponse.data.setting);

                    if (searchResponse.data.setting.backgroundColor?.startsWith("linear-gradient")) {
                        setBgType("gradient");
                        const match = searchResponse.data.setting.backgroundColor.match(/linear-gradient\(([^,]+),\s*([^,]+),\s*([^)]+)\)/);
                        if (match) {
                            setGradient({
                                direction: match[1].trim(),
                                color1: match[2].trim(),
                                color2: match[3].trim()
                            });
                        }
                    } else {
                        setBgType("solid");
                        setGradient((g) => ({ ...g, color1: response.data.setting.backgroundColor || "#0d6efd" }));
                    }
                }
            } catch (error) {
                console.error("Error fetching topbar settings:", error);
            }
        };
        fetchSettings();
    }, []);


    const handleSave = async () => {

        try {
            const response = await axiosInstance.put(
                Config.END_POINT_LIST["TOPBAR_SETTING"],
                { settings },
                { withCredentials: true }
            );
            if (response.data.success) {
            }
        } catch (error) {
            // Error message
        }
    };

    const handleSearchSave = async (e) => {
        e.preventDefault();

        if (!searchBoxSettings) {
            alert("Search settings not found.");
            return;
        }

        try {
            const formData = new FormData();

            formData.append("placeholderText", searchBoxSettings.placeholderText || "");
            formData.append("backgroundColor", searchBoxSettings.backgroundColor || "");
            formData.append("textColor", searchBoxSettings.textColor || "");
            formData.append("borderColor", searchBoxSettings.borderColor || "");
            formData.append("status", searchBoxSettings.status || "Active");

            const validIcons = (searchBoxSettings.icons || []).map((icon) => ({
                name: icon.name || "",
                link: icon.link || "",
            }));

            formData.append("icons", JSON.stringify(validIcons));

            if (file && file.name) {
                formData.append("file", file);
            }

            // Debug: Check formData before sending
            for (let [key, value] of formData.entries()) {
                console.log("➡️", key, value);
            }

            const response = await axiosInstance.post(
                Config.END_POINT_LIST["SEARCHBAR_SETTING"],
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                    timeout: 60000,
                }
            );

            console.log("✅ Saved:", response.data);
            alert("Searchbar setting saved successfully!");
        } catch (error) {
            console.error("❌ Error:", error.response?.data || error);
            alert("Something went wrong: " + (error.response?.data?.message || error.message));
        }
    };




    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings((prev) => ({ ...prev, [name]: value }));
    };

    const handleGradientChange = (e) => {
        const { name, value } = e.target;
        setGradient((prev) => ({ ...prev, [name]: value }));
    };

    const handleSolidColorChange = (e) => {
        setSettings((prev) => ({
            ...prev,
            backgroundColor: e.target.value
        }));
        setGradient((g) => ({ ...g, color1: e.target.value }));
    };

    // Search bar handlers
    const handleSearchBoxChange = (e) => {
        const { name, value } = e.target;
        if (name === "searchIcon" || name === "voiceIcon") {
            setSearchBoxSettings((prev) => ({
                ...prev,
                icons: { ...prev.icons, [name]: value }
            }));
        } else {
            setSearchBoxSettings((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSearchSolidColorChange = (e) => {
        setSearchBoxSettings((prev) => ({
            ...prev,
            backgroundColor: e.target.value
        }));
        setSearchGradient((g) => ({ ...g, color1: e.target.value }));
    };

    const handleSearchGradientChange = (e) => {
        const { name, value } = e.target;
        setSearchGradient((prev) => ({ ...prev, [name]: value }));
    };

    // Preview Style
    const previewStyle =
        bgType === "solid"
            ? {
                background: settings.backgroundColor,
                color: settings.textColor,
                padding: "10px",
                borderRadius: "4px",
                display: "flex",
                gap: "10px",
            }
            : {
                background: `linear-gradient(${gradient.direction}, ${gradient.color1}, ${gradient.color2})`,
                color: settings.textColor,
                padding: "10px",
                borderRadius: "4px",
                display: "flex",
                gap: "10px",
            };
    const searchPreviewStyle = {
        background: searchBgType === "solid" ? searchBoxSettings.backgroundColor : searchBoxSettings.backgroundColor,
        color: searchBoxSettings.textColor,
        border: `1px solid ${searchBoxSettings.borderColor}`,
        padding: "8px 16px",
        borderRadius: "6px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 8
    };

    // Handle column number change
    const handleNumColumnsChange = (e) => {

        const value = Math.max(1, parseInt(e.target.value) || 1);
        let newTexts = [...(settings.texts || [])];

        if (value > newTexts.length) {
            for (let i = newTexts.length; i < value; i++) newTexts.push("");
        } else {
            newTexts = newTexts.slice(0, value);
        }

        setSettings({ ...settings, numberOfColumns: value, texts: newTexts });
    };

    const handleTextChange = (index, value) => {
        const updated = [...(settings.texts || [])];
        updated[index] = value;
        setSettings({ ...settings, texts: updated });
    };

    const handleRemoveText = (index) => {
        debugger
        const updated = [...(settings.texts || [])];

        updated.splice(index, 1);
        setSettings({ ...settings, texts: updated });
        if (settings.numberOfColumns > 1) {
            setSettings(prev => ({ ...prev, numberOfColumns: prev.numberOfColumns - 1 }));
        }

    };


    const handleAddText = () => {

        setSettings({
            ...settings,
            texts: [...(settings.texts || []), ""]
        });
    };


    console.log("Topbar Settings:", settings);

    return (
        <>
            <div className="container py-4 shadow-2xl rounded-4">
                <div className="row mb-4">
                    <div className="col-md-12">
                        <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
                            <div>
                                <h2 className="fw-bold mb-1">Topbar Manage</h2>

                            </div>
                            <div>
                                <button
                                    className="btn btn-primary shadow"
                                    data-bs-toggle="modal"
                                    data-bs-target="#customizeModal"

                                >
                                    <i className="bi bi-pencil-square me-2"></i>
                                    Edit Topbar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xl-10 col-lg-11 mx-auto">
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
                                                <th>Background</th>
                                                <th>Text Color</th>
                                                <th>Language</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr key={settings._id}>
                                                <td className="fw-semibold">{settings.title}</td>
                                                <td>
                                                    <span
                                                        style={{
                                                            display: 'inline-block',
                                                            width: 36,
                                                            height: 20,
                                                            borderRadius: 4,
                                                            border: '1px solid #ccc',
                                                            background: settings.backgroundColor.startsWith("linear-gradient") ? "" : settings.backgroundColor,
                                                            backgroundImage: settings.backgroundColor.startsWith("linear-gradient") ? settings.backgroundColor : "none"
                                                        }}
                                                    ></span>
                                                    <span className="ms-2 small">{settings.backgroundColor}</span>
                                                </td>
                                                <td>
                                                    <span
                                                        style={{
                                                            display: 'inline-block',
                                                            width: 36,
                                                            height: 20,
                                                            borderRadius: 4,
                                                            border: '1px solid #ccc',
                                                            background: settings.textColor,
                                                        }}
                                                    ></span>
                                                    <span className="ms-2 small">{settings.textColor}</span>
                                                </td>
                                                <td>{settings.language}</td>
                                                <td>
                                                    <span className={`badge px-3 py-2 rounded-pill bg-${settings.status === "Active" ? "success" : "secondary"}`}>
                                                        {settings.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-outline-primary btn-sm"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#customizeModal"

                                                    >
                                                        Edit
                                                    </button>
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

            {/* Search Bar */}

            <div className="container py-4 shadow-2xl rounded-4 mt-4 pt-5">
                <div className="row mb-4">
                    <div className="col-md-12">
                        <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
                            <div>
                                <h2 className="fw-bold mb-1">Search Bar Manage</h2>

                            </div>
                            <div>
                                <button
                                    className="btn btn-primary shadow"
                                    data-bs-toggle="modal"
                                    data-bs-target="#customizeSearchModal"
                                >
                                    <i className="bi bi-pencil-square me-2"></i>
                                    Edit Search Bar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-10 col-lg-11 mx-auto">
                        <div className="card shadow rounded-4 border-0">
                            <div className="card-header bg-white border-bottom-0 pb-0">
                                <h5 className="mb-0 fw-semibold">Current Search Bar Settings</h5>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table align-middle table-hover table-borderless mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Placeholder</th>
                                                <th>Background</th>
                                                <th>Text Color</th>
                                                <th>Border Color</th>
                                                <th>Logo</th>
                                                <th>Search Icon</th>
                                                <th>Voice Icon</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="fw-semibold">{searchBoxSettings.placeholderText}</td>
                                                <td>
                                                    <span
                                                        style={{
                                                            display: 'inline-block',
                                                            width: 36,
                                                            height: 20,
                                                            borderRadius: 4,
                                                            border: '1px solid #ccc',
                                                            background: searchBoxSettings.backgroundColor.startsWith("linear-gradient") ? "" : searchBoxSettings.backgroundColor,
                                                            backgroundImage: searchBoxSettings.backgroundColor.startsWith("linear-gradient") ? searchBoxSettings.backgroundColor : "none"
                                                        }}
                                                    ></span>
                                                    <span className="ms-2 small">{searchBoxSettings.backgroundColor}</span>
                                                </td>
                                                <td>
                                                    <span
                                                        style={{
                                                            display: 'inline-block',
                                                            width: 36,
                                                            height: 20,
                                                            borderRadius: 4,
                                                            border: '1px solid #ccc',
                                                            background: searchBoxSettings.textColor,
                                                        }}
                                                    ></span>
                                                    <span className="ms-2 small">{searchBoxSettings.textColor}</span>
                                                </td>
                                                <td>
                                                    <span
                                                        style={{
                                                            display: 'inline-block',
                                                            width: 36,
                                                            height: 20,
                                                            borderRadius: 4,
                                                            border: '1px solid #ccc',
                                                            background: searchBoxSettings.borderColor,
                                                        }}
                                                    ></span>
                                                    <span className="ms-2 small">{searchBoxSettings.borderColor}</span>
                                                </td>
                                                <td>
                                                    <img src={searchBoxSettings.logo} alt="logo" style={{ width: 28, height: 28, borderRadius: 4, objectFit: "cover" }} />
                                                </td>
                                                <td>
                                                    <img src={searchBoxSettings.icons.searchIcon} alt="search" style={{ width: 22, height: 22 }} />
                                                </td>
                                                <td>
                                                    <img src={searchBoxSettings.icons.voiceIcon} alt="voice" style={{ width: 22, height: 22 }} />
                                                </td>
                                                <td>
                                                    <span className={`badge px-3 py-2 rounded-pill bg-${searchBoxSettings.status === "Active" ? "success" : "secondary"}`}>
                                                        {searchBoxSettings.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-outline-primary btn-sm"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#customizeSearchModal"
                                                    >
                                                        Edit
                                                    </button>
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

            <MainBar />



            {/* Top Bar Modal */}
            <div className="modal fade" id="customizeModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content rounded-4 shadow">
                        <div className="modal-header border-bottom-0">
                            <h5 className="modal-title fw-bold" id="exampleModalLabel">
                                Customize Topbar
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Number of Text Columns</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        min={settings.numberOfColumns}
                                        max="6"
                                        value={settings.numberOfColumns}
                                        onChange={handleNumColumnsChange}
                                    />
                                    <small className="text-muted">Minimum 1 column required</small>
                                </div>

                                {/* Text Inputs */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold"></label>
                                    {settings.texts?.map((text, index) => (
                                        <div className="d-flex mb-2" key={index}>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder={`Text ${index + 1}`}
                                                value={text}
                                                onChange={(e) => handleTextChange(index, e.target.value)}
                                            />
                                            {settings.numberOfColumns && (
                                                <button
                                                    type="button"
                                                    className="btn btn-danger ms-2"
                                                    onClick={() => handleRemoveText(index)}
                                                >
                                                    &times;
                                                </button>
                                            )}

                                        </div>
                                    ))}

                                    {/* <button type="button" className="btn btn-primary mt-1" onClick={handleAddText}>
                                        <i class="fa-solid fa-plus"></i>  Extra Text
                                    </button> */}
                                </div>

                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "10px",
                                    background: settings.backgroundColor,
                                    color: settings.textColor,
                                    gap: "10px",
                                    overflowX: "auto",
                                }}>

                                    {/* Left side: first column */}
                                    <div style={{
                                        flex: 1,
                                        border: "1px dashed white",
                                        padding: "10px",
                                        textAlign: "center",
                                    }}>
                                        Column 1
                                    </div>

                                    {/* Center: remaining columns */}
                                    <div style={{
                                        display: "flex",
                                        flex: settings.numberOfColumns > 1 ? settings.numberOfColumns - 1 : 1, // remaining columns
                                        gap: "10px",
                                        flexGrow: 1,
                                        justifyContent: "center",
                                    }}>
                                        {Array.from({ length: Math.max(settings.numberOfColumns - 1, 0) }).map((_, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    flex: 1,
                                                    border: "1px dashed white",
                                                    padding: "10px",
                                                    textAlign: "center",
                                                }}
                                            >
                                                Column {index + 2}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Right side: language */}
                                    <div style={{
                                        minWidth: "80px",
                                        textAlign: "center",
                                        border: "1px dashed white",
                                        padding: "10px",
                                    }}>
                                        {settings.language || "Language"}<i class="fa-solid fa-chevron-down"></i>
                                    </div>
                                </div>






                                {/* ✅ Background Type */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Background Type</label>
                                    <div>
                                        <label className="me-3">
                                            <input
                                                type="radio"
                                                name="bgType"
                                                value="solid"
                                                checked={bgType === "solid"}
                                                onChange={() => setBgType("solid")}
                                            />{" "}
                                            Solid
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="bgType"
                                                value="gradient"
                                                checked={bgType === "gradient"}
                                                onChange={() => setBgType("gradient")}
                                            />{" "}
                                            Gradient
                                        </label>
                                    </div>
                                </div>

                                {/* ✅ Background Color / Gradient */}
                                {bgType === "solid" ? (
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Background Color</label>
                                        <div className="d-flex align-items-center">
                                            <input
                                                type="color"
                                                className="form-control form-control-color me-2"
                                                value={settings.backgroundColor}
                                                onChange={handleSolidColorChange}
                                            />
                                            <span className="small">{settings.backgroundColor}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Gradient Colors</label>
                                        <div className="row g-2">
                                            <div className="col-5">
                                                <input
                                                    type="color"
                                                    className="form-control form-control-color"
                                                    name="color1"
                                                    value={gradient.color1}
                                                    onChange={handleGradientChange}
                                                />
                                            </div>
                                            <div className="col-2 d-flex align-items-center justify-content-center">
                                                <span>→</span>
                                            </div>
                                            <div className="col-5">
                                                <input
                                                    type="color"
                                                    className="form-control form-control-color"
                                                    name="color2"
                                                    value={gradient.color2}
                                                    onChange={handleGradientChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <label className="form-label fw-semibold">Direction</label>
                                            <select
                                                className="form-select"
                                                name="direction"
                                                value={gradient.direction}
                                                onChange={handleGradientChange}
                                            >
                                                <option value="to right">Left → Right</option>
                                                <option value="to left">Right → Left</option>
                                                <option value="to bottom">Top → Bottom</option>
                                                <option value="to top">Bottom → Top</option>
                                                <option value="135deg">Diagonal ↘</option>
                                                <option value="45deg">Diagonal ↗</option>
                                            </select>
                                        </div>
                                    </div>
                                )}

                                {/* ✅ Text Color */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Text Color</label>
                                    <div className="d-flex align-items-center">
                                        <input
                                            type="color"
                                            className="form-control form-control-color me-2"
                                            name="textColor"
                                            value={settings.textColor}
                                            onChange={handleChange}
                                        />
                                        <span className="small">{settings.textColor}</span>
                                    </div>
                                </div>

                                {/* ✅ Language & Status */}
                                <div className="row g-3">
                                    <div className="col-6">
                                        <label className="form-label fw-semibold">Language</label>
                                        <select
                                            className="form-select"
                                            name="language"
                                            value={settings.language}
                                            onChange={handleChange}
                                        >
                                            <option>English</option>
                                            <option>Hindi</option>
                                            <option>Arabic</option>
                                            <option>French</option>
                                        </select>
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label fw-semibold">Status</label>
                                        <select
                                            className="form-select"
                                            name="status"
                                            value={settings.status}
                                            onChange={handleChange}
                                        >
                                            <option>Active</option>
                                            <option>Inactive</option>
                                        </select>
                                    </div>
                                </div>

                                {/* ✅ Preview */}
                                {/* <div className="mt-4">
                                    <label className="form-label fw-semibold">Preview</label>
                                    <div style={previewStyle}>
                                        {(settings.texts || []).map((text, index) => (
                                            <span key={index} style={{ flex: 1, textAlign: "center" }}>
                                                {text || `Text ${index + 1}`}
                                            </span>
                                        ))}

                                    </div>
                                </div> */}
                            </form>
                        </div>
                        <div className="modal-footer border-top-0">
                            <button
                                type="button"
                                className="btn btn-light"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleSave}
                                data-bs-dismiss="modal"
                            >
                                Save Settings
                            </button>
                        </div>
                    </div>
                </div>
            </div>



            {/* Search Bar */}
            <div className="modal fade" id="customizeSearchModal" tabIndex="-1" aria-labelledby="searchModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content rounded-4 shadow">
                        <div className="modal-header border-bottom-0">
                            <h5 className="modal-title fw-bold" id="searchModalLabel">
                                Customize Search Bar
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <form onSubmit={handleSearchSave}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Placeholder Text</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="placeholderText"
                                        value={searchBoxSettings.placeholderText}
                                        onChange={handleSearchBoxChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Background Type</label>
                                    <div>
                                        <label className="me-3">
                                            <input
                                                type="radio"
                                                name="searchBgType"
                                                value="solid"
                                                checked={searchBgType === "solid"}
                                                onChange={() => setSearchBgType("solid")}
                                            /> Solid
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="searchBgType"
                                                value="gradient"
                                                checked={searchBgType === "gradient"}
                                                onChange={() => setSearchBgType("gradient")}
                                            /> Linear Gradient
                                        </label>
                                    </div>
                                </div>
                                {searchBgType === "solid" ? (
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Background Color</label>
                                        <div className="d-flex align-items-center">
                                            <input
                                                type="color"
                                                className="form-control form-control-color me-2"
                                                name="backgroundColor"
                                                value={searchBoxSettings.backgroundColor}
                                                onChange={handleSearchSolidColorChange}
                                            />
                                            <span className="small">{searchBoxSettings.backgroundColor}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Gradient Colors</label>
                                        <div className="row g-2">
                                            <div className="col-5">
                                                <input
                                                    type="color"
                                                    className="form-control form-control-color"
                                                    name="color1"
                                                    value={searchGradient.color1}
                                                    onChange={handleSearchGradientChange}
                                                />
                                                <span className="small ms-2">{searchGradient.color1}</span>
                                            </div>
                                            <div className="col-2 d-flex align-items-center justify-content-center">
                                                <span>→</span>
                                            </div>
                                            <div className="col-5">
                                                <input
                                                    type="color"
                                                    className="form-control form-control-color"
                                                    name="color2"
                                                    value={searchGradient.color2}
                                                    onChange={handleSearchGradientChange}
                                                />
                                                <span className="small ms-2">{searchGradient.color2}</span>
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <label className="form-label fw-semibold">Direction</label>
                                            <select
                                                className="form-select"
                                                name="direction"
                                                value={searchGradient.direction}
                                                onChange={handleSearchGradientChange}
                                            >
                                                <option value="to right">Left → Right</option>
                                                <option value="to left">Right → Left</option>
                                                <option value="to bottom">Top → Bottom</option>
                                                <option value="to top">Bottom → Top</option>
                                                <option value="135deg">Diagonal ↘</option>
                                                <option value="45deg">Diagonal ↗</option>
                                            </select>
                                        </div>
                                    </div>
                                )}
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Text Color</label>
                                            <div className="d-flex align-items-center">
                                                <input
                                                    type="color"
                                                    className="form-control form-control-color me-2"
                                                    name="textColor"
                                                    value={searchBoxSettings.textColor}
                                                    onChange={handleSearchBoxChange}
                                                />
                                                <span className="small">{searchBoxSettings.textColor}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">

                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Border Color</label>
                                            <div className="d-flex align-items-center">
                                                <input
                                                    type="color"
                                                    className="form-control form-control-color me-2"
                                                    name="borderColor"
                                                    value={searchBoxSettings.borderColor}
                                                    onChange={handleSearchBoxChange}
                                                />
                                                <span className="small">{searchBoxSettings.borderColor}</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Logo (URL)</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        name="file"
                                        onChange={(e) => setFile(e.target.files[0])}
                                    />
                                </div>

                                <div className="mb-3">
                                    <div className="d-flex align-items-center mb-1">
                                        <label className="form-label fw-semibold mb-0">
                                            Icons (Name & Link)
                                        </label>
                                        <span
                                            className="ms-2"
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="right"
                                            title={
                                                "Usage Guide:\n" +
                                                "• For social media icons, use a full URL (e.g. facebook → https://facebook.com/yourpage)\n" +
                                                "• For normal icons (like cart, wishlist), use a route (e.g. cart → /cart, wishlist → /wishlist)"
                                            }
                                            style={{ cursor: "pointer", color: "#0d6efd" }}
                                        >
                                            <i className="bi bi-info-circle-fill"></i>
                                        </span>
                                    </div>

                                    {searchBoxSettings.icons.map((icon, idx) => (
                                        <div key={idx} className="row g-2 mb-2">
                                            <div className="col-12 col-md-5">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Icon Name (e.g. cart, facebook)"
                                                    value={icon.name}
                                                    onChange={e => handleIconChange(idx, "name", e.target.value)}
                                                />
                                            </div>
                                            <div className="col-12 col-md-5">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Icon Link (e.g. /cart or https://...)"
                                                    value={icon.link}
                                                    onChange={e => handleIconChange(idx, "link", e.target.value)}
                                                />
                                            </div>
                                            <div className="col-12 col-md-2 d-flex align-items-center">
                                                <button
                                                    type="button"
                                                    className="btn btn-danger w-100"
                                                    onClick={() => handleRemoveIcon(idx)}
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                    <button type="button" className="btn btn-success btn-sm mt-1" onClick={handleAddIcon}>
                                        <i className="bi bi-plus-lg me-1"></i> Add Icon
                                    </button>
                                </div>


                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Status</label>
                                    <select
                                        className="form-select"
                                        name="status"
                                        value={searchBoxSettings.status}
                                        onChange={handleSearchBoxChange}
                                    >
                                        <option>Active</option>
                                        <option>In Active</option>
                                    </select>
                                </div>

                                <div className="row mt-4">
                                    <label className="form-label fw-semibold">Preview</label>
                                    <div className=' col-12' style={searchPreviewStyle}>
                                        <img src={searchBoxSettings.logo} alt="logo" style={{ width: 28, height: 28, borderRadius: 4, objectFit: "cover" }} />


                                    </div>
                                </div>

                            </div>
                            <div className="modal-footer border-top-0">
                                <button
                                    type="button"
                                    className="btn btn-light"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Save Settings
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

        </>
    )
}


