const bcrypt = require("bcryptjs");
const { SALT } = require("../config");

module.exports = {
	encryptPassword: function (password) {
		return bcrypt.hash(password, SALT);
	},
	sanitise: (object, keys = []) => {
		keys.forEach(key => delete object[key]);
		return object;
	}

}