import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../components/Header';
import styles from '../styles/AppScreens.styles';

export default function TransporteScreen() {
  const navigation = useNavigation();
  const [transportes, setTransportes] = useState([
    { id: '1', destino: 'Clínica São Lucas', horario: '13:30', status: 'pendente' },
    { id: '2', destino: 'Farmácia Central', horario: '17:00', status: 'confirmado' },
  ]);

  const atualizarStatus = (id) => {
    const atualizados = transportes.map((t) =>
      t.id === id
        ? { ...t, status: t.status === 'pendente' ? 'confirmado' : 'concluído' }
        : t
    );
    setTransportes(atualizados);
    Alert.alert('Status atualizado com sucesso!');
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.destino}</Text>
      <Text>Horário: {item.horario}</Text>
      <Text>Status: {item.status}</Text>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor:
              item.status === 'pendente'
                ? '#ffe2e2'
                : item.status === 'confirmado'
                ? '#fff7cc'
                : '#d2ffd2',
          },
        ]}
        onPress={() => atualizarStatus(item.id)}
      >
        <Text style={styles.buttonText}>
          {item.status === 'pendente'
            ? 'Confirmar transporte'
            : item.status === 'confirmado'
            ? 'Marcar como concluído'
            : 'Concluído ✅'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Transporte" iconName="car-outline" />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('EscolherMotorista')}
      >
        <Text style={styles.buttonText}>+ Solicitar transporte</Text>
      </TouchableOpacity>

      <FlatList
        contentContainerStyle={styles.list}
        data={transportes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}
