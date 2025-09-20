import { db } from './config';
import {
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  getDocs,
  orderBy,
  deleteDoc,
  doc
} from 'firebase/firestore';

export interface FoodData {
  id?: string;
  name: string;
  category: string;
  cuisine: string;
  price: string;
  image: string;
  userId: string;
  createdAt?: Timestamp;
}

export const addFoodItem = async (food: Omit<FoodData, 'id' | 'createdAt'>) => {
  const docRef = await addDoc(collection(db, 'foods'), {
    ...food,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
};

export const getFoodsForUser = async (userId: string): Promise<FoodData[]> => {
  const q = query(
    collection(db, 'foods'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() } as FoodData));
};

export const deleteFoodItem = async (id: string) => {
  await deleteDoc(doc(db, 'foods', id));
};
