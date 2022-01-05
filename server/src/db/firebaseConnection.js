const admin = require("firebase-admin");
const firebaseConfig = require('./serviceAccountKey.json')

// Initialize Firebase
admin.initializeApp({credential: admin.credential.cert(firebaseConfig)});

module.exports.db = admin.firestore();