import React, { useEffect, useState } from "react";
import axios from "axios";

function MainContent() {
  const [customer, setCustomer] = useState([]);
  const [item, setItem] = useState([]);
  const [quotation, setQuotation] = useState([]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get("http://localhost:8080/listcustomer");
        setCustomer(response.data);
      } catch (error) {
        console.error("Error fetching customers data:", error);
      }
    };

    const fetchRecentItems = async () => {
      try {
        const response = await axios.get("http://localhost:8080/listitem");
        setItem(response.data);
      } catch (error) {
        console.error("Error fetching items data:", error);
      }
    };

    const fetchRecentQuotations = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getquotations");
        setQuotation(response.data);
      } catch (error) {
        console.error("Error fetching quotations data:", error);
      }
    };

    fetchSummary();
    fetchRecentItems();
    fetchRecentQuotations();
  }, []);

  const CustomerLength = customer.length;
  const TotalItem = item.length;
  const TotalQuotation = quotation.length;
  console.log(quotation);

  return (
    <div className="container mt-4">
      {/* Overview Cards */}
      <div className="row g-4">
        {/* Card 1: Total Customers */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Total Customers</h5>
              <p className="card-text display-6">{CustomerLength}</p>
            </div>
          </div>
        </div>

        {/* Card 2: Total Items */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Total Items</h5>
              <p className="card-text display-6">{TotalItem}</p>
            </div>
          </div>
        </div>

        {/* Card 3: Total Quotations */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Total Quotations</h5>
              <p className="card-text display-6">{TotalQuotation}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="mt-5">
        <h4>Recent Quotations</h4>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer Name</th>
              <th>Date</th>
              <th>Items</th>
              {/* <th>Status</th> */}
            </tr>
          </thead>
          <tbody>
            {quotation.length > 0 ? (
              quotation?.map((quote, index) => (
                <tr key={quote._id}>
                  <td>{index + 1}</td>
                  <td>{quote.selectedCustomer.name}</td>
                  <td>{new Date(quote.date).toLocaleDateString()}</td>
                  <td>{quote?.items.length}</td>
                  <td>
                    <span
                      className={`badge ${
                        quote.status === "Approved"
                          ? "bg-success"
                          : quote.status === "Pending"
                          ? "bg-warning"
                          : "bg-danger"
                      }`}
                    >
                      {quote.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No recent quotations available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MainContent;
