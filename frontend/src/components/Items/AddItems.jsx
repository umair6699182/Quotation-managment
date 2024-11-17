import React, { useState } from "react";
import axios from "axios";
import Barcode from "react-barcode";

const AddItems = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    costPrice: "",
    salePrice: "",
    gst: "",
    barCode: "",
  });

  // State to manage feedback message
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  // Function to format currency (₹ symbol)
  const formatCurrency = (value) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/[^\d.-]/g, '');
    // Format value as currency
    return numericValue ? '₹' + parseFloat(numericValue).toFixed(2) : '';
  };

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    let formattedValue = value;

    if (id === "costPrice" || id === "salePrice") {
      formattedValue = formatCurrency(value);
    }

    setFormData({
      ...formData,
      [id]: formattedValue,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Remove currency symbol before sending data to the backend
      const costPrice = formData.costPrice.replace(/[^\d.-]/g, '');
      const salePrice = formData.salePrice.replace(/[^\d.-]/g, '');

      const response = await axios.post("http://localhost:8080/additem", {
        ...formData,
        costPrice,
        salePrice,
      });

      setMessage("Item added successfully!");
      setMessageType("success");

      setFormData({
        name: "",
        category: "",
        costPrice: "",
        salePrice: "",
        gst: "",
        barCode: "",
      });
    } catch (error) {
      setMessage("Failed to add item. Please try again.");
      setMessageType("error");
    }
  };

  return (
    <div className="container mt-2">
      <h2 className="text-center mb-4">Add New Item</h2>
      {message && (
        <p
          className={`text-center mt-3 ${
            messageType === "success" ? "text-success" : "text-danger"
          }`}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Item Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter item name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <input
            type="text"
            className="form-control"
            id="category"
            placeholder="Enter item category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="costPrice" className="form-label">
            Cost Price
          </label>
          <input
            type="text"
            className="form-control"
            id="costPrice"
            placeholder="Enter cost price"
            value={formData.costPrice}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="salePrice" className="form-label">
            Sale Price
          </label>
          <input
            type="text"
            className="form-control"
            id="salePrice"
            placeholder="Enter sale price"
            value={formData.salePrice}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gst" className="form-label">
            GST %
          </label>
          <input
            type="number"
            className="form-control"
            id="gst"
            placeholder="Enter GST percentage"
            value={formData.gst}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="barCode" className="form-label">
            Bar Code
          </label>
          <input
            type="text"
            className="form-control"
            id="barCode"
            placeholder="Enter bar code"
            value={formData.barCode}
            onChange={handleChange}
            required
          />
        </div>
        {/* Uncomment if you need to display barcode */}
        {/* <div>
          <h4>Bar Code:</h4>
          <Barcode value={formData.barCode || "123456789"} />
        </div> */}
        <button type="submit" className="btn btn-primary w-100">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItems;
