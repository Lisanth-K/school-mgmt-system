import React, { useState, useEffect } from 'react';
import { Calendar, PlusCircle, Trash2, LayoutGrid, Loader2 } from 'lucide-react';
import '../styles/TermManagement.css';

const TermManagement = () => {
    // Dummy Data for UI demonstration
    const dummyYears = [
        { id: 'y1', year_name: '2025-2026' },
        { id: 'y2', year_name: '2026-2027' }
    ];

    const initialTerms = [
        {
            id: 1,
            term_name: 'Term 1 (Fall Semester)',
            start_date: '2025-06-01',
            end_date: '2025-11-30',
            academic_years: { year_name: '2025-2026' }
        },
        {
            id: 2,
            term_name: 'Term 2 (Spring Semester)',
            start_date: '2025-12-01',
            end_date: '2026-04-30',
            academic_years: { year_name: '2025-2026' }
        }
    ];

    const [terms, setTerms] = useState(initialTerms);
    const [academicYears] = useState(dummyYears);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);

    const [formData, setFormData] = useState({
        term_name: '',
        academic_year_id: '',
        start_date: '',
        end_date: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setActionLoading(true);

        // Simulate network delay
        setTimeout(() => {
            const year = academicYears.find(y => y.id === formData.academic_year_id);

            const newTerm = {
                id: Date.now(),
                term_name: formData.term_name,
                start_date: formData.start_date,
                end_date: formData.end_date,
                academic_years: { year_name: year ? year.year_name : 'Unknown Year' }
            };

            setTerms([...terms, newTerm]);
            setFormData({ term_name: '', academic_year_id: '', start_date: '', end_date: '' });
            setActionLoading(false);
        }, 600);
    };

    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to delete this term?")) return;
        setTerms(terms.filter(t => t.id !== id));
    };

    return (
        <div className="page-container">
            {/* Page Header */}
            <div className="page-header">
                <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Calendar size={28} color="#1d395e" />
                    Term Management
                </h1>
            </div>

            <div className="term-main-grid">
                {/* Form Sidebar */}
                <aside className="term-sidebar">
                    <div className="theme-card">
                        <div className="card-header">
                            <div>
                                <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <PlusCircle size={18} color="#1d395e" /> New Academic Term
                                </h2>
                                <p className="card-subtitle">Define a new semester or term</p>
                            </div>
                        </div>

                        <div className="card-body">
                            <form onSubmit={handleSubmit} className="theme-form">
                                <div className="form-row">
                                    <label>Term Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Term 1, Mid-Term"
                                        value={formData.term_name}
                                        onChange={(e) => setFormData({ ...formData, term_name: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-row">
                                    <label>Academic Year</label>
                                    <select
                                        value={formData.academic_year_id}
                                        onChange={(e) => setFormData({ ...formData, academic_year_id: e.target.value })}
                                        required
                                    >
                                        <option value="" disabled>-- Select Year --</option>
                                        {academicYears.map(year => (
                                            <option key={year.id} value={year.id}>{year.year_name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-grid" style={{ gap: '15px' }}>
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

                                <div className="form-actions" style={{ paddingTop: '15px' }}>
                                    <button type="submit" className="theme-btn-primary" disabled={actionLoading} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                        {actionLoading ? <Loader2 className="spinner" size={18} /> : "Create Term"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </aside>

                {/* List Content */}
                <main className="term-content">
                    <div className="theme-card" style={{ height: '100%' }}>
                        <div className="card-header">
                            <div>
                                <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <LayoutGrid size={18} color="#1d395e" /> Existing Terms
                                </h2>
                                <p className="card-subtitle">Manage active academic date ranges</p>
                            </div>
                        </div>

                        <div className="card-body">
                            {loading ? (
                                <div className="empty-state text-muted">Fetching terms...</div>
                            ) : (
                                <div className="term-cards-container">
                                    {terms.length > 0 ? terms.map((term) => (
                                        <div key={term.id} className="term-card-item">
                                            <div className="term-meta">
                                                <div className="term-header-row">
                                                    <h4>{term.term_name}</h4>
                                                    <span className="badge-year">{term.academic_years?.year_name}</span>
                                                </div>
                                                <div className="term-dates">
                                                    <Calendar size={14} />
                                                    <span>{term.start_date} &nbsp;—&nbsp; {term.end_date}</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleDelete(term.id)}
                                                className="btn-icon-danger"
                                                title="Delete Term"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    )) : (
                                        <div className="empty-state text-muted" style={{ textAlign: 'center', padding: '40px' }}>
                                            No terms added yet.
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TermManagement;