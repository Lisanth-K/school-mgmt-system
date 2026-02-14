import { supabase } from '../config/supabaseClient';

export const getSubjects = async () => {
    const { data, error } = await supabase
        .from('subjects')
        .select(`
            *,
            classes (class_name)
        `)
        .order('created_at', { ascending: false });
    
    if (error) throw error;
    return { data };
};

export const createSubject = async (subjectData) => {
    const { data, error } = await supabase
        .from('subjects')
        .insert([subjectData])
        .select();

    if (error) throw error;
    return { data };
};