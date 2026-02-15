import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient';
import { BookOpen, CheckCircle, Clock, PlusCircle, Filter } from 'lucide-react';
import '../styles/SyllabusManagement.css';

const SyllabusManagement = () => {
    const [chapters, setChapters] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(''); 
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        subject_id: '', 
        chapter_name: '', 
        completion_percentage: 0, 
        remarks: ''
    });

    // Main Data Fetcher
    const fetchData = async () => {
        setLoading(true);
        try {
            // 1. Fetch Subjects for the dropdown
            const { data: subData } = await supabase
                .from('subjects')
                .select('id, subject_name, classes:class_id(class_name)');
            setSubjects(subData || []);
            
            // 2. Fetch Syllabus Chapters
            let query = supabase
                .from('syllabus')
                .select(`
                    *,
                    subjects:subject_id (
                        subject_name,
                        classes:class_id (class_name)
                    )
                `);
            
            // Filter logic: Empty string-ah illana mattum filter apply pannanum
            if (selectedSubject && selectedSubject.trim() !== "") {
                query = query.eq('subject_id', selectedSubject);
            }

            const { data: chData, error } = await query.order('updated_at', { ascending: false });
            
            if (error) throw error;
            
            console.log("Fetched Chapters:", chData);
            setChapters(chData || []);
        } catch (err) {
            console.error("Fetch Error:", err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedSubject]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.subject_id) return alert("Please select a subject!");

        try {
            const { error } = await supabase
                .from('syllabus')
                .insert([formData]);

            if (error) throw error;

            alert("Chapter Added Successfully!");
            // Reset fields but keep subject_id if you want to add more chapters to same subject
            setFormData({ ...formData, chapter_name: '', completion_percentage: 0, remarks: '' });
            fetchData(); 
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    return (
        <div className="syllabus-container">
            <header className="syllabus-header">
                <BookOpen size={35} color="#2c3e50" />
                <h1>Syllabus Management</h1>
            </header>

            <div className="syllabus-main-grid">
                {/* LEFT: FORM */}
                <aside className="syllabus-sidebar">
                    <div className="form-card">
                        <h3><PlusCircle size={22} color="#3498db" /> New Chapter</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Select Subject</label>
                                <select 
                                    value={formData.subject_id} 
                                    onChange={(e) => setFormData({...formData, subject_id: e.target.value})} 
                                    required
                                >
                                    <option value="">-- Choose --</option>
                                    {subjects.map(s => (
                                        <option key={s.id} value={s.id}>
                                            {s.subject_name} ({s.classes?.class_name})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Chapter Name</label>
                                <input 
                                    type="text" 
                                    placeholder="Enter chapter name" 
                                    value={formData.chapter_name} 
                                    onChange={(e) => setFormData({...formData, chapter_name: e.target.value})} 
                                    required 
                                />
                            </div>

                            <div className="form-group">
                                <label>Completion %</label>
                                <input 
                                    type="number" 
                                    min="0" max="100" 
                                    value={formData.completion_percentage} 
                                    onChange={(e) => setFormData({...formData, completion_percentage: e.target.value})} 
                                />
                            </div>

                            <div className="form-group">
                                <label>Teacher Remarks</label>
                                <textarea 
                                    rows="3"
                                    placeholder="Add any notes..."
                                    value={formData.remarks} 
                                    onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                                ></textarea>
                            </div>

                            <button type="submit" className="submit-btn">Add Chapter</button>
                        </form>
                    </div>
                </aside>

                {/* RIGHT: LIST */}
                <main className="syllabus-content">
                    <div className="list-header-card">
                        <div className="filter-wrapper">
                            <Filter size={20} />
                            <span>Filter by Subject:</span>
                            <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                                <option value="">All Subjects</option>
                                {subjects.map(s => (
                                    <option key={s.id} value={s.id}>{s.subject_name} - {s.classes?.class_name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="chapters-container">
                        {loading ? (
                            <div className="empty-state">Loading syllabus...</div>
                        ) : chapters.length > 0 ? (
                            chapters.map((ch) => (
                                <div key={ch.id} className="chapter-item">
                                    <div className="chapter-details">
                                        <span className="class-tag">{ch.subjects?.classes?.class_name}</span>
                                        <h4>{ch.chapter_name}</h4>
                                        <p className="sub-text">Subject: <strong>{ch.subjects?.subject_name}</strong></p>
                                    </div>

                                    <div className="chapter-progress">
                                        <div className="progress-info">
                                            <span>Progress: {ch.completion_percentage}%</span>
                                            {Number(ch.completion_percentage) === 100 ? 
                                                <span style={{color: '#27ae60'}}><CheckCircle size={18} /></span> : 
                                                <span style={{color: '#f39c12'}}><Clock size={18} /></span>
                                            }
                                        </div>
                                        <div className="progress-track">
                                            <div 
                                                className="progress-fill" 
                                                style={{ 
                                                    width: `${ch.completion_percentage}%`, 
                                                    backgroundColor: Number(ch.completion_percentage) === 100 ? '#27ae60' : '#3498db' 
                                                }}
                                            ></div>
                                        </div>
                                        {ch.remarks && <p className="remark-bubble">Note: {ch.remarks}</p>}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                No chapters added for this subject yet.
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SyllabusManagement;