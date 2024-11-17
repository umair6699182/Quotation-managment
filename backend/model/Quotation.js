import mongoose from "mongoose";


const quotationSchema = new mongoose.Schema({
    selectedCustomer: {
      name: String,
      email: String,
      phone: String,
    },
    date: String,
    validityDate: String,
    notes: String,
    items: [
      {
        name: String,
        quantity: Number,
        price: Number,
      },
    ],
    terms: {
      acceptedTaxes: Boolean,
      acceptedWarranty: Boolean,
      acceptedLiability: Boolean,
      acceptedDelivery: Boolean,
      acceptedPayment: Boolean,
      acceptedValidity: Boolean,
    },
  });
  
  const Quotation = mongoose.model('Quotation', quotationSchema);


  export default Quotation;