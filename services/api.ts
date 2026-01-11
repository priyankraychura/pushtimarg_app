// src/api.ts

const BASE_URL = 'https://pushtimarg-api.netlify.app';

// 1. Fetch the Master List (Metadata only)
export const getMasterList = async () => {
    try {
        const response = await fetch(`${BASE_URL}/index.json`);
        if (!response.ok) throw new Error('Failed to fetch master list');
        return await response.json();
    } catch (error) {
        console.error("Master List API Error:", error);
        throw error;
    }
};

// 2. Fetch Specific Bhajan Details (Lyrics, etc.)
export const getBhajanDetails = async (filename: string) => {
    try {
        // We construct the URL using the filename from the master list
        const response = await fetch(`${BASE_URL}/aartis/${filename}`);
        if (!response.ok) throw new Error(`Failed to fetch details for ${filename}`);
        return await response.json();
    } catch (error) {
        console.error("Detail API Error:", error);
        throw error;
    }
};

// --- VARTA API (NEW) ---

export type VartaType = '84' | '252';

// 3. Fetch Varta Master List (84 or 252)
export const getVartaList = async (type: VartaType) => {
    try {
        // Fetches 'index_84.json' or 'index_252.json'
        const filename = `index_${type}.json`;
        const response = await fetch(`${BASE_URL}/${filename}`);
        
        if (!response.ok) throw new Error(`Failed to fetch ${type} Vaishnav list`);
        return await response.json();
    } catch (error) {
        console.error("Varta List API Error:", error);
        throw error;
    }
};

// 4. Fetch Prasang Content
export const getPrasangContent = async (filePath: string) => {
    try {
        // filePath includes folder, e.g. "84/v84_1_p1.json"
        const response = await fetch(`${BASE_URL}/varta/${filePath}`);
        
        if (!response.ok) throw new Error('Failed to fetch Prasang content');
        return await response.json();
    } catch (error) {
        console.error("Prasang Content API Error:", error);
        throw error;
    }
};