import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient';
import { UserPlus, Mail, Hash, Users } from 'lucide-react';
import '../styles/TeacherManagement.css';

const TeacherManagement = () => {
    const [teachers, setTeachers] = useState([]);
    const [formData, setFormData] = useState({
        full_name: '',
        employee_id: '',
        email: ''
    });

    const fetchTeachers = async () => {
        const { data, error } = await supabase.from('teachers').select('*').order('created_at', { ascending: false });
        if (!error) setTeachers(data);
    };

    useEffect(() => { fetchTeachers(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { error } = await supabase.from('teachers').insert([formData]);
            if (error) throw error;
            alert("Teacher Registered Successfully!");
            setFormData({ full_name: '', employee_id: '', email: '' });
            fetchTeachers();
        } catch (err) { alert(err.message); }
    };

    return (
        <div className="teacher-container">
            <h1 className="teacher-header"><Users size={28} color="#009ef7" /> Teacher Management</h1>

            <div className="teacher-form-card">
                <h3><UserPlus size={20} /> Register New Teacher</h3>
                <form onSubmit={handleSubmit} className="teacher-form">
                    <div className="teacher-grid">
                        <div className="teacher-group">
                            <label>Full Name</label>
                            <input type="text" placeholder="Ex: Mr. Rajkumar" value={formData.full_name} 
                                onChange={(e) => setFormData({...formData, full_name: e.target.value})} required />
                        </div>
                        <div className="teacher-group">
                            <label>Employee ID</label>
                            <input type="text" placeholder="Ex: TCH001" value={formData.employee_id} 
                                onChange={(e) => setFormData({...formData, employee_id: e.target.value})} required />
                        </div>
                    </div>
                    <div className="teacher-group">
                        <label>Email Address</label>
                        <input type="email" placeholder="teacher@school.com" value={formData.email} 
                            onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                    </div>
                    <button type="submit" className="teacher-submit-btn">Register Teacher</button>
                </form>
            </div>

            <div className="teacher-table-section">
                <table className="teacher-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Emp ID</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map((t) => (
                            <tr key={t.id}>
                                <td className="teacher-name-cell">{t.full_name}</td>
                                <td>{t.employee_id}</td>
                                <td>{t.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeacherManagement;