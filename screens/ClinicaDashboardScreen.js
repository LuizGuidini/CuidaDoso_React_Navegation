import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../styles/ClinicaDashboard.styles"; // você pode criar esse arquivo separado

export default function ClinicaDashboardScreen() {
  const navigation = useNavigation();
  const [busca, setBusca] = useState("");
  const [resultados, setResultados] = useState([]);

  const handleBuscarUsuario = async () => {
    // Aqui você pode integrar com Firestore para buscar usuários
    // Exemplo fictício:
    const mock = [
      { id: "1", nome: "Dona Maria", telefone: "11999999999" },
      { id: "2", nome: "Seu João", telefone: "11888888888" },
    ];
    const filtrados = mock.filter((u) =>
      u.nome.toLowerCase().includes(busca.toLowerCase())
    );
    setResultados(filtrados);
  };

  const handleMarcarHorario = (usuarioId) => {
    // Navegar para tela de agendamento (a ser criada)
    navigation.navigate("AgendaUsuarioScreen", { usuarioId });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={styles.title}>Painel da Clínica</Text>

      <TextInput
        placeholder="Buscar usuário por nome"
        style={styles.input}
        value={busca}
        onChangeText={setBusca}
      />

      <TouchableOpacity style={styles.button} onPress={handleBuscarUsuario}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      <FlatList
        data={resultados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.nome}</Text>
            <Text style={styles.cardSubtitle}>{item.telefone}</Text>
            <TouchableOpacity
              style={styles.cardButton}
              onPress={() => handleMarcarHorario(item.id)}
            >
              <Text style={styles.cardButtonText}>Marcar Horário</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
