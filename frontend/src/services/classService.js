import { supabase } from '../config/supabaseClient';

// Get All Classes with Year Name (Join Query)
export const getClasses = async () => {
    const { data, error } = await supabase
        .from('classes')
        .select(`
            *,
            academic_years (year_name)
        `)
        .order('created_at', { ascending: false });
    
    if (error) throw error;
    return { data };
};

// Create New Class
export const createClass = async (classData) => {
    const { data, error } = await supabase
        .from('classes')
        .insert([classData])
        .select();

    if (error) throw error;
    return { data };
};