import { getFactRatings, rateFact } from "./rateFacts.js";
import { fetchCatImage } from "../services/catImg.js";
import { getRandomFact } from "../services/factsApi.js";
const randomFactDisplay = document.getElementById("fact");
const randomImageDisplay = document.getElementById("image");
const likeButton = document.getElementById("like");
const dislikeButton = document.getElementById("dislike");
const isCatFact = (fact) => {
    return Array.isArray(fact.data) && typeof fact.data[0] === "string";
};
const isDogFact = (fact) => {
    return Array.isArray(fact.data) && fact.data[0]?.attributes?.body !== undefined;
};
export function showRandomFact(fact) {
    if (!randomFactDisplay)
        return;
    let text = "";
    if (isCatFact(fact)) {
        text = fact.data[0];
    }
    else if (isDogFact(fact)) {
        text = fact.data[0].attributes.body;
    }
    randomFactDisplay.textContent = text;
}
export function showRandomImage(image) {
    if (!randomImageDisplay)
        return;
    randomImageDisplay.innerHTML = "";
    const img = document.createElement("img");
    img.src = image.url;
    img.alt = "Cute cat";
    img.className = "max-w-xs rounded-lg";
    randomImageDisplay.appendChild(img);
}
export async function showImage() {
    const imgData = await fetchCatImage();
    if (imgData)
        showRandomImage(imgData);
}
likeButton.addEventListener("click", () => {
    const factText = randomFactDisplay.textContent;
    if (factText) {
        rateFact(factText, true);
        showImage();
        getRandomFact();
        console.log("Fact ratings:", getFactRatings());
    }
});
dislikeButton.addEventListener("click", () => {
    const factText = randomFactDisplay.textContent;
    if (factText) {
        rateFact(factText, false);
        showImage();
        getRandomFact();
        console.log("Fact ratings:", getFactRatings());
    }
});
