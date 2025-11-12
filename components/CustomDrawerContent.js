import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function CustomDrawerContent(props) {
  const auth = getAuth();
  const db = getFirestore();
  const usuario = auth.currentUser;

  const [primeiroNome, setPrimeiroNome] = useState('');
  const email = usuario?.email || '';

  useEffect(() => {
    const buscarNome = async () => {
      if (usuario) {
        const ref = doc(db, 'usuarios', usuario.uid); // ajuste o nome da coleção se for diferente
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const nomeCompleto = snap.data().nome || 'Usuário';
          setPrimeiroNome(nomeCompleto.split(' ')[0]);
        }
      }
    };
    buscarNome();
  }, [db, usuario]);

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      {/* Topo com avatar e nome */}
      <View style={styles.header}>
        <Image
          source={require('../assets/images/logo.png')} // substitua pela foto do usuário se quiser
          style={styles.avatar}
        />
        <Text style={styles.name}>Olá, {primeiroNome}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>

      {/* Lista de itens do menu */}
      <View style={styles.menu}>
        <DrawerItemList {...props} />
      </View>

      {/* Rodapé */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>CuidaDoso v1.0{"\n"}By L2M DeploySmart</Text>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: '#d2ecff',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    color: '#007AFF',
    fontSize: 14,
  },
  menu: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f6f6f6',
  },
  footerText: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
  },
});
