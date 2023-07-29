const { initializeApp } = require('firebase-admin/app');
const admin = require('firebase-admin');
const functions = require('firebase-functions');

const firebaseConfig = {
    apiKey: "AIzaSyDedcqc3kajuCE9HJjisUzryz8lhKLs874",
    authDomain: "va-ad-bayit.firebaseapp.com",
    projectId: "va-ad-bayit",
    storageBucket: "va-ad-bayit.appspot.com",
    messagingSenderId: "678454354829",
    appId: "1:678454354829:web:75b9c144213ce3d99553c4",
    measurementId: "G-GVELKG9CWB"
};

const app = initializeApp(firebaseConfig);
admin.initializeApp();

const firestore = admin.firestore();

exports.protectedData = functions.https.onRequest(async (req, res) => {
    const accessToken = req.headers.authorization;

    if (!accessToken || !accessToken.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized access.' });
    }

    const idToken = accessToken.split('Bearer ')[1];

    try {
        // Verify the provided access token using Firebase Admin SDK
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const userId = decodedToken.uid; // Get the user's UID from the decoded token

        // Implement your custom access control logic here
        // For example, check if the user has permission to access the protected document
        const userDoc = await firestore.collection('users').doc(userId).get();
        if (!userDoc.exists) {
            return res.status(403).json({ error: 'User not authorized to access the protected data.' });
        }

        // Return the protected data to the user
        return res.json({ data: 'This is the protected data.' });
    } catch (error) {
        console.error('Error verifying access token:', error);
        return res.status(401).json({ error: 'Unauthorized access.' });
    }
});
