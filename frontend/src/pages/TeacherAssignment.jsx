import React, { useState } from 'react';
import { GraduationCap, PlusCircle } from 'lucide-react';
import '../styles/TeacherAssignment.css';

const TeacherAssignment = () => {
    // Dummy Data for UI demonstration
    const dummyTeachers = [
        { id: 't1', full_name: 'Sarah Jenkins' },
        { id: 't2', full_name: 'Michael Chang' },
        { id: 't3', full_name: 'Emily Davis' }
    ];

    const dummySubjects = [
        { id: 'sub1', subject_name: 'Mathematics' },
        { id: 'sub2', subject_name: 'Physics' },
        { id: 'sub3', subject_name: 'Computer Science' }
    ];

    const dummySections = [
        { id: 'sec1', section_name: 'Section A', classes: { class_name: 'Grade 10' } },
        { id: 'sec2', section_name: 'Section B', classes: { class_name: 'Grade 10' } },
        { id: 'sec3', section_name: 'Section A', classes: { class_name: 'Grade 11' } }
    ];

    const dummyYears = [
        { id: 'y1', year_name: '2025-2026' },
        { id: 'y2', year_name: '2026-2027' }
    ];

    const initialAssignments = [
        {
            id: 1,
            teachers: { full_name: 'Sarah Jenkins' },
            sections: { section_name: 'Section A', classes: { class_name: 'Grade 10' } },
            subjects: { subject_name: 'Mathematics' },
            academic_years: { year_name: '2025-2026' }
        },
        {
            id: 2,
            teachers: { full_name: 'Michael Chang' },
            sections: { section_name: 'Section A', classes: { class_name: 'Grade 11' } },
            subjects: { subject_name: 'Physics' },
            academic_years: { year_name: '2025-2026' }
        }
    ];

    const [assignments, setAssignments] = useState(initialAssignments);
    const [teachers] = useState(dummyTeachers);
    const [subjects] = useState(dummySubjects);
    const [sections] = useState(dummySections);
    const [years] = useState(dummyYears);

    const [formData, setFormData] = useState({
        teacher_id: '', subject_id: '', section_id: '', academic_year_id: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Find selected entities to build the display object
        const teacher = teachers.find(t => t.id === formData.teacher_id);
        const subject = subjects.find(s => s.id === formData.subject_id);
        const section = sections.find(sec => sec.id === formData.section_id);
        const year = years.find(y => y.id === formData.academic_year_id);

        const newAssignment = {
            id: Date.now(),
            teachers: { full_name: teacher ? teacher.full_name : 'Unknown' },
            sections: {
                section_name: section ? section.section_name : 'Unknown',
                classes: { class_name: section ? section.classes.class_name : 'Unknown' }
            },
            subjects: { subject_name: subject ? subject.subject_name : 'Unknown' },
            academic_years: { year_name: year ? year.year_name : 'Unknown' }
        };

        setAssignments([newAssignment, ...assignments]);
        setFormData({ teacher_id: '', subject_id: '', section_id: '', academic_year_id: '' });
    };

    return (
        <div className="page-container">
            {/* Page Header */}
            <div className="page-header">
                <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <GraduationCap size={28} color="#1d395e" />
                    Teacher Assignment
                </h1>
            </div>

            {/* Form Card */}
            <div className="theme-card">
                <div className="card-header">
                    <div>
                        <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <PlusCircle size={18} color="#1d395e" /> Assign Subject Teacher
                        </h2>
                        <p className="card-subtitle">Link teachers to specific subjects and classes</p>
                    </div>
                </div>

                <div className="card-body">
                    <form onSubmit={handleSubmit} className="theme-form">
                        <div className="form-grid">
                            <div className="form-row">
                                <label>Select Teacher</label>
                                <select
                                    value={formData.teacher_id}
                                    onChange={(e) => setFormData({ ...formData, teacher_id: e.target.value })}
                                    required
                                >
                                    <option value="" disabled>-- Choose Teacher --</option>
                                    {teachers.map(t => <option key={t.id} value={t.id}>{t.full_name}</option>)}
                                </select>
                            </div>
                            <div className="form-row">
                                <label>Academic Year</label>
                                <select
                                    value={formData.academic_year_id}
                                    onChange={(e) => setFormData({ ...formData, academic_year_id: e.target.value })}
                                    required
                                >
                                    <option value="" disabled>-- Choose Year --</option>
                                    {years.map(y => <option key={y.id} value={y.id}>{y.year_name}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="form-row">
                                <label>Section (Class)</label>
                                <select
                                    value={formData.section_id}
                                    onChange={(e) => setFormData({ ...formData, section_id: e.target.value })}
                                    required
                                >
                                    <option value="" disabled>-- Choose Section --</option>
                                    {sections.map(sec => (
                                        <option key={sec.id} value={sec.id}>
                                            {(sec.classes?.class_name || "Unknown Class")} - {sec.section_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-row">
                                <label>Subject</label>
                                <select
                                    value={formData.subject_id}
                                    onChange={(e) => setFormData({ ...formData, subject_id: e.target.value })}
                                    required
                                >
                                    <option value="" disabled>-- Choose Subject --</option>
                                    {subjects.map(sub => <option key={sub.id} value={sub.id}>{sub.subject_name}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="theme-btn-primary">Link Teacher to Subject</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Table Card */}
            <div className="theme-card">
                <div className="card-header">
                    <div>
                        <h2 className="card-title">Current Assignments</h2>
                        <p className="card-subtitle">Overview of all active teaching links</p>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="theme-table">
                        <thead>
                            <tr>
                                <th>Teacher Name</th>
                                <th>Class & Section</th>
                                <th>Subject</th>
                                <th>Academic Year</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignments.length > 0 ? assignments.map((a) => (
                                <tr key={a.id}>
                                    <td className="fw-600 text-dark">{a.teachers?.full_name}</td>
                                    <td>
                                        <span className="badge-class">
                                            {a.sections?.classes?.class_name} - {a.sections?.section_name}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="badge-subject">{a.subjects?.subject_name}</span>
                                    </td>
                                    <td className="text-muted">{a.academic_years?.year_name}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center', padding: '30px', color: '#a1a5b7' }}>
                                        No assignments found.
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

export default TeacherAssignment;