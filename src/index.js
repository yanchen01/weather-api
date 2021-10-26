const express = require('express');
const cors = require('cors');

const app = express();

const weatherRouter = require('./routes/weather');

app.set('trust proxy', true);
app.use(express.json());
app.use(cors());

app.use('/api/weather', weatherRouter);

app.get('*', (req, res) => {
	res.status(403).send({
		message: 'Invalid Access'
	});
});

const start = () => {
	app.listen(3000, () => {
		console.log('Listening on port 3000...');
	});
};

start();
