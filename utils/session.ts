// utils/session.ts
export const getSession = () => {
    try {
        // ดึงข้อมูล session จาก localStorage
        const session = localStorage.getItem('session');
        return session ? JSON.parse(session) : null;
    } catch (error) {
        console.error('Error getting session:', error);
        return null;
    }
};

export const setSession = (data: any) => {
    try {
        localStorage.setItem('session', JSON.stringify(data));
    } catch (error) {
        console.error('Error setting session:', error);
    }
};

export const clearSession = () => {
    try {
        localStorage.removeItem('session');
    } catch (error) {
        console.error('Error clearing session:', error);
    }
};