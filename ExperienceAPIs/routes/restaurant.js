module.exports = function ({ app, Restaurants, utils: { handleRating } }) {

	// Search
	app.get("/api/restaurant/search", async (req, res) => {
		//Query: keyword
		const { keyword } = req.query;
		let filtered = []; // results matching the query

		if (keyword) {

			Restaurants.filter(restaurant => {
				if (restaurant.name.toLowerCase().includes(keyword.toLowerCase())) filtered.push(restaurant);
				else {
					restaurant.dishes.forEach(dish => {
						if (dish.name.toLowerCase().includes(keyword.toLowerCase())) filtered.push(restaurant);
						else {
							dish.keywords.forEach(key => {
								if (key.toLowerCase().includes(keyword.toLowerCase())) filtered.push(restaurant)
							});
						}
					});
				}
			});

			return res.send(filtered);
		}
		return res.send(Restaurants);
	});

	// Rating
	app.post("/api/restaurant/rating", async (req, res) => {
		try {
			const { name, value } = req.body;
			if (name && value) {

				Restaurants.filter(restaurant => {
					if (restaurant.name.toLowerCase() === name.toLowerCase()) {
						restaurant.ratings = handleRating(restaurant.ratings, value);
					}
				});

				return res.send({ message: "Thanks for your ratings!" });
			}
			return res.status(400).send({ message: "name / value missing as a body parameter" });
		}
		catch (e) {
			return res.status(500).send({ message: e.message });
		}
	});

};
