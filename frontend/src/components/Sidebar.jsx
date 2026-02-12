import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, BookOpen, Users, Layers, GraduationCap, ClipboardList, Book, Settings } from 'lucide-react';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { name: 'Academic Year', path: '/', icon: <Calendar size={20} /> },
    { name: 'Class Management', path: '/classes', icon: <Layers size={20} /> },
    { name: 'Sections', path: '/sections', icon: <Users size={20} /> },
    { name: 'Subjects', path: '/subjects', icon: <BookOpen size={20} /> },
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
      </nav>
    </div>
  );
};

export default Sidebar;