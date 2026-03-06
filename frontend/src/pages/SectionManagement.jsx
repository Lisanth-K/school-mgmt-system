import React, { useState } from 'react';
import { LayoutGrid, PlusCircle, UserCheck } from 'lucide-react';
import '../styles/SectionManagement.css';

const SectionManagement = () => {
    // Dummy Data for UI demonstration
    const dummyClasses = [
        { id: 'c1', class_name: 'Grade 10' },
        { id: 'c2', class_name: 'Grade 11' },
        { id: 'c3', class_name: 'Grade 12' }
    ];

    const dummyTeachers = [
        { id: 't1', full_name: 'Mr. John Doe' },
        { id: 't2', full_name: 'Ms. Sarah Smith' },
        { id: 't3', full_name: 'Dr. Alan Turing' }
    ];

    const initialSections = [
        { id: 1, section_name: 'Section A', classes: { class_name: 'Grade 10' }, teachers: { full_name: 'Mr. John Doe' }, capacity: 40 },
        { id: 2, section_name: 'Section B', classes: { class_name: 'Grade 10' }, teachers: { full_name: 'Ms. Sarah Smith' }, capacity: 35 },
        { id: 3, section_name: 'Science', classes: { class_name: 'Grade 12' }, teachers: { full_name: 'Dr. Alan Turing' }, capacity: 30 }
    ];

    const [sections, setSections] = useState(initialSections);
    const [classes] = useState(dummyClasses);
    const [teachers] = useState(dummyTeachers);

    const [formData, setFormData] = useState({
        section_name: '', class_id: '', class_teacher_id: '', capacity: 40
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Frontend-only creation logic
        const selectedClass = classes.find(c => c.id === formData.class_id);
        const selectedTeacher = teachers.find(t => t.id === formData.class_teacher_id);

        const newSection = {
            id: Date.now(),
            section_name: formData.section_name,
            classes: { class_name: selectedClass ? selectedClass.class_name : 'Unknown' },
            teachers: { full_name: selectedTeacher ? selectedTeacher.full_name : null },
            capacity: formData.capacity
        };

        setSections([...sections, newSection]);
        setFormData({ section_name: '', class_id: '', class_teacher_id: '', capacity: 40 });
    };

    return (
        <div className="page-container">
            {/* Page Header */}
            <div className="page-header">
                <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <LayoutGrid size={28} color="#1d395e" />
                    Section Management
                </h1>
            </div>

            {/* Form Card */}
            <div className="theme-card">
                <div className="card-header">
                    <div>
                        <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <PlusCircle size={18} color="#1d395e" /> Divide Class into Sections
                        </h2>
                        <p className="card-subtitle">Create organizational sections within your existing classes</p>
                    </div>
                </div>

                <div className="card-body">
                    <form onSubmit={handleSubmit} className="theme-form">
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
                                <label>Section Name</label>
                                <input
                                    type="text"
                                    placeholder="Ex: Section A"
                                    value={formData.section_name}
                                    onChange={(e) => setFormData({ ...formData, section_name: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-grid" style={{ marginBottom: '10px' }}>
                            <div className="form-row">
                                <label>Assign Class Teacher</label>
                                <select
                                    value={formData.class_teacher_id}
                                    onChange={(e) => setFormData({ ...formData, class_teacher_id: e.target.value })}
                                    required
                                >
                                    <option value="" disabled>-- Select Teacher --</option>
                                    {teachers.map(t => (
                                        <option key={t.id} value={t.id}>{t.full_name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-row">
                                <label>Student Capacity</label>
                                <input
                                    type="number"
                                    value={formData.capacity}
                                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                                    min="1"
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="theme-btn-primary">Create Section</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Table Card */}
            <div className="theme-card">
                <div className="card-header">
                    <div>
                        <h2 className="card-title">Section List</h2>
                        <p className="card-subtitle">Overview of all class divisions and assigned teachers</p>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="theme-table">
                        <thead>
                            <tr>
                                <th>Class</th>
                                <th>Section</th>
                                <th>Class Teacher</th>
                                <th>Capacity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sections.length > 0 ? sections.map((s) => (
                                <tr key={s.id}>
                                    <td className="fw-600 text-dark">{s.classes?.class_name}</td>
                                    <td>
                                        <span className="badge badge-section">{s.section_name}</span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#5e6278' }}>
                                            <UserCheck size={16} color="#a1a5b7" />
                                            {s.teachers?.full_name || 'Not Assigned'}
                                        </div>
                                    </td>
                                    <td>{s.capacity} Students</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center', padding: '30px', color: '#a1a5b7' }}>
                                        No sections found.
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

export default SectionManagement;