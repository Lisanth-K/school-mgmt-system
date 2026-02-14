import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AcademicYear from './pages/AcademicYear';
import ClassManagement from './pages/ClassManagement';
import SectionManagement from './pages/SectionManagement';
import SubjectManagement from './pages/SubjectManagement';
import TeacherManagement from './pages/TeacherManagement'; 
import TeacherAssignment from './pages/TeacherAssignment'; 
import Login from './pages/Login';
import './App.css';

function App() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <div className="main-layout">
                <Sidebar />
                <div className="main-content">
                  <Routes>
                    {/* Module 1: Academic Year */}
                    <Route path="/" element={<AcademicYear />} />
                    <Route path="/academic-year" element={<AcademicYear />} />
                    
                    {/* Module 2: Classes */}
                    <Route path="/classes" element={<ClassManagement />} />
                    
                    {/* Module 3: Sections */}
                    <Route path="/sections" element={<SectionManagement />} />

                    {/* Module 4: Subjects */}
                    <Route path="/subjects" element={<SubjectManagement />} />
                    
                    {/* Module 5: Teachers (Registration & List) */}
                    {/* Sidebar-la "Teachers" click panna intha route trigger aagum */}
                    <Route path="/teacher-list" element={<TeacherManagement />} />

                    {/* Module 6: Teacher Assignment (Subject Linking) */}
                    {/* Sidebar-la "Teacher Assignment" click panna intha route trigger aagum */}
                    <Route path="/teachers" element={<TeacherAssignment />} />
                    
                    {/* Future Modules */}
                    <Route path="/syllabus" element={<div style={{padding: '20px'}}>Syllabus Coming Soon...</div>} />
                    <Route path="/terms" element={<div style={{padding: '20px'}}>Terms Coming Soon...</div>} />
                    <Route path="/exams" element={<div style={{padding: '20px'}}>Exams Coming Soon...</div>} />
                    
                    {/* Catch all - Redirect to Home */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </div>
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;