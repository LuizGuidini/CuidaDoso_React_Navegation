import { Ionicons } from "@expo/vector-icons"; // Para o ícone de lupa
import * as Contacts from "expo-contacts";
import { useState } from "react";
import { Alert, FlatList, Image, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import Header from "../components/Header";
import styles from "../styles/AuthScreen.styles";

export default function AuthScreen() {
  const [tab, setTab] = useState("entrar");
  const [tipoCadastro, setTipoCadastro] = useState(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [amigo, setAmigo] = useState("");
  const [telefoneAmigo, setTelefoneAmigo] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [contatos, setContatos] = useState([]);
  const [busca, setBusca] = useState(""); // Para pesquisa no modal

  // Função para abrir contatos e mostrar modal
  const escolherContato = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão negada", "Não foi possível acessar os contatos.");
      return;
    }
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers],
    });
    if (data.length === 0) {
      Alert.alert("Nenhum contato encontrado");
      return;
    }
    // Filtra contatos que têm telefone
    const contatosComTelefone = data.filter(
      (c) => c.phoneNumbers && c.phoneNumbers.length > 0
    );
    setContatos(contatosComTelefone);
    setBusca("");
    setModalVisible(true);
  };

  // Função para selecionar contato do modal
  const selecionarContato = (contato) => {
    setAmigo(contato.name);
    setTelefoneAmigo(contato.phoneNumbers[0].number);
    setModalVisible(false);
  };

  // Filtra contatos conforme busca
  const contatosFiltrados = contatos.filter((c) =>
    c.name.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Header title="Bem-vindo" />

      {/* Modal para escolher contato */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={{ flex: 1, backgroundColor: "#fff", padding: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 16 }}>
            Selecione um amigo
          </Text>
          {/* Campo de busca com lupa */}
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            marginBottom: 16,
            paddingHorizontal: 8,
            backgroundColor: "#f1f1f1"
          }}>
            <Ionicons name="search" size={20} color="#888" style={{ marginRight: 6 }} />
            <TextInput
              placeholder="Buscar contato"
              style={{ flex: 1, height: 40 }}
              value={busca}
              onChangeText={setBusca}
              autoFocus
            />
          </View>
          <FlatList
            data={contatosFiltrados}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  padding: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: "#eee",
                }}
                onPress={() => selecionarContato(item)}
              >
                <Text style={{ fontSize: 16 }}>{item.name}</Text>
                <Text style={{ color: "#666" }}>
                  {item.phoneNumbers[0].number}
                </Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            style={[styles.button, { marginTop: 24 }]}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Abas de navegação */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            tab === "entrar" ? styles.tabButtonActive : styles.tabButtonInactive,
          ]}
          onPress={() => {
            setTab("entrar");
            setTipoCadastro(null);
          }}
        >
          <Text
            style={[
              styles.tabButtonText,
              tab === "entrar" ? styles.tabButtonTextActive : styles.tabButtonTextInactive,
            ]}
          >
            Entrar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            tab === "cadastrar" ? styles.tabButtonActive : styles.tabButtonInactive,
          ]}
          onPress={() => setTab("cadastrar")}
        >
          <Text
            style={[
              styles.tabButtonText,
              tab === "cadastrar" ? styles.tabButtonTextActive : styles.tabButtonTextInactive,
            ]}
          >
            Cadastrar
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        {tab === "entrar" ? (
          // Tela de Login
          <View>
            <Text style={styles.title}>Entrar na sua conta</Text>
            <TextInput
              placeholder="E-mail"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              placeholder="Senha"
              secureTextEntry
              style={styles.input}
            />
            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Entrar</Text>
            </TouchableOpacity>
            {/* Botões sociais (exemplo visual) */}
            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 16 }}>
              <TouchableOpacity style={[styles.socialButton, { backgroundColor: "#fff" }]}>
                <Image
                  source={require("../assets/logoGmail.png")} 
                  style={{ width: 24, height: 24, marginRight: 8 }}
                  resizeMode="contain"
                />
                <Text style={{ color: "#333" }}>Entrar com Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.socialButton, { backgroundColor: "#000", marginLeft: 10 }]}>
                <Text style={{ color: "#fff" }}>Entrar com Apple</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          // Tela de Cadastro
          <View>
            <Text style={styles.title}>Escolha o tipo de cadastro</Text>
            {tipoCadastro === null ? (
              <View style={styles.cardRow}>
                {["Usuário", "Amigo", "Parceiro"].map((tipo) => (
                  <TouchableOpacity
                    key={tipo}
                    style={styles.card}
                    activeOpacity={0.8}
                    onPress={() => setTipoCadastro(tipo)}
                  >
                    <Text style={styles.cardText}>{tipo}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : tipoCadastro === "Usuário" ? (
              <View>
                <Text style={styles.title}>Dados do Usuário</Text>
                <TextInput
                  placeholder="Nome completo"
                  style={styles.input}
                  value={nome}
                  onChangeText={setNome}
                />
                <TextInput
                  placeholder="E-mail"
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TextInput
                  placeholder="Telefone"
                  style={styles.input}
                  value={telefone}
                  onChangeText={setTelefone}
                  keyboardType="phone-pad"
                />
                <TextInput
                  placeholder="Senha"
                  secureTextEntry
                  style={styles.input}
                  value={senha}
                  onChangeText={setSenha}
                />
                <TouchableOpacity onPress={escolherContato}>
                  <TextInput
                    placeholder="Amigo"
                    style={[styles.input, { backgroundColor: "#f1f1f1" }]}
                    value={amigo}
                    editable={false}
                    pointerEvents="none"
                  />
                  {/* Ícone de lupa sobreposto ao campo */}
                  <Ionicons
                    name="search"
                    size={20}
                    color="#888"
                    style={{
                      position: "absolute",
                      right: 16,
                      top: 18,
                      zIndex: 1,
                    }}
                  />
                </TouchableOpacity>
                <TextInput
                  placeholder="Telefone do Amigo"
                  style={[styles.input, { backgroundColor: "#f1f1f1" }]}
                  value={telefoneAmigo}
                  editable={false}
                  pointerEvents="none"
                />
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
                {/* Botões sociais para cadastro */}
                <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 16 }}>
                  <TouchableOpacity style={[styles.socialButton, { backgroundColor: "#fff" }]}>
                    <Text style={{ color: "#333" }}>Cadastrar com Google</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.socialButton, { backgroundColor: "#000", marginLeft: 10 }]}>
                    <Text style={{ color: "#fff" }}>Cadastrar com Apple</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => setTipoCadastro(null)} style={{ marginTop: 10 }}>
                  <Text style={{ color: "#2563eb", textAlign: "center" }}>Voltar</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <Text style={styles.title}>Cadastro de {tipoCadastro}</Text>
                {/* Campos para Amigo/Parceiro */}
                <TouchableOpacity onPress={() => setTipoCadastro(null)} style={{ marginTop: 10 }}>
                  <Text style={{ color: "#2563eb", textAlign: "center" }}>Voltar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
}