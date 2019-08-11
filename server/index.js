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

async function getData() {
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

app.get('/', async (req, res) => {
	res.send(await getData());
});

app.post('/create', (req, res) => {
	const { name, parentId } = req.body;

	if (parentId) {

	}

});

app.post('/update', (req, res) => {
	const { name, id } = req.body;

	if (parentId) {

	}
});

db.collection('tasks').doc('84wFSI18mMhuAvtXMq66').get().then(res => console.log(res.data()));

app.listen(3001);
