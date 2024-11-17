import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListCustomers = () => {
  const [customers, setCustomers] = useState([]); // Customer data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [editingCustomer, setEditingCustomer] = useState(null); // Current customer being edited

  const [modalData, setModalData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  // Fetch customers when the component mounts
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/listcustomer');
        setCustomers(response.data);
      } catch (err) {
        setError(err.message || 'Something went wrong!');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Open the modal with selected customer data
  const handleEdit = (customer) => {
    setEditingCustomer(customer._id);
    setModalData(customer);
  };

  // Handle modal input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setModalData({
      ...modalData,
      [name]: value,
    });
  };

  // Submit the updated customer data
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/updatecustomer/${editingCustomer}`, modalData);
      setCustomers((prev) =>
        prev.map((customer) =>
          customer._id === editingCustomer ? { ...customer, ...modalData } : customer
        )
      );
      setEditingCustomer(null); // Close the modal
    } catch (err) {
      console.error('Failed to update customer:', err.message);
    }
  };

  // Delete a customer
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/deletecustomer/${id}`);
      setCustomers((prev) => prev.filter((customer) => customer._id !== id));
    } catch (err) {
      console.error('Failed to delete customer:', err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Customer List</h2>

      {loading && <p>Loading customers...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && customers.length === 0 && <p>No customers found.</p>}

      {!loading && !error && customers.length > 0 && (
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={customer._id}>
                <td>{index + 1}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.address}</td>
                <td>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => handleEdit(customer)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(customer._id)}
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
      {editingCustomer && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Customer</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditingCustomer(null)}
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
                      value={modalData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={modalData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={modalData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={modalData.address}
                      onChange={handleChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditingCustomer(null)}
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={handleUpdate}>
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

export default ListCustomers;
