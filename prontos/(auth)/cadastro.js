import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { firebaseApp } from '../../config/firebaseConfig';

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const router = useRouter();
  const auth = getAuth(firebaseApp);

  const handleCadastro = () => {
    createUserWithEmailAndPassword(auth, email, senha)
      .then(() => router.replace('(main)/index'))
      .catch((error) => setErro(error.message));
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry style={styles.input} />
      {erro ? <Text style={styles.erro}>{erro}</Text> : null}
      <Button title="Cadastrar" onPress={handleCadastro} />
      <Button title="Voltar" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 10, borderRadius: 5 },
  erro: { color: 'red', marginBottom: 10 },
});
