import { supabase } from '../config/supabaseClient';

export const getSections = async () => {
    const { data, error } = await supabase
        .from('sections')
        .select(`
            *,
            classes (class_name),
            teachers (full_name) 
        `) // Inga 'name'-ku badhula 'full_name' nu mathiyachu
        .order('created_at', { ascending: false });
    if (error) throw error;
    return { data };
};

export const createSection = async (sectionData) => {
    const { data, error } = await supabase
        .from('sections')
        .insert([sectionData])
        .select();
    if (error) throw error;
    return { data };
};