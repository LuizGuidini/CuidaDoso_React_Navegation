import { ScrollView, Text, View } from 'react-native';
import Header from '../components/Header';
import styles from '../styles/AppScreens.styles';

export default function DetalheAnotacaoScreen({ route }) {
  const { anotacao } = route.params;

  return (
    <View style={styles.container}>
      <Header title="Anotação" iconName="document-text-outline" />

      <Text style={styles.title}>
        {anotacao.dataCriacao.toLocaleDateString('pt-BR')}
      </Text>

      <ScrollView style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 16, lineHeight: 24 }}>
          {anotacao.texto}
        </Text>

        {anotacao.palavrasChave?.length > 0 && (
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontWeight: 'bold' }}>Palavras-chave:</Text>
            <Text>{anotacao.palavrasChave.join(', ')}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
