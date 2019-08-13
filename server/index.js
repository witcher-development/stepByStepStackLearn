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

	const response = await getData();

	let alreadyUsed = [];
	let result = [];

	for (let i = 0; i < response.length; i++) {
		let task = response[i];

		if (alreadyUsed.indexOf(task.id) > -1) continue;

		let [cutArrayOfSubTasks, filledTask] = recursiveFillOneBranchOfTasksTree(response, task);

		alreadyUsed = response.filter(t => cutArrayOfSubTasks.indexOf(t.id) === -1);
		result.push(filledTask);
	}

	console.log(result);

	res.send(result);
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

// db.collection('tasks').doc('84wFSI18mMhuAvtXMq66').get().then(res => console.log(res.data()));

app.listen(3001);

const recursiveFillOneBranchOfTasksTree = (commonArray, task) => {

	let [usedIds, filledTask] = fillSubTasks(commonArray, task);
	console.log('ids: \n', usedIds, 'task: \n', filledTask);
	let cutCommonArray = commonArray.filter(t => usedIds.indexOf(t.id) === -1);
	console.log('cut array: \n', cutCommonArray);

	let filledSubTasks = filledTask.subtasks.map(t => {
		if (t.subtasks.length) {

			let [cutSubArray, filledSubTask] = recursiveFillOneBranchOfTasksTree(cutCommonArray, t);
			cutCommonArray = commonArray.filter(sub => cutSubArray.indexOf(sub) === -1);

			return filledSubTask;

		} else {
			return t;
		}
	});

	filledTask.subtasks = filledSubTasks;

	return [cutCommonArray, filledTask];
};

const fillSubTasks = (commonArray, task) => {
	let alreadyUsed = [];
	let filledTask = Object.assign({}, task);

	// console.log('array: \n', commonArray);
	// console.log('task: \n', task);

	filledTask.subtasks = filledTask.subtasks.map(id => {

		let subTask = commonArray.find(sub => sub.id === id);
		alreadyUsed.push(subTask.id);

		return subTask;
	});

	// console.log('filled: \n', filledTask);

	return [alreadyUsed, filledTask];
};
