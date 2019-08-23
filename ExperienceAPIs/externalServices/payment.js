const api = require("./api");
const { PAYMENT_URI } = require("../config").services;

const base = `${PAYMENT_URI}/api`;

module.exports = {
	list: async () => {
		return await api.payment.list(`${base}/transaction`);
	},
	get: async (id) => {
		return await api.payment.get(`${base}/transaction/${id}`);
	},
	debit: async (amount, mode, context) => {
		return await api.payment.debit(`${base}/transaction/debit`, { amount, mode, context });
	}
}