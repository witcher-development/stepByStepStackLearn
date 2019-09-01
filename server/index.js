const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const admin = require('firebase-admin');

const serviceAccount = require('./stack-learn-firebase-adminsdk-aidxm-6cd53e36ed.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://stack-learn.firebaseio.com"
});

const db = admin.firestore();

app.get('/', async (req, res) => {
	try {
		const response = await db.collection('tasks').get();

		let result = [];
		response.forEach(doc => {
			result.push({
				id: doc.id,
				...doc.data(),
			});
		});

		res.send(result);

	} catch (e) {
		console.log(e);
	}
});

app.post('/create', async (req, res) => {
	try {
		const { name } = req.body;

		const documentReference = await db.collection('tasks').add({
			name,
			subtasks: [],
		});

		const response = await documentReference.get();
		const document = {
			id: response.id,
			...response.data(),
		};

		res.status(200).send(document);

	} catch (e) {
		console.log(e);
		res.status(500).send(e);
	}
});

app.post('/update', async (req, res) => {
	try {
		const { task } = req.body;

		let taskRef = db.collection('tasks').doc(task.id);

		await taskRef.update(task);

		res.status(200).send();

	} catch (e) {
		console.log(e);
		res.status(500).send(e);
	}
});

app.delete('/delete/:id', async (req, res) => {
	try {
		const { id } = req.params;

		let taskRef = db.collection('tasks').doc(id);

		await taskRef.delete();

		res.status(200).send();

	} catch (e) {
		console.log(e);
		res.status(500).send(e);
	}
});

const functions = require('firebase-functions');

exports.app = functions.https.onRequest(app);
