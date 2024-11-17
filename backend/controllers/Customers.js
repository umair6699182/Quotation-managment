// controllers/customerController.js
import Customer from "../model/Customer.js";

// Add a new customer
export const addCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    const result = await customer.save();
    res.status(201).json(result);
  } catch (error) {
    // Handle duplicate key error for unique fields like email
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already exists." });
    }
    res.status(400).json({ message: error.message });
  }
};

// List all customers
export const listCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


