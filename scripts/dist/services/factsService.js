import { fetchData } from "./apiService.js";
import { API_URLS } from "../utils/env.js";
export async function fetchCatFacts() {
    try {
        const data = await fetchData(API_URLS.meowFact);
        return data?.data?.[0] ?? null; // ? optional-chaining: si data existe, y dentro hay otra data (el array), y existe el primer elemento, dámelo.
    }
    catch (error) {
        console.error("Error loading cat fact:", error);
        return null;
    }
}
export async function fetchDogFacts() {
    try {
        const data = await fetchData(API_URLS.dogFact);
        return data?.data?.[0]?.attributes?.body ?? null;
    }
    catch (error) {
        console.error("Error loading dog fact:", error);
        return null;
    }
}
export async function getRandomFact() {
    const isEven = Math.floor((Math.random() * 10) + 1) % 2 === 0;
    const fact = isEven ? await fetchCatFacts() : await fetchDogFacts();
    return fact;
}
