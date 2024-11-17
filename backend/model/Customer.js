import mongoose from "mongoose";

// Create a schema for the Customer
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Ensures name is required
    trim: true, // Trims extra spaces
  },
  email: {
    type: String,
    required: true, // Ensures email is required
    unique: true, // Ensures the email is unique
    trim: true, // Trims extra spaces
    lowercase: true, // Ensures email is stored in lowercase
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'], // Regex to validate email format
  },
  phone: {
    type: String,
    required: true, // Ensures phone number is required
    trim: true,
    validate: {
      validator: function (v) {
        // Regex to validate phone number format
        return /\d{10}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  address: {
    type: String,
    required: true, // Ensures address is required
    trim: true, // Trims extra spaces
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields automatically
});

// Create a model for the customer using the schema
const Customer = mongoose.model('customer', customerSchema);

export default Customer;
