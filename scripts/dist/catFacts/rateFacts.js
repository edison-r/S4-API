const factRatings = [];
export function rateFact(fact, liked) {
    const existingRating = factRatings.find(rating => rating.fact === fact);
    if (existingRating) {
        existingRating.liked = liked;
    }
    else {
        factRatings.push({ fact, liked });
    }
    console.log(factRatings);
}
export function getFactRatings() {
    return factRatings;
}
