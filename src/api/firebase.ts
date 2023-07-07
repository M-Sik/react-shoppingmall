import { initializeApp } from 'firebase/app';

import { getAuth, signInWithPopup, GithubAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GithubAuthProvider();
const auth = getAuth();

export function login() {
  console.log('??');
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log('???', result);
    })
    .catch((error) => {
      console.error(error);
    });
}
