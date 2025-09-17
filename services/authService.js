import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { auth, db } from '../config/firebaseInit';

//import { auth, db } from '../config/firebaseConfig';

export const cadastrarUsuario = async ({ nome, email, telefone, senha, amigo, telefoneAmigo }) => {
  try {
    console.log("Auth está pronto?", auth?.app?.name); // deve retornar "DEFAULT"
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
// Função de login e outras funções relacionadas ao auth podem ser adicionadas aqui 
