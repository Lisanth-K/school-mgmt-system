import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AcademicYear from './pages/AcademicYear';
import './App.css';

// Placeholder for other modules
const Placeholder = ({ name }) => <div className="content"><h2>{name} Module Coming Soon...</h2></div>;

function App() {
  return (
    <Router>
      <div className="main-layout">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<AcademicYear />} />
            <Route path="/classes" element={<Placeholder name="Class Management" />} />
            <Route path="/sections" element={<Placeholder name="Section Management" />} />
            <Route path="/subjects" element={<Placeholder name="Subject Management" />} />
            <Route path="/teachers" element={<Placeholder name="Teacher Assignment" />} />
            <Route path="/syllabus" element={<Placeholder name="Syllabus Management" />} />
            <Route path="/terms" element={<Placeholder name="Term Management" />} />
            <Route path="/exams" element={<Placeholder name="Exam Management" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;