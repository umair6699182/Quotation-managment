import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListItems = () => {
  const [items, setItems] = useState([]); // State to hold item data
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling
  const [editItem, setEditItem] = useState(null); // State for the item being edited
  const [showModal, setShowModal] = useState(false); // State for showing/hiding the modal
  const [searchQuery, setSearchQuery] = useState(''); // State for search input

  // Fetch items when the component is mounted
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/listitem'); // Replace with your API endpoint
        setItems(response.data);
      } catch (err) {
        setError(err.message || 'Something went wrong!');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Handle opening the modal for editing
  const handleEdit = (item) => {
    setEditItem({ ...item });
    setShowModal(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setEditItem(null);
    setShowModal(false);
  };

  // Handle changes in the edit form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditItem((prev) => ({ ...prev, [name]: value }));
  };

  // Handle saving the edited item
  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8080/items/${editItem._id}`, editItem); // Replace with your API endpoint
      setItems((prev) =>
        prev.map((item) => (item._id === editItem._id ? editItem : item))
      );
      alert('Item updated successfully!');
      handleCloseModal();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update item!');
    }
  };

  // Handle delete action
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      await axios.delete(`http://localhost:8080/items/${id}`); // Replace with your API endpoint
      setItems(items.filter((item) => item._id !== id));
      alert('Item deleted successfully.');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete item!');
    }
  };

  // Filter items based on search query
  const filteredItems = items.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.barCode.toLowerCase().includes(query)
    );
  });

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Item List</h2>

      {/* Search Field */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Name or Bar Code"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading && <p>Loading items...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && filteredItems.length === 0 && (
        <p>No items found matching the search criteria.</p>
      )}

      {!loading && !error && filteredItems.length > 0 && (
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Category</th>
              <th>Cost Price</th>
              <th>Sale Price</th>
              <th>GST (%)</th>
              <th>Bar Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.costPrice}</td>
                <td>{item.salePrice}</td>
                <td>{item.gst}</td>
                <td>{item.barCode}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Edit Modal */}
      {showModal && editItem && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Item</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={editItem.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <input
                      type="text"
                      className="form-control"
                      name="category"
                      value={editItem.category}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Cost Price</label>
                    <input
                      type="number"
                      className="form-control"
                      name="costPrice"
                      value={editItem.costPrice}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Sale Price</label>
                    <input
                      type="number"
                      className="form-control"
                      name="salePrice"
                      value={editItem.salePrice}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">GST (%)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="gst"
                      value={editItem.gst}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Bar Code</label>
                    <input
                      type="text"
                      className="form-control"
                      name="barCode"
                      value={editItem.barCode}
                      onChange={handleChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSave}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListItems;
