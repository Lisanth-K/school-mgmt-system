import React, { useState } from 'react';
import { BookOpen, CheckCircle, Clock, PlusCircle, Filter } from 'lucide-react';
import '../styles/SyllabusManagement.css';

const SyllabusManagement = () => {
    // Dummy Data for UI demonstration
    const dummySubjects = [
        { id: 's1', subject_name: 'Mathematics', classes: { class_name: 'Grade 10' } },
        { id: 's2', subject_name: 'Physics', classes: { class_name: 'Grade 11' } },
        { id: 's3', subject_name: 'Computer Science', classes: { class_name: 'Grade 12' } }
    ];

    const initialChapters = [
        { id: 1, subject_id: 's1', chapter_name: 'Algebraic Expressions', completion_percentage: 100, remarks: 'Completed ahead of schedule.', subjects: { subject_name: 'Mathematics', classes: { class_name: 'Grade 10' } } },
        { id: 2, subject_id: 's2', chapter_name: 'Thermodynamics', completion_percentage: 45, remarks: 'Needs a revision class for formulas.', subjects: { subject_name: 'Physics', classes: { class_name: 'Grade 11' } } },
        { id: 3, subject_id: 's3', chapter_name: 'Data Structures', completion_percentage: 10, remarks: 'Just started arrays and linked lists.', subjects: { subject_name: 'Computer Science', classes: { class_name: 'Grade 12' } } }
    ];

    const [chapters, setChapters] = useState(initialChapters);
    const [subjects] = useState(dummySubjects);
    const [selectedSubject, setSelectedSubject] = useState('');

    const [formData, setFormData] = useState({
        subject_id: '',
        chapter_name: '',
        completion_percentage: 0,
        remarks: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.subject_id) return alert("Please select a subject!");

        const selectedSubj = subjects.find(s => s.id === formData.subject_id);

        const newChapter = {
            id: Date.now(),
            subject_id: formData.subject_id,
            chapter_name: formData.chapter_name,
            completion_percentage: Number(formData.completion_percentage),
            remarks: formData.remarks,
            subjects: {
                subject_name: selectedSubj ? selectedSubj.subject_name : 'Unknown',
                classes: { class_name: selectedSubj ? selectedSubj.classes.class_name : 'Unknown' }
            }
        };

        setChapters([newChapter, ...chapters]);
        // Reset fields but keep subject_id active for rapid data entry
        setFormData({ ...formData, chapter_name: '', completion_percentage: 0, remarks: '' });
    };

    // Filter logic
    const filteredChapters = selectedSubject
        ? chapters.filter(ch => ch.subject_id === selectedSubject)
        : chapters;

    return (
        <div className="page-container">
            {/* Page Header */}
            <div className="page-header">
                <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <BookOpen size={28} color="#1d395e" />
                    Syllabus Management
                </h1>
            </div>

            <div className="syllabus-main-grid">
                {/* LEFT: FORM SIDEBAR */}
                <aside>
                    <div className="theme-card">
                        <div className="card-header">
                            <div>
                                <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <PlusCircle size={18} color="#1d395e" /> New Chapter
                                </h2>
                                <p className="card-subtitle">Track syllabus progression</p>
                            </div>
                        </div>

                        <div className="card-body">
                            <form onSubmit={handleSubmit} className="theme-form">
                                <div className="form-row">
                                    <label>Select Subject</label>
                                    <select
                                        value={formData.subject_id}
                                        onChange={(e) => setFormData({ ...formData, subject_id: e.target.value })}
                                        required
                                    >
                                        <option value="" disabled>-- Choose --</option>
                                        {subjects.map(s => (
                                            <option key={s.id} value={s.id}>
                                                {s.subject_name} ({s.classes?.class_name})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-row">
                                    <label>Chapter Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter chapter name"
                                        value={formData.chapter_name}
                                        onChange={(e) => setFormData({ ...formData, chapter_name: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-row">
                                    <label>Completion %</label>
                                    <input
                                        type="number"
                                        min="0" max="100"
                                        value={formData.completion_percentage}
                                        onChange={(e) => setFormData({ ...formData, completion_percentage: e.target.value })}
                                    />
                                </div>

                                <div className="form-row" style={{ marginBottom: '10px' }}>
                                    <label>Teacher Remarks</label>
                                    <textarea
                                        rows="3"
                                        placeholder="Add any notes..."
                                        value={formData.remarks}
                                        onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                                    ></textarea>
                                </div>

                                <div className="form-actions">
                                    <button type="submit" className="theme-btn-primary" style={{ width: '100%' }}>
                                        Add Chapter
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </aside>

                {/* RIGHT: CHAPTER LIST */}
                <main>
                    <div className="theme-card">
                        <div className="card-header filter-header">
                            <div>
                                <h2 className="card-title">Chapter Progress List</h2>
                            </div>
                            <div className="filter-wrapper">
                                <Filter size={16} color="#a1a5b7" />
                                <select
                                    className="filter-select"
                                    value={selectedSubject}
                                    onChange={(e) => setSelectedSubject(e.target.value)}
                                >
                                    <option value="">All Subjects</option>
                                    {subjects.map(s => (
                                        <option key={s.id} value={s.id}>{s.subject_name} - {s.classes?.class_name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="chapters-container">
                            {filteredChapters.length > 0 ? (
                                filteredChapters.map((ch) => (
                                    <div key={ch.id} className="chapter-item">
                                        <div className="chapter-header-row">
                                            <div className="chapter-details">
                                                <h4>{ch.chapter_name}</h4>
                                                <p className="sub-text">
                                                    Subject: <strong>{ch.subjects?.subject_name}</strong>
                                                </p>
                                            </div>
                                            <span className="badge-class">{ch.subjects?.classes?.class_name}</span>
                                        </div>

                                        <div className="chapter-progress-section">
                                            <div className="progress-info">
                                                <span className="progress-text">Progress: {ch.completion_percentage}%</span>
                                                {Number(ch.completion_percentage) === 100 ?
                                                    <span style={{ color: '#50cd89', display: 'flex' }}><CheckCircle size={18} /></span> :
                                                    <span style={{ color: '#f1c40f', display: 'flex' }}><Clock size={18} /></span>
                                                }
                                            </div>
                                            <div className="progress-track">
                                                <div
                                                    className="progress-fill"
                                                    style={{
                                                        width: `${ch.completion_percentage}%`,
                                                        backgroundColor: Number(ch.completion_percentage) === 100 ? '#50cd89' : '#1d395e'
                                                    }}
                                                ></div>
                                            </div>
                                            {ch.remarks && (
                                                <div className="remark-bubble">
                                                    <strong>Note:</strong> {ch.remarks}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="empty-state">
                                    No chapters found for the selected criteria.
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SyllabusManagement;