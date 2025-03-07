import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/login';
import Signup from './components/auth/signUp';
import { AuthProvider } from './states/AuthContext';
import ProtectedRoute from "./utils/protectedRoute"; // Import ProtectedRoute
import DashboardAdmin from "./pages/Dashboard"; // Example protected pages
import DashboardUser from "./pages/Dashboard2"; // Example protected pages

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<h1 className="text-4xl text-center">404 - Not Found</h1>} />

          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/dashboard" element={<DashboardAdmin />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
            <Route path="/user/dashboard" element={<DashboardUser />} />
          </Route>

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
