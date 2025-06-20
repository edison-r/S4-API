const ratedFacts = [];
export function rateFact(fact, liked) {
    ratedFacts.push({
        text: fact,
        liked,
        timestamp: Date.now()
    });
    console.log("Rated facts", ratedFacts);
}
