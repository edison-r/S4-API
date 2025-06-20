import { CatImageResponse } from "../types/catTypes";

export async function fetchCatImage(): Promise<CatImageResponse | null> {
    const url = `https://cataas.com/cat?json=true&width=250&height=300`;

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Could not load cat photo");
        const data = await res.json();
        return {
            url: `${data.url}`,
        }
    } catch(error) {
        console.log(error);
        return null;
    }
}



