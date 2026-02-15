import React, { useState, useEffect } from 'react';
import { Calendar, PlusCircle, Trash2, LayoutGrid, Loader2 } from 'lucide-react';
import { getAllTerms, createTerm, deleteTerm } from '../services/termService';
import { supabase } from '../config/supabaseClient';
import '../styles/TermManagement.css';

const TermManagement = () => {
    const [terms, setTerms] = useState([]);
    const [academicYears, setAcademicYears] = useState([]);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        term_name: '',
        academic_year_id: '',
        start_date: '',
        end_date: ''
    });

    const loadInitialData = async () => {
        setLoading(true);
        try {
            // Dropdown-kaga Academic Years fetch pannuvom
            const { data: years } = await supabase.from('academic_years').select('*').order('year_name');
            setAcademicYears(years || []);
            
            // Terms fetch pannuvom
            const termData = await getAllTerms();
            setTerms(termData || []);
        } catch (err) {
            console.error("Load Error:", err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadInitialData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setActionLoading(true);
        try {
            await createTerm(formData);
            alert("Term Added!");
            setFormData({ term_name: '', academic_year_id: '', start_date: '', end_date: '' });
            loadInitialData(); // Refresh the list
        } catch (err) {
            alert("Error: " + err.message);
        } finally {
            setActionLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete panna nichayam dhaanay?")) return;
        try {
            await deleteTerm(id);
            setTerms(terms.filter(t => t.id !== id));
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="term-container">
            <header className="term-header">
                <Calendar size={32} color="#2563eb" />
                <h1>Term Management</h1>
            </header>

            <div className="term-main-grid">
                {/* Form Section */}
                <aside className="term-sidebar">
                    <div className="term-form-card">
                        <h3><PlusCircle size={20} /> New Academic Term</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="t-form-group">
                                <label>Term Name</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Term 1, Mid-Term"
                                    value={formData.term_name}
                                    onChange={(e) => setFormData({...formData, term_name: e.target.value})}
                                    required 
                                />
                            </div>

                            <div className="t-form-group">
                                <label>Academic Year</label>
                                <select 
                                    value={formData.academic_year_id}
                                    onChange={(e) => setFormData({...formData, academic_year_id: e.target.value})}
                                    required
                                >
                                    <option value="">-- Select Year --</option>
                                    {academicYears.map(year => (
                                        <option key={year.id} value={year.id}>{year.year_name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="date-row">
                                <div className="t-form-group">
                                    <label>Start Date</label>
                                    <input 
                                        type="date" 
                                        value={formData.start_date}
                                        onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                                        required 
                                    />
                                </div>
                                <div className="t-form-group">
                                    <label>End Date</label>
                                    <input 
                                        type="date" 
                                        value={formData.end_date}
                                        onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                                        required 
                                    />
                                </div>
                            </div>

                            <button type="submit" className="t-submit-btn" disabled={actionLoading}>
                                {actionLoading ? <Loader2 className="spinner" /> : "Create Term"}
                            </button>
                        </form>
                    </div>
                </aside>

                {/* List Section */}
                <main className="term-content">
                    <div className="t-list-header">
                        <LayoutGrid size={20} />
                        <h3>Existing Terms</h3>
                    </div>

                    {loading ? (
                        <div className="t-loading-state">Fetching terms...</div>
                    ) : (
                        <div className="term-list">
                            {terms.length > 0 ? terms.map((term) => (
                                <div key={term.id} className="term-card-item">
                                    <div className="term-meta">
                                        <span className="t-badge">{term.academic_years?.year_name}</span>
                                        <h4>{term.term_name}</h4>
                                        <p>{term.start_date} — {term.end_date}</p>
                                    </div>
                                    <button onClick={() => handleDelete(term.id)} className="t-delete-btn">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            )) : (
                                <div className="t-empty-state">No terms added yet.</div>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default TermManagement;