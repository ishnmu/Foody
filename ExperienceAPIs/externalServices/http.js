const axios = require("axios").default;

module.exports = {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
}