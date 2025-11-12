import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Alert, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { db } from '../config/firebaseInit';
import { getWeather } from '../services/weather';
import { getUidPrincipal } from '../utils/uidHelper';

export default function Header({ title, iconName, panicNumber = '190', showBackButton = false }) {
  const [weather, setWeather] = useState(null);
  const [numeroAjuda, setNumeroAjuda] = useState(panicNumber);
  const [nomeAjuda, setNomeAjuda] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;
        const loc = await Location.getCurrentPositionAsync({});
        const data = await getWeather(loc.coords.latitude, loc.coords.longitude);
        setWeather(data);
      } catch (error) {
        console.log('Erro ao buscar o tempo:', error);
      }
    };

    const buscarTelefoneDoAmigo = async () => {
      try {
        const uidUsuario = await getUidPrincipal();
        const docUsuario = await getDoc(doc(db, 'usuarios', uidUsuario));
        const dadosUsuario = docUsuario.data();

        const uidAmigo = dadosUsuario?.uidAmigo;
        if (!uidAmigo) return;

        const docAmigo = await getDoc(doc(db, 'usuarios', uidAmigo));
        const dadosAmigo = docAmigo.data();

        if (dadosAmigo?.telefone) {
          setNumeroAjuda(dadosAmigo.telefone);
        }

        if (dadosAmigo?.telefone) {
          setNumeroAjuda(dadosAmigo.telefone);
          setNomeAjuda(dadosAmigo.nome); // 👈 salva o nome
        }
      } catch (error) {
        console.log('Erro ao buscar telefone do amigo:', error);
      }
    };

    fetchWeather();
    buscarTelefoneDoAmigo();
  }, []);

  const handlePanic = () => {
    const nome = nomeAjuda || 'contato de emergência';
    const numero = numeroAjuda;

    Alert.alert(
      'Pânico',
      `Deseja entrar em contato com ${nome} no numero ${numero} ?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Ligar',
          onPress: () => Linking.openURL(`tel:${numero}`),
        },
        {
          text: 'WhatsApp',
          onPress: () => Linking.openURL(`https://wa.me/${numero.replace(/\D/g, '')}`),
        },
      ]
    );
  };

  const goHome = () => {
    navigation.navigate('MainDrawer', {
      screen: 'Tabs',
      params: { screen: 'Inicio' },
    });
  };

  return (
    <View style={styles.container}>
      {/* Topo: botão de voltar ou menu, logo e botão de pânico */}
      <View style={styles.topRow}>
        {showBackButton ? (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={32} color="#374151" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Ionicons name="menu-outline" size={32} color="#374151" />
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={goHome}>
          <Image
            source={require('../assets/images/Logo_semfundo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.panicButton} onPress={handlePanic}>
          <Ionicons name="notifications-circle" size={25} color="#ee1414ff" />
          <Text style={styles.panicText}>AJUDA</Text> 
        </TouchableOpacity>
      </View>

      {/* Segunda linha: ícone da página, título e previsão */}
      <View style={styles.bottomRow}>
        <View style={styles.leftRow}>
          <Ionicons name={iconName} size={28} color="#007AFF" />
          <Text style={styles.title}>{title}</Text>
        </View>
        {weather && (
          <Text style={styles.weatherText}>
            {weather.temp}°C {weather.city}
          </Text>
        )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  leftRow: { flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#007AFF', marginLeft: 8 },
  weatherText: { fontSize: 14, color: '#555' },
});
