import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AcademicYear from './pages/AcademicYear';
import ClassManagement from './pages/ClassManagement';
import SectionManagement from './pages/SectionManagement';
import SubjectManagement from './pages/SubjectManagement';
import TeacherManagement from './pages/TeacherManagement';
import TeacherAssignment from './pages/TeacherAssignment';
import SyllabusManagement from './pages/SyllabusManagement';
import TermManagement from './pages/TermManagement';
import ExamManagement from './pages/ExamManagement'; // ✅ 1. Import Exam Management
import './App.css';

function App() {
  return (
    <Router>
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

            {/* Module 5: Teachers */}
            <Route path="/teacher-list" element={<TeacherManagement />} />

            {/* Module 6: Teacher Assignment */}
            <Route path="/teachers" element={<TeacherAssignment />} />

            {/* Module 7: Syllabus Management */}
            <Route path="/syllabus" element={<SyllabusManagement />} />

            {/* Module 8: Term Management */}
            <Route path="/terms" element={<TermManagement />} />

            {/* Module 9: Exam Management ✅ */}
            <Route path="/exams" element={<ExamManagement />} />

            {/* Catch all - Redirect to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;