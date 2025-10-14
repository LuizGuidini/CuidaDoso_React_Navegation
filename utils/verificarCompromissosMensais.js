import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../config/firebaseInit';
import gerarCompromissosMedicamento from './gerarCompromissosMedicamento';

export default async function verificarCompromissosMensais() {
  const uid = auth.currentUser.uid;
  const hoje = new Date();
  const mesAtual = hoje.getMonth();
  const anoAtual = hoje.getFullYear();

  const q = query(collection(db, 'medicamentos'), where('uid', '==', uid), where('usoContinuo', '==', true));
  const snapshot = await getDocs(q);

  for (const doc of snapshot.docs) {
    const dados = doc.data();
    const nome = dados.nome;
    const frequenciaHoras = dados.frequenciaHoras;
    const inicioDataHora = new Date(dados.inicioDataHora);

    // Verifica se já existem compromissos para este mês
    const qAgenda = query(
      collection(db, 'agenda'),
      where('uid', '==', uid),
      where('tipo', '==', 'medicamento'),
      where('titulo', '==', `Tomar ${nome}`)
    );
    const agendaSnapshot = await getDocs(qAgenda);

    const existeEsteMes = agendaSnapshot.docs.some(doc => {
      const [dia, mes, ano] = doc.data().data.split('/');
      return parseInt(mes) - 1 === mesAtual && parseInt(ano) === anoAtual;
    });

    if (!existeEsteMes) {
      await gerarCompromissosMedicamento({
        nome,
        frequenciaHoras,
        inicioDataHora,
        usoContinuo: true,
        duracaoDias: null,
      });
    }
  }
}
