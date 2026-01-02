import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import LivePage from './pages/LivePage';
import MatchesPage from './pages/MatchesPage';
import AdminDashboard from './pages/AdminDashboard';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-slate-50">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/live" element={<LivePage />} />
                    <Route path="/matches" element={<MatchesPage />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
