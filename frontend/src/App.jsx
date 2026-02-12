import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AcademicYear from './pages/AcademicYear';
import Login from './pages/Login'; // Pudhu Login page
import './App.css';

function App() {
  // LocalStorage-la irundhu authentication status-ah check pannuvom
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <Router>
      <Routes>
        {/* Public Route: Login page-ku sidebar thevai illai */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes: Login panni irundha mattum layout kaatuvom */}
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <div className="main-layout">
                <Sidebar />
                <div className="main-content">
                  <Routes>
                    <Route path="/" element={<AcademicYear />} />
                    {/* Module 2: Class Management Route-ah inge add pannalam */}
                    <Route path="/classes" element={<div className="content"><h2>Class Management Module</h2></div>} />
                    
                    {/* Mattha routes-ku placeholder */}
                    <Route path="/sections" element={<div>Section Management</div>} />
                    <Route path="/subjects" element={<div>Subject Management</div>} />
                  </Routes>
                </div>
              </div>
            ) : (
              // Login pannala na automatic-ah login page-ku redirect aagum
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;