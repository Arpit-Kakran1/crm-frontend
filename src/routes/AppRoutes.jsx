import { Route, Routes, Navigate } from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout.jsx'
import DashboardLayout from '../layouts/DashboardLayout.jsx'
import React, { useEffect, useState } from 'react'
import Home from '../pages/public/Home.jsx'
import PropertiesList from '../pages/public/PropertiesList.jsx'
import PropertyDetails from '../pages/public/PropertyDetails.jsx'

import AdminLogin from '../pages/admin/AdminLogin.jsx'
import AdminRegister from '../pages/admin/AdminRegister.jsx'
import AdminDashboard from '../pages/admin/AdminDashboard.jsx'
import AdminProperties from '../pages/admin/AdminProperties.jsx'
import AdminEnquiries from '../pages/admin/AdminEnquiries.jsx'
import AdminLeads from '../pages/admin/AdminLeads.jsx'
import AdminReports from '../pages/admin/AdminReports.jsx'
import AdminSettings from '../pages/admin/AdminSettings.jsx'

import NotFound from '../pages/NotFound.jsx'
import axios from 'axios'
import { serverUrl } from '../utils/serverUrl.js'

export default function AppRoutes() {
  const [user, setUser] = useState(null);

  const handleUser = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/auth/me`, { withCredentials: true });
      setUser(res.data.user);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleUser();
  }, [])
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="/properties" element={<PropertiesList />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
      </Route>


      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/register" element={<AdminRegister />} />



      <Route element={user ? <DashboardLayout /> : <AdminLogin />}>
        <Route path="/admin" element={user ? <AdminDashboard /> : <AdminLogin />} />
        <Route path="/admin/properties" element={user ? <AdminProperties /> : <AdminLogin />} />
        <Route path="/admin/enquiries" element={user ? <AdminEnquiries /> : <AdminLogin />} />
        <Route path="/admin/leads" element={user ? <AdminLeads /> : <AdminLogin />} />
        <Route path="/admin/reports" element={user ? <AdminReports /> : <AdminLogin />} />
        <Route path="/admin/settings" element={user ? <AdminSettings /> : <AdminLogin />} />
      </Route>


      <Route path="/dashboard" element={<Navigate to="/admin" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

