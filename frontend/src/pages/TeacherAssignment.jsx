import React, { useState, useEffect } from 'react';
import { getAssignments, createAssignment } from '../services/assignmentService';
import { supabase } from '../config/supabaseClient';
import { GraduationCap, PlusCircle, Award } from 'lucide-react';
import '../styles/TeacherAssignment.css'; 

const TeacherAssignment = () => {
    const [assignments, setAssignments] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [sections, setSections] = useState([]);
    const [years, setYears] = useState([]);
    
    const [formData, setFormData] = useState({
        teacher_id: '', subject_id: '', section_id: '', academic_year_id: ''
    });

    const fetchData = async () => {
        try {
            // Fetch Teachers
            const { data: t } = await supabase.from('teachers').select('id, full_name');
            // Fetch Subjects
            const { data: s } = await supabase.from('subjects').select('id, subject_name');
            // Fetch Sections with Class Join (Fixing the fetch issue here)
            const { data: sec, error: secError } = await supabase
                .from('sections')
                .select(`
                    id, 
                    section_name, 
                    classes:class_id (class_name)
                `); 
            
            if (secError) throw secError;

            // Fetch Academic Years
            const { data: y } = await supabase.from('academic_years').select('id, year_name');

            setTeachers(t || []);
            setSubjects(s || []);
            setSections(sec || []);
            setYears(y || []);

            const res = await getAssignments();
            setAssignments(res.data || []);
        } catch (err) { 
            console.error("Fetch Error:", err.message); 
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createAssignment(formData);
            alert("Teacher Assigned Successfully!");
            setFormData({ teacher_id: '', subject_id: '', section_id: '', academic_year_id: '' });
            fetchData();
        } catch (err) { 
            alert("Error: " + err.message); 
        }
    };

    return (
        <div className="assignment-container">
            <h1 className="assignment-header"><GraduationCap size={28} color="#7239ea" /> Teacher Assignment</h1>

            <div className="assignment-card">
                <h3><PlusCircle size={20} /> Assign Subject Teacher</h3>
                <form onSubmit={handleSubmit} className="assignment-form">
                    <div className="assignment-grid">
                        <div className="assignment-group">
                            <label>Select Teacher</label>
                            <select className="assignment-select" value={formData.teacher_id} onChange={(e) => setFormData({...formData, teacher_id: e.target.value})} required>
                                <option value="">-- Choose Teacher --</option>
                                {teachers.map(t => <option key={t.id} value={t.id}>{t.full_name}</option>)}
                            </select>
                        </div>
                        <div className="assignment-group">
                            <label>Academic Year</label>
                            <select className="assignment-select" value={formData.academic_year_id} onChange={(e) => setFormData({...formData, academic_year_id: e.target.value})} required>
                                <option value="">-- Choose Year --</option>
                                {years.map(y => <option key={y.id} value={y.id}>{y.year_name}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="assignment-grid">
                        <div className="assignment-group">
                            <label>Section (Class)</label>
                            <select className="assignment-select" value={formData.section_id} onChange={(e) => setFormData({...formData, section_id: e.target.value})} required>
                                <option value="">-- Choose Section --</option>
                                {sections.map(sec => (
                                    <option key={sec.id} value={sec.id}>
                                        {(sec.classes?.class_name || "Unknown Class")} - {sec.section_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="assignment-group">
                            <label>Subject</label>
                            <select className="assignment-select" value={formData.subject_id} onChange={(e) => setFormData({...formData, subject_id: e.target.value})} required>
                                <option value="">-- Choose Subject --</option>
                                {subjects.map(sub => <option key={sub.id} value={sub.id}>{sub.subject_name}</option>)}
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="assignment-btn">Link Teacher to Subject</button>
                </form>
            </div>

            <div className="assignment-table-section">
                <h3>Current Assignments</h3>
                <table className="assignment-table">
                    <thead>
                        <tr>
                            <th>Teacher Name</th>
                            <th>Class & Section</th>
                            <th>Subject</th>
                            <th>Academic Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignments.length > 0 ? assignments.map((a) => (
                            <tr key={a.id}>
                                <td><strong>{a.teachers?.full_name}</strong></td>
                                <td>{a.sections?.classes?.class_name} - {a.sections?.section_name}</td>
                                <td><span className="badge-subject">{a.subjects?.subject_name}</span></td>
                                <td>{a.academic_years?.year_name}</td>
                            </tr>
                        )) : (
                            <tr><td colSpan="4" style={{textAlign: 'center'}}>No assignments found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeacherAssignment;