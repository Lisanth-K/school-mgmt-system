import { supabase } from '../config/supabaseClient.js';

export const getAcademicYears = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('academic_years')
            .select('*')
            .order('start_date', { ascending: false });
        
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const createAcademicYear = async (req, res) => {
    try {
        const { year_name, start_date, end_date, is_active } = req.body;

        // If this year is active, deactivate others (Professional logic)
        if (is_active) {
            await supabase
                .from('academic_years')
                .update({ is_active: false, is_archived: true })
                .neq('id', '00000000-0000-0000-0000-000000000000'); 
        }

        const { data, error } = await supabase
            .from('academic_years')
            .insert([{ year_name, start_date, end_date, is_active, is_archived: !is_active }])
            .select();

        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};