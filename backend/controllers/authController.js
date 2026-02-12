import { supabase } from '../config/supabaseClient.js';

export const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;

        // Session and User details-ah response-ah anupuvom
        res.status(200).json({
            message: "Login Successful",
            session: data.session,
            user: data.user
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};