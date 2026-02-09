import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Features from "./pages/Features";
import About from "./pages/About";
import Feedback from "./pages/Feedback";
import ApiDocs from "./pages/ApiDocs";
import UserGuide from "./pages/UserGuide";
import Faq from "./pages/Faq";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Loader from "./components/common/Loader";

import { useAuth } from "./context/AuthContext";

// ✅ PROTECTED ROUTE - Redirects unauthenticated users to /login
const ProtectedRoute = ({ children, isAuthenticated, isLoading }) => {
  if (isLoading) return <Loader />;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  const { isAuthenticated, loading } = useAuth();

  // ✅ Loading state while checking auth
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {isAuthenticated && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={loading}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/history" element={<History />} />

        <Route
          path="/features"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={loading}>
              <Features />
            </ProtectedRoute>
          }
        />

        <Route
          path="/about"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={loading}>
              <About />
            </ProtectedRoute>
          }
        />

        <Route
          path="/feedback"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={loading}>
              <Feedback />
            </ProtectedRoute>
          }
        />

        <Route
          path="/api-docs"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={loading}>
              <ApiDocs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user-guide"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={loading}>
              <UserGuide />
            </ProtectedRoute>
          }
        />

        <Route
          path="/faq"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={loading}>
              <Faq />
            </ProtectedRoute>
          }
        />

        <Route
          path="/support"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={loading}>
              <Support />
            </ProtectedRoute>
          }
        />

        {/* Root redirect - auto-redirect to dashboard if logged in, else to login */}
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {isAuthenticated && <Footer />}
    </>
  );
}

export default App;
