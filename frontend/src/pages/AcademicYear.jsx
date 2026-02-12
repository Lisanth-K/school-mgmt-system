import React, { useState, useEffect } from 'react';
import { getAcademicYears, createAcademicYear } from '../services/api'; 
import { Calendar, PlusCircle, List } from 'lucide-react';
import '../styles/AcademicYear.css';

const AcademicYear = () => {
    const [years, setYears] = useState([]);
    const [formData, setFormData] = useState({
        year_name: '', start_date: '', end_date: '', is_active: false
    });

    const fetchYears = async () => {
        try {
            const res = await getAcademicYears();
            setYears(res.data);
        } catch (err) {
            console.error("Fetch error", err);
        }
    };

    useEffect(() => { fetchYears(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createAcademicYear(formData);
            alert("Academic Year Created!");
            setFormData({ year_name: '', start_date: '', end_date: '', is_active: false }); // Reset form
            fetchYears();
        } catch (err) { 
            alert("Error: " + (err.response?.data?.error || "Something went wrong")); 
        }
    };

    return (
        <div className="academic-container"> {/* Corrected class name */}
            <h1><Calendar size={28} color="#009ef7" /> Academic Year Management</h1>

            <div className="form-card">
                <h3><PlusCircle size={20} /> Add New Academic Year</h3>
                <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                    <div className="form-group">
                        <label>Year Name (e.g., 2025-2026)</label>
                        <input 
                            type="text" 
                            placeholder="Enter academic year"
                            value={formData.year_name}
                            onChange={(e) => setFormData({...formData, year_name: e.target.value})}
                            required 
                        />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div className="form-group">
                            <label>Start Date</label>
                            <input 
                                type="date" 
                                value={formData.start_date}
                                onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label>End Date</label>
                            <input 
                                type="date" 
                                value={formData.end_date}
                                onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                                required 
                            />
                        </div>
                    </div>
                    <button type="submit" className="submit-btn">Save Academic Year</button>
                </form>
            </div>

            <div className="table-container">
                <h3><List size={20} /> Academic Year List</h3>
                <table className="year-list" style={{ marginTop: '20px' }}>
                    <thead>
                        <tr>
                            <th>Year Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {years.map((year) => (
                            <tr key={year.id}>
                                <td><strong>{year.year_name}</strong></td>
                                <td>{new Date(year.start_date).toLocaleDateString()}</td>
                                <td>{new Date(year.end_date).toLocaleDateString()}</td>
                                <td>
                                    <span className="active-badge">Active</span>
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