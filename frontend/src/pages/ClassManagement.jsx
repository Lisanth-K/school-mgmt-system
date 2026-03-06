import React, { useState, useEffect } from 'react';
import { BookOpen, PlusCircle, LayoutGrid } from 'lucide-react';
import '../styles/ClassManagement.css';

const ClassManagement = () => {
    // Dummy Data for UI demonstration
    const dummyYears = [
        { id: 'y1', year_name: '2024-2025' },
        { id: 'y2', year_name: '2025-2026' }
    ];

    const initialClasses = [
        { id: 1, class_name: 'Grade 10 - A', edu_level: 'Secondary', academic_years: { year_name: '2024-2025' }, room_number: 'Room 101' },
        { id: 2, class_name: 'Grade 12 - Sci', edu_level: 'Higher Secondary', academic_years: { year_name: '2024-2025' }, room_number: 'Lab 2' }
    ];

    const [classes, setClasses] = useState(initialClasses);
    const [years, setYears] = useState(dummyYears);
    const [formData, setFormData] = useState({
        class_name: '', edu_level: 'Primary', academic_year_id: '', room_number: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Frontend-only logic to simulate adding a class to the UI
        const selectedYear = years.find(y => y.id === formData.academic_year_id);
        const newClass = {
            id: Date.now(),
            class_name: formData.class_name,
            edu_level: formData.edu_level,
            academic_years: { year_name: selectedYear ? selectedYear.year_name : 'Unknown' },
            room_number: formData.room_number
        };

        setClasses([...classes, newClass]);
        setFormData({ class_name: '', edu_level: 'Primary', academic_year_id: '', room_number: '' });
    };

    return (
        <div className="page-container">
            {/* Page Header */}
            <div className="page-header">
                <h1 className="page-title">Class Management</h1>
            </div>

            {/* Form Card */}
            <div className="theme-card">
                <div className="card-header">
                    <div>
                        <h2 className="card-title">Add New Class</h2>
                        <p className="card-subtitle">Create a new class and assign an academic year</p>
                    </div>
                </div>

                <div className="card-body">
                    <form onSubmit={handleSubmit} className="theme-form">
                        <div className="form-row">
                            <label>Class Name (e.g., Grade 10)</label>
                            <input
                                type="text"
                                value={formData.class_name}
                                onChange={(e) => setFormData({ ...formData, class_name: e.target.value })}
                                required
                                placeholder="Enter Class Name"
                            />
                        </div>

                        <div className="form-grid">
                            <div className="form-row">
                                <label>Education Level</label>
                                <select
                                    value={formData.edu_level}
                                    onChange={(e) => setFormData({ ...formData, edu_level: e.target.value })}
                                >
                                    <option value="Primary">Primary</option>
                                    <option value="Secondary">Secondary</option>
                                    <option value="Higher Secondary">Higher Secondary</option>
                                </select>
                            </div>
                            <div className="form-row">
                                <label>Academic Year</label>
                                <select
                                    value={formData.academic_year_id}
                                    onChange={(e) => setFormData({ ...formData, academic_year_id: e.target.value })}
                                    required
                                >
                                    <option value="" disabled>Select Year</option>
                                    {years.map(y => (
                                        <option key={y.id} value={y.id}>{y.year_name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-row" style={{ marginBottom: '30px' }}>
                            <label>Room Number (Optional)</label>
                            <input
                                type="text"
                                value={formData.room_number}
                                onChange={(e) => setFormData({ ...formData, room_number: e.target.value })}
                                placeholder="Ex: Room 101"
                            />
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="theme-btn-primary">Create Class</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Table Card */}
            <div className="theme-card">
                <div className="card-header">
                    <div>
                        <h2 className="card-title">Class List</h2>
                        <p className="card-subtitle">Overview of all active classes in the system</p>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="theme-table">
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
                                    <td className="fw-600 text-dark">{c.class_name}</td>
                                    <td>{c.edu_level}</td>
                                    <td>
                                        <span className="badge badge-light">{c.academic_years?.year_name}</span>
                                    </td>
                                    <td>{c.room_number || '-'}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center', padding: '30px', color: '#a1a5b7' }}>
                                        No classes found.
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

export default ClassManagement;