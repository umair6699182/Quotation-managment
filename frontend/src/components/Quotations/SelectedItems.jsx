import React, { useState, useEffect } from "react";
import axios from "axios";

const SelectItems = ({ onNext, onBack, initialData }) => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState(initialData.items || []);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch items from the backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:8080/listitem");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error.message);
      }
    };
    fetchItems();
  }, []);

  // Handle adding item to the selected items list
  const handleAddItem = (item) => {
    if (!selectedItems.find((selectedItem) => selectedItem._id === item._id)) {
      setSelectedItems((prev) => [
        ...prev,
        { ...item, quantity: 1, price: item.salePrice, added: true },
      ]);
    }
  };

  // Handle removing item from the selected items list
  const handleRemoveItem = (itemId) => {
    setSelectedItems((prev) => prev.filter((item) => item._id !== itemId));
  };

  // Handle searching for items
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter items based on the search term (case-insensitive)
  const filteredItems = items.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.barCode?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4 mb-4">
      {/* Display the Customer Information from the previous step */}
      <div className="mb-4 p-4 border rounded shadow-sm">
        <h4>Customer Information</h4>
        <p>
          <strong>Name:</strong> {initialData.selectedCustomer.name}
        </p>
        <p>
          <strong>Email:</strong> {initialData.selectedCustomer.email}
        </p>
        <p>
          <strong>Date:</strong> {initialData.date}
        </p>
        <p>
          <strong>Validity Date:</strong> {initialData.validityDate}
        </p>
        <p>
          <strong>Notes:</strong> {initialData.notes}
        </p>
      </div>

       {/* Display Selected Items in a Table */}
       {selectedItems.length > 0 && (
        <div className="mt-4">
          <h4>Selected Items</h4>
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Barcode</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {selectedItems.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.barCode}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={item.price}
                      onChange={(e) =>
                        setSelectedItems((prev) => {
                          const newItems = [...prev];
                          newItems[index].price = parseFloat(e.target.value);
                          return newItems;
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={item.quantity}
                      min="1"
                      onChange={(e) =>
                        setSelectedItems((prev) => {
                          const newItems = [...prev];
                          newItems[index].quantity = parseInt(
                            e.target.value,
                            10
                          );
                          return newItems;
                        })
                      }
                    />
                  </td>
                  <td>{(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemoveItem(item._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h2 className="mb-4 text-center">Select Items for Quotation</h2>

      {/* Search Bar */}
      <div className="mb-4">
      <h4>Search Items</h4>
        <input
          type="text"
          className="form-control"
          placeholder="Search items by name or barcode"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Display Item List */}
      <div className="mb-4">
        <h4>Available Items</h4>
        <ul className="list-group">
          {filteredItems.map((item) => (
            <li
              key={item._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                {item.name} ({item.barCode})
              </span>
              {selectedItems.find(
                (selectedItem) => selectedItem._id === item._id
              ) ? (
                <span>Added Successfully</span>
              ) : (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleAddItem(item)}
                >
                  Add
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

     

      {/* Navigation Buttons */}
      <div className="d-flex gap-3">
        <button className="btn btn-secondary" onClick={onBack}>
          Back
        </button>
        <button
          className="btn btn-primary"
          onClick={() => onNext({ items: selectedItems })}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SelectItems;
