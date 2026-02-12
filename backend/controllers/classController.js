import { supabase } from '../config/supabaseClient.js';

// Get All Classes with Year Name (Joining Tables)
export const getClasses = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('classes')
            .select(`
                *,
                academic_years (year_name)
            `)
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Create New Class
export const createClass = async (req, res) => {
    try {
        const { class_name, edu_level, academic_year_id, room_number } = req.body;
        const { data, error } = await supabase
            .from('classes')
            .insert([{ class_name, edu_level, academic_year_id, room_number }])
            .select();

        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};