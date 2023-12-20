const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require("./nodefirebase-serviceAccount.json");

initializeApp({
  Credential: cert(serviceAccount),
});

const db = getFirestore();

module.exports = { db };
