import React, { useEffect, useState } from "react";
import axios from "axios";

const CreateQuotation = ({ onNext, initialData }) => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(initialData?.selectedCustomer || {});
  const [date, setDate] = useState(initialData?.date || "");
  const [validityDate, setValidityDate] = useState(initialData?.validityDate || "");
  const [notes, setNotes] = useState(initialData?.notes || "");

  // Fetch customers from the backend when the component loads
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/listcustomer");
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error.message);
      }
    };
    fetchCustomers();
  }, []);

  const handleNext = () => {
    if (!selectedCustomer._id) {
      alert("Please select a customer.");
      return;
    }
    onNext({
      selectedCustomer,
      date,
      validityDate,
      notes,
    });
  };

  return (
    <div className="container mt-4">
      <h2>Create Quotation</h2>
      <div className="mb-3">
        <label className="form-label">Select Customer</label>
        <select
          className="form-select"
          value={selectedCustomer._id || ""}
          onChange={(e) => {
            const customer = customers.find(
              (customer) => customer._id === e.target.value
            );
            setSelectedCustomer(customer || {});
          }}
        >
          <option value="">-- Select Customer --</option>
          {customers?.map((customer) => (
            <option key={customer._id} value={customer._id}>
              {customer.name} - {customer.email}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Date</label>
        <input
          type="date"
          className="form-control"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Validity Date</label>
        <input
          type="date"
          className="form-control"
          value={validityDate}
          onChange={(e) => setValidityDate(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Notes</label>
        <textarea
          className="form-control"
          rows="4"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
      </div>
      <button className="btn btn-primary" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default CreateQuotation;
