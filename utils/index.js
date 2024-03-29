module.exports = {
	handleRating: (ratings, value) => {
		if (value > 0 && value <= 5) {
			try {
				ratings[value] += 1;
				ratings.total += 1;
				ratings.average = ((ratings["5"] * 5) + (ratings["4"] * 4) + (ratings["3"] * 3) + (ratings["2"] * 2) + (ratings["1"] * 1)) / ratings.total;
				return ratings;
			}
			catch (e) {
				throw new Error(e)
			}
		}
		throw new Error("Invalid Value")
	}
}