// import React, { useEffect, useState } from 'react'

// export default function MainBar() {
//     const [mainBarBgType, setMainBarBgType] = useState("solid");
//     // const [bgType, setBgType] = useState("solid");

//     const [mainBarGradient, setmainBarGradient] = useState({
//         color1: "#ffffff",
//         color2: "#e0e0e0",
//         direction: "to right"
//     });
//     const [maniBarSettings, setMainBarSettings] = useState({
//         backgroundColor: "#ffffff",
//         textColor: "#000000",
//         borderColor: "#ced4da",
//         status: "Active",
//         menu: "Home, Shop, About, Contact"

//     });
//     const [gradient, setGradient] = useState({
//             color1: "#0d6efd",
//             color2: "#6610f2",
//             direction: "to right"
//         });
//      const previewStyle = {
//         background: mainBarBgType === "solid" ? maniBarSettings.backgroundColor : maniBarSettings.backgroundColor,
//         color: maniBarSettings.textColor,
//         padding: "10px 20px",
//         borderRadius: "6px",
//         marginBottom: "10px",
//         border: "1px solid #eee"
//     };
//     const handleSearchSolidColorChange = (e) => {
//         setMainBarSettings((prev) => ({
//             ...prev,
//             backgroundColor: e.target.value
//         }));
//         setmainBarGradient((g) => ({ ...g, color1: e.target.value }));
//     };
//     const handleMainBarGradientChange = (e) => {
//         const { name, value } = e.target;
//         setmainBarGradient((prev) => ({ ...prev, [name]: value }));
//     };
//     const handleSearchBoxChange = (e) => {
//         const { name, value } = e.target;
//         if (name === "searchIcon" || name === "voiceIcon") {
//             setmaniBarSettings((prev) => ({
//                 ...prev,
//                 icons: { ...prev.icons, [name]: value }
//             }));
//         } else {
//             setmaniBarSettings((prev) => ({
//                 ...prev,
//                 [name]: value
//             }));
//         }
//     };
//     const handleGradientChange = (e) => {
//         const { name, value } = e.target;
//         setGradient((prev) => ({ ...prev, [name]: value }));
//     };
//      useEffect(() => {
//             if (mainBarBgType === "gradient") {
//                 setMainBarSettings((prev) => ({
//                     ...prev,
//                     backgroundColor: `linear-gradient(${gradient.direction}, ${gradient.color1}, ${gradient.color2})`
//                 }));
//             }
//         }, [gradient, mainBarBgType]);
//     return (
//         <>
//             <div className="container py-4 shadow-2xl rounded-4 mt-4 pt-5">
//                 <div className="row mb-4">
//                     <div className="col-md-12">
//                         <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
//                             <div>
//                                 <h2 className="fw-bold mb-1">Main Bar Manage</h2>

//                             </div>
//                             <div>
//                                 <button
//                                     className="btn btn-primary shadow"
//                                     data-bs-toggle="modal"
//                                     data-bs-target="#customizeMenuModal"
//                                 >
//                                     <i className="bi bi-pencil-square me-2"></i>
//                                     Edit Search Bar
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="row">
//                     <div className="col-xl-10 col-lg-11 mx-auto">
//                         <div className="card shadow rounded-4 border-0">
//                             <div className="card-header bg-white border-bottom-0 pb-0">
//                                 <h5 className="mb-0 fw-semibold">Main Bar Settings</h5>
//                             </div>
//                             <div className="card-body">
//                                 <div className="table-responsive">
//                                     <table className="table align-middle table-hover table-borderless mb-0">
//                                         <thead className="table-light">
//                                             <tr>
//                                                 <th>Background</th>
//                                                 <th>Text Color</th>
//                                                 <th>Border Color</th>
//                                                 <th>Menu</th>
//                                                 <th>Status</th>
//                                                 <th>Action</th>
//                                             </tr>
//                                         </thead>

//                                     </table>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="modal fade" id="customizeMenuModal" tabIndex="-1" aria-labelledby="searchModalLabel" aria-hidden="true">
//                 <div className="modal-dialog">
//                     <div className="modal-content rounded-4 shadow">
//                         <div className="modal-header border-bottom-0">
//                             <h5 className="modal-title fw-bold" id="searchModalLabel">
//                                 Customize Search Bar
//                             </h5>
//                             <button
//                                 type="button"
//                                 className="btn-close"
//                                 data-bs-dismiss="modal"
//                                 aria-label="Close"
//                             ></button>
//                         </div>
//                         <form >
//                             <div className="modal-body">

//                                 <div className="mb-5">
//                                     <label className="form-label fw-bold" >Background Type</label>
//                                     <div>
//                                         <label className="me-3">
//                                             <input
//                                                 type="radio"
//                                                 name="mainBarBgType"
//                                                 value="solid"
//                                                 checked={mainBarBgType === "solid"}
//                                                 onChange={() => setMainBarBgType("solid")}
//                                             /> Solid
//                                         </label>
//                                         <label>
//                                             <input
//                                                 type="radio"
//                                                 name="mainBarBgType"
//                                                 value="gradient"
//                                                 checked={mainBarBgType === "gradient"}
//                                                 onChange={() => setMainBarBgType("gradient")}
//                                             /> Linear Gradient
//                                         </label>
//                                     </div>
//                                 </div>
//                                 {mainBarBgType === "solid" ? (
//                                     <div className="mb-3">
//                                         <label className="form-label fw-semibold">Background Color</label>
//                                         <div className="d-flex align-items-center">
//                                             <input
//                                                 type="color"
//                                                 className="form-control form-control-color me-2"
//                                                 name="backgroundColor"
//                                                 value={maniBarSettings.backgroundColor}
//                                                 onChange={handleSearchSolidColorChange}
//                                             />
//                                             <span className="small">{maniBarSettings.backgroundColor}</span>
//                                         </div>
//                                     </div>
//                                 ) : (
//                                     <div className="mb-5">
//                                         <label className="form-label fw-semibold">Gradient Colors</label>
//                                         <div className="row g-2">
//                                             <div className="col-5">
//                                                 <input
//                                                     type="color"
//                                                     className="form-control form-control-color"
//                                                     name="color1"
//                                                     value={mainBarGradient.color1}
//                                                     onChange={handleGradientChange}
//                                                 />
//                                                 <span className="small ms-2">{mainBarGradient.color1}</span>
//                                             </div>
//                                             <div className="col-2 d-flex align-items-center justify-content-center">
//                                                 <span>→</span>
//                                             </div>
//                                             <div className="col-5">
//                                                 <input
//                                                     type="color"
//                                                     className="form-control form-control-color"
//                                                     name="color2"
//                                                     value={mainBarGradient.color2}
//                                                     onChange={handleMainBarGradientChange}
//                                                 />
//                                                 <span className="small ms-2">{mainBarGradient.color2}</span>
//                                             </div>
//                                         </div>
//                                         <div className="mt-2">
//                                             <label className="form-label fw-semibold">Direction</label>
//                                             <select
//                                                 className="form-select"
//                                                 name="direction"
//                                                 value={mainBarGradient.direction}
//                                                 onChange={handleMainBarGradientChange}
//                                             >
//                                                 <option value="to right">Left → Right</option>
//                                                 <option value="to left">Right → Left</option>
//                                                 <option value="to bottom">Top → Bottom</option>
//                                                 <option value="to top">Bottom → Top</option>
//                                                 <option value="135deg">Diagonal ↘</option>
//                                                 <option value="45deg">Diagonal ↗</option>
//                                             </select>
//                                         </div>
//                                     </div>
//                                 )}
//                                 <div className="row mb-3">
//                                     <div className="col-6">
//                                         <div className="mb-3">
//                                             <label className="form-label fw-semibold">Text Color</label>
//                                             <div className="d-flex align-items-center">
//                                                 <input
//                                                     type="color"
//                                                     className="form-control form-control-color me-2"
//                                                     name="textColor"
//                                                     value={maniBarSettings.textColor}
//                                                     onChange={handleSearchBoxChange}
//                                                 />
//                                                 <span className="small">{maniBarSettings.textColor}</span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="col-6">

//                                         <div className="mb-3">
//                                             <label className="form-label fw-semibold">Border Color</label>
//                                             <div className="d-flex align-items-center">
//                                                 <input
//                                                     type="color"
//                                                     className="form-control form-control-color me-2"
//                                                     name="borderColor"
//                                                     value={maniBarSettings.borderColor}
//                                                     onChange={handleSearchBoxChange}
//                                                 />
//                                                 <span className="small">{maniBarSettings.borderColor}</span>
//                                             </div>
//                                         </div>
//                                     </div>

