module.exports = function ({ app }) {
	const Restaurants = require("../data/Restaurants");
	const handleRating = require("../utils").handleRating;
	app.post("/api/restaurant/rating", async (req, res) => {
		//Query: keyword
		const { name, value } = req.body;
		if (name && value) {

			Restaurants.filter(restaurant => {
				if (restaurant.name.toLowerCase() === name.toLowerCase()) {
					restaurant.ratings = handleRating(restaurant.ratings, value);
				}
			});

			return res.send();
		}
		return res.status(400).send({ message: "name / value missing as a body parameter" });
	});

};
