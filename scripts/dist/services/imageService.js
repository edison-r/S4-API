import { fetchData } from "./apiService.js";
import { API_URLS } from "../utils/env.js";
export async function getCatImageUrl() {
    try {
        const data = await fetchData(API_URLS.catImage);
        return `${data.url}`;
    }
    catch (error) {
        console.error("Error loading image:", error);
        return null;
    }
}