//                                 </div>



//                                 <div className="mb-4">
//                                     <label className="form-label fw-semibold">Status</label>
//                                     <select
//                                         className="form-select"
//                                         name="status"
//                                         value={maniBarSettings.status}
//                                         onChange={handleSearchBoxChange}
//                                     >
//                                         <option>Active</option>
//                                         <option>In Active</option>
//                                     </select>
//                                 </div>
//                                 <div className="mt-4">
//                                     <label className="form-label fw-semibold">Preview</label>
//                                     <div style={previewStyle}>
//                                     </div>
//                                 </div>
//                                 {/* 
//                                 <div className="mt-4">
//                                     <label className="form-label fw-semibold">Preview</label>
//                                     <div style={searchPreviewStyle}>
//                                         <img src={maniBarSettings.logo} alt="logo" style={{ width: 28, height: 28, borderRadius: 4, objectFit: "cover" }} />
//                                         <input
//                                             type="text"
//                                             className="form-control border-0"
//                                             style={{
//                                                 background: "transparent",
//                                                 color: maniBarSettings.textColor,
//                                                 outline: "none",
//                                                 boxShadow: "none"
//                                             }}
//                                             placeholder={maniBarSettings.placeholderText}
//                                             disabled
//                                         />
//                                         {maniBarSettings.icons.map((icon, idx) => (
//                                             <a
//                                                 key={idx}
//                                                 href={icon.link || "#"}
//                                                 target="_blank"
//                                                 rel="noopener noreferrer"
//                                                 className="badge bg-secondary ms-1 text-decoration-none"
//                                                 style={{ cursor: icon.link ? "pointer" : "default" }}
//                                             >
//                                                 {icon.name}
//                                             </a>
//                                         ))}
//                                     </div>
//                                 </div> */}
//                             </div>
//                             <div className="modal-footer border-top-0">
//                                 <button
//                                     type="button"
//                                     className="btn btn-light"
//                                     data-bs-dismiss="modal"
//                                 >
//                                     Close
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     className="btn btn-primary"

//                                 >
//                                     Save Settings
//                                 </button>
//                             </div>
//                         </form>

//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }


// import React, { useEffect, useState } from "react";

// export default function MainBar() {
//   const [mainBarBgType, setMainBarBgType] = useState("solid");

//   const [mainBarGradient, setMainBarGradient] = useState({
//     color1: "#0d6efd",
//     color2: "#6610f2",
//     direction: "to right",
//   });

//   const [mainBarSettings, setMainBarSettings] = useState({
//     backgroundColor: "#ffffff",
//     textColor: "#000000",
//     borderColor: "#ced4da",
//     status: "Active",
//     menu: "Home, Shop, About, Contact",
//   });

//   // 🎨 Handle color change for solid background
//   const handleSolidColorChange = (e) => {
//     setMainBarSettings((prev) => ({
//       ...prev,
//       backgroundColor: e.target.value,
//     }));
//   };

//   // 🎨 Handle gradient input changes
//   const handleGradientChange = (e) => {
//     const { name, value } = e.target;
//     setMainBarGradient((prev) => ({ ...prev, [name]: value }));
//   };

//   // 🎨 Handle text, border, status, menu change
//   const handleMainBarChange = (e) => {
//     const { name, value } = e.target;
//     setMainBarSettings((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // 🌀 Update backgroundColor if gradient selected
//   useEffect(() => {
//     if (mainBarBgType === "gradient") {
//       setMainBarSettings((prev) => ({
//         ...prev,
//         backgroundColor: `linear-gradient(${mainBarGradient.direction}, ${mainBarGradient.color1}, ${mainBarGradient.color2})`,
//       }));
//     }
//   }, [mainBarGradient, mainBarBgType]);

//   // 💡 Live preview style
//   const previewStyle = {
//     background:
//       mainBarBgType === "solid"
//         ? mainBarSettings.backgroundColor
//         : `linear-gradient(${mainBarGradient.direction}, ${mainBarGradient.color1}, ${mainBarGradient.color2})`,
//     color: mainBarSettings.textColor,
//     padding: "15px 25px",
//     borderRadius: "8px",
//     border: `2px solid ${mainBarSettings.borderColor}`,
//     textAlign: "center",
//     fontWeight: "bold",
//   };

//   return (
//     <>
//       <div className="container py-4 shadow-lg rounded-4 mt-4 pt-5">
//         <div className="row mb-4">
//           <div className="col-md-12">
//             <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
//               <div>
//                 <h2 className="fw-bold mb-1">Main Bar Manage</h2>
//               </div>
//               <div>
//                 <button
//                   className="btn btn-primary shadow"
//                   data-bs-toggle="modal"
//                   data-bs-target="#customizeMenuModal"
//                 >
//                   <i className="bi bi-pencil-square me-2"></i>
//                   Edit Main Bar
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* 📋 Settings Table */}
//         <div className="row">
//           <div className="col-xl-10 col-lg-11 mx-auto">
//             <div className="card shadow rounded-4 border-0">
//               <div className="card-header bg-white border-bottom-0 pb-0">
//                 <h5 className="mb-0 fw-semibold">Main Bar Settings</h5>
//               </div>
//               <div className="card-body">
//                 <div className="table-responsive">
//                   <table className="table align-middle table-hover table-borderless mb-0">
//                     <thead className="table-light">
//                       <tr>
//                         <th>Background</th>
//                         <th>Text Color</th>
//                         <th>Border Color</th>
//                         <th>Menu</th>
//                         <th>Status</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td>
//                           <div
//                             style={{
//                               width: "80px",
//                               height: "30px",
//                               background:
//                                 mainBarBgType === "solid"
//                                   ? mainBarSettings.backgroundColor
//                                   : `linear-gradient(${mainBarGradient.direction}, ${mainBarGradient.color1}, ${mainBarGradient.color2})`,
//                               borderRadius: "4px",
//                               border: "1px solid #ccc",
//                             }}
//                           ></div>
//                         </td>
//                         <td>{mainBarSettings.textColor}</td>
//                         <td>{mainBarSettings.borderColor}</td>
//                         <td>{mainBarSettings.menu}</td>
//                         <td>{mainBarSettings.status}</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ⚙️ Modal Customization */}
//       <div
//         className="modal fade"
//         id="customizeMenuModal"
//         tabIndex="-1"
//         aria-labelledby="searchModalLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog">
//           <div className="modal-content rounded-4 shadow">
//             <div className="modal-header border-bottom-0">
//               <h5 className="modal-title fw-bold" id="searchModalLabel">
//                 Customize Main Bar
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>

//             <form>
//               <div className="modal-body">
//                 {/* Background Type */}
//                 <div className="mb-4">
//                   <label className="form-label fw-bold">Background Type</label>
//                   <div>
//                     <label className="me-3">
//                       <input
//                         type="radio"
//                         name="mainBarBgType"
//                         value="solid"
//                         checked={mainBarBgType === "solid"}
//                         onChange={() => setMainBarBgType("solid")}
//                       />{" "}
//                       Solid
//                     </label>
//                     <label>
//                       <input
//                         type="radio"
//                         name="mainBarBgType"
//                         value="gradient"
//                         checked={mainBarBgType === "gradient"}
//                         onChange={() => setMainBarBgType("gradient")}
//                       />{" "}
//                       Gradient
//                     </label>
//                   </div>
//                 </div>

//                 {/* Background Color / Gradient */}
//                 {mainBarBgType === "solid" ? (
//                   <div className="mb-3">
//                     <label className="form-label fw-semibold">
//                       Background Color
//                     </label>
//                     <div className="d-flex align-items-center">
//                       <input
//                         type="color"
//                         className="form-control form-control-color me-2"
//                         value={mainBarSettings.backgroundColor}
//                         onChange={handleSolidColorChange}
//                       />
//                       <span className="small">
//                         {mainBarSettings.backgroundColor}
//                       </span>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="mb-5">
//                     <label className="form-label fw-semibold">
//                       Gradient Colors
//                     </label>
//                     <div className="row g-2">
//                       <div className="col-5">
//                         <input
//                           type="color"
//                           className="form-control form-control-color"
//                           name="color1"
//                           value={mainBarGradient.color1}
//                           onChange={handleGradientChange}
//                         />
//                         <span className="small ms-2">
//                           {mainBarGradient.color1}
//                         </span>
//                       </div>
//                       <div className="col-2 d-flex align-items-center justify-content-center">
//                         <span>→</span>
//                       </div>
//                       <div className="col-5">
//                         <input
//                           type="color"
//                           className="form-control form-control-color"
//                           name="color2"
//                           value={mainBarGradient.color2}
//                           onChange={handleGradientChange}
//                         />
//                         <span className="small ms-2">
//                           {mainBarGradient.color2}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="mt-2">
//                       <label className="form-label fw-semibold">
//                         Direction
//                       </label>
//                       <select
//                         className="form-select"
//                         name="direction"
//                         value={mainBarGradient.direction}
//                         onChange={handleGradientChange}
//                       >
//                         <option value="to right">Left → Right</option>
//                         <option value="to left">Right → Left</option>
//                         <option value="to bottom">Top → Bottom</option>
//                         <option value="to top">Bottom → Top</option>
//                         <option value="135deg">Diagonal ↘</option>
//                         <option value="45deg">Diagonal ↗</option>
//                       </select>
//                     </div>
//                   </div>
//                 )}

//                 {/* Text & Border Color */}
//                 <div className="row mb-3">
//                   <div className="col-6">
//                     <label className="form-label fw-semibold">
//                       Text Color
//                     </label>
//                     <div className="d-flex align-items-center">
//                       <input
//                         type="color"
//                         className="form-control form-control-color me-2"
//                         name="textColor"
//                         value={mainBarSettings.textColor}
//                         onChange={handleMainBarChange}
//                       />
//                       <span className="small">{mainBarSettings.textColor}</span>
//                     </div>
//                   </div>
//                   <div className="col-6">
//                     <label className="form-label fw-semibold">
//                       Border Color
//                     </label>
//                     <div className="d-flex align-items-center">
//                       <input
//                         type="color"
//                         className="form-control form-control-color me-2"
//                         name="borderColor"
//                         value={mainBarSettings.borderColor}
//                         onChange={handleMainBarChange}
//                       />
//                       <span className="small">
//                         {mainBarSettings.borderColor}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Status */}
//                 <div className="mb-4">
//                   <label className="form-label fw-semibold">Status</label>
//                   <select
//                     className="form-select"
//                     name="status"
//                     value={mainBarSettings.status}
//                     onChange={handleMainBarChange}
//                   >
//                     <option>Active</option>
//                     <option>Inactive</option>
//                   </select>
//                 </div>

//                 {/* Preview */}
//                 <div className="mt-4">
//                   <label className="form-label fw-semibold">Preview</label>
//                   <div style={previewStyle}>Main Bar Preview</div>
//                 </div>
//               </div>

//               <div className="modal-footer border-top-0">
//                 <button
//                   type="button"
//                   className="btn btn-light"
//                   data-bs-dismiss="modal"
//                 >
//                   Close
//                 </button>
//                 <button type="submit" className="btn btn-primary">
//                   Save Settings
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


import React, { useEffect, useState } from "react";
import MenuPage from "./MenuPage";
import axiosInstance from "../../../ApiHendler/axiosInstance";
import Config from "../../../Config/Config";
import { showSuccessMsg } from "../../../utils/ShowMessages";

export default function MainBar() {
    const [mainBarBgType, setMainBarBgType] = useState("solid");
    const [mainBarGradient, setMainBarGradient] = useState({
        color1: "#0d6efd",
        color2: "#6610f2",
        direction: "to right",
    });

    const [mainBarSettings, setMainBarSettings] = useState({
        backgroundColor: "#ffffff",
        textColor: "#000000",
        borderColor: "#ced4da",
        status: "Active",
        icon: "fa-solid fa-list",
        iconBgColor: "#ffffff"
    });

    const [menus, setMenus] = useState([]);

    // Fetch menus and main bar settings
    useEffect(() => {
        const fetchData = async () => {
            try {
                const menuResponse = await axiosInstance.get(Config.END_POINT_LIST["GET_MENUS"]);
                const mainBarResponse = await axiosInstance.get(Config.END_POINT_LIST["GET_MAIN_BAR_SETTINGS"]);

                if (menuResponse.data.success) setMenus(menuResponse.data.menus);

                if (mainBarResponse.data.success) {
                    const settings = mainBarResponse.data.settings;
                    setMainBarSettings(settings);

                    if (settings.backgroundColor.includes("gradient")) {
                        setMainBarBgType("gradient");
                        const regex = /linear-gradient\(([^,]+),\s*([^,]+),\s*([^)]+)\)/;
                        const match = settings.backgroundColor.match(regex);
                        if (match) {
                            setMainBarGradient({
                                direction: match[1].trim(),
                                color1: match[2].trim(),
                                color2: match[3].trim(),
                            });
                        }
                    } else {
                        setMainBarBgType("solid");
                    }
                }
            } catch (err) {
                console.error("Error fetching menus or settings:", err);
            }
        };
        fetchData();
    }, []);

    // Update mainBarSettings when gradient changes
    useEffect(() => {
        if (mainBarBgType === "gradient") {
            setMainBarSettings((prev) => ({
                ...prev,
                backgroundColor: `linear-gradient(${mainBarGradient.direction}, ${mainBarGradient.color1}, ${mainBarGradient.color2})`,
            }));
        }
    }, [mainBarGradient, mainBarBgType]);

    const handleSolidColorChange = (e) => {
        setMainBarSettings((prev) => ({ ...prev, backgroundColor: e.target.value }));
    };

    const handleIconColorChange = (e) => {
        setMainBarSettings((prev) => ({ ...prev, iconBgColor: e.target.value }));
    };

    const handleGradientChange = (e) => {
        const { name, value } = e.target;
        setMainBarGradient((prev) => ({ ...prev, [name]: value }));
    };

    const handleMainBarChange = (e) => {
        const { name, value } = e.target;
        setMainBarSettings((prev) => ({ ...prev, [name]: value }));
    };

    const handleMainBarSetting = async (e) => {
        e.preventDefault();
        // debugger
        try {
            const response = await axiosInstance.put(
                Config.END_POINT_LIST["UPDATE_MAIN_BAR_SETTINGS"],
                mainBarSettings
            );
            if (response.data.success) {
                showSuccessMsg("Settings saved successfully.");
                setMainBarSettings(response.data.settings);
                // model close
                const modal = document.getElementById("customizeMenuModal");
                const modalInstance = window.bootstrap.Modal.getInstance(modal);
                modalInstance.hide();
            } else {
                alert("Failed to save settings.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const previewStyle = {
        background:
            mainBarBgType === "solid"
                ? mainBarSettings.backgroundColor
                : `linear-gradient(${mainBarGradient?.direction || "to right"}, ${mainBarGradient?.color1 || "#0d6efd"}, ${mainBarGradient?.color2 || "#6610f2"})`,
        color: mainBarSettings.textColor,
        padding: "15px 25px",
        borderRadius: "8px",
        border: `2px solid ${mainBarSettings.borderColor}`,
        textAlign: "center",
        fontWeight: "bold",
    };

    const [isOpen, setIsOpen] = useState(true);

    const toggleCollapse = () => setIsOpen(!isOpen);

    return (
        <>
            <div className="container py-4 shadow-lg rounded-4 mt-4 pt-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold">Menu Management</h2>
                    <button
                        className="btn btn-primary shadow"
                        data-bs-toggle="modal"
                        data-bs-target="#customizeMenuModal"
                    >
                        <i className="bi bi-pencil-square me-2"></i>Edit Main Bar
                    </button>
                </div>

                {/* Collapsible Card */}
                <div className="card shadow rounded-4 border-0 mb-4">
                    <div
                        className="card-header bg-white border-bottom-0 d-flex justify-content-between align-items-center cursor-pointer"
                        // onClick={toggleCollapse}
                        style={{ cursor: "pointer" }}
                    >
                        <h5 className="mb-0 fw-semibold">Main Bar Settings</h5>
                        {/* <i
                            className={`bi ${isOpen ? "bi-dash-circle-fill text-danger" : "bi-plus-circle-fill text-success"
                                } fs-5`}
                        ></i> */}
                    </div>

                    <div
                        className={`collapse ${isOpen ? "show" : ""}`}
                        style={{ transition: "all 0.4s ease" }}
                    >
                        <div className="card-body table-responsive">
                            <table className="table align-middle table-hover table-borderless mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>Background</th>
                                        <th>Text Color</th>
                                        <th>Border Color</th>
                                        <th>Icon</th>
                                        <th>Icon BgColor</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div
                                                style={{
                                                    width: "80px",
                                                    height: "30px",
                                                    background: previewStyle.background,
                                                    borderRadius: "4px",
                                                    border: "1px solid #ccc",
                                                }}
                                            />
                                        </td>
                                        <td>{mainBarSettings.textColor}</td>
                                        <td>{mainBarSettings.borderColor}</td>
                                        <td>{mainBarSettings.icon}</td>
                                        <td>
                                            <div
                                                style={{
                                                    width: "80px",
                                                    height: "30px",
                                                    background: mainBarSettings.iconBgColor,
                                                    borderRadius: "4px",
                                                    border: "1px solid #ccc",
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <span
                                                className={`badge ${mainBarSettings.status === "active"
                                                    ? "bg-success"
                                                    : "bg-secondary"
                                                    }`}
                                            >
                                                {mainBarSettings.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#customizeMenuModal">
                                                <i className="bi bi-pencil me-1"></i>Edit
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* Main Bar Customization Modal */}
            <div className="modal fade" id="customizeMenuModal" tabIndex="-1" aria-labelledby="searchModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content rounded-4 shadow">
                        <div className="modal-header border-bottom-0">
                            <h5 className="modal-title fw-bold">Customize Main Bar</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>

                        <form onSubmit={handleMainBarSetting}>
                            <div className="modal-body">
                                {/* Background Type */}
                                <div className="mb-4">
                                    <label className="form-label fw-bold">Background Type</label>
                                    <div>
                                        <label className="me-3">
                                            <input type="radio" name="mainBarBgType" value="solid" checked={mainBarBgType === "solid"} onChange={() => setMainBarBgType("solid")} />{" "}
                                            Solid
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="mainBarBgType"
                                                value="gradient"
                                                checked={mainBarBgType === "gradient"}
                                                onChange={() => setMainBarBgType("gradient")}
                                            />{" "}
                                            Gradient
                                        </label>
                                    </div>
                                </div>

                                {/* Background Color / Gradient */}

                                {mainBarBgType === "solid" ? (
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Background Color</label>
                                        <div className="d-flex align-items-center">
                                            <input
                                                type="color"
                                                className="form-control form-control-color me-2"
                                                value={mainBarSettings.backgroundColor}
                                                onChange={handleSolidColorChange}
                                            />
                                            <span className="small">{mainBarSettings.backgroundColor}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mb-5">
                                        <label className="form-label fw-semibold">Gradient Colors</label>
                                        <div className="row g-2">
                                            <div className="col-5">
                                                <input
                                                    type="color"
                                                    className="form-control form-control-color"
                                                    name="color1"
                                                    value={mainBarGradient.color1}
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
                                                    value={mainBarGradient.color2}
                                                    onChange={handleGradientChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <label className="form-label fw-semibold">Direction</label>
                                            <select
                                                className="form-select"
                                                name="direction"
                                                value={mainBarGradient.direction}
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

                                {/* Text & Border Color */}

                                <div className="row mb-3">
                                    <div className="col-6">
                                        <label className="form-label fw-semibold">Text Color</label>
                                        <input
                                            type="color"
                                            className="form-control form-control-color"
                                            name="textColor"
                                            value={mainBarSettings.textColor}
                                            onChange={handleMainBarChange}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label fw-semibold">Border Color</label>
                                        <input
                                            type="color"
                                            className="form-control form-control-color"
                                            name="borderColor"
                                            value={mainBarSettings.borderColor}
                                            onChange={handleMainBarChange}
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Icon BgColor</label>
                                    <div className="d-flex align-items-center">
                                        <input
                                            type="color"
                                            className="form-control form-control-color me-2"
                                            value={mainBarSettings.iconBgColor}
                                            onChange={handleIconColorChange}
                                        />
                                        <span className="small">{mainBarSettings.iconBgColor}</span>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-12">
                                        <label className="form-label fw-semibold">Icon</label>
                                        <div className=" align-items-center">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={mainBarSettings.icon}
                                                onChange={handleMainBarChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Status */}

                                <div className="mb-4">
                                    <label className="form-label fw-semibold">Status</label>
                                    <select
                                        className="form-select"
                                        name="status"
                                        value={mainBarSettings.status}
                                        onChange={handleMainBarChange}
                                    >
                                        <option>Active</option>
                                        <option>Inactive</option>
                                    </select>
                                </div>


                                {/* Preview */}
                                <div className="mt-4">
                                    <label className="form-label fw-semibold">Preview</label>
                                    <div style={previewStyle}>Main Bar Preview</div>
                                </div>

                            </div>

                            <div className="modal-footer border-top-0">
                                <button type="button" className="btn btn-light" data-bs-dismiss="modal">
                                    Close
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Save Settings
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Menu Page */}
            <MenuPage />
        </>
    );
}
