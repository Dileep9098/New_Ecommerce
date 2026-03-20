// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import axiosInstance from "../../../ApiHendler/axiosInstance";
// import Config from "../../../Config/Config";
// import { showErrorMsg, showSuccessMsg } from "../../../utils/ShowMessages";

// const MenuPage = () => {
//     const [menus, setMenus] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [formData, setFormData] = useState({
//         title: "",
//         type: "main",      // default: Main Menu
//         parentMenu: "",    // default: empty
//         link: "",
//         order: 0,
//         status: "active"
//     });

//     useEffect(() => {
//         const fetchMenus = async () => {
//             try {
//                 const response = await axiosInstance.get(Config.END_POINT_LIST["GET_MENUS"]);
//                 if (response.data.success) {
//                     setMenus(response.data.menus);
//                 }
//             } catch (error) {
//                 console.error("Error fetching menus:", error);
//             }
//         };
//         fetchMenus();
//     }, []);



//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//             ...(name === "type" && value === "main" ? { parentMenu: "" } : {}),
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             const response = await axiosInstance.post(
//                 Config.END_POINT_LIST["ADD_MENU"],
//                 formData
//             );

//             if (response.data.success) {
//                 showSuccessMsg(" Menu added successfully");
//                 setMenus((prev) => [...prev, response.data.menu]);
//                 setFormData({
//                     title: "",
//                     type: "main",
//                     parentMenu: "",
//                     link: "",
//                     order: 0,
//                     status: "active",
//                 });

//                 // ✅ Close Modal
//                 const modal = document.getElementById("addMenuModal");
//                 const modalInstance = window.bootstrap.Modal.getInstance(modal);
//                 if (modalInstance) modalInstance.hide();
//             } else {
//                 showErrorMsg(response.data.message || "Failed to add menu");
//             }
//         } catch (error) {
//             console.error("Error adding menu:", error);
//             showErrorMsg(error.response?.data?.message || "Server error while adding menu");
//         } finally {
//             setLoading(false);
//         }
//     };


//     return (
//         <div className="container py-4">
//             {/* Header */}
//             <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h4 className="fw-bold">Menu Management</h4>
//                 <button
//                     className="btn btn-primary"
//                     data-bs-toggle="modal"
//                     data-bs-target="#addMenuModal"
//                 >
//                     + Add Menu
//                 </button>
//             </div>

//             {/* Table */}
//             <div className="table-responsive shadow-sm rounded">
//                 <table className="table table-striped table-hover align-middle">
//                     <thead className="table-dark">
//                         <tr>
//                             <th>#</th>
//                             <th>Title</th>
//                             <th>Type</th>
//                             <th>Parent Menu</th>
//                             <th>Link</th>
//                             <th>Status</th>
//                             <th>Order</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {menus.map((menu, index) => (
//                             <tr key={menu._id}>
//                                 <td>{index + 1}</td>
//                                 <td>{menu.title}</td>
//                                 <td>
//                                     {menu.type === "main" ? (
//                                         <span className="badge bg-primary">Main</span>
//                                     ) : (
//                                         <span className="badge bg-success">Sub</span>
//                                     )}
//                                 </td>
//                                 <td>{menu.parentMenu?.title || "-"}</td>
//                                 <td>{menu.link || "-"}</td>
//                                 <td>
//                                     {menu.status === "active" ? (
//                                         <span className="badge bg-success">Active</span>
//                                     ) : (
//                                         <span className="badge bg-secondary">Inactive</span>
//                                     )}
//                                 </td>
//                                 <td>{menu.order}</td>
//                                 <td>
//                                     <button className="btn btn-sm btn-warning">Edit</button>
//                                     <button className="btn btn-sm btn-danger">Delete</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Add Menu Modal */}
//             <div
//                 className="modal fade"
//                 id="addMenuModal"
//                 tabIndex="-1"
//                 aria-labelledby="addMenuModalLabel"
//                 aria-hidden="true"
//             >
//                 <div className="modal-dialog">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <h1 className="modal-title fs-5" id="addMenuModalLabel">
//                                 Add New Menu
//                             </h1>
//                             <button
//                                 type="button"
//                                 className="btn-close"
//                                 data-bs-dismiss="modal"
//                                 aria-label="Close"
//                                 id="addMenuModalClose"
//                             ></button>
//                         </div>
//                         <form onSubmit={handleSubmit}>
//                             <div className="modal-body">
//                                 <div className="mb-3">
//                                     <label className="form-label">Menu Title</label>
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         name="title"
//                                         value={formData.title}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </div>

//                                 <div className="mb-3">
//                                     <label className="form-label">Menu Type</label>
//                                     <select
//                                         className="form-select"
//                                         name="type"
//                                         value={formData.type}
//                                         onChange={handleChange}
//                                     >
//                                         <option value="main">Main Menu</option>
//                                         <option value="sub">Sub Menu</option>
//                                     </select>
//                                 </div>

//                                 {/* Show Parent Menu only if Sub Menu */}
//                                 {formData.type === "sub" && (
//                                     <div className="mb-3">
//                                         <label className="form-label">Choose Parent Menu</label>
//                                         <select
//                                             className="form-select"
//                                             name="parentMenu"
//                                             value={formData.parentMenu}
//                                             onChange={handleChange}
//                                             required
//                                         >
//                                             <option value="">Select</option>
//                                             {menus
//                                                 .filter((m) => m.type === "main")
//                                                 .map((m) => (
//                                                     <option key={m._id} value={m._id}>
//                                                         {m.title}
//                                                     </option>
//                                                 ))}
//                                         </select>
//                                     </div>
//                                 )}

//                                 <div className="mb-3">
//                                     <label className="form-label">Menu Link</label>
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         name="link"
//                                         value={formData.link}
//                                         onChange={handleChange}
//                                         placeholder="/example"
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label className="form-label">Status</label>
//                                     <select
//                                         className="form-select"
//                                         name="status"
//                                         value={formData.status}
//                                         onChange={handleChange}
//                                     >
//                                         <option value="active">Active</option>
//                                         <option value="in-active">In Active</option>
//                                     </select>
//                                 </div>

//                                 <div className="mb-3">
//                                     <label className="form-label">Display Order</label>
//                                     <input
//                                         type="number"
//                                         className="form-control"
//                                         name="order"
//                                         value={formData.order}
//                                         onChange={handleChange}
//                                     />
//                                 </div>
//                             </div>

//                             <div className="modal-footer">
//                                 <button
//                                     type="button"
//                                     className="btn btn-secondary"
//                                     data-bs-dismiss="modal"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button type="submit" className="btn btn-success">
//                                     Save Menu
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MenuPage;



import React, { useEffect, useState } from "react";
import axiosInstance from "../../../ApiHendler/axiosInstance";
import Config from "../../../Config/Config";
import { showErrorMsg, showSuccessMsg } from "../../../utils/ShowMessages";

const MenuPage = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleCollapse = () => setIsOpen(!isOpen);
  const [menus, setMenus] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    type: "main",
    parentMenu: "",
    link: "",
    order: 0,
    status: "active",
  });
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  // 🧩 Fetch Menus
  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await axiosInstance.get(Config.END_POINT_LIST["GET_MENUS"]);
      if (response.data.success) {
        setMenus(response.data.menus);
      }
    } catch (error) {
      showErrorMsg("Failed to fetch menus");
    }
  };

  // 🧩 Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "type" && value === "main" ? { parentMenu: "" } : {}),
    }));
  };

  // 🧩 Open Modal for Add or Edit
  const openModal = (menu = null) => {
    if (menu) {
      // Edit mode
      setEditMode(true);
      setSelectedMenu(menu);
      setFormData({
        title: menu.title,
        type: menu.type,
        parentMenu: menu.parentMenu?._id || "",
        link: menu.link,
        order: menu.order,
        status: menu.status,
      });
    } else {
      // Add mode
      setEditMode(false);
      setSelectedMenu(null);
      setFormData({
        title: "",
        type: "main",
        parentMenu: "",
        link: "",
        order: 0,
        status: "active",
      });
    }
    const modal = new window.bootstrap.Modal(document.getElementById("menuModal"));
    modal.show();
  };

  // 🧩 Add or Update Menu
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = editMode
        ? `${Config.END_POINT_LIST["UPDATE_MENU"]}/${selectedMenu._id}`
        : Config.END_POINT_LIST["ADD_MENU"];

      const response = await axiosInstance[editMode ? "put" : "post"](
        endpoint,
        formData
      );

      if (response.data.success) {
        showSuccessMsg(
          editMode ? " Menu updated successfully" : "Menu added successfully"
        );
        fetchMenus();
        const modal = window.bootstrap.Modal.getInstance(
          document.getElementById("menuModal")
        );
        modal.hide();
      } else {
        showErrorMsg(response.data.message || "Operation failed");
      }
    } catch (error) {
      showErrorMsg("Server error while saving menu");
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Delete Menu
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this menu?")) return;

    try {
      const response = await axiosInstance.delete(
        `${Config.END_POINT_LIST["DELETE_MENU"]}/${id}`
      );
      if (response.data.success) {
        showSuccessMsg("Menu deleted successfully");
        setMenus((prev) => prev.filter((m) => m._id !== id));
      } else {
        showErrorMsg(response.data.message || "Failed to delete menu");
      }
    } catch (error) {
      showErrorMsg("Server error while deleting menu");
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const menusPerPage = 10;

  // ✅ Calculate current page menus
  const indexOfLast = currentPage * menusPerPage;
  const indexOfFirst = indexOfLast - menusPerPage;
  const currentMenus = menus.slice(indexOfFirst, indexOfLast);

  // ✅ Total pages
  const totalPages = Math.ceil(menus.length / menusPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">
          <i className="fa-solid fa-bars me-2 text-primary"></i>Menu Management
        </h4>
        <button className="btn btn-primary" onClick={() => openModal()}>
          <i className="fa-solid fa-plus me-2"></i>Add Menu
        </button>
      </div>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-striped table-hover align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Type</th>
              <th>Parent Menu</th>
              <th>Link</th>
              <th>Status</th>
              <th>Order</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentMenus.length > 0 ? (
              currentMenus.map((menu, index) => (
                <tr key={menu._id}>
                  <td>{indexOfFirst + index + 1}</td>
                  <td>{menu.title}</td>
                  <td>
                    <span
                      className={`badge ${menu.type === "main" ? "bg-primary" : "bg-success"
                        }`}
                    >
                      {menu.type === "main" ? "Main" : "Sub"}
                    </span>
                  </td>
                  <td>{menu.parentMenu?.title || "-"}</td>
                  <td>{menu.link || "-"}</td>
                  <td>
                    <span
                      className={`badge ${menu.status === "active"
                          ? "bg-success"
                          : "bg-secondary"
                        }`}
                    >
                      {menu.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>{menu.order}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => openModal(menu)}
                      title="Edit Menu"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(menu._id)}
                      title="Delete Menu"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-3">
                  No menus found
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

      {/* Add/Edit Menu Modal */}
      <div
        className="modal fade"
        id="menuModal"
        tabIndex="-1"
        aria-labelledby="menuModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="menuModalLabel">
                {editMode ? "Edit Menu" : "Add New Menu"}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Menu Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Menu Type</label>
                  <select
                    className="form-select"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option value="main">Main Menu</option>
                    <option value="sub">Sub Menu</option>
                  </select>
                </div>

                {formData.type === "sub" && (
                  <div className="mb-3">
                    <label className="form-label">Choose Parent Menu</label>
                    <select
                      className="form-select"
                      name="parentMenu"
                      value={formData.parentMenu}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      {menus
                        .filter((m) => m.type === "main")
                        .map((m) => (
                          <option key={m._id} value={m._id}>
                            {m.title}
                          </option>
                        ))}
                    </select>
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label">Menu Link</label>
                  <input
                    type="text"
                    className="form-control"
                    name="link"
                    value={formData.link}
                    onChange={handleChange}
                    placeholder="/example"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="active">Active</option>
                    <option value="in-active">In Active</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Display Order</label>
                  <input
                    type="number"
                    className="form-control"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={loading}
                >
                  {loading ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : editMode ? (
                    <>
                      <i className="fa-solid fa-save me-2"></i>Update
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-plus me-2"></i>Save
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
