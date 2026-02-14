import React, { useState, useEffect } from 'react';
// Module-wise services-ah import pannunga
import { getClasses, createClass } from '../services/classService';
import { getAcademicYears } from '../services/academicYearService';
import { BookOpen, PlusCircle, LayoutGrid } from 'lucide-react';
import '../styles/ClassManagement.css'; 

const ClassManagement = () => {
    const [classes, setClasses] = useState([]);
    const [years, setYears] = useState([]); 
    const [formData, setFormData] = useState({
        class_name: '', edu_level: 'Primary', academic_year_id: '', room_number: ''
    });

    const fetchData = async () => {
        try {
            // Direct Supabase calls via services
            const classRes = await getClasses();
            const yearRes = await getAcademicYears();
            
            setClasses(classRes.data || []);
            
            // is_active true-ah irukura years-ah mattum filter pannuvom
            const activeYears = yearRes.data.filter(y => y.is_active === true);
            setYears(activeYears); 

        } catch (err) { 
            console.error("Fetch Error:", err.message); 
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createClass(formData);
            alert("Class Added Successfully!");
            setFormData({ class_name: '', edu_level: 'Primary', academic_year_id: '', room_number: '' });
            fetchData();
        } catch (err) { 
            alert("Error: " + err.message); 
        }
    };

    return (
        <div className="class-container">
            <h1 className="class-header"><BookOpen size={28} color="#7239ea" /> Class Management</h1>

            <div className="class-form-card">
                <h3><PlusCircle size={20} /> Add New Class</h3>
                <form onSubmit={handleSubmit} style={{marginTop: '20px'}}>
                    <div className="class-group">
                        <label>Class Name (e.g., Grade 10)</label>
                        <input className="class-input" type="text" value={formData.class_name} 
                            onChange={(e) => setFormData({...formData, class_name: e.target.value})} 
                            required placeholder="Enter Class Name" />
                    </div>

                    <div className="class-grid">
                        <div className="class-group">
                            <label>Education Level</label>
                            <select className="class-select" value={formData.edu_level} 
                                onChange={(e) => setFormData({...formData, edu_level: e.target.value})}>
                                <option value="Primary">Primary</option>
                                <option value="Secondary">Secondary</option>
                                <option value="Higher Secondary">Higher Secondary</option>
                            </select>
                        </div>
                        <div className="class-group">
                            <label>Academic Year</label>
                            <select className="class-select" value={formData.academic_year_id} 
                                onChange={(e) => setFormData({...formData, academic_year_id: e.target.value})} required>
                                <option value="">Select Year</option>
                                {years.map(y => (
                                    <option key={y.id} value={y.id}>{y.year_name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="class-group">
                        <label>Room Number (Optional)</label>
                        <input className="class-input" type="text" value={formData.room_number} 
                            onChange={(e) => setFormData({...formData, room_number: e.target.value})} placeholder="Ex: Room 101" />
                    </div>

                    <button type="submit" className="class-submit-btn">Create Class</button>
                </form>
            </div>

            <div className="class-table-section">
                <h3 style={{color: '#181c32', marginBottom: '15px'}}><LayoutGrid size={20} /> Class List</h3>
                <table className="class-table">
                    <thead>
                        <tr>
                            <th>Class Name</th>
                            <th>Edu Level</th>
                            <th>Academic Year</th>
                            <th>Room</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.length > 0 ? classes.map((c) => (
                            <tr key={c.id}>
                                <td><strong>{c.class_name}</strong></td>
                                <td>{c.edu_level}</td>
                                <td><span className="year-badge">{c.academic_years?.year_name}</span></td>
                                <td>{c.room_number || '-'}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" style={{textAlign: 'center'}}>No classes found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClassManagement;