import { initializeApp } from 'firebase/app';

import {
  getAuth,
  signOut,
  signInWithPopup,
  GithubAuthProvider,
  onAuthStateChanged,
  User,
} from 'firebase/auth';

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

export async function login() {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      return user;
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function logout() {
  return signOut(auth)
    .then(() => undefined)
    .catch((error) => {
      console.error(error);
    });
}
// 유저에 대한 정보를 가져오는 함수
export function onUserStateChange(callback: (user: User) => void) {
  onAuthStateChanged(auth, (user) => {
    if (user) callback(user);
  });
}
