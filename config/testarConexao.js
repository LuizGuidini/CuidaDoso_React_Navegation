import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseInit';

const testarFirebase = async () => {
  const querySnapshot = await getDocs(collection(db, "usuarios"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
};
testarFirebase();

// Regras de Segurança do Firebase com Authenticação
//rules_version = '2';
//service cloud.firestore {
//  match /databases/{database}/documents {
//    match /usuarios/{uid} {
//      allow read, write: if request.auth != null && request.auth.uid == uid;
//    }
//  }
//}
