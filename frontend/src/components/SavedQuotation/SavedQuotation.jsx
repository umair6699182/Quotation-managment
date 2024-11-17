import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Importing icons for dropdown toggle

const SavedQuotation = () => {
  const [quotations, setQuotations] = useState([]);
  const [expandedQuotation, setExpandedQuotation] = useState(null); // State to track the expanded quotation

  // Fetch saved quotations from the backend
  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getquotations');
        setQuotations(response.data); // Assuming the response contains an array of quotations
      } catch (error) {
        console.error('Error fetching quotations:', error);
      }
    };

    fetchQuotations();
  }, []);

  // Generate PDF for the selected quotation
  const generatePDF = (quotationData) => {
    const doc = new jsPDF();
  
    // Title
    doc.setFontSize(18);
    doc.text('Quotation Management System', 105, 20, { align: 'center' });
  
    // Customer Info
    doc.setFontSize(12);
    doc.text(`Customer Name: ${quotationData.selectedCustomer.name}`, 20, 30);
    doc.text(`Email: ${quotationData.selectedCustomer.email}`, 20, 40);
    doc.text(`Phone: ${quotationData.selectedCustomer.phone || 'N/A'}`, 20, 50);
    doc.text(`Date: ${quotationData.date}`, 20, 60);
    doc.text(`Validity Date: ${quotationData.validityDate}`, 20, 70);
    doc.text(`Notes: ${quotationData.notes || 'N/A'}`, 20, 80);
  
    // Items Table
    doc.text('Items:', 20, 100);
    doc.autoTable({
      startY: 110,
      head: [['Item Name', 'Quantity', 'Unit Price', 'Total Price']],
      body: quotationData.items.map((item) => [
        item.name,
        item.quantity,
        item.price.toFixed(2),
        (item.quantity * item.price).toFixed(2),
      ]),
    });
  
    // Calculate Total Price
    const totalPrice = quotationData.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
  
    // Total Price on the Right
    doc.setFontSize(14);
    doc.text(`Total: ${totalPrice.toFixed(2)}`, 180, doc.lastAutoTable.finalY + 10, { align: 'right' });
  
    // Accepted Terms & Conditions
    const acceptedTerms = [];
    if (quotationData.terms.acceptedTaxes) acceptedTerms.push('Taxes');
    if (quotationData.terms.acceptedWarranty) acceptedTerms.push('Warranty');
    if (quotationData.terms.acceptedLiability) acceptedTerms.push('Liability');
    if (quotationData.terms.acceptedDelivery) acceptedTerms.push('Delivery');
    if (quotationData.terms.acceptedPayment) acceptedTerms.push('Payment');
    if (quotationData.terms.acceptedValidity) acceptedTerms.push('Quote Validity');
  
    if (acceptedTerms.length > 0) {
      doc.text('Accepted Terms & Conditions:', 20, doc.lastAutoTable.finalY + 30);
      acceptedTerms.forEach((term, index) => {
        doc.text(`- ${term}`, 20, doc.lastAutoTable.finalY + 40 + index * 10);
      });
    }
  
    // Save PDF
    doc.save('quotation.pdf');
  };

  // Handle the toggle click event for expanding/closing quotation details
  const toggleQuotation = (quotationId) => {
    // If the clicked quotation is already expanded, close it. Otherwise, open it.
    if (expandedQuotation === quotationId) {
      setExpandedQuotation(null);
    } else {
      setExpandedQuotation(quotationId);
    }
  };

  return (
    <div className="container mt-4 mb-4">
      <h2 className="text-center">Saved Quotations</h2>

      {/* List of saved quotations */}
      <div className="list-group mt-4 mb-4">
        {quotations.length === 0 ? (
          <p>No quotations found.</p>
        ) : (
          quotations.map((quotation) => (
            <div key={quotation._id} className="list-group-item">
              {/* Dropdown button */}
              <div
                onClick={() => toggleQuotation(quotation._id)}
                className="d-flex justify-content-between align-items-center"
                style={{ cursor: 'pointer' }}
              >
                <span className="text-truncate" style={{ maxWidth: '200px' }}>
                  Quotation for {quotation.selectedCustomer.name} - {quotation.date}
                </span>
                <span>
                  {expandedQuotation === quotation._id ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </span>
              </div>

              {/* Quotation details (conditionally rendered) */}
              {expandedQuotation === quotation._id && (
                <div className="mt-3">
                  <p>
                    <strong>Customer Name:</strong> {quotation.selectedCustomer.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {quotation.selectedCustomer.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {quotation.selectedCustomer.phone || 'N/A'}
                  </p>
                  <p>
                    <strong>Date:</strong> {quotation.date}
                  </p>
                  <p>
                    <strong>Validity Date:</strong> {quotation.validityDate}
                  </p>
                  <p>
                    <strong>Notes:</strong> {quotation.notes || 'N/A'}
                  </p>

                  <h5>Items:</h5>
                  <table className="table table-bordered table-sm">
                    <thead>
                      <tr>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quotation.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.quantity}</td>
                          <td>{item.price.toFixed(2)}</td>
                          <td>{(item.quantity * item.price).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <h5>Total: </h5>
                  <p>
                    {quotation.items.reduce(
                      (acc, item) => acc + item.quantity * item.price,
                      0
                    ).toFixed(2)}
                  </p>

                  {/* Display Only Accepted Terms & Conditions */}
                  <h5>Accepted Terms & Conditions:</h5>
                  {quotation.terms.acceptedTaxes && <p><strong>Taxes:</strong> Accepted</p>}
                  {quotation.terms.acceptedWarranty && <p><strong>Warranty:</strong> Accepted</p>}
                  {quotation.terms.acceptedLiability && <p><strong>Liability:</strong> Accepted</p>}
                  {quotation.terms.acceptedDelivery && <p><strong>Delivery:</strong> Accepted</p>}
                  {quotation.terms.acceptedPayment && <p><strong>Payment:</strong> Accepted</p>}
                  {quotation.terms.acceptedValidity && <p><strong>Quote Validity:</strong> Accepted</p>}

                  <button className="btn btn-primary btn-sm" onClick={() => generatePDF(quotation)}>
                    Print Quotation (PDF)
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SavedQuotation;
