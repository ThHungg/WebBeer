// utils/auth.js
import { jwtDecode } from "jwt-decode";

export const getUserId = () => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) return null;
        const decoded = jwtDecode(token);
        return decoded?.id || null;
    } catch (error) {
        console.error("Invalid token", error);
        return null;
    }
};
