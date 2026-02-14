import React, { useState, useEffect } from 'react';
import { getSubjects, createSubject } from '../services/subjectService';
import { getClasses } from '../services/classService';
import { BookOpen, PlusCircle, Award } from 'lucide-react';
import '../styles/SubjectManagement.css'; 

const SubjectManagement = () => {
    const [subjects, setSubjects] = useState([]);
    const [classes, setClasses] = useState([]);
    const [formData, setFormData] = useState({
        subject_name: '',
        subject_code: '',
        class_id: '',
        subject_type: 'Theory',
        max_marks: 100
    });

    const fetchData = async () => {
        try {
            const classRes = await getClasses();
            setClasses(classRes.data || []);
            const subjectRes = await getSubjects();
            setSubjects(subjectRes.data || []);
        } catch (err) {
            console.error("Fetch Error:", err.message);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createSubject(formData);
            alert("Subject Added Successfully!");
            setFormData({ subject_name: '', subject_code: '', class_id: '', subject_type: 'Theory', max_marks: 100 });
            fetchData();
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    return (
        <div className="subject-container">
            <h1 className="subject-header"><BookOpen size={28} color="#009ef7" /> Subject Management</h1>

            <div className="subject-form-card">
                <h3><PlusCircle size={20} /> Add New Subject</h3>
                <form onSubmit={handleSubmit} className="subject-form">
                    <div className="subject-grid">
                        <div className="subject-group">
                            <label>Subject Name</label>
                            <input type="text" value={formData.subject_name} placeholder="Ex: Mathematics"
                                onChange={(e) => setFormData({...formData, subject_name: e.target.value})} required />
                        </div>
                        <div className="subject-group">
                            <label>Subject Code</label>
                            <input type="text" value={formData.subject_code} placeholder="Ex: MATH101"
                                onChange={(e) => setFormData({...formData, subject_code: e.target.value})} required />
                        </div>
                    </div>

                    <div className="subject-grid">
                        <div className="subject-group">
                            <label>Linked Class</label>
                            <select value={formData.class_id} onChange={(e) => setFormData({...formData, class_id: e.target.value})} required>
                                <option value="">-- Select Class --</option>
                                {classes.map(c => <option key={c.id} value={c.id}>{c.class_name}</option>)}
                            </select>
                        </div>
                        <div className="subject-group">
                            <label>Subject Type</label>
                            <select value={formData.subject_type} onChange={(e) => setFormData({...formData, subject_type: e.target.value})}>
                                <option value="Theory">Theory</option>
                                <option value="Practical">Practical</option>
                                <option value="Both">Both</option>
                            </select>
                        </div>
                    </div>

                    <div className="subject-group">
                        <label>Maximum Marks</label>
                        <input type="number" value={formData.max_marks} 
                            onChange={(e) => setFormData({...formData, max_marks: e.target.value})} required />
                    </div>

                    <button type="submit" className="subject-submit-btn">Create Subject</button>
                </form>
            </div>

            <div className="subject-table-section">
                <h3>Subject List</h3>
                <table className="subject-table">
                    <thead>
                        <tr>
                            <th>Subject & Code</th>
                            <th>Class</th>
                            <th>Type</th>
                            <th>Max Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.length > 0 ? subjects.map((s) => (
                            <tr key={s.id}>
                                <td>
                                    <div className="subj-info">
                                        <span className="subj-name">{s.subject_name}</span>
                                        <span className="subj-code">Code: {s.subject_code}</span>
                                    </div>
                                </td>
                                {/* Added direct color style for extra safety */}
                                <td style={{color: '#181c32'}}>{s.classes?.class_name || "N/A"}</td>
                                <td><span className={`type-badge ${s.subject_type.toLowerCase()}`}>{s.subject_type}</span></td>
                                <td style={{color: '#181c32'}}><strong>{s.max_marks}</strong></td>
                            </tr>
                        )) : (
                            <tr><td colSpan="4" style={{textAlign: 'center', color: '#181c32'}}>No subjects found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SubjectManagement;