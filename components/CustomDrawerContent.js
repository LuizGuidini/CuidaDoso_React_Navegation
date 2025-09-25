import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      {/* Topo com avatar e nome */}
      <View style={styles.header}>
        <Image
          source={require('../assets/images/logo.png')} // substitua pelo seu avatar
          style={styles.avatar}
        />
        <Text style={styles.name}>Olá, Luiz</Text>
        <Text style={styles.email}>luiz@cuidadososo.com</Text>
      </View>

      {/* Lista de itens do menu */}
      <View style={styles.menu}>
        <DrawerItemList {...props} />
      </View>

      {/* Rodapé opcional */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>CuidaDoso v1.0</Text>
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
