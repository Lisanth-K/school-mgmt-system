import { supabase } from '../config/supabaseClient';

export const getAcademicYears = async () => {
    return await supabase
        .from('academic_years')
        .select('*')
        .order('start_date', { ascending: false });
};

export const createAcademicYear = async (formData) => {
    const { year_name, start_date, end_date, is_active } = formData;
    if (is_active) {
        await supabase.from('academic_years').update({ is_active: false, is_archived: true }).eq('is_active', true);
    }
    return await supabase.from('academic_years').insert([{ year_name, start_date, end_date, is_active, is_archived: !is_active }]);
};

export const toggleYearStatus = async (id) => {
    await supabase.from('academic_years').update({ is_active: false, is_archived: true }).neq('id', id);
    return await supabase.from('academic_years').update({ is_active: true, is_archived: false }).eq('id', id);
};