import { addDoc, collection, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../config/firebaseInit';

export default async function gerarCompromissosMedicamento({
  nome,
  frequenciaHoras,
  duracaoDias,
  inicioDataHora,
  usoContinuo
}) {
  const compromissos = [];
  const inicio = new Date(inicioDataHora);
  const hoje = new Date();

  // 🧼 Limpa compromissos antigos (mais de 7 dias atrás)
  const qAntigos = query(
    collection(db, 'agenda'),
    where('uid', '==', auth.currentUser.uid),
    where('tipo', '==', 'medicamento'),
    where('titulo', '==', `Tomar ${nome}`)
  );
  const snapshotAntigos = await getDocs(qAntigos);
  snapshotAntigos.forEach(async doc => {
    const dados = doc.data();
    const [ , mes, ano] = dados.data.split('/');
    const dataCompromisso = new Date(`${ano}-${mes}-${dados.data.split('/')[0]}`);
    const diasAtras = (hoje - dataCompromisso) / (1000 * 60 * 60 * 24);
    if (diasAtras > 7) {
      await deleteDoc(doc.ref);
    }
  });

  // 🗓️ Geração de compromissos
  const diasGerar = usoContinuo ? 15 : duracaoDias;
  const totalDoses = Math.floor((diasGerar * 24) / frequenciaHoras);

  for (let i = 0; i < totalDoses; i++) {
    const dataDose = new Date(inicio.getTime() + i * frequenciaHoras * 60 * 60 * 1000);
    const dataFormatada = dataDose.toLocaleDateString('pt-BR');
    const horaFormatada = dataDose.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    compromissos.push({
      uid: auth.currentUser.uid,
      titulo: `Tomar ${nome}`,
      tipo: 'medicamento',
      data: dataFormatada,
      hora: horaFormatada,
      confirmado: false,
    });
  }

  for (const compromisso of compromissos) {
    await addDoc(collection(db, 'agenda'), compromisso);
  }
}
