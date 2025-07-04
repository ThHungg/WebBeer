const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getFullImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http") || path.startsWith("https")) return path;
    return BACKEND_URL + path;
};