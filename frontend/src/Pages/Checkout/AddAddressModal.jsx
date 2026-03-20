import React, { useState } from "react";
import axios from "axios";
import axiosInstance from "../../ApiHendler/axiosInstance";
import Config from "../../Config/Config";

const AddAddressModal = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    country: "",
    state: "",
    zipCode: "",
    businessName: "",
    isDefault: false,
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ handle submit
  const handleSubmit = async () => {
   

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.city || !formData.zipCode) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      setLoading(true);

      const res = await axiosInstance.post( Config.END_POINT_LIST['ADD_ADDRESS'], formData, { withCredentials: true });

      if (res.data.success) {
        alert(" Address added successfully");
        if (onSuccess) onSuccess(); // refresh address list
        // Close modal manually
        const modal = window.bootstrap.Modal.getInstance(
          document.getElementById("addAddressModal")
        );
        modal.hide();
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          country: "India",
          state: "",
          zipCode: "",
          businessName: "",
          isDefault: false,
          phone: "",
        });
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal fade"
      id="addAddressModal"
      tabIndex={-1}
      aria-labelledby="addAddressModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          {/* Modal Body */}
          <div className="modal-body p-4">
            <div className="d-flex justify-content-between mb-4">
              <div>
                <h5 className="mb-1" id="addAddressModalLabel">
                  New Shipping Address
                </h5>
                <p className="small mb-0 text-muted">
                  Add a new shipping address for your order delivery.
                </p>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>

            {/* Form Fields */}
            <div className="row g-3">
              {[
                { name: "firstName", placeholder: "First name", required: true },
                { name: "lastName", placeholder: "Last name", required: true },
                { name: "addressLine1", placeholder: "Address Line 1" },
                { name: "addressLine2", placeholder: "Address Line 2" },
                { name: "city", placeholder: "City", required: true },
                { name: "zipCode", placeholder: "Zip Code", required: true },
                { name: "businessName", placeholder: "Business Name" },
                { name: "phone", placeholder: "Phone" },
              ].map((field) => (
                <div className="col-12" key={field.name}>
                  <input
                    type="text"
                    className="form-control"
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.required}
                  />
                </div>
              ))}

              {/* Country */}
              <div className="col-12">
                <select
                  className="form-select"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                >
                  <option value="India">India</option>
                  <option value="UK">UK</option>
                  <option value="USA">USA</option>
                  <option value="UAE">UAE</option>
                </select>
              </div>

              {/* State */}
              <div className="col-12">
                <input
                  type="text"
                  className="form-control"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Default checkbox */}
              <div className="col-12">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="defaultAddressCheck"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="defaultAddressCheck">
                    Set as Default
                  </label>
                </div>
              </div>

              {/* Buttons */}
              <div className="col-12 text-end">
                <button
                  type="button"
                  className="btn btn-outline-secondary me-2"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  type="button"
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {loading ? "Saving..." : "Save Address"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAddressModal;
