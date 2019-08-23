const { debit } = require("../externalServices/payment");

module.exports = function ({ app, uuid, User, utils: { calculatePrice } }) {
	const Restaurants = require("../data/Restaurants");
	app.get("/api/user/cart/item", async (req, res) => {
		return res.send(User.cart);
	});
	app.put("/api/user/cart/item", async (req, res) => {
		//Body: keyword
		const { item: { restaurantId, dishId }, quantity } = req.body;

		if (restaurantId && dishId) {
			const restaurant = Restaurants.filter(restaurant => {
				if (restaurant._id === restaurantId) {
					return restaurant;
				}
			});
			if (!restaurant || restaurant.length == 0) return res.send({ message: "Restaurant not found" });
			let dish = restaurant[0].dishes.filter(dish => {
				if (dish._id === dishId) return dish;
			});
			if (!dish || dish.length == 0) return res.send({ message: "dish not found" });
			dish[0].restaurantId = restaurantId;
			User.cart.push({
				_id: uuid(),
				item: dish[0],
				quantity,
			});

			return res.send({ message: "Added to the cart" });
		}
		return res.status(400).send({ message: "Item properties are missing" });
	});
	app.delete("/api/user/cart/item/:id", async (req, res) => {
		//Body: keyword
		const { id } = req.params;
		let isRemoved = false;
		if (id) {
			User.cart = User.cart.filter(item => {
				if (item._id !== id) {
					return item;
				}
				else {
					isRemoved = true;
				}
			});
			if (isRemoved) return res.send({ message: "item removed" });
			else return res.status(400).send({ message: "item not in the cart" });
		}
		return res.status(400).send({ message: "id missing" });
	});

	app.get("/api/user/order", async (req, res) => {
		return res.send(User.orders);
	});
	app.put("/api/user/order/place", async (req, res) => {
		let { address } = req.body;
		if (!address) {
			address = User.address.filter((ad = {}) => ad.primary === true);
		}
		else if (address && address.length > 0) {
			User.address.push({
				primary: true,
				value: address
			});
		}

		if (address && address.length > 0) {
			let order = {
				_id: uuid(),
				items: User.cart,
				price: calculatePrice(User.cart),
				address,
			}
			User.orders.push(order)

			return res.send({ message: "Order Initialted", order });
		}
		return res.status(400).send({ message: "No Address info available" });
	});

	app.put("/api/user/order/:id/checkout", async (req, res) => {
		const { mode, context } = req.body;
		const { id } = req.params;

		if (id && mode && context) {
			try {
				const order = User.orders.filter(item => {
					if (item._id == id) {
						return item;
					}
				});

				if (order.length == 1) {
					const txnResult = await debit(order[0].price.total, mode, context);
					return res.send({ message: "Order Placed", order, txn: txnResult.data });
				}
				return res.send({ message: "Order not found" });

			}
			catch (e) {
				return res.send({ message: `Unable to place order due to ${e.message}` });
			}
		}
		return res.status(400).send({ message: "any one of id, mode or context missing" });
	});

	app.delete("/api/user/order/:id", async (req, res) => {

		const { id } = req.params;
		let isRemoved = false;
		if (id) {
			User.orders = User.orders.filter(item => {
				if (item._id !== id) {
					return item;
				}
				else {
					isRemoved = true;
				}
			});
			if (isRemoved) return res.send({ message: "Order Cancelled" });
			else return res.status(400).send({ message: "Order not found" });
		}
		return res.status(400).send({ message: "id missing" });
	});



};
