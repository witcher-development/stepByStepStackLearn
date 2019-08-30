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

async function getTasks() {
	try {
		const response = await db.collection('tasks').get();

		let result = [];
		response.forEach(doc => {
			result.push({
				id: doc.id,
				...doc.data(),
			});
		});
		return result;

	} catch (e) {
	  console.log(e);
	}
}

app.post('/create', (req, res) => {
	const { name, parentId } = req.body;

	if (parentId) {

	}

});

app.post('/update', async (req, res) => {
	try {
		const { task } = req.body;

		let taskRef = db.collection('tasks').doc(task.id);

		let result = await taskRef.update(task);

		res.status(200).send(true);

	} catch (e) {
		console.log(e);
		res.status(500).send(e);
	}
});

// db.collection('tasks').doc('84wFSI18mMhuAvtXMq66').get().then(res => console.log(res.data()));

app.get('/', async (req, res) => {

	const result = await getTasks();

	res.send(result);
});

app.listen(3001);
