import { FactRating } from '../types/catTypes.js';

const factRatings: FactRating[] = [];

export function rateFact(fact: string, liked: boolean): void {
    const existingRating = factRatings.find(rating => rating.fact === fact);
    if (existingRating) {
        existingRating.liked = liked;
    } else {
        factRatings.push({ fact, liked });
    }
}

export function getFactRatings(): FactRating[] {
  return factRatings;
}
