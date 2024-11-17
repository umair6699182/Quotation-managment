import React, { useState } from "react";

const TermsAndConditions = ({ onNext, onBack, initialData }) => {
  const [acceptedTaxes, setAcceptedTaxes] = useState(initialData?.terms?.acceptedTaxes || false);
  const [acceptedWarranty, setAcceptedWarranty] = useState(initialData?.terms?.acceptedWarranty || false);
  const [acceptedLiability, setAcceptedLiability] = useState(initialData?.terms?.acceptedLiability || false);
  const [acceptedDelivery, setAcceptedDelivery] = useState(initialData?.terms?.acceptedDelivery || false);
  const [acceptedPayment, setAcceptedPayment] = useState(initialData?.terms?.acceptedPayment || false);
  const [acceptedValidity, setAcceptedValidity] = useState(initialData?.terms?.acceptedValidity || false);

  // Handle Next button
  const handleNext = () => {
    // Prepare the terms data to send back to the parent
    const termsData = {
      acceptedTaxes,
      acceptedWarranty,
      acceptedLiability,
      acceptedDelivery,
      acceptedPayment,
      acceptedValidity,
    };

    // Pass the terms data along with other quotation data to the parent component
    onNext({ terms: termsData });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Terms & Conditions</h2>

      {/* Taxes Term */}
      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          id="acceptTaxes"
          checked={acceptedTaxes}
          onChange={() => setAcceptedTaxes(!acceptedTaxes)}
        />
        <label className="form-check-label" htmlFor="acceptTaxes">
          <strong>Taxes</strong>: All applicable taxes will be added to the final
          invoice total as per the current tax rates. You agree to pay all taxes
          as required by law.
        </label>
      </div>

      {/* Warranty Term */}
      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          id="acceptWarranty"
          checked={acceptedWarranty}
          onChange={() => setAcceptedWarranty(!acceptedWarranty)}
        />
        <label className="form-check-label" htmlFor="acceptWarranty">
          <strong>Warranty</strong>: The products are covered under a 1-year
          warranty, which covers defects in materials and workmanship. Warranty
          does not cover damage due to misuse or neglect.
        </label>
      </div>

      {/* Liability Term */}
      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          id="acceptLiability"
          checked={acceptedLiability}
          onChange={() => setAcceptedLiability(!acceptedLiability)}
        />
        <label className="form-check-label" htmlFor="acceptLiability">
          <strong>Liability</strong>: The company is not liable for any indirect,
          incidental, or consequential damages arising from the use of the
          product. Our total liability is limited to the value of the product
          purchased.
        </label>
      </div>

      {/* Delivery Term */}
      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          id="acceptDelivery"
          checked={acceptedDelivery}
          onChange={() => setAcceptedDelivery(!acceptedDelivery)}
        />
        <label className="form-check-label" htmlFor="acceptDelivery">
          <strong>Delivery</strong>: Delivery times are estimates and not
          guaranteed. We are not responsible for delays caused by third-party
          couriers, weather, or other uncontrollable factors.
        </label>
      </div>

      {/* Payment Terms */}
      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          id="acceptPayment"
          checked={acceptedPayment}
          onChange={() => setAcceptedPayment(!acceptedPayment)}
        />
        <label className="form-check-label" htmlFor="acceptPayment">
          <strong>Payment Terms</strong>: Payment is due within 30 days of the
          invoice date. Late payments will incur a fee of 2% per month. Payments
          can be made via bank transfer, credit card, or cheque.
        </label>
      </div>

      {/* Quote Validity */}
      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          id="acceptValidity"
          checked={acceptedValidity}
          onChange={() => setAcceptedValidity(!acceptedValidity)}
        />
        <label className="form-check-label" htmlFor="acceptValidity">
          <strong>Quote Validity</strong>: This quotation is valid for 30 days
          from the date of issue. After this period, the pricing may be subject to
          change.
        </label>
      </div>

      {/* Summary */}
      <div className="alert alert-info mt-3">
        <strong>Important:</strong> By proceeding, you confirm that you have read and understood the terms.
        You can still proceed without accepting all the terms.
      </div>

      {/* Buttons for Navigation */}
      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={onBack}>
          Back
        </button>
        <button className="btn btn-primary" onClick={handleNext}>
          Proceed
        </button>
      </div>
    </div>
  );
};

export default TermsAndConditions;
