import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import styles from '../styles/Dashboard.styles';

export default function CardChamado({ chamado, onAceitar, onRecusar }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      {/* Card resumido */}
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

      {/* Modal com detalhes */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>Detalhes do chamado</Text>
            <Text style={styles.modalTexto}>Destino: {chamado.destino}</Text>
            <Text style={styles.modalTexto}>Data: {chamado.data}</Text>
            <Text style={styles.modalTexto}>Horário: {chamado.hora}</Text>
            <Text style={styles.modalTexto}>Tipo: {chamado.tipo}</Text>
            {chamado.origem && (
              <Text style={styles.modalTexto}>Origem: {chamado.origem}</Text>
            )}
            {chamado.observacoes && (
              <Text style={styles.modalTexto}>Obs: {chamado.observacoes}</Text>
            )}

            {/* Botões de ação */}
            <View style={styles.botoes}>
              <TouchableOpacity
                style={styles.botaoAceitar}
                onPress={() => {
                  setModalVisible(false);
                  onAceitar?.(chamado);
                }}
              >
                <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
                <Text style={styles.botaoTexto}>Aceitar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botaoRecusar}
                onPress={() => {
                  setModalVisible(false);
                  onRecusar?.(chamado);
                }}
              >
                <Ionicons name="close-circle-outline" size={20} color="#fff" />
                <Text style={styles.botaoTexto}>Recusar</Text>
              </TouchableOpacity>
            </View>

            {/* Botão apenas para fechar */}
            <TouchableOpacity
              style={styles.botaoCancelar}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="arrow-back-outline" size={20} color="#fff" />
              <Text style={styles.botaoTexto}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

