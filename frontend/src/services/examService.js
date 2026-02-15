import { supabase } from '../config/supabaseClient';

export const getAllExams = async () => {
    const { data, error } = await supabase
        .from('exams')
        .select(`
            *,
            terms:term_id (term_name),
            classes:class_id (class_name),
            academic_years:academic_year_id (year_name)
        `)
        .order('exam_date', { ascending: false });

    if (error) throw error;
    return data;
};

export const createExam = async (examData) => {
    const { data, error } = await supabase
        .from('exams')
        .insert([examData])
        .select();

    if (error) throw error;
    return data;
};

export const deleteExam = async (id) => {
    const { error } = await supabase.from('exams').delete().eq('id', id);
    if (error) throw error;
    return true;
};