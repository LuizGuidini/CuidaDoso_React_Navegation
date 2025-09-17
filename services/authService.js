import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { auth, db } from '../config/firebaseConfig';

export const cadastrarUsuario = async ({ nome, email, telefone, senha, amigo, telefoneAmigo }) => {
  try {
    console.log("Auth está pronto?", auth?.app?.name);
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    const uid = userCredential.user.uid;

    const tokenConvite = uuidv4();

    await setDoc(doc(db, 'usuarios', uid), {
      uid,
      nome,
      email,
      telefone,
      amigo,
      telefoneAmigo,
      tokenConvite,
      criadoEm: new Date(),
    });

    return { uid, tokenConvite };
  } catch (error) {
    throw new Error(error.message);
  }
};


export const cadastrarUsuarioTeste = async (email, senha, nome, telefone) => {
  try {
    // 1. Criar usuário no Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    const uid = userCredential.user.uid;

    // 2. Salvar dados no Firestore
    await setDoc(doc(db, 'usuarios', uid), {
      uid,
      nome,
      telefone,
      email,
      tipo: 'usuario',
      criadoEm: new Date(),
    });

    console.log('Usuário criado com sucesso!');
    return uid;
  } catch (error) {
    console.error('Erro ao cadastrar:', error.message);
    throw error;
  }
};
