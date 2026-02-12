import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AcademicYear.css';

const AcademicYear = () => {
    const [years, setYears] = useState([]);
    const [formData, setFormData] = useState({
        year_name: '', start_date: '', end_date: '', is_active: false
    });

    const fetchYears = async () => {
        const res = await axios.get('http://localhost:5000/api/academic-years');
        setYears(res.data);
    };

    useEffect(() => { fetchYears(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/academic-years', formData);
            alert("Academic Year Created!");
            fetchYears();
        } catch (err) { alert("Error: " + err.response.data.error); }
    };

    return (
        <div className="container">
            <h1>📅 Academic Year Management</h1>
            <div className="form-card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Year Name (e.g., 2025-2026)</label>
                        <input type="text" required onChange={e => setFormData({...formData, year_name: e.target.value})} />
                    </div>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <div className="form-group" style={{flex: 1}}>
                            <label>Start Date</label>
                            <input type="date" required onChange={e => setFormData({...formData, start_date: e.target.value})} />
                        </div>
                        <div className="form-group" style={{flex: 1}}>
                            <label>End Date</label>
                            <input type="date" required onChange={e => setFormData({...formData, end_date: e.target.value})} />
                        </div>
                    </div>
                    <div className="checkbox-group">
                        <input type="checkbox" id="active" onChange={e => setFormData({...formData, is_active: e.target.checked})} />
                        <label htmlFor="active">Set as Active Year</label>
                    </div>
                    <button className="submit-btn">Create Year</button>
                </form>
            </div>

            <table className="year-list">
                <thead>
                    <tr><th>Year</th><th>Duration</th><th>Status</th></tr>
                </thead>
                <tbody>
                    {years.map(y => (
                        <tr key={y.id}>
                            <td>{y.year_name}</td>
                            <td>{y.start_date} to {y.end_date}</td>
                            <td>{y.is_active ? <span className="active-badge">Active</span> : "Archived"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AcademicYear;