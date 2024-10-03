require('dotenv').config(); // Load environment variables from .env
const { initializeApp } = require('firebase/app');
const { getFirestore, doc, getDoc, setDoc } = require('firebase/firestore');

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase and Firestore
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Function to store or update Serveo URL in Firebase
async function updateFirebaseUrl(url) {
  try {
    const docRef = doc(db, "urls", "serveoUrl");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await setDoc(docRef, { url }, { merge: true });
    } else {
      await setDoc(docRef, { url });
    }
    console.log('Firebase URL updated successfully');
  } catch (error) {
    console.error('Error updating Firebase:', error);
  }
}

// Export the function to be used in other files
module.exports = {
  updateFirebaseUrl
};
