import { getCatImageUrl } from "../services/imageService.js";
import { getRandomFact } from "../services/factsService.js";
import { rateFact } from '../services/rateService.js';
const imageContainer = document.getElementById("image");
const factContainer = document.getElementById("fact");
const buffer = []; //buffer de imágenes y facts
let currentIndex = 0;
export async function preloadBuffer(count = 3) {
    while (buffer.length < count) {
        const [fact, imageUrl] = await Promise.all([getRandomFact(), getCatImageUrl()]);
        if (fact && imageUrl) {
            buffer.push({ fact, imageUrl });
        }
    }
}
export function fadeIn(element) {
    requestAnimationFrame(() => {
        element.classList.remove('opacity-0');
        element.classList.add('transition-opacity', 'duration-500');
    });
}
export function showCurrentCard() {
    const current = buffer[currentIndex];
    if (!current || !imageContainer || !factContainer)
        return;
    imageContainer.innerHTML = "";
    const img = document.createElement("img");
    img.src = current.imageUrl;
    img.alt = "Cute cat image";
    img.className = "opacity-0 transition-opacity duration-500 max-w-xs rounded-lg";
    imageContainer.appendChild(img);
    factContainer.innerHTML = "";
    const p = document.createElement("p");
    p.textContent = current.fact;
    factContainer.appendChild(p);
    fadeIn(img);
    fadeIn(p);
}
export function handleNextCard() {
    buffer.shift(); // quito la carta que se muestra
    currentIndex = 0;
    showCurrentCard();
    preloadBuffer();
}
export function handleVote(liked) {
    const current = buffer[0];
    if (!current)
        return;
    rateFact(current.fact, liked);
    handleNextCard();
}
