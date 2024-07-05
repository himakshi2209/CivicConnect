
// // Register module/require aliases
// require('module-alias/register');


// // Patches
// const {inject, errorHandler} = require('express-custom-error');
// inject(); // Patch express in order to use async / await syntax

// // Require Dependencies

// const express = require('express');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
// const helmet = require('helmet');


// const logger = require('@util/logger');

// // Load .env Enviroment Variables to process.env

// require('mandatoryenv').load([
//     'DB_URL',
//     'PORT',
//     'SECRET'
// ]);

// const { PORT } = process.env;


// // Instantiate an Express Application
// const app = express();


// // Configure Express App Instance
// app.use(express.json( { limit: '50mb' } ));
// app.use(express.urlencoded( { extended: true, limit: '10mb' } ));

// // Configure custom logger middleware
// app.use(logger.dev, logger.combined);

// app.use(cookieParser());
// app.use(cors());
// app.use(helmet());

// // This middleware adds the json header to every response
// app.use('*', (req, res, next) => {
//     res.setHeader('Content-Type', 'application/json');
//     next();
// })

// // Assign Routes

// app.use('/', require('@routes/router.js'));


// // Handle errors
// app.use(errorHandler());

// // Handle not valid route
// app.use('*', (req, res) => {
//     res
//     .status(404)
//     .json( {status: false, message: 'Endpoint Not Found'} );
// })

// // Open Server on selected Port
// app.listen(
//     PORT,
//     () => console.info('Server listening on port ', PORT)
// );

// // Register module/require aliases
//require('module-alias/register');


// // Patches
const {inject, errorHandler} = require('express-custom-error');
inject(); // Patch express in order to use async / await syntax

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
mongoose.connect(
'mongodb://localhost:27017/societyDB',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	});


const requestSchema = new mongoose.Schema({
	residentName: { type: String, required: true },
	content: { type: String, required: true },
	likes: { type: Number, default: 0 },
});

const Request =
	mongoose.model('Request', requestSchema);

// Create a new request
app.post('/requests', async (req, res) => {
	try {
		const { residentName, content } = req.body;
		const newRequest =
			new Request({ residentName, content });
		const savedRequest = await newRequest.save();
		res.json(savedRequest);
	} catch (error) {
		res.status(500)
			.json({ error: 'Internal Server Error' });
	}
});

// Get all requests
app.get('/requests', async (req, res) => {
	try {
		const requests = await Request.find();
		res.json(requests);
	} catch (error) {
		res.status(500)
			.json(
				{
					error: 'Internal Server Error'
				}
			);
	}
});

// Like a request
app.patch('/requests/:id/like', async (req, res) => {
	try {
		const { id } = req.params;
		const updatedRequest =
			await Request.findByIdAndUpdate(
				id,
				{ $inc: { likes: 1 } },
				{ new: true });
		res.json(updatedRequest);
	} catch (error) {
		res.status(500)
			.json(
				{
					error: 'Internal Server Error'
				}
			);
	}
});

// Delete a request
app.delete('/requests/:id', async (req, res) => {
	try {
		const { id } = req.params;
		await Request.findByIdAndDelete(id);
		res.json(
			{
				message: 'Request deleted successfully'
			}
		);
	} catch (error) {
		res.status(500)
			.json(
				{
					error: 'Internal Server Error'
				}
			);
	}
});
// Example: routes/requests.js

const router = express.Router();


app.listen(PORT,
	() =>
		console.log(
			`Server is running on port ${PORT}`
		)
);
