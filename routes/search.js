module.exports = function ({ app, Restaurants }) {
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

};
