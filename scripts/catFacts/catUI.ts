import { CatFactResponse, CatImageResponse, DogFactResponse } from "./types.js";

const randomFactDisplay = document.getElementById("fact") as HTMLElement;
const randomImageDisplay = document.getElementById("image") as HTMLElement;

export const showCatError = (mensaje: string): void => {
    randomFactDisplay.innerHTML= "";

    const error = document.createElement("p");
    error.textContent = mensaje;
    error.className = 'text-red-400 mt-2 font-medium';
    randomFactDisplay.appendChild(error);
}
export const showCatMessage = (mensaje: string): void  => {
    randomFactDisplay.innerHTML= "";

    const msg = document.createElement("p");
    msg.textContent = mensaje;
    msg.className = 'text-gray-500 mt-2 font-medium';
    randomFactDisplay.appendChild(msg);
}

const isCatFact = (fact: any): fact is CatFactResponse => { // type guard para verificar si es cat/dog fact
    return Array.isArray(fact.data) && typeof fact.data[0] === "string";
}

const isDogFact = (fact: any): fact is DogFactResponse => { // devuelve un "boolean"
    return Array.isArray(fact.data) &&  fact.data[0]?.attributes?.body !== undefined;
}

export function showRandomFact(fact: CatFactResponse | DogFactResponse): void{
    if(!randomFactDisplay) return;

    let text = ""

    if(isCatFact(fact)){
        text = fact.data[0];
    } else if(isDogFact(fact)){
        text = fact.data[0].attributes.body;
    }

    randomFactDisplay.textContent = text;
}

export function showRandomImage(image: CatImageResponse): void{
    if(!randomImageDisplay) return;

    randomImageDisplay.innerHTML = "";

    const img = document.createElement("img");
    img.src = image.url;
    img.alt = "Cute cat";
    img.className = "max-w-xs rounded-lg";

    randomImageDisplay.appendChild(img);
}