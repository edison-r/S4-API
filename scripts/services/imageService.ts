import { fetchData } from "./apiService.js";
import { API_URLS } from "../utils/env.js";
import { CatImageResponse } from "../types/types.js"

export async function getCatImageUrl(): Promise<string | null>{
    try{
        const data = await fetchData<CatImageResponse>(API_URLS.catImage);
        return `${data.url}`;
    } catch(error){
        console.error("Error loading image:", error)
        return null;        
    }
}