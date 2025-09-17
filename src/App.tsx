import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import LandingPage from './pages/LandingPage';
import MonitorView from './pages/MonitorView';
import AdminArea from './pages/AdminArea';
import ParentApp from './pages/ParentApp';
import ViewDashboard from './pages/ViewDashboard';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/monitor" element={<MonitorView />} />
            <Route path="/admin" element={<AdminArea />} />
            <Route path="/parent" element={<ParentApp />} />
            <Route path="/viewdashboard" element={<ViewDashboard />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
