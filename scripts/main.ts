import { fetchCatFacts, getRandomFact } from "./catFacts/catApi.js";
import { getUserLocation } from "./weather/weatherApi.js";

getUserLocation();
getRandomFact();