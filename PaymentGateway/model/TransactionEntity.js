const uuid = require("uuid/v4");

class Transaction {
	constructor(id, amount) {
		this._id = id;
		this.amount = amount;
		this.info = {}
	}
}

Transaction.prototype.makeUPIPayment = function ({ upi }) {
	console.log(`Making UPI payment for amount ${this.amount} from ID ${upi}`);
	this.info = {
		_id: uuid(),
		type: "upi",
		upi,
		amount: this.amount,
		isSuccess: true,
		message: "Transaction Successful"
	}
}

Transaction.prototype.makeCARDPayment = function ({ cardnumber, validUpTo }) {
	console.log(`Making Card payment for amount ${this.amount} from Card No ${cardnumber}`);
	this.info = {
		_id: uuid(),
		type: "card",
		cardnumber,
		validUpTo,
		amount: this.amount,
		isSuccess: true,
		message: "Transaction Successful"
	}
}

Transaction.prototype.makeNETBANKINGPayment = function ({ accountNumber, bank, ifsc }) {
	console.log(`Making NetBanking payment for amount ${this.amount} from Bank ${bank} [IFSC:${ifsc}] of ${accountNumber}`);
	this.info = {
		_id: uuid(),
		type: "netbanking",
		accountNumber,
		bank,
		ifsc,
		amount: this.amount,
		isSuccess: true,
		message: "Transaction Successful"
	}
}

module.exports = Transaction;