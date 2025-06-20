const factRatings = [];
export function rateFact(fact, liked) {
    const existingRating = factRatings.find(rating => rating.fact === fact);
    if (existingRating) {
        existingRating.liked = liked;
    }
    else {
        factRatings.push({ fact, liked });
    }
}
export function getFactRatings() {
    return factRatings;
}
