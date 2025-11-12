import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AuthHeader({ title }) {
  const handlePanic = () => {
    Alert.alert(
      'Pânico',
      'Deseja ligar para 190?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Ligar', onPress: () => Linking.openURL('tel:190') },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.credito}>
            <Text style={styles.creditoTexto}>By</Text>
            <Text style={styles.creditoTexto}>L2M DeploySmart</Text>
        </View>

        <Image
          source={require('../assets/images/Logo_semfundo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <TouchableOpacity style={styles.panicButton} onPress={handlePanic}>
          <Ionicons name="notifications-circle" size={25} color="#ee1414ff" />
          <Text style={styles.panicText}>AJUDA</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomRow}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 40,
    paddingHorizontal: 15,
    backgroundColor: '#f1f4f8',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  logo: { width: 80, height: 80 },
  panicButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 7,
    borderRadius: 18,
    borderWidth: 3,
    borderColor: '#ee1414ff',
  },
  panicText: {
    color: '#ee1414ff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  bottomRow: {
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  credito: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: 80,
    height: 50,
  },
  creditoTexto: {
    fontSize: 10,
    color: '#888',
    lineHeight: 12,
  },
});
