import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  Timestamp 
} from 'firebase/firestore';
import { auth, db } from './config';

export interface UserData {
  uid: string;
  email: string;
  displayName?: string;
  createdAt: Timestamp;
}

// Register a new user
export const registerUser = async (email: string, password: string, displayName?: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Save user data to Firestore
    const userData: UserData = {
      uid: user.uid,
      email: user.email!,
      displayName: displayName || '',
      createdAt: Timestamp.now()
    };
    
    await setDoc(doc(db, 'users', user.uid), userData);
    
    return { user, userData };
  } catch (error) {
    throw error;
  }
};

// Login user
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

// Get user data from Firestore
export const getUserData = async (uid: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    } else {
      throw new Error('User data not found');
    }
  } catch (error) {
    throw error;
  }
};

// Add a document to a collection (example function for saving additional data)
export const addUserDocument = async (uid: string, collectionName: string, data: any) => {
  try {
    const docRef = await addDoc(collection(db, 'users', uid, collectionName), {
      ...data,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};
