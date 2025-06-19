import { showRandomFact, showCatError } from "./catUI.js";
export async function fetchCatFacts() {
    const url = `https://meowfacts.herokuapp.com/`;
    try {
        const res = await fetch(url);
        if (!res.ok)
            throw new Error("Could not load cat curiosity");
        return await res.json();
    }
    catch (error) {
        console.log(error);
        return null;
    }
}
export async function fetchDogFacts() {
    const url = `https://dogapi.dog/api/v2/facts`;
    try {
        const res = await fetch(url);
        if (!res.ok)
            throw new Error("Could not load dog curiosity");
        return await res.json();
    }
    catch (error) {
        console.log(error);
        return null;
    }
}
export async function getRandomFact() {
    let randomNum = Math.floor(Math.random() * 10) + 1;
    if (randomNum % 2 === 0) {
        const catFact = await fetchCatFacts();
        catFact ? showRandomFact(catFact) : showCatError("Error loading the curiosity");
    }
    else {
        const dogFAct = await fetchDogFacts();
        dogFAct ? showRandomFact(dogFAct) : showCatError("Error loading the curiosity");
    }
}
