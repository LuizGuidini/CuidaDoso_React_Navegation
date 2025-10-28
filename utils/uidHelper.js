import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../config/firebaseInit';

/**
 * Retorna o UID do usuário principal (vinculado), se o login for de amigo.
 * Caso contrário, retorna o próprio UID do usuário logado.
 */
export async function getUidPrincipal() {
  const usuarioAtual = auth.currentUser.uid;
  const q = query(collection(db, 'usuarios'), where('uid', '==', usuarioAtual));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const dados = snapshot.docs[0].data();
    if (dados.tipo === 'amigo' && dados.vinculo) {
      return dados.vinculo;
    }
  }

  return usuarioAtual;
}
