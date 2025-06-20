import { getCatImageUrl } from "../services/imageService.js";
import { getRandomFact } from "../services/factsService.js";
import { CardContent } from "../types/factsTypes.js"

const imageContainer = document.getElementById("image") as HTMLElement;
const factContainer = document.getElementById("fact") as HTMLElement;

const buffer: CardContent[] = []; //buffer de imágenes y facts
let currentIndex = 0;

export async function preloadBuffer(count = 3) {
    while(buffer.length < count){
        const [fact, imageUrl] = await Promise.all([getRandomFact(), getCatImageUrl()]);
        if(fact && imageUrl) {
            buffer.push({ fact, imageUrl });
        }
    }
}

export function showCurrentCard(){
    const current = buffer[currentIndex];
    console.log(buffer);

    if(!current || !imageContainer || !factContainer) return;

    imageContainer.innerHTML= ""
    const img = document.createElement("img");
    img.src = current.imageUrl;
    img.alt = "Cute cat image";
    img.className = "max-w-xs rounded-lg";

    imageContainer.appendChild(img);

    factContainer.textContent = current.fact;
}