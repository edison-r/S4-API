import { preloadBuffer, showCurrentCard } from './ui/catUI.js';
document.addEventListener('DOMContentLoaded', async () => {
    await preloadBuffer();
    showCurrentCard();
});
