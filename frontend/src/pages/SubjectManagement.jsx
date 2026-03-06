import React, { useState } from 'react';
import { BookOpen, PlusCircle } from 'lucide-react';
import '../styles/SubjectManagement.css';

const SubjectManagement = () => {
    // Dummy Data for UI demonstration
    const dummyClasses = [
        { id: 'c1', class_name: 'Grade 10' },
        { id: 'c2', class_name: 'Grade 11' },
        { id: 'c3', class_name: 'Grade 12' }
    ];

    const initialSubjects = [
        { id: 1, subject_name: 'Mathematics', subject_code: 'MATH101', classes: { class_name: 'Grade 10' }, subject_type: 'Theory', max_marks: 100 },
        { id: 2, subject_name: 'Physics Lab', subject_code: 'PHY201', classes: { class_name: 'Grade 11' }, subject_type: 'Practical', max_marks: 50 },
        { id: 3, subject_name: 'Computer Science', subject_code: 'CS301', classes: { class_name: 'Grade 12' }, subject_type: 'Both', max_marks: 100 }
    ];

    const [subjects, setSubjects] = useState(initialSubjects);
    const [classes] = useState(dummyClasses);
    const [formData, setFormData] = useState({
        subject_name: '',
        subject_code: '',
        class_id: '',
        subject_type: 'Theory',
        max_marks: 100
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Frontend-only creation logic
        const selectedClass = classes.find(c => c.id === formData.class_id);

        const newSubject = {
            id: Date.now(),
            subject_name: formData.subject_name,
            subject_code: formData.subject_code,
            classes: { class_name: selectedClass ? selectedClass.class_name : 'Unknown' },
            subject_type: formData.subject_type,
            max_marks: formData.max_marks
        };

        setSubjects([newSubject, ...subjects]);
        setFormData({ subject_name: '', subject_code: '', class_id: '', subject_type: 'Theory', max_marks: 100 });
    };

    return (
        <div className="page-container">
            {/* Page Header */}
            <div className="page-header">
                <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <BookOpen size={28} color="#1d395e" />
                    Subject Management
                </h1>
            </div>

            {/* Form Card */}
            <div className="theme-card">
                <div className="card-header">
                    <div>
                        <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <PlusCircle size={18} color="#1d395e" /> Add New Subject
                        </h2>
                        <p className="card-subtitle">Define curriculum subjects and assign them to specific classes</p>
                    </div>
                </div>

                <div className="card-body">
                    <form onSubmit={handleSubmit} className="theme-form">
                        <div className="form-grid">
                            <div className="form-row">
                                <label>Subject Name</label>
                                <input
                                    type="text"
                                    value={formData.subject_name}
                                    placeholder="Ex: Mathematics"
                                    onChange={(e) => setFormData({ ...formData, subject_name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-row">
                                <label>Subject Code</label>
                                <input
                                    type="text"
                                    value={formData.subject_code}
                                    placeholder="Ex: MATH101"
                                    onChange={(e) => setFormData({ ...formData, subject_code: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="form-row">
                                <label>Linked Class</label>
                                <select
                                    value={formData.class_id}
                                    onChange={(e) => setFormData({ ...formData, class_id: e.target.value })}
                                    required
                                >
                                    <option value="" disabled>-- Select Class --</option>
                                    {classes.map(c => <option key={c.id} value={c.id}>{c.class_name}</option>)}
                                </select>
                            </div>
                            <div className="form-row">
                                <label>Subject Type</label>
                                <select
                                    value={formData.subject_type}
                                    onChange={(e) => setFormData({ ...formData, subject_type: e.target.value })}
                                >
                                    <option value="Theory">Theory</option>
                                    <option value="Practical">Practical</option>
                                    <option value="Both">Both</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row" style={{ maxWidth: '440px', marginBottom: '10px' }}>
                            <label>Maximum Marks</label>
                            <input
                                type="number"
                                value={formData.max_marks}
                                onChange={(e) => setFormData({ ...formData, max_marks: e.target.value })}
                                required
                                min="1"
                            />
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="theme-btn-primary">Create Subject</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Table Card */}
            <div className="theme-card">
                <div className="card-header">
                    <div>
                        <h2 className="card-title">Subject List</h2>
                        <p className="card-subtitle">Overview of all active subjects in the curriculum</p>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="theme-table">
                        <thead>
                            <tr>
                                <th>Subject & Code</th>
                                <th>Class</th>
                                <th>Type</th>
                                <th>Max Marks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.length > 0 ? subjects.map((s) => (
                                <tr key={s.id}>
                                    <td>
                                        <div className="subj-info">
                                            <span className="subj-name">{s.subject_name}</span>
                                            <span className="subj-code">Code: {s.subject_code}</span>
                                        </div>
                                    </td>
                                    <td className="fw-600 text-dark">{s.classes?.class_name || "N/A"}</td>
                                    <td>
                                        <span className={`type-badge badge-${s.subject_type.toLowerCase()}`}>
                                            {s.subject_type}
                                        </span>
                                    </td>
                                    <td className="fw-600 text-dark">{s.max_marks}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center', padding: '30px', color: '#a1a5b7' }}>
                                        No subjects found.
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

export default SubjectManagement;