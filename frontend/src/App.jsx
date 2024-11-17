import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import MainContent from "./components/MainContent";
import Customers from "./components/Customers/Customers";
import Items from "./components/Items/Items";
import AddCustomers from "./components/Customers/AddCustomer";
import ListCustomers from "./components/Customers/ListCustomers";
import AddItems from "./components/Items/AddItems";
import ListItems from "./components/Items/ListItems";
import CreateQuotation from "./components/Quotations/Quotations";
import QuotationWizard from "./components/Quotations/QuotationsWizard";
import SelectItems from "./components/Quotations/SelectedItems";
import TermsAndConditions from "./components/Quotations/TermsCondition";
import FinalPreview from "./components/Quotations/FinalPreview";
import SavedQuotation from "./components/SavedQuotation/SavedQuotation";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Route for Dashboard */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Navigate to="/dashboard/maincontent" />} /> {/* Redirect to /maincontent */}
          <Route path="/dashboard" element={<Dashboard />}>
            {/* Main Content Route */}
            <Route path="maincontent" element={<MainContent />} />
            <Route path="saved-quotation" element={<SavedQuotation />} />

            {/* Customers Management */}
            <Route path="customers" >
              <Route path="add" element={<AddCustomers />} />
              <Route path="list" element={<ListCustomers />} />
            </Route>

            {/* Items Management */}
            <Route path="items" >
              <Route path="add" element={<AddItems />} />
              <Route path="list" element={<ListItems />} />
            </Route>

            {/* Quotations Management */}
            <Route path="quotations" element={<QuotationWizard />}>
              <Route path="createquotation" element={<CreateQuotation />} />
              <Route path="selected-items" element={<SelectItems />} />
              <Route path="terms-conditions" element={<TermsAndConditions />} />
              <Route path="final-preview" element={<FinalPreview />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
