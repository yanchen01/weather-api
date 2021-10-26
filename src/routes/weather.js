const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const { body, validationResult } = require('express-validator');

const { extractToken } = require('../helpers/index');

/* 
 *********Constants*********
*/
const API_URI = 'http://api.weatherapi.com/v1/forecast.json';
const WEATHER_API_KEY = process.env['WEATHER_API_KEY'];
const ZIP_CODE_LENGTH = 5;

/* ******************
	POST /api/weather/ 
	Req Body: {
		zipcode: String
	}
	******************
*/
router.post(
	'/',
	body('zipcode').isString().isLength({ min: ZIP_CODE_LENGTH, max: ZIP_CODE_LENGTH }),
	async (req, res) => {
		// validate the body params
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const token = extractToken(req.headers);

		if (!token) {
			return res.status(403).send({
				message: 'Not Authorized'
			});
		}

		// extract body params
		const { zipcode } = req.body;

		// make a request to weather API
		try {
			const response = await axios.get(`${API_URI}?key=${WEATHER_API_KEY}&q=${zipcode}&days=1&aqi=no&alerts=no`);

			return res.status(200).send({ message: response.data });
		} catch (e) {
			return res.status(400).send({ message: e.message });
		}
	}
);

/* 
	******************
	POST /api/weather/list
	Req Body: {
		zipcode: String,
		days: Int
	}
	******************
*/
router.post(
	'/list',
	body('zipcode').isString().isLength({ min: ZIP_CODE_LENGTH, max: ZIP_CODE_LENGTH }),
	body('days').exists().isInt(),
	async (req, res) => {
		// validate the body params
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const token = extractToken(req.headers);

		if (!token) {
			return res.status(403).send({
				message: 'Not Authorized'
			});
		}

		// extract body params
		const { zipcode, days } = req.body;

		// make a request to weather API
		try {
			const response = await axios.get(
				`${API_URI}?key=${WEATHER_API_KEY}&q=${zipcode}&days=${days}&aqi=no&alerts=no`
			);

			return res.status(200).send({ message: response.data });
		} catch (e) {
			return res.status(400).send({ message: e.message });
		}
	}
);

router.post;

module.exports = router;
