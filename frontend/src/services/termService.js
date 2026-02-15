import { supabase } from '../config/supabaseClient';

// Ella terms-aiyum fetch panna (with Academic Year details)
export const getAllTerms = async () => {
    const { data, error } = await supabase
        .from('terms')
        .select(`
            *,
            academic_years:academic_year_id (
                year_name
            )
        `)
        .order('start_date', { ascending: true });

    if (error) throw error;
    return data;
};

// Pudhu term create panna
export const createTerm = async (termData) => {
    const { data, error } = await supabase
        .from('terms')
        .insert([termData])
        .select();

    if (error) throw error;
    return data;
};

// Term-ah delete panna
export const deleteTerm = async (id) => {
    const { error } = await supabase
        .from('terms')
        .delete()
        .eq('id', id);

    if (error) throw error;
    return true;
};