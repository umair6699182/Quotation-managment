import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { Collapse } from "react-bootstrap"; // Import Collapse from react-bootstrap for dropdown toggling

const Dashboard = () => {
  const [activeDropdown, setActiveDropdown] = useState(null); // Tracks which dropdown is open
  const [sidebarVisible, setSidebarVisible] = useState(false); // State to toggle sidebar visibility on small screens
  const navigate = useNavigate();
  const location = useLocation(); // Hook to track the current route
  const userData = JSON.parse(localStorage.getItem("data"));
  const name = JSON.parse(localStorage.getItem("name"));

  // Toggle dropdown visibility
  const handleDropdownToggle = (menuName) => {
    setActiveDropdown((prev) => (prev === menuName ? null : menuName));
  };

  const getlogOut = () => {
    localStorage.removeItem("data");
    localStorage.removeItem("name");
    navigate("/");
  };

  // Check if the current route is '/dashboard'
  const isDashboardRoute = location.pathname === "/dashboard";

  // Close the sidebar when a link is clicked
  const handleLinkClick = () => {
    if (window.innerWidth <= 768) { // Check for small screen
      setSidebarVisible(false); // Close the sidebar
    }
  };

  return (
    <div className="d-flex flex-column flex-md-row" style={{ height: "100vh", overflowX: 'hidden' }}>
      {/* Sidebar */}
      <div
        className={`bg-dark text-light p-3 ${sidebarVisible ? "d-block" : "d-none d-md-block"}`}
        style={{
          width: sidebarVisible ? "300px" : "300px", // Sidebar width is 0 when hidden
          position: "fixed", // Keep sidebar fixed on the left
          height: "100vh",
          zIndex: 999,
          transition: "width 0.3s ease", // Smooth transition for sidebar width
        }}
      >
        <h4 className="text-center">Quotation System</h4>
        <ul className="nav flex-column mt-4">
          <li className="nav-item mb-3">
            <Link
              to="/dashboard/maincontent"
              className="nav-link text-light cursor-pointer"
              onClick={handleLinkClick} // Close sidebar on link click
            >
              Dashboard Overview
            </Link>
          </li>

          {/* Customers Management Dropdown */}
          <li className="nav-item mb-3 cursor-pointer">
            <div
              className="nav-link text-light d-flex justify-content-between align-items-center cursor-pointer"
              onClick={() => handleDropdownToggle("customers")}
            >
              Customers Management
              <span>{activeDropdown === "customers" ? "▼" : "▶"}</span>
            </div>
            <Collapse in={activeDropdown === "customers"}>
              <ul className="list-unstyled ps-3">
                <li>
                  <Link
                    to="/dashboard/customers/add"
                    className="nav-link text-light"
                    onClick={handleLinkClick} // Close sidebar on link click
                  >
                    Add Customer
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/customers/list"
                    className="nav-link text-light"
                    onClick={handleLinkClick} // Close sidebar on link click
                  >
                    List Customers
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>

          {/* Items Management Dropdown */}
          <li className="nav-item mb-3">
            <div
              className="nav-link text-light d-flex justify-content-between align-items-center cursor-pointer"
              onClick={() => handleDropdownToggle("items")}
            >
              Items Management
              <span>{activeDropdown === "items" ? "▼" : "▶"}</span>
            </div>
            <Collapse in={activeDropdown === "items"}>
              <ul className="list-unstyled ps-3">
                <li>
                  <Link
                    to="/dashboard/items/add"
                    className="nav-link text-light"
                    onClick={handleLinkClick} // Close sidebar on link click
                  >
                    Add Item
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/items/list"
                    className="nav-link text-light"
                    onClick={handleLinkClick} // Close sidebar on link click
                  >
                    List Items
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>

          <li className="nav-item mb-3">
            <Link
              to="/dashboard/quotations/createquotation"
              className="nav-link text-light"
              onClick={handleLinkClick} // Close sidebar on link click
            >
              Quotations
            </Link>
          </li>
          <li className="nav-item mb-3">
            <Link
              to="/dashboard/saved-quotation"
              className="nav-link text-light"
              onClick={handleLinkClick} // Close sidebar on link click
            >
              Saved Quotations
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div
        className="flex-grow-1"
        style={{
          marginLeft: sidebarVisible ? "300px" : "300px", // Adjust main content width based on sidebar visibility
          transition: "margin-left 0.3s ease", // Smooth transition when opening/closing sidebar
          overflowY: "auto",
          paddingLeft: sidebarVisible ? "300px" : "0", // Ensure content area adjusts properly when sidebar is collapsed
        }}
      >
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Quotation Management System
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded={sidebarVisible ? "true" : "false"} // Properly bind the expanded state
              aria-label="Toggle navigation"
              onClick={() => setSidebarVisible(!sidebarVisible)} // Toggle sidebar visibility
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <div className="d-flex justify-content-between align-items-center gap-4 w-100">
                {/* User's Name Display */}
                <div className="d-flex align-items-center">
                  <h5 className="mt-2">{userData?.name}</h5>
                  {name && <h5 className="mt-2 ms-3">{name}</h5>}
                </div>

                {/* Logout Button */}
                <button className="btn btn-outline-danger" onClick={getlogOut}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Content Area */}
        <div className="container mt-5 pt-5">
          {/* Conditional Message only for Dashboard */}
          {isDashboardRoute && (
            <div className="alert alert-info" role="alert">
              Welcome to the Dashboard! Here you can manage all aspects of the
              system.
            </div>
          )}
          {isDashboardRoute && (
            <div className="alert alert-info" role="alert">
              Welcome to the Dashboard! Here you can manage all aspects of the
              system.
            </div>
          )}
          {isDashboardRoute && (
            <div className="alert alert-info" role="alert">
              Welcome to the Dashboard! Here you can manage all aspects of the
              system.
            </div>
          )}
          {isDashboardRoute && (
            <div className="alert alert-info" role="alert">
              Welcome to the Dashboard! Here you can manage all aspects of the
              system.
            </div>
          )}
          {isDashboardRoute && (
            <div className="alert alert-info" role="alert">
              Welcome to the Dashboard! Here you can manage all aspects of the
              system.
            </div>
          )}

          {/* This will render dynamic content based on the selected route */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
