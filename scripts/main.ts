import { preloadBuffer, showCurrentCard, handleNextCard } from "./ui/catUI.js";
import { startWeather } from "./ui/weatherUI.js"
import { handleVote } from "./ui/catUI.js";

startWeather();

document.addEventListener('DOMContentLoaded', async () => {
    await preloadBuffer();
    showCurrentCard();

    const likeBtn = document.getElementById('like') as HTMLElement;
    const dislikeBtn = document.getElementById('dislike')  as HTMLElement;

    likeBtn?.addEventListener('click', handleNextCard);
    dislikeBtn?.addEventListener('click', handleNextCard);

    likeBtn?.addEventListener('click', () => handleVote(true));
    dislikeBtn?.addEventListener('click', () => handleVote(false));
})