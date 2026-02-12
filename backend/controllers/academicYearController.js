import { supabase } from '../config/supabaseClient.js';

// Get All Years
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

// Create Year with Auto-Archive Logic
export const createAcademicYear = async (req, res) => {
    try {
        const { year_name, start_date, end_date, is_active } = req.body;

        if (is_active) {
            // New year active-ah irundha, existing active years-ah archive pannuvom
            await supabase
                .from('academic_years')
                .update({ is_active: false, is_archived: true })
                .eq('is_active', true);
        }

        const { data, error } = await supabase
            .from('academic_years')
            .insert([{ 
                year_name, 
                start_date, 
                end_date, 
                is_active, 
                is_archived: !is_active 
            }])
            .select();

        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update Status (Manual Activation)
export const updateYearStatus = async (req, res) => {
    const { id } = req.params;
    try {
        // First, deactivate all
        await supabase.from('academic_years').update({ is_active: false, is_archived: true }).neq('id', id);
        // Then activate selected
        const { data, error } = await supabase
            .from('academic_years')
            .update({ is_active: true, is_archived: false })
            .eq('id', id);

        if (error) throw error;
        res.json({ message: "Status Updated" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};