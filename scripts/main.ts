import { getRandomFact } from "./services/factsApi.js";
import { getUserLocation } from "./services/weatherApi.js";
import { showImage } from "./ui/catUI.js";

getUserLocation();
getRandomFact();

showImage();