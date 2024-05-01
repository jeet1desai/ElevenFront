import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCbRnqfsxdVnwDTDkuFk48Yn2XZt1eVBMc',
  authDomain: 'notemarketplace-3fed5.firebaseapp.com',
  projectId: 'notemarketplace-3fed5',
  storageBucket: 'notemarketplace-3fed5.appspot.com',
  messagingSenderId: '726779931300',
  appId: '1:726779931300:web:47b62600281d6f574d5431'
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
