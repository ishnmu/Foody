module.exports = function ({ app, uuid, User, utils: { calculatePrice } }) {
	app.get("/api/user/cart/item", async (req, res) => {
		return res.send(User.cart);
	});
	app.put("/api/user/cart/item", async (req, res) => {
		//Body: keyword
		const { item, quantity } = req.body;

		if (item) {

			User.cart.push({
				_id: uuid(),
				item,
				quantity,
			});

			return res.send({ message: "Added to the cart" });
		}
		return res.status(400).send({ message: "Items is empty" });
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
	app.put("/api/user/order", async (req, res) => {
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
