import React, { useState, useEffect } from 'react';
import { getAcademicYears, createAcademicYear, toggleYearStatus } from '../services/academicYearService';
import { Calendar, PlusCircle, CheckCircle, Archive } from 'lucide-react';
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
        if(window.confirm("Make this the active year? This will archive others.")) {
            const { error } = await toggleYearStatus(id);
            if (error) alert(error.message);
            else fetchYears();
        }
    };

    return (
        <div className="academic-container">
            <h1 className="academic-header"><Calendar size={28} color="#009ef7" /> Academic Year Management</h1>

            <div className="form-card">
                <h3><PlusCircle size={20} /> New Setup</h3>
                <form onSubmit={handleSubmit} style={{marginTop: '20px'}}>
                    <div className="form-group">
                        <label>Year Name</label>
                        <input type="text" placeholder="e.g., 2025-2026" value={formData.year_name} 
                            onChange={(e) => setFormData({...formData, year_name: e.target.value})} required />
                    </div>
                    <div className="grid-2">
                        <div className="form-group">
                            <label>Start Date</label>
                            <input type="date" value={formData.start_date} 
                                onChange={(e) => setFormData({...formData, start_date: e.target.value})} required />
                        </div>
                        <div className="form-group">
                            <label>End Date</label>
                            <input type="date" value={formData.end_date} 
                                onChange={(e) => setFormData({...formData, end_date: e.target.value})} required />
                        </div>
                    </div>
                    <div className="form-group checkbox-group" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <input type="checkbox" id="isActive" checked={formData.is_active} 
                            onChange={(e) => setFormData({...formData, is_active: e.target.checked})} />
                        <label htmlFor="isActive" style={{margin: 0}}>Set as Active Year</label>
                    </div>
                    <button type="submit" className="submit-btn">Register Year</button>
                </form>
            </div>

            <div className="table-container">
                <table className="year-list">
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
                            <tr key={year.id} className={year.is_active ? 'active-row' : ''}>
                                <td><strong>{year.year_name}</strong></td>
                                <td>{year.start_date} to {year.end_date}</td>
                                <td>
                                    {year.is_active ? 
                                        <span className="badge active"><CheckCircle size={12}/> Active</span> : 
                                        <span className="badge archived"><Archive size={12}/> Archived</span>
                                    }
                                </td>
                                <td>
                                    {!year.is_active && 
                                        <button onClick={() => handleToggle(year.id)} className="activate-btn">Activate</button>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AcademicYear;