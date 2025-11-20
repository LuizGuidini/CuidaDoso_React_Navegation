import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import AuthHeader from '../../components/AuthHeader';
import { auth, db } from '../../config/firebaseInit';
import styles from '../../styles/Dashboard.styles';

export default function ClinicaPerfilScreen({ navigation }) {
  const uid = auth.currentUser?.uid;
  const [dados, setDados] = useState({ nome: '', telefone: '', identificacao: '' });

  useEffect(() => {
    const carregarPerfil = async () => {
      const snap = await getDoc(doc(db, 'usuarios', uid));
      if (snap.exists()) {
        setDados(snap.data());
      }
    };
    carregarPerfil();
  }, []);

  const salvarPerfil = async () => {
    await updateDoc(doc(db, 'usuarios', uid), {
      nome: dados.nome,
      telefone: dados.telefone,
      identificacao: dados.identificacao,
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <AuthHeader title="Perfil da Clínica" />

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={dados.nome}
        onChangeText={(t) => setDados({ ...dados, nome: t })}
      />

      <Text style={styles.label}>Telefone</Text>
      <TextInput
        style={styles.input}
        value={dados.telefone}
        onChangeText={(t) => setDados({ ...dados, telefone: t })}
      />

      <Text style={styles.label}>Identificação (CRM, CNPJ, etc.)</Text>
      <TextInput
        style={styles.input}
        value={dados.identificacao}
        onChangeText={(t) => setDados({ ...dados, identificacao: t })}
      />

      <TouchableOpacity style={styles.botao} onPress={salvarPerfil}>
        <Text style={styles.botaoTexto}>Salvar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.botaoCancelar} onPress={() => navigation.goBack()}>
        <Text style={styles.botaoTexto}>Voltar</Text>
      </TouchableOpacity>
      
    </View>
  );
}
