import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebaseInit';

export async function limparMedicamentosAntigos() {
  const hoje = new Date();
  const limite = new Date(hoje);
  limite.setDate(limite.getDate() - 15); // 15 dias atrás

  const q = query(
    collection(db, 'agenda'),
    where('tipo', '==', 'medicamento'),
    where('data', '<', limite)
  );

  try {
    const snapshot = await getDocs(q);
    const deletar = snapshot.docs.map((d) => deleteDoc(doc(db, 'agenda', d.id)));
    await Promise.all(deletar);
    console.log('Medicamentos antigos removidos da agenda.');
  } catch (error) {
    console.error('Erro ao limpar medicamentos antigos:', error);
  }
}
