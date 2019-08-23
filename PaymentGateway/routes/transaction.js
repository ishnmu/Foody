const TransactionEntity = require("../model/TransactionEntity")
module.exports = function ({ app, uuid, Transactions = [] }) {

	// Transactions
	app.get("/api/transaction", async (req, res) => {
		return res.send(Transactions);
	});

	app.get("/api/transaction/:id", async (req, res) => {

		const { id } = req.params;
		let isFound = false;
		if (id) {
			const transaction = Transactions.filter((txn = {}) => {
				if (txn._id === id) {
					isFound = true;
					return txn;
				}
			});
			if (isFound && transaction.length == 1) return res.send(transaction[0]);
			else return res.status(400).send({ message: "transaction not found" });
		}
		return res.status(400).send({ message: "id missing" });
	});

	app.post("/api/transaction/debit", async (req, res) => {
		try {
			const { amount, mode, context } = req.body;
			if (amount && mode && context) {
				let transaction = new TransactionEntity(uuid(), amount);
				transaction[`make${mode}Payment`](context);
				Transactions.push(transaction);
				return res.send(transaction);
			}
			return res.status(400).send({ message: "any one of amount, mode, context is missing" });
		}
		catch (e) {
			return res.status(500).send({ message: e.message });
		}
	});

};
