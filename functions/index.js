// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const logger = require("firebase-functions/logger");
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());


// Initialize Firebase Admin SDK
admin.initializeApp();

const firestore = admin.firestore();

// Middleware to validate the access token
const validateAccessToken = async (req, res, next) => {
  const accessToken = req.headers.authorization;

  if (!accessToken || !accessToken.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized access.' });
  }

  const idToken = accessToken.split('Bearer ')[1];

  try {
    // Verify the provided access token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // Save the decoded token in the request object
    next();
  } catch (error) {
    console.error('Error verifying access token:', error);
    return res.status(401).json({ error: 'Unauthorized access.' });
  }
};

// Protected Data route
app.get('/binyan', validateAccessToken, async (req, res) => {
  const userId = req.user.uid; // Get the user's UID from the decoded token

  try {

    const binyanRef = firestore.collection('binyanim');
    const query = binyanRef.where('admin_id', '==', userId);
    const querySnapshot = await query.get();

    if (querySnapshot.empty) {
      // Document not found
      return res.status(404).json({ msg: 'No binyanim were found for this user' });
    }
    
    return res.json({ binyanim: querySnapshot.docs });

  } catch (error) {
    logger.error('Error accessing Firestore:', error);
    return res.status(500).json({ msg: 'Error accessing Firestore.' });
  }
});

// Connect the Express app to the Cloud Function
exports.api = functions.https.onRequest(app);
