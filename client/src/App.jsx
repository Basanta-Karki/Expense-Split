import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoute from "./components/ProtectedRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmailVerify from "./Emailverify.jsx";
import ResetPassword from "./Resetpassword.jsx";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register";

import ExpenseDashboard from "./components/ExpenseDashboard.jsx";
import Expenses from "./components/Expenses.jsx";
import Settings from "./components/Settings.jsx";
import Analytics from "./components/Analytics.jsx";

function App() {
  return (
    <div className="main">
      <ToastContainer position="top-right" autoClose={3000} />

      <Router>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-email" element={<EmailVerify />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              {/* <Route path="/dashboard/:id" element={<Dashboard />} /> */}
              {/*  */}

              <Route
                path="/expense-tracker/dashboard"
                element={<ExpenseDashboard />}
              />
              <Route
                path="/expense-tracker/:id/dashboard"
                element={<Navigate to="/expense-tracker/dashboard" replace />}
              />

              {/* Expenses List Page */}
              <Route path="/expense-tracker/expenses" element={<Expenses />} />
              <Route path="/expense-tracker/analytics" element={<Analytics />} />
              <Route path="/expense-tracker/settings" element={<Settings />} />

              {/* Protected Routes */}
              {/* <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <Dashboard />
                  </ProtectedRoute>
                }
              /> */}

              {/* <Route path="/groups/create" element={<CreateNewGroup />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/groups/:id" element={<ViewGroup />} /> */}

              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
