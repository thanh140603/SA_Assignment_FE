// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import DashboardLayout from './pages/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import ManageUsers from './pages/ManageUsers';
import PatientPage from './pages/PatientPage';
import AppointmentPage from './pages/AppointmentPage';
import PrescriptionPage from './pages/PrescriptionPage';
import MedicinePage from './pages/MedicinePage';
import FacultyPage from './pages/FacultyPage';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="patients" element={<PatientPage />} />
        <Route path="appointments" element={<AppointmentPage />} />
        <Route path="prescriptions" element={<PrescriptionPage />} />
        <Route path="medicines" element={<MedicinePage />} />
        <Route path="faculties" element={<FacultyPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
