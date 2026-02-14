import { supabase } from '../config/supabaseClient';

export const getAssignments = async () => {
    const { data, error } = await supabase
        .from('teacher_assignments')
        .select(`
            *,
            teachers (full_name),
            subjects (subject_name),
            sections (
                section_name, 
                classes:class_id (class_name)
            ),
            academic_years (year_name)
        `)
        .order('id', { ascending: false });
    
    if (error) throw error;
    return { data };
};

export const createAssignment = async (assignmentData) => {
    const { data, error } = await supabase
        .from('teacher_assignments')
        .insert([assignmentData])
        .select();

    if (error) throw error;
    return { data };
};