export async function fetchData(url, options = {}) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error(`Error fetching from ${url}:`, error);
        throw error;
    }
}
