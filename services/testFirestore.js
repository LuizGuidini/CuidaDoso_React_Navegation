import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebaseInit';

//import { db } from '../config/firebaseConfig';

export const criarUsuarioTesteSemAuth = async () => {
  try {
    const docRef = await addDoc(collection(db, 'usuarios'), {
      nome: 'Maria Teste',
      telefone: '11999999999',
      email: 'teste@cuidadoso.com',
      tipo: 'usuario',
      criadoEm: new Date(),
    });
    console.log('Documento criado com ID:', docRef.id);
  } catch (error) {
    console.error('Erro ao criar documento:', error.message);
  }
};

export const criarUsuarioComIdFixo = async () => {
  try {
    await setDoc(doc(db, 'usuarios', 'teste123'), {
      nome: 'Maria Teste',
      telefone: '11999999999',
      email: 'teste@cuidadoso.com',
      tipo: 'usuario',
      criadoEm: new Date(),
    });

    console.log('Documento criado com ID fixo: teste123');
  } catch (error) {
    console.error('Erro ao criar documento:', error.message);
  }
};