import React, { useState } from "react";
import CreateQuotation from "./Quotations";
import SelectItems from "./SelectedItems";
import TermsAndConditions from "./TermsCondition";
import FinalPreview from "./FinalPreview";

const QuotationWizard = () => {
  const [step, setStep] = useState(1);
  const [quotationData, setQuotationData] = useState({
    selectedCustomer: "",
    date: "",
    validityDate: "",
    notes: "",
    items: [],
    terms: { // Initialize an empty object to store terms acceptance
      acceptedTaxes: false,
      acceptedWarranty: false,
      acceptedLiability: false,
      acceptedDelivery: false,
      acceptedPayment: false,
      acceptedValidity: false,
    },
  });

  // Handle the Next button click
  const handleNext = (data) => {
    setQuotationData((prev) => ({
      ...prev,
      ...data, // Merge data from the current step into the quotation data
    }));
    setStep(step + 1);
  };

  // Handle the Back button click
  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div>
      {step === 1 && (
        <CreateQuotation
          onNext={handleNext}
          initialData={quotationData} // Pass the current data
        />
      )}

      {step === 2 && (
        <SelectItems
          onNext={handleNext}
          onBack={handleBack}
          initialData={quotationData} // Pass the current data
        />
      )}

      {step === 3 && (
        <TermsAndConditions
          onNext={handleNext}
          onBack={handleBack}
          initialData={quotationData} // Pass the current data
        />
      )}

      {step === 4 && (
        <FinalPreview
          quotationData={quotationData} // Pass the complete quotation data (including terms)
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default QuotationWizard;
