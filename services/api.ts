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