import Item from "../model/Item.js";

export const addItem = async (req, res) => {
  try {
    const item = new Item(req.body); // Create a new item using the request body
    const savedItem = await item.save(); // Save to database
    res.status(201).json(savedItem); // Send back the saved item
  } catch (error) {
    res.status(409).json({ message: error.message }); // Handle errors
  }
};

export const listItems = async (req, res) => {
    try {
      const items = await Item.find(); // Retrieve all items
      res.status(200).json(items); // Send back the items
    } catch (error) {
      res.status(500).json({ message: error.message }); // Handle errors
    }
  };
  


  export const updateItem = async (req, res) => {
    try {
      const { id } = req.params; // Get the item ID from request parameters
      const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true }); // Update and return the updated item
      if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
      res.status(200).json(updatedItem); // Send back the updated item
    } catch (error) {
      res.status(500).json({ message: error.message }); // Handle errors
    }
  };

  
  export const deleteItem = async (req, res) => {
    try {
      const { id } = req.params; // Get the item ID from request parameters
      const deletedItem = await Item.findByIdAndDelete(id); // Delete the item
      if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
      res.status(200).json({ message: 'Item deleted successfully' }); // Confirm deletion
    } catch (error) {
      res.status(500).json({ message: error.message }); // Handle errors
    }
  };
  