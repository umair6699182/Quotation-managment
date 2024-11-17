import Customer from "../model/Customer.js";


// Update an existing customer



export const updateCustomer = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
  
      // Find the customer by ID and update
      const updatedCustomer = await Customer.findByIdAndUpdate(id, updates, {
        new: true, // Return the updated document
        runValidators: true, // Run schema validators
      });
  
      if (!updatedCustomer) {
        return res.status(404).json({ message: "Customer not found." });
      }
  
      res.status(200).json(updatedCustomer);
    } catch (error) {
      // Handle duplicate key error for unique fields like email
      if (error.code === 11000) {
        return res.status(409).json({ message: "Email already exists." });
      }
      res.status(400).json({ message: error.message });
    }
  };
  
  // Delete a customer
  export const deleteCustomer = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the customer by ID and delete
      const deletedCustomer = await Customer.findByIdAndDelete(id);
  
      if (!deletedCustomer) {
        return res.status(404).json({ message: "Customer not found." });
      }
  
      res.status(200).json({ message: "Customer deleted successfully." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };