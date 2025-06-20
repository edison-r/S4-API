import { preloadBuffer, showCurrentCard, handleNextCard } from "./ui/catUI.js";
import { getUserLocation } from "./services/userLocation.js";
import { renderWeather } from "./ui/weatherUI.js";
document.addEventListener('DOMContentLoaded', async () => {
    await preloadBuffer();
    showCurrentCard();
    const likeBtn = document.getElementById('like');
    const dislikeBtn = document.getElementById('dislike');
    likeBtn?.addEventListener('click', handleNextCard);
    dislikeBtn?.addEventListener('click', handleNextCard);
});
async function startWeather() {
    const { lat, lon } = await getUserLocation();
    renderWeather(lat, lon);
}
startWeather();
