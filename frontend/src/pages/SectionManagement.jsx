import React, { useState, useEffect } from 'react';
import { getSections, createSection } from '../services/sectionService';
import { getClasses } from '../services/classService';
import { supabase } from '../config/supabaseClient';
import { LayoutGrid, PlusCircle, UserCheck } from 'lucide-react';
import '../styles/SectionManagement.css';

const SectionManagement = () => {
    const [sections, setSections] = useState([]);
    const [classes, setClasses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [formData, setFormData] = useState({
        section_name: '', class_id: '', class_teacher_id: '', capacity: 40
    });

    const fetchData = async () => {
        try {
            const classRes = await getClasses();
            setClasses(classRes.data || []);
            
            // --- TEACHER FETCH FIX ---
            // 'name'-ku badhula 'full_name' select panrom
            const { data: teacherData, error: tError } = await supabase
                .from('teachers')
                .select('id, full_name');
            
            if (tError) console.error("Teacher Fetch Error:", tError.message);
            setTeachers(teacherData || []);

            const sectionRes = await getSections();
            setSections(sectionRes.data || []);
        } catch (err) {
            console.error("Error:", err.message);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createSection(formData);
            alert("Section created successfully!");
            setFormData({ section_name: '', class_id: '', class_teacher_id: '', capacity: 40 });
            fetchData();
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="section-container">
            <h1 className="section-header"><LayoutGrid size={28} color="#f6c23e" /> Section Management</h1>

            <div className="section-form-card">
                <h3><PlusCircle size={20} /> Divide Class into Sections</h3>
                <form onSubmit={handleSubmit} className="section-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Linked Class</label>
                            <select value={formData.class_id} onChange={(e) => setFormData({...formData, class_id: e.target.value})} required>
                                <option value="">-- Select Class --</option>
                                {classes.map(c => <option key={c.id} value={c.id}>{c.class_name}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Section Name</label>
                            <input type="text" placeholder="Ex: Section A" value={formData.section_name} onChange={(e) => setFormData({...formData, section_name: e.target.value})} required />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Assign Class Teacher</label>
                            <select value={formData.class_teacher_id} onChange={(e) => setFormData({...formData, class_teacher_id: e.target.value})} required>
                                <option value="">-- Select Teacher --</option>
                                {teachers.map(t => (
                                    <option key={t.id} value={t.id}>
                                        {t.full_name} {/* Change: using full_name */}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Student Capacity</label>
                            <input type="number" value={formData.capacity} onChange={(e) => setFormData({...formData, capacity: e.target.value})} />
                        </div>
                    </div>
                    <button type="submit" className="section-submit-btn">Create Section</button>
                </form>
            </div>

            <div className="section-table-section">
                <table className="section-table">
                    <thead>
                        <tr>
                            <th>Class</th>
                            <th>Section</th>
                            <th>Class Teacher</th>
                            <th>Capacity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sections.map((s) => (
                            <tr key={s.id}>
                                <td>{s.classes?.class_name}</td>
                                <td><span className="section-badge">{s.section_name}</span></td>
                                {/* Change: s.teachers?.full_name */}
                                <td><UserCheck size={14} /> {s.teachers?.full_name || 'Not Assigned'}</td>
                                <td>{s.capacity} Students</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SectionManagement;