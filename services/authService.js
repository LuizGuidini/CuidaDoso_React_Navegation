import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebaseInit';

// 🔐 Login
export const loginUsuario = async (email, senha) => {
  const credenciais = await signInWithEmailAndPassword(auth, email, senha);
  const uid = credenciais.user.uid;
  const docSnap = await getDoc(doc(db, 'usuarios', uid));
  const tipo = docSnap.exists() ? docSnap.data().tipo : null;
  return { uid, tipo };
};

// 👤 Cadastro de usuário principal
export const cadastrarUsuario = async ({ nome, email, telefone, senha, amigo, telefoneAmigo }) => {
  const credenciais = await createUserWithEmailAndPassword(auth, email, senha);
  const uid = credenciais.user.uid;

  // Gera token de convite simples
  const tokenConvite = Math.random().toString(36).substring(2, 8).toUpperCase();

  await setDoc(doc(db, 'usuarios', uid), {
    uid,
    tipo: 'usuario',
    nome,
    email,
    telefone,
    amigo,
    telefoneAmigo,
    tokenConvite,
  });

  return { uid, tokenConvite };
};

// 🤝 Cadastro de amigo
export const cadastrarAmigo = async ({ nome, email, senha, telefone, token }) => {
  const credenciais = await createUserWithEmailAndPassword(auth, email, senha);
  const uid = credenciais.user.uid;

  // 🔐 Força login com o novo usuário
  await signInWithEmailAndPassword(auth, email, senha);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 🔍 Busca usuário principal pelo token
  const querySnapshot = await getDocs(collection(db, 'usuarios'));
  let vinculo = null;

  querySnapshot.forEach((docSnap) => {
    const dados = docSnap.data();
    if (dados.tokenConvite === token) {
      vinculo = dados.uid;
    }
  });

  if (!vinculo) throw new Error('Token inválido ou usuário não encontrado');

  console.log("Auth UID:", auth.currentUser?.uid);
  console.log("Documento UID:", uid);
  console.log("Vínculo encontrado:", vinculo);
  
  // ✅ Agora o request.auth.uid está sincronizado
  await setDoc(doc(db, 'usuarios', uid), {
    uid,
    tipo: 'amigo',
    nome,
    email,
    telefone,
    vinculo,
  });

  return { uid };
};

// 🚗 Cadastro de parceiro (motorista ou clínica)
export const cadastrarParceiro = async ({ nome, tipo, identificacao, telefone, email, senha }) => {
  
  const credenciais = await createUserWithEmailAndPassword(auth, email, senha);
  const uid = credenciais.user.uid;

  await setDoc(doc(db, 'usuarios', uid), {
    uid,
    tipo: tipo.toLowerCase(), // 'motorista' ou 'clinica'
    nome,
    identificacao,
    telefone,
    email,
  });

  return { uid };
};
