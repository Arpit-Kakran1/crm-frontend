import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import PublicLayout from '../layouts/PublicLayout.jsx';
import DashboardLayout from '../layouts/DashboardLayout.jsx';

import Home from '../pages/public/Home.jsx';
import PropertiesList from '../pages/public/PropertiesList.jsx';
import PropertyDetails from '../pages/public/PropertyDetails.jsx';
import Contactus from '../pages/public/ContactUs.jsx';

import AdminLogin from '../pages/admin/AdminLogin.jsx';
import AdminRegister from '../pages/admin/AdminRegister.jsx';
import AdminDashboard from '../pages/admin/AdminDashboard.jsx';
import AdminProperties from '../pages/admin/AdminProperties.jsx';
import AdminEnquiries from '../pages/admin/AdminEnquiries.jsx';
import AdminLeads from '../pages/admin/AdminLeads.jsx';
import AdminReports from '../pages/admin/AdminReports.jsx';
import AdminSettings from '../pages/admin/AdminSettings.jsx';

import NotFound from '../pages/NotFound.jsx';
import { serverUrl } from '../utils/serverUrl.js';

/* 🔐 AUTH GUARD */
const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export default function AppRoutes() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/auth/me`, {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch {
        setUser(null);
      }
    };
    checkUser();
  }, []);

  return (
    <Routes>
      {/* 🌍 PUBLIC */}
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="/properties" element={<PropertiesList />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/contact" element={<Contactus />} />
      </Route>

      {/* 🔑 AUTH */}
      <Route
        path="/admin/login"
        element={<AdminLogin setUser={setUser} />}
      />
      <Route path="/admin/register" element={<AdminRegister />} />

      {/* 🛡️ ADMIN (PROTECTED) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute user={user}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="properties" element={<AdminProperties />} />
        <Route path="enquiries" element={<AdminEnquiries />} />
        <Route path="leads" element={<AdminLeads />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* 🔁 ALIAS */}
      <Route path="/dashboard" element={<Navigate to="/admin" replace />} />

      {/* ❌ 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

