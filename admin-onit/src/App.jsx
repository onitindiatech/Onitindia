import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import PrivateRoute from './components/common/PrivateRoute';
import UsersPage from './pages/Users.jsx';
import TasksPage from './pages/Tasks.jsx';
import FinancePage from './pages/Finance.jsx';
import KYCPage from './pages/KYC.jsx';
import NotificationsPage from './pages/Notifications.jsx';
import ModerationPage from './pages/Moderation.jsx';
import ReportsPage from './pages/Reports.jsx';
import SettingsPage from './pages/Settings.jsx';
import TicketsPage from './pages/support/Tickets.jsx';
import LiveChatPage from './pages/support/LiveChat.jsx';
import HelpCenterPage from './pages/support/HelpCenter.jsx';


// Placeholder pages for routing verification
const Placeholder = ({ title }) => (
  <div className="card p-8 text-center">
    <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
    <p className="text-slate-500 mt-2">This module is part of the upcoming implementation phases.</p>
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="finance" element={<FinancePage />} />
            <Route path="kyc" element={<KYCPage />} />
            <Route path="moderation" element={<ModerationPage />} />
            <Route path="support">
              <Route path="tickets" element={<TicketsPage />} />
              <Route path="live-chat" element={<LiveChatPage />} />
              <Route path="help-center" element={<HelpCenterPage />} />
            </Route>
            <Route path="reports" element={<ReportsPage />} />

            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
