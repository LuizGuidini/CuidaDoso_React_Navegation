import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Header from '../components/Header';
import styles from '../styles/AppScreens.styles';

export default function MedicamentosScreen() {
   const navigation = useNavigation();
  const [medicamentos, setMedicamentos] = useState([
    { id: '1', nome: 'Losartana', horario: '08:00', tomado: false },
    { id: '2', nome: 'Metformina', horario: '12:00', tomado: false },
    { id: '3', nome: 'Omeprazol', horario: '18:00', tomado: false },
  ]);

  const marcarComoTomado = (id) => {
    const atualizados = medicamentos.map((med) =>
      med.id === id ? { ...med, tomado: !med.tomado } : med
    );
    setMedicamentos(atualizados);
    const status = atualizados.find(m => m.id === id).tomado ? 'tomado' : 'não tomado';
    Alert.alert(`Medicamento marcado como ${status}.`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.nome}</Text>
      <Text>Horário: {item.horario}</Text>
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: item.tomado ? '#d2ffd2' : '#ffe2e2' },
        ]}
        onPress={() => marcarComoTomado(item.id)}
      >
        <Text style={styles.buttonText}>
          {item.tomado ? 'Tomado ✅' : 'Marcar como tomado'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Medicamentos" iconName="medkit-outline" />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('NovoMedicamento')}
      >
        <Text style={styles.buttonText}>+ Novo medicamento</Text>
      </TouchableOpacity>

      <View contentContainerStyle={styles.list}>
        <FlatList
          data={medicamentos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}
