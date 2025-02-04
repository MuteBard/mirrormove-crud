const { JWT } = require("./settings");
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
	const token = req.headers["authorization"];

	if (!token) {
		return res.status(403).send("A token is required for authentication");
	}

	try {
		const decoded = jwt.verify(token.split(" ")[1].trim(), JWT.secret);
	} catch (err) {
		return res.status(401).send(`Invalid Token: ${err}`);
	}
	return next();
};

const handleError = async (err, req, res, next) => {
	const reponse = {
		data: null,
		error: err.message || 'Something went wrong'
	}
	console.log(err)
	res.status(500).json(reponse);
}

exports.verifyToken = verifyToken;
exports.handleError = handleError;