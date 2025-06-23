export async function fetchData<T>(url: string, options: RequestInit = {}): Promise<T>{
    try{
        const response = await fetch(url, options);

        if(!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data: T = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching from ${url}:`, error);
        throw error;
    }
}