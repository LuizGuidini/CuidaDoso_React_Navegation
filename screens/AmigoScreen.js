import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Header from '../components/Header';
import styles from '../styles/PerfilScreen.styles';

export default function AmigoScreen() {
  const navigation = useNavigation();

  const [dados, setDados] = useState({
    nome: '',
    telefone: '',
    foto: null,
    cep: '',
    rua: '',
    numeroCasa: '',
    bairro: '',
    cidade: '',
    estado: '',
  });

  const atualizarCampo = (campo, valor) => {
    setDados({ ...dados, [campo]: valor });
  };

  return (
    <View style={styles.container}>
      <Header title="Amigo" iconName="people-outline" />

      <ScrollView style={styles.content}>
        <View style={styles.fotoContainer}>
          {dados.foto ? (
            <Image source={{ uri: dados.foto }} style={styles.foto} />
          ) : (
            <View style={styles.fotoPlaceholder}>
              <Ionicons name="person-circle-outline" size={100} color="#ccc" />
            </View>
          )}
          <Text style={styles.fotoTexto}>Foto do amigo</Text>
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            value={dados.nome}
            onChangeText={(text) => atualizarCampo('nome', text)}
            placeholder="Nome completo"
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            value={dados.telefone}
            onChangeText={(text) => atualizarCampo('telefone', text)}
            placeholder="(XX) XXXXX-XXXX"
            keyboardType="phone-pad"
          />
        </View>

        <Text style={styles.secao}>Endereço</Text>

        <View style={styles.campo}>
          <Text style={styles.label}>CEP</Text>
          <TextInput
            style={styles.input}
            value={dados.cep}
            onChangeText={(text) => atualizarCampo('cep', text)}
            placeholder="XXXXX-XXX"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Rua</Text>
          <TextInput
            style={styles.input}
            value={dados.rua}
            onChangeText={(text) => atualizarCampo('rua', text)}
            placeholder="Nome da rua"
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Número</Text>
          <TextInput
            style={styles.input}
            value={dados.numeroCasa}
            onChangeText={(text) => atualizarCampo('numeroCasa', text)}
            placeholder="Número da casa"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Bairro</Text>
          <TextInput
            style={styles.input}
            value={dados.bairro}
            onChangeText={(text) => atualizarCampo('bairro', text)}
            placeholder="Bairro"
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Cidade</Text>
          <TextInput
            style={styles.input}
            value={dados.cidade}
            onChangeText={(text) => atualizarCampo('cidade', text)}
            placeholder="Cidade"
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Estado</Text>
          <TextInput
            style={styles.input}
            value={dados.estado}
            onChangeText={(text) => atualizarCampo('estado', text)}
            placeholder="Estado"
          />
        </View>

        <TouchableOpacity style={styles.botaoSalvar}>
          <Ionicons name="save-outline" size={24} color="#fff" />
          <Text style={styles.botaoTexto}>Salvar dados</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
