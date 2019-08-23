const http = require("./http");

module.exports = {
	payment: {
		list: (url) => {
			return http.get(url);
		},
		get: (url) => {
			return http.get(url);
		},
		debit: (url, payload) => {
			return http.post(url, payload);
		}
	}
}