import { preloadBuffer, showCurrentCard, handleNextCard } from './ui/catUI.js';
document.addEventListener('DOMContentLoaded', async () => {
    await preloadBuffer();
    showCurrentCard();
    const likeBtn = document.getElementById('like');
    const dislikeBtn = document.getElementById('dislike');
    likeBtn?.addEventListener('click', handleNextCard);
    dislikeBtn?.addEventListener('click', handleNextCard);
});
