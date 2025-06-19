import { getRandomFact } from "./catFacts/factsApi.js";
import { getUserLocation } from "./weather/weatherApi.js";
import { showImage } from "./catFacts/catUI.js";
getUserLocation();
getRandomFact();
showImage();
