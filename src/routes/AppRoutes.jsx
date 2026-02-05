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
import AdminDashboard from '../pages/admin/AdminDashboard.jsx';
import AdminProperties from '../pages/admin/AdminProperties.jsx';
import AdminEnquiries from '../pages/admin/AdminEnquiries.jsx';
import AdminLeads from '../pages/admin/AdminLeads.jsx';
import AdminReports from '../pages/admin/AdminReports.jsx';
import AdminSettings from '../pages/admin/AdminSettings.jsx';

import NotFound from '../pages/NotFound.jsx';
import { serverUrl } from '../utils/serverUrl.js';

import api from '../utils/api';


const ProtectedRoute = ({ user, authLoading, children }) => {
  if (authLoading) {
    return null; // or a loader
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};


export default function AppRoutes() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await api.get('/api/auth/me');
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    checkUser();
  }, []);



  return (
    <Routes>

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

      {/* 🛡️ ADMIN (PROTECTED) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute user={user} authLoading={authLoading}>
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

