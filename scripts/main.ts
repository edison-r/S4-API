import { getRandomFact } from "./catFacts/catApi.js";
import { getUserLocation } from "./weather/weatherApi.js";
import { fetchCatImage } from "./catFacts/catImg.js";
import { showRandomImage } from "./catFacts/catUI.js"


getUserLocation();
getRandomFact();

async function mostrarImagen() {
  const imgData = await fetchCatImage();
  if (imgData) showRandomImage(imgData);
}

mostrarImagen();