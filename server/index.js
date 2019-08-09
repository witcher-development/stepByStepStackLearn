const express = require('express');
// const firebase = require("firebase/app");

const admin = require('firebase-admin');

const firebaseConfig = {
	apiKey: "AIzaSyBOdT_RT23sDEcoUkSXRDgEUcVWTxrPRag",
	authDomain: "stack-learn.firebaseapp.com",
	databaseURL: "https://stack-learn.firebaseio.com",
	projectId: "stack-learn",
	storageBucket: "",
	messagingSenderId: "728880840563",
	appId: "1:728880840563:web:1ca1536b628ad6ae"
};
// firebase.initializeApp(firebaseConfig);
admin.initializeApp({
	firebaseConfig
});

const db = admin.firestore();
db.collection('tasks').get()
	.then(res => {
		console.log(res);
	})
	.catch(e => console.log(e));

// const app = express();
//
// const firebaseConfig = {
// 	apiKey: "AIzaSyBOdT_RT23sDEcoUkSXRDgEUcVWTxrPRag",
// 	authDomain: "stack-learn.firebaseapp.com",
// 	databaseURL: "https://stack-learn.firebaseio.com",
// 	projectId: "stack-learn",
// 	storageBucket: "",
// 	messagingSenderId: "728880840563",
// 	appId: "1:728880840563:web:1ca1536b628ad6ae"
// };
// firebase.initializeApp(firebaseConfig);
//
// const database = firebase.database();
