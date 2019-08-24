const UserEntity = require("../model/UserEntity");
const { sanitise, encryptPassword } = require("../utils");
module.exports = async function ({ app, uuid }) {
	let Users = require("../data/User");
	// Users
	app.post("/api/user/register", async (req, res) => {
		const { name, username, email, password, phoneNumber } = req.body;
		if (name && username && (email || phoneNumber) && password) {
			const isUserNameUnique = Users.filter((usr = {}) => {
				if (usr.username === username || usr.phoneNumber === phoneNumber || usr.email === email) {
					return usr;
				}
			});
			const isUnique = isUserNameUnique.length === 0;
			if (isUnique) {
				const user = new UserEntity({ _id: uuid(), name, username, password: await encryptPassword(password), email, phoneNumber });
				Users.push(user);
				return res.status(201).send(sanitise(user, ["sessions", "password", "reset"]));
			}
			else return res.status(400).send({ message: "username or email or phonenumber already exist" });
		}
		return res.status(400).send({ message: "One or more Required Parameters [name, username, [email or phoneNumber], password] Missing" });
	});

	app.post("/api/user/login", async (req, res) => {
		const { username, email, password, phoneNumber } = req.body;
		if ((username || email || phoneNumber) && password) {
			const matchedUser = Users.filter(async usr => {
				if ((usr.username === username || usr.email === email || usr.phoneNumber === phoneNumber) && usr.password === (await encryptPassword(password))) {
					return usr;
				}
			});
			if (matchedUser && matchedUser.length === 1) {
				const token = await encryptPassword(uuid());
				Users = Users.map((usr = {}) => {
					if ((usr.username === username || usr.email === email || usr.phoneNumber === phoneNumber)) {
						let u = new UserEntity(usr);
						u.SetSession(token);
						return u;
					}
					return usr;
				});
				return res.send({ message: "Login Successful", token });
			}
			return res.status(401).send({ message: "Credentials doesnt match" });
		}
		return res.status(400).send({ message: "One or more Required Parameters [[username or email or phoneNumber] & password] Missing" });
	});

	app.post("/api/user/verify", async (req, res) => {
		const token =
			(req.headers && req.headers["auth-token"]);
		if (token) {
			let u = undefined;
			const isMatched = [];
			const UsersCopy = [...Users];
			UsersCopy.filter((usr = {}) => {
				if (usr.sessions && usr.sessions.length > 0) {
					usr.sessions.forEach(session => {
						if (session.token === token) {
							u = { ...usr };
							isMatched.push(usr);
						}
					});
				}
			});

			if (isMatched && isMatched.length === 1) {
				return res.send(sanitise(u, ["sessions", "password", "reset"]));
			}
			return res.status(401).send();
		}
		return res.status(401).send({ message: "auth-token Missing" });
	});

};
