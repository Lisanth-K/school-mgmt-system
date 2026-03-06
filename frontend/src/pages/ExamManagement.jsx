import React, { useState } from 'react';
import { ClipboardList, Plus, Trash2, CalendarDays } from 'lucide-react';
import '../styles/ExamManagement.css';

const ExamManagement = () => {
    // Dummy Data for UI demonstration
    const dummyTerms = [
        { id: 't1', term_name: 'Term 1' },
        { id: 't2', term_name: 'Term 2' }
    ];
    const dummyClasses = [
        { id: 'c1', class_name: 'Grade 10 - A' },
        { id: 'c2', class_name: 'Grade 12 - Sci' }
    ];
    const dummyYears = [
        { id: 'y1', year_name: '2024-2025' },
        { id: 'y2', year_name: '2025-2026' }
    ];
    const initialExams = [
        { id: 1, exam_type: 'Midterm', terms: { term_name: 'Term 1' }, classes: { class_name: 'Grade 10 - A' }, exam_date: '2024-10-15', total_marks: 100 },
        { id: 2, exam_type: 'Unit Test', terms: { term_name: 'Term 1' }, classes: { class_name: 'Grade 12 - Sci' }, exam_date: '2024-09-05', total_marks: 50 }
    ];

    const [exams, setExams] = useState(initialExams);
    const [terms] = useState(dummyTerms);
    const [classes] = useState(dummyClasses);
    const [years] = useState(dummyYears);

    const [formData, setFormData] = useState({
        exam_type: '',
        term_id: '',
        class_id: '',
        academic_year_id: '',
        exam_date: '',
        total_marks: 100
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Frontend-only creation logic
        const selectedTerm = terms.find(t => t.id === formData.term_id);
        const selectedClass = classes.find(c => c.id === formData.class_id);

        const newExam = {
            id: Date.now(),
            exam_type: formData.exam_type,
            terms: { term_name: selectedTerm ? selectedTerm.term_name : 'Unknown' },
            classes: { class_name: selectedClass ? selectedClass.class_name : 'Unknown' },
            exam_date: formData.exam_date,
            total_marks: formData.total_marks
        };

        setExams([newExam, ...exams]);
        setFormData({ ...formData, exam_date: '', total_marks: 100, exam_type: '', class_id: '', term_id: '', academic_year_id: '' });
    };

    const handleDelete = (id) => {
        setExams(exams.filter(ex => ex.id !== id));
    };

    return (
        <div className="page-container">
            {/* Page Header */}
            <div className="page-header">
                <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ClipboardList size={28} color="#1d395e" />
                    Exam Setup
                </h1>
            </div>

            {/* Two-Column Grid Layout */}
            <div className="exam-dashboard-grid">

                {/* Left Side: Form */}
                <aside>
                    <div className="theme-card">
                        <div className="card-header">
                            <div>
                                <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Plus size={18} color="#1d395e" /> Schedule New Exam
                                </h2>
                            </div>
                        </div>

                        <div className="card-body">
                            <form onSubmit={handleSubmit} className="theme-form">
                                <div className="form-row">
                                    <label>Exam Type</label>
                                    <select required value={formData.exam_type} onChange={e => setFormData({ ...formData, exam_type: e.target.value })}>
                                        <option value="" disabled>-- Select Type --</option>
                                        <option value="Unit Test">Unit Test</option>
                                        <option value="Midterm">Midterm</option>
                                        <option value="Final Exam">Final Exam</option>
                                    </select>
                                </div>

                                <div className="form-row">
                                    <label>Term</label>
                                    <select required value={formData.term_id} onChange={e => setFormData({ ...formData, term_id: e.target.value })}>
                                        <option value="" disabled>-- Select Term --</option>
                                        {terms.map(t => <option key={t.id} value={t.id}>{t.term_name}</option>)}
                                    </select>
                                </div>

                                <div className="form-row">
                                    <label>Class</label>
                                    <select required value={formData.class_id} onChange={e => setFormData({ ...formData, class_id: e.target.value })}>
                                        <option value="" disabled>-- Select Class --</option>
                                        {classes.map(c => <option key={c.id} value={c.id}>{c.class_name}</option>)}
                                    </select>
                                </div>

                                <div className="form-grid">
                                    <div className="form-row">
                                        <label>Date</label>
                                        <input type="date" required value={formData.exam_date}
                                            onChange={e => setFormData({ ...formData, exam_date: e.target.value })} />
                                    </div>
                                    <div className="form-row">
                                        <label>Total Marks</label>
                                        <input type="number" required value={formData.total_marks}
                                            onChange={e => setFormData({ ...formData, total_marks: e.target.value })} />
                                    </div>
                                </div>

                                <div className="form-row" style={{ marginBottom: '30px' }}>
                                    <label>Academic Year</label>
                                    <select required value={formData.academic_year_id} onChange={e => setFormData({ ...formData, academic_year_id: e.target.value })}>
                                        <option value="" disabled>-- Select Year --</option>
                                        {years.map(y => <option key={y.id} value={y.id}>{y.year_name}</option>)}
                                    </select>
                                </div>

                                <div className="form-actions">
                                    <button type="submit" className="theme-btn-primary" style={{ width: '100%' }}>Schedule Exam</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </aside>

                {/* Right Side: Exam List */}
                <main className="exam-list-section">
                    {exams.length > 0 ? (
                        exams.map(ex => (
                            <div key={ex.id} className="exam-card-item">
                                <div className="exam-info">
                                    <div className="exam-badges">
                                        <span className="badge badge-primary">{ex.exam_type}</span>
                                        <span className="badge badge-light">{ex.terms?.term_name}</span>
                                    </div>
                                    <h4 className="exam-class-title">Class: {ex.classes?.class_name}</h4>
                                    <p className="exam-details">
                                        <CalendarDays size={14} color="#a1a5b7" />
                                        {ex.exam_date} &nbsp;|&nbsp; <strong style={{ color: '#1d395e' }}>{ex.total_marks} Marks</strong>
                                    </p>
                                </div>
                                <button onClick={() => handleDelete(ex.id)} className="btn-delete" title="Delete Exam">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="theme-card" style={{ padding: '40px', textAlign: 'center', color: '#a1a5b7' }}>
                            No exams scheduled yet.
                        </div>
                    )}
                </main>

            </div>
        </div>
    );
};

export default ExamManagement;