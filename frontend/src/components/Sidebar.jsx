import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Calendar, BookOpen, Users, Layers, GraduationCap, ClipboardList, Book, Settings, LogOut, User } from 'lucide-react';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const menuItems = [
    { name: 'Academic Year', path: '/', icon: <Calendar size={20} /> },
    { name: 'Class Management', path: '/classes', icon: <Layers size={20} /> },
    { name: 'Sections', path: '/sections', icon: <Users size={20} /> },
    { name: 'Subjects', path: '/subjects', icon: <BookOpen size={20} /> },
    { name: 'Teachers', path: '/teacher-list', icon: <User size={20} /> },
    { name: 'Teacher Assignment', path: '/teachers', icon: <GraduationCap size={20} /> },
    { name: 'Syllabus', path: '/syllabus', icon: <Book size={20} /> },
    { name: 'Terms', path: '/terms', icon: <ClipboardList size={20} /> },
    { name: 'Exams', path: '/exams', icon: <Settings size={20} /> },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>SMS Admin</h2>
      </div>

      {/* --- Admin Profile Section --- */}
      <div className="sidebar-profile">
        <div className="profile-icon">
          <User size={24} color="#7239ea" />
        </div>
        <div className="profile-info">
          <span className="admin-name">Lisanth K</span>
          <span className="admin-role">Super Admin</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link 
            key={item.name} 
            to={item.path} 
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}

        {/* Logout Button at Bottom */}
        <button onClick={handleLogout} className="nav-item logout-btn">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;