const bcrypt = require("bcryptjs");
const { SALT } = require("../config");

class User {
	constructor({ _id, name, username, password, email, phoneNumber }) {
		this._id = _id;
		this.name = name;
		this.username = username;
		this.password = password;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.sessions = [];
		this.reset = {};
	}
}

User.prototype.SetSession = function (token) {
	this.sessions.push({
		token,
		lastLogin: new Date(),
		expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day approx
	});
}

User.prototype.SetResetToken = function (token) {
	this.reset = {
		token,
		expires: new Date(Date.now() + 60 * 60 * 1000), // 30 minutes
	}
}

module.exports = User;

