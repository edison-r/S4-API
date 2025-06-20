import { RatedFact } from "../types/types.js"

const ratedFacts: RatedFact[] = [];

export function rateFact(fact: string, liked: boolean): void {
  ratedFacts.push({
    text: fact,
    liked,
    timestamp: Date.now()
  })

  console.log("Rated facts",ratedFacts);
}

