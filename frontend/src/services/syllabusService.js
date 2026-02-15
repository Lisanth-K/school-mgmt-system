import { supabase } from '../config/supabaseClient';

// Oru specific subject-oda chapters-ah fetch panna
export const getSyllabus = async (subjectId) => {
    // Unga database-la table names singular-ah irundha (subject, class), 
    // fetch pannumbothu singular-ah dhaan pannaum.
    let query = supabase
        .from('syllabus')
        .select(`
            *,
            subjects:subject_id (
                subject_name, 
                class_id, 
                classes:class_id (class_name)
            )
        `);
    
    if (subjectId) {
        query = query.eq('subject_id', subjectId);
    }

    // New chapters mela vara 'descending' order dhaan list-ku nallathu
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) {
        console.error("Syllabus fetch error:", error);
        throw error;
    }
    return { data };
};

// Pudhu chapter add panna
export const createChapter = async (chapterData) => {
    const { data, error } = await supabase
        .from('syllabus')
        .insert([chapterData])
        .select();
        
    if (error) {
        console.error("Chapter creation error:", error);
        throw error;
    }
    return { data };
};