import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Import the autoTable plugin
import axios from "axios"; // Import Axios

const FinalPreview = ({ quotationData, onSave }) => {
  
  // Check if quotationData is passed and contains the necessary information
  if (!quotationData || !quotationData.selectedCustomer) {
    return <div>Loading...</div>;
  }

  // Handle Save action
  const handleSave = async () => {
    try {
      const response = await axios.post("http://localhost:8080/addquotation", quotationData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 200) {
        alert("Quotation saved successfully!");
      } else {
        alert("Error saving quotation: " + response.data.message);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  // Filter accepted terms and conditions
  const acceptedTerms = Object.entries(quotationData?.terms || {})
    .filter(([key, value]) => value) // Only include accepted terms (value is true)
    .map(([key]) => key); // Get the term name (key) only

  return (
    <div className="container mt-4 mb-4">
      <h2 className="text-center">Quotation Preview</h2>

      {/* Display Quotation Details */}
      <div className="mb-3">
        <h4>Customer Information</h4>
        <p><strong>Name:</strong> {quotationData?.selectedCustomer?.name || "N/A"}</p>
        <p><strong>Email:</strong> {quotationData?.selectedCustomer?.email || "N/A"}</p>
        <p><strong>Phone:</strong> {quotationData?.selectedCustomer?.phone || "N/A"}</p>
        <p><strong>Date:</strong> {quotationData?.date || "N/A"}</p>
        <p><strong>Validity Date:</strong> {quotationData?.validityDate || "N/A"}</p>
        <p><strong>Notes:</strong> {quotationData?.notes || "N/A"}</p>
      </div>

      <div className="mb-3">
        <h4>Items</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {quotationData?.items && quotationData.items.length > 0 ? (
              quotationData.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price?.toFixed(2) || "N/A"}</td>
                  <td>{(item.quantity * item.price).toFixed(2) || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No items selected</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Display Total Price */}
      <div className="mb-3">
        <h4>Total: </h4>
        <p>
          {quotationData?.items && quotationData.items.length > 0
            ? quotationData?.items.reduce(
                (acc, item) => acc + item.quantity * item.price,
                0
              ).toFixed(2)
            : "0.00"}
        </p>
      </div>

      {/* Display Terms & Conditions (Only Accepted) */}
      <div className="mb-3">
        <h4>Accepted Terms & Conditions</h4>
        {acceptedTerms.length > 0 ? (
          <ul>
            {acceptedTerms.map((term, index) => (
              <li key={index}><strong>{term.replace(/([A-Z])/g, ' $1').trim()}:</strong> Accepted</li>
            ))}
          </ul>
        ) : (
          <p>No terms accepted</p>
        )}
      </div>

      {/* Buttons for Save and Print */}
      <div className="d-flex justify-content-between">
        <button className="btn btn-success" onClick={handleSave}>
          Save Quotation
        </button>
      </div>
    </div>
  );
};

export default FinalPreview;
