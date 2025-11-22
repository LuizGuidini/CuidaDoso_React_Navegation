import { collection, doc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseInit.js";

async function migrarAnotacoes() {
  try {
    const snapshot = await getDocs(collection(db, "anotacoes"));

    for (const docSnap of snapshot.docs) {
      const dados = docSnap.data();

      if (!dados.dataCriacao?.toDate) {
        console.log(`Atualizando anotação ${docSnap.id}...`);
        await updateDoc(doc(db, "anotacoes", docSnap.id), {
          dataCriacaoAntiga: dados.dataCriacao || null,
          dataCriacao: serverTimestamp(),
        });
      }
    }

    console.log("✅ Migração concluída!");
  } catch (error) {
    console.error("❌ Erro na migração:", error);
  }
}

migrarAnotacoes();
