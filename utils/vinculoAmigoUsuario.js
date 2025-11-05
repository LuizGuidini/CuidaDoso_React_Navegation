import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../config/firebaseInit';

export const vincularAmigoAoUsuario = async (tokenConvite, uidAmigo) => {
  const usuariosRef = collection(db, 'usuarios');
  const q = query(usuariosRef, where('tokenConvite', '==', tokenConvite));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const usuarioDoc = querySnapshot.docs[0];
    await updateDoc(usuarioDoc.ref, {
      uidAmigo: uidAmigo,
    });
    console.log('✅ Vínculo criado com sucesso!');
  } else {
    console.warn('⚠️ Token de convite não encontrado.');
  }
};
