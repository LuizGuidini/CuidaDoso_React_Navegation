import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function CardChamado({ chamado, onAceitar }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.card}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="alert-circle-outline" size={24} color="#007AFF" />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.titulo}>{chamado.destino}</Text>
          <Text style={styles.subtitulo}>
            {chamado.data} às {chamado.hora}
          </Text>
        </View>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>Detalhes do chamado</Text>
            <Text style={styles.modalTexto}>Destino: {chamado.destino}</Text>
            <Text style={styles.modalTexto}>Data: {chamado.data}</Text>
            <Text style={styles.modalTexto}>Horário: {chamado.hora}</Text>
            <Text style={styles.modalTexto}>Tipo: {chamado.tipo}</Text>

            <View style={styles.botoes}>
              <TouchableOpacity
                style={styles.botaoAceitar}
                onPress={() => {
                  setModalVisible(false);
                  onAceitar();
                }}
              >
                <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
                <Text style={styles.botaoTexto}>Aceitar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botaoCancelar}
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close-circle-outline" size={20} color="#fff" />
                <Text style={styles.botaoTexto}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#FF9500',
  },
  titulo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  subtitulo: {
    fontSize: 14,
    color: '#555',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '80%',
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#007AFF',
  },
  modalTexto: {
    fontSize: 16,
    marginBottom: 6,
    color: '#333',
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  botaoAceitar: {
    flexDirection: 'row',
    backgroundColor: '#34C759',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoCancelar: {
    flexDirection: 'row',
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoTexto: {
    marginLeft: 6,
    color: '#fff',
    fontWeight: '600',
  },
});
