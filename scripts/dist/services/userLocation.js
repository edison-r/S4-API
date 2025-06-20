export async function getUserLocation() {
    let lat = 41.3888;
    let lon = 2.159; // Barcelona por defecto
    if (navigator.geolocation) {
        try {
            const position = await new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));
            lat = position.coords.latitude;
            lon = position.coords.longitude;
        }
        catch {
            console.warn("Usando ubicación por defecto (Barcelona)");
        }
    }
    return { lat, lon };
}
