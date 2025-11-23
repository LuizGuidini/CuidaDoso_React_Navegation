import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../components/Header';
import { favoritas } from '../data/favoritas';

export default function FavoritasScreen() {
  const navigation = useNavigation();

  const renderCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.color }]}
      onPress={() => navigation.navigate('AtividadeDetalhe', { atividade: item })}
    >
      <Ionicons name={item.icon} size={30} color="#007AFF" />
      <Text style={styles.cardText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f1f4f8' }}>
      <Header title="Favoritas" iconName="heart-outline" />
      <View style={styles.voltarInline}>
        <TouchableOpacity onPress={() => navigation.navigate('Atividades')} style={styles.voltarBotao}>
            <Ionicons name="arrow-back-outline" size={24} color="#007AFF" />
            <Text style={styles.voltarTexto}>Voltar</Text>
        </TouchableOpacity>
      </View>  
      {favoritas.length === 0 ? (
        <Text style={styles.vazio}>Nenhuma atividade favoritada ainda.</Text>
      ) : (
        
        <FlatList
          data={favoritas}
          keyExtractor={(item) => item.id}
          renderItem={renderCard}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 40,
    paddingBottom: 20,
  },
  card: {
    width: 130,
    height: 130,
    borderRadius: 15,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  cardText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
  vazio: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 40,
  },
  voltarInline: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 5,
  },
  voltarBotao: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voltarTexto: {
    marginLeft: 8,
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },

});
