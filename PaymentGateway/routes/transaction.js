module.exports = function ({ app, Transactions }) {
	app.get("/api/transactions", async (req, res) => {
		return res.send(Transactions);
	});
	app.post("/api/transactions", async (req, res) => {
		return res.send("yet to complete")
	});

};
