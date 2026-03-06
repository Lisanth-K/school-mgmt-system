import React, { useState } from 'react';
import { UserPlus, Users, Hash, Mail } from 'lucide-react';
import '../styles/TeacherManagement.css';

const TeacherManagement = () => {
    // Dummy Data for UI demonstration
    const initialTeachers = [
        { id: 1, full_name: 'Mr. Rajkumar', employee_id: 'TCH001', email: 'rajkumar@school.edu' },
        { id: 2, full_name: 'Ms. Anita Desai', employee_id: 'TCH002', email: 'adesai@school.edu' },
        { id: 3, full_name: 'Dr. Subramanian', employee_id: 'TCH003', email: 'subra.math@school.edu' }
    ];

    const [teachers, setTeachers] = useState(initialTeachers);
    const [formData, setFormData] = useState({
        full_name: '',
        employee_id: '',
        email: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTeacher = {
            id: Date.now(),
            full_name: formData.full_name,
            employee_id: formData.employee_id,
            email: formData.email
        };

        // Add to top of the list to simulate successful insert
        setTeachers([newTeacher, ...teachers]);
        setFormData({ full_name: '', employee_id: '', email: '' });
    };

    return (
        <div className="page-container">
            {/* Page Header */}
            <div className="page-header">
                <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Users size={28} color="#1d395e" />
                    Teacher Management
                </h1>
            </div>

            {/* Registration Form Card */}
            <div className="theme-card">
                <div className="card-header">
                    <div>
                        <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <UserPlus size={18} color="#1d395e" /> Register New Teacher
                        </h2>
                        <p className="card-subtitle">Add a new faculty member to the system</p>
                    </div>
                </div>

                <div className="card-body">
                    <form onSubmit={handleSubmit} className="theme-form">
                        <div className="form-grid">
                            <div className="form-row">
                                <label>Full Name</label>
                                <div className="input-with-icon">
                                    <input
                                        type="text"
                                        placeholder="Ex: Mr. Rajkumar"
                                        value={formData.full_name}
                                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <label>Employee ID</label>
                                <div className="input-with-icon">
                                    <Hash size={16} className="field-icon" />
                                    <input
                                        type="text"
                                        placeholder="Ex: TCH001"
                                        value={formData.employee_id}
                                        onChange={(e) => setFormData({ ...formData, employee_id: e.target.value })}
                                        required
                                        style={{ paddingLeft: '38px' }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-row" style={{ maxWidth: '440px' }}>
                            <label>Email Address</label>
                            <div className="input-with-icon">
                                <Mail size={16} className="field-icon" />
                                <input
                                    type="email"
                                    placeholder="teacher@school.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    style={{ paddingLeft: '38px' }}
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="theme-btn-primary">Register Teacher</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Teacher Directory Table */}
            <div className="theme-card">
                <div className="card-header">
                    <div>
                        <h2 className="card-title">Staff Directory</h2>
                        <p className="card-subtitle">List of all registered teachers</p>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="theme-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Emp ID</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachers.length > 0 ? teachers.map((t) => (
                                <tr key={t.id}>
                                    <td className="fw-600 text-dark">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div className="avatar-circle">
                                                {t.full_name.charAt(0).toUpperCase()}
                                            </div>
                                            {t.full_name}
                                        </div>
                                    </td>
                                    <td>
                                        <span className="badge-empid">{t.employee_id}</span>
                                    </td>
                                    <td className="text-muted">{t.email}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="3" style={{ textAlign: 'center', padding: '30px', color: '#a1a5b7' }}>
                                        No teachers registered yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TeacherManagement;