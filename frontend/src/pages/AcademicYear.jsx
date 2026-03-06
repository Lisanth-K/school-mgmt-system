import React, { useState, useEffect } from 'react';
import { getAcademicYears, createAcademicYear, toggleYearStatus } from '../services/academicYearService';
import { Calendar, CheckCircle, Archive } from 'lucide-react';
import '../styles/AcademicYear.css';

const AcademicYear = () => {
    const [years, setYears] = useState([]);
    const [formData, setFormData] = useState({
        year_name: '', start_date: '', end_date: '', is_active: false
    });

    const fetchYears = async () => {
        const { data, error } = await getAcademicYears();
        if (error) console.error("Fetch Error:", error.message);
        else setYears(data || []);
    };

    useEffect(() => { fetchYears(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = await createAcademicYear(formData);
        if (error) {
            alert("Error: " + error.message);
        } else {
            alert("Academic Year Registered Successfully!");
            setFormData({ year_name: '', start_date: '', end_date: '', is_active: false });
            fetchYears();
        }
    };

    const handleToggle = async (id) => {
        if (window.confirm("Make this the active year? This will archive others.")) {
            const { error } = await toggleYearStatus(id);
            if (error) alert(error.message);
            else fetchYears();
        }
    };

    return (
        <div className="page-container">
            {/* Page Header */}
            <div className="page-header">
                <h1 className="page-title">Academic Year</h1>
            </div>

            {/* Form Card (Matches the "Professional Information" card style) */}
            <div className="theme-card">
                <div className="card-header">
                    <div>
                        <h2 className="card-title">Setup New Academic Year</h2>
                        <p className="card-subtitle">Define active periods and sessions for the system</p>
                    </div>
                </div>

                <div className="card-body">
                    <form onSubmit={handleSubmit} className="theme-form">
                        <div className="form-row">
                            <label>Year Name</label>
                            <input
                                type="text"
                                placeholder="e.g., 2025-2026"
                                value={formData.year_name}
                                onChange={(e) => setFormData({ ...formData, year_name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-grid">
                            <div className="form-row">
                                <label>Start Date</label>
                                <input
                                    type="date"
                                    value={formData.start_date}
                                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-row">
                                <label>End Date</label>
                                <input
                                    type="date"
                                    value={formData.end_date}
                                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="checkbox-row">
                            <input
                                type="checkbox"
                                id="isActive"
                                checked={formData.is_active}
                                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                            />
                            <label htmlFor="isActive">Set as Active Year</label>
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="theme-btn-primary">Register Year</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Table Card */}
            <div className="theme-card">
                <div className="card-header">
                    <div>
                        <h2 className="card-title">Configured Academic Years</h2>
                        <p className="card-subtitle">Manage and activate your academic sessions</p>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="theme-table">
                        <thead>
                            <tr>
                                <th>Academic Year</th>
                                <th>Duration</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {years.map((year) => (
                                <tr key={year.id}>
                                    <td className="fw-600 text-dark">{year.year_name}</td>
                                    <td>{year.start_date} to {year.end_date}</td>
                                    <td>
                                        {year.is_active ?
                                            <span className="badge badge-active"><CheckCircle size={14} /> Active</span> :
                                            <span className="badge badge-archived"><Archive size={14} /> Archived</span>
                                        }
                                    </td>
                                    <td>
                                        {!year.is_active &&
                                            <button onClick={() => handleToggle(year.id)} className="theme-btn-outline">
                                                Activate
                                            </button>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AcademicYear;