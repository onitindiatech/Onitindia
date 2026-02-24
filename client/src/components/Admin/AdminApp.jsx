import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import PrivateRoute from './components/common/PrivateRoute';
import UsersPage from './pages/Users.jsx';
import TasksPage from './pages/Tasks.jsx';
import FinancePage from './pages/Finance.jsx';
import PerformerVerificationPage from './pages/KYC.jsx';
import WorkVerificationPage from './pages/WorkVerification.jsx';
import NotificationsPage from './pages/Notifications.jsx';
import ModerationPage from './pages/Moderation.jsx';
import ReportsPage from './pages/Reports.jsx';
import SettingsPage from './pages/Settings.jsx';
import DeletionPage from './pages/DeletionPage.jsx';
import TicketsPage from './pages/support/Tickets.jsx';
import LiveChatPage from './pages/support/LiveChat.jsx';
import HelpCenterPage from './pages/support/HelpCenter.jsx';
import { AuthProvider } from './hooks/useAuth';
import './index.css';

const AdminApp = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="finance" element={<FinancePage />} />
            <Route path="verify-performers" element={<PerformerVerificationPage />} />
            <Route path="verify-work" element={<WorkVerificationPage />} />
            <Route path="moderation" element={<ModerationPage />} />
            <Route path="support">
              <Route path="tickets" element={<TicketsPage />} />
              <Route path="live-chat" element={<LiveChatPage />} />
              <Route path="help-center" element={<HelpCenterPage />} />
            </Route>
            <Route path="reports" element={<ReportsPage />} />

            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="deletion" element={<DeletionPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default AdminApp;
