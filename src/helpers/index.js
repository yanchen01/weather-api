/* 
  Helper function to extract bearer token from authorization header
*/
function extractToken(header) {
	let authorization = header['authorization'];

	if (authorization) {
		// split the token from "bearer dsajkaslk..." string
		const token = authorization.split(' ')[1];

		if (token.length != 20) {
			return null;
		}

		return token;
	}

	return null;
}

module.exports = { extractToken };
