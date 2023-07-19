import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, remove } from 'firebase/database';
import { v4 as uuid } from 'uuid';

import {
  getAuth,
  signOut,
  signInWithPopup,
  GithubAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';
import { ShopUser } from '../types/User';
import { CartProduct, Product } from '../types/Product';

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
const database = getDatabase(app);

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
export function onUserStateChange(callback: (user: ShopUser) => void) {
  onAuthStateChanged(auth, async (user) => {
    // 사용자가 있는경우(로그인한 경우)
    if (user) {
      const updatedUser = (await user) ? await adminUser(user) : null;
      if (updatedUser) callback(updatedUser);
    }
  });
}

function adminUser(user: ShopUser) {
  // 사용자가 어드민 권한을 가지고 있는지 확인
  // {...user, isAdmin: true/false}
  return get(ref(database, 'admins')) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);

        return { ...user, isAdmin: isAdmin };
      }
      // 어드민이 아닌경우에는 그냥 유저정보만 반환
      return user;
    });
}

export async function addNewProduct(product: Product, imageUrl: string) {
  const id = uuid();

  return set(ref(database, `products/${id}`), {
    ...product,
    id: id,
    price: parseInt(product.price),
    image: imageUrl,
    options: typeof product.options === 'string' && product.options.split(','),
  });
}

export async function getProducts() {
  return get(ref(database, 'products')).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
}

export async function getCart(userId: string) {
  return get(ref(database, `carts/${userId}`)) //
    .then((snapshot) => {
      const items = snapshot.val() || {};
      return Object.values(items);
    });
}

export async function addOrUpdateToCart(userId: string, product: CartProduct) {
  return set(ref(database, `carts/${userId}/${product.id}`), product);
}

export async function removeFromCart(userId: string, productId: string) {
  return remove(ref(database, `carts/${userId}/${productId}`));
}
