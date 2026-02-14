import { supabase } from '../config/supabaseClient';

export const loginAdmin = async (email, password) => {
    // Direct-ah supabase auth kitta login request kudukrom
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw error;
    return data; // Ithula session and user details irukkum
};

export const logoutAdmin = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
};