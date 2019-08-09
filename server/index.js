const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const admin = require('firebase-admin');

const serviceAccount = require('./stack-learn-firebase-adminsdk-aidxm-6cd53e36ed.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://stack-learn.firebaseio.com"
});

const db = admin.firestore();

app.get('/', (req, res) => {
	db.collection('tasks').get()
		.then(snap => {
			let result = [];
			snap.forEach(doc => {
				result.push({
					id: doc.id,
					...doc.data(),
				});
			});
			res.send(result);
		})
		.catch(e => console.log(e));
});

// db.collection('tasks').add({
// 	name: 'new task',
// 	subtasks: [
// 		{
// 			name: 'new subtask',
// 			id: 'teststest',
// 		}
// 	],
// }).then(res => {
// 	console.log(res);
// });

app.listen(3001);
