import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient';
import { ClipboardList, Plus, Trash2, CalendarDays } from 'lucide-react';
import { getAllExams, createExam, deleteExam } from '../services/examService';
import '../styles/ExamManagement.css';

const ExamManagement = () => {
    const [exams, setExams] = useState([]);
    const [terms, setTerms] = useState([]);
    const [classes, setClasses] = useState([]);
    const [years, setYears] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        exam_type: '',
        term_id: '',
        class_id: '',
        academic_year_id: '',
        exam_date: '',
        total_marks: 100
    });

    const loadData = async () => {
        setLoading(true);
        try {
            const [exData, tData, cData, yData] = await Promise.all([
                getAllExams(),
                supabase.from('terms').select('*'),
                supabase.from('classes').select('*'),
                supabase.from('academic_years').select('*')
            ]);
            setExams(exData);
            setTerms(tData.data || []);
            setClasses(cData.data || []);
            setYears(yData.data || []);
        } catch (err) {
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadData(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createExam(formData);
            alert("Exam Scheduled Successfully!");
            setFormData({ ...formData, exam_date: '', total_marks: 100 });
            loadData();
        } catch (err) { alert(err.message); }
    };

    return (
        <div className="exam-container">
            <header className="exam-header">
                <ClipboardList size={35} color="#e67e22" />
                <h1>Exam Setup</h1>
            </header>

            <div className="exam-grid">
                <aside className="exam-form-section">
                    <div className="exam-form-card">
                        <h3><Plus size={20} /> Schedule New Exam</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="e-group">
                                <label>Exam Type</label>
                                <select required onChange={e => setFormData({...formData, exam_type: e.target.value})}>
                                    <option value="">-- Select Type --</option>
                                    <option value="Unit Test">Unit Test</option>
                                    <option value="Midterm">Midterm</option>
                                    <option value="Final Exam">Final Exam</option>
                                </select>
                            </div>

                            <div className="e-group">
                                <label>Term</label>
                                <select required onChange={e => setFormData({...formData, term_id: e.target.value})}>
                                    <option value="">-- Select Term --</option>
                                    {terms.map(t => <option key={t.id} value={t.id}>{t.term_name}</option>)}
                                </select>
                            </div>

                            <div className="e-group">
                                <label>Class</label>
                                <select required onChange={e => setFormData({...formData, class_id: e.target.value})}>
                                    <option value="">-- Select Class --</option>
                                    {classes.map(c => <option key={c.id} value={c.id}>{c.class_name}</option>)}
                                </select>
                            </div>

                            <div className="e-row">
                                <div className="e-group">
                                    <label>Date</label>
                                    <input type="date" required value={formData.exam_date} 
                                        onChange={e => setFormData({...formData, exam_date: e.target.value})} />
                                </div>
                                <div className="e-group">
                                    <label>Total Marks</label>
                                    <input type="number" required value={formData.total_marks}
                                        onChange={e => setFormData({...formData, total_marks: e.target.value})} />
                                </div>
                            </div>

                            <div className="e-group">
                                <label>Academic Year</label>
                                <select required onChange={e => setFormData({...formData, academic_year_id: e.target.value})}>
                                    <option value="">-- Select Year --</option>
                                    {years.map(y => <option key={y.id} value={y.id}>{y.year_name}</option>)}
                                </select>
                            </div>

                            <button type="submit" className="exam-btn">Schedule Exam</button>
                        </form>
                    </div>
                </aside>

                <main className="exam-list-section">
                    {exams.map(ex => (
                        <div key={ex.id} className="exam-item">
                            <div className="ex-info">
                                <div className="ex-badge-row">
                                    <span className="ebadge type">{ex.exam_type}</span>
                                    <span className="ebadge term">{ex.terms?.term_name}</span>
                                </div>
                                <h4>Class: {ex.classes?.class_name}</h4>
                                <p><CalendarDays size={14} /> {ex.exam_date} | <strong>{ex.total_marks} Marks</strong></p>
                            </div>
                            <button onClick={() => deleteExam(ex.id).then(loadData)} className="ex-del">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </main>
            </div>
        </div>
    );
};

export default ExamManagement;