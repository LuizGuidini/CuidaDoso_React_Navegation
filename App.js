import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Notifications from 'expo-notifications';
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

import { auth } from "./config/firebaseInit";


// Telas principais
import AuthScreen from "./auth/AuthScreen";
import ComplementoCadastroScreen from "./auth/ComplementoCadastroScreen";
import AgendaScreen from "./screens/AgendaScreen";
import AgendaSemanalScreen from "./screens/AgendaSemanalScreen";
import AmigoScreen from "./screens/AmigoScreen";
import AtividadeDetalheScreen from './screens/AtividadeDetalheScreen';
import AtividadesScreen from "./screens/AtividadesScreen";
import CriarCompromissoScreen from "./screens/CriarCompromissoScreen";
import EscolherMotoristaScreen from "./screens/EscolherMotoristaScreen";
import FavoritasScreen from './screens/FavoritasScreen';
import HomeScreen from "./screens/HomeScreen";
import LugaresScreen from "./screens/LugaresScreen";
import MedicamentosScreen from "./screens/MedicamentosScreen";
import NovoMedicamentoScreen from "./screens/NovoMedicamentoScreen";
import NovoTransporteScreen from "./screens/NovoTransporteScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import PerfilScreen from "./screens/PerfilScreen";
import ReceitaDetalheScreen from "./screens/ReceitaDetalheScreen";
import ReceitasScreen from "./screens/ReceitasScreen";
import TransportesScreen from "./screens/TransportesScreen";


//Tela do motorista
import MotoristaDashboardScreen from "./screens/MotoristaDashboardScreen";

//Telas de parceiro
import ClinicaDashboardScreen from "./screens/ClinicaDashboardScreen";

//Componentes
import CardChamado from "./components/CardChamado";
import CustomDrawerContent from "./components/CustomDrawerContent";

// Wrappers para navegação via Drawer mantendo tabBar visível
import AgendaWrapper from "./wrappers/AgendaWrapper";
import InicioWrapper from "./wrappers/InicioWrapper";
import MedicamentosWrapper from "./wrappers/MedicamentosWrapper";
import PerfilWrapper from "./wrappers/PerfilWrapper";

// Telas de jogos
import DificuldadeSudoku from './screens/Jogos/DificuldadeSudoku';
import MemoriaScreen from './screens/Jogos/MemoriaScreen';
import PalavrasScreen from './screens/Jogos/PalavrasScreen';
import ParabensScreen from "./screens/Jogos/ParabensScreen";
import SequenciaScreen from './screens/Jogos/SequenciaScreen';
import SudokuScreen from './screens/Jogos/SudokuScreen';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Configuração para exibir notificações quando o app estiver em primeiro plano
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "#f1f4f8", height: 80, paddingTop: 10 },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case "Inicio": iconName = "home-outline"; break;
            case "Agenda": iconName = "calendar-outline"; break;
            case "Transporte": iconName = "car-outline"; break;
            case "Medicamentos": iconName = "medkit-outline"; break;
            case "Perfil": iconName = "person-outline"; break;
            case "Atividades": iconName = "fitness-outline"; break;
            case "Receitas": iconName = "restaurant-outline"; break;
            case "Lugares": iconName = "location-outline"; break;
            case "Amigo": iconName = "people-outline"; break;
            default: iconName = "ellipse-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Transporte" component={TransportesScreen} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Atividades" component={AtividadesScreen} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Agenda" component={AgendaScreen} />      
      <Tab.Screen name="Medicamentos" component={MedicamentosScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />      
      <Tab.Screen name="Amigo" component={AmigoScreen} />
      <Tab.Screen name="Receitas" component={ReceitasScreen} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Lugares" component={LugaresScreen} options={{ tabBarButton: () => null }} />
    </Tab.Navigator>
  );
}

function MainDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      {/* Visíveis no menu */}
      <Drawer.Screen name="Início" component={InicioWrapper} 
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,}}
      />
      <Drawer.Screen name="Agenda" component={AgendaWrapper} 
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="calendar-outline" size={size} color={color} />,}}
      />
      <Drawer.Screen name="Perfil" component={PerfilWrapper} 
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,}}
      />
      <Drawer.Screen name="Medicamentos" component={MedicamentosWrapper} 
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="medkit-outline" size={size} color={color} />,}}
      />

      {/* Ocultos no menu, mas acessíveis via navegação */}
      <Drawer.Screen name="Tabs" component={MainTabs} options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="Transporte" component={TransportesScreen} options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="Receitas" component={ReceitasScreen} options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="Atividades" component={AtividadesScreen} options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="Lugares" component={LugaresScreen} options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="Amigo" component={AmigoScreen} options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="Auth" component={AuthScreen} options={{ drawerItemStyle: { display: 'none' } }} />
    </Drawer.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Usuário detectado:", user?.uid || "Nenhum usuário logado");
    });
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainDrawer" component={MainDrawer} options={{ headerShown: false }} />
        <Stack.Screen name="ReceitaDetalhe" component={ReceitaDetalheScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ComplementoCadastro" component={ComplementoCadastroScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CriarCompromisso" component={CriarCompromissoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NovoMedicamento" component={NovoMedicamentoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NovoTransporte" component={NovoTransporteScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EscolherMotorista" component={EscolherMotoristaScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AtividadeDetalhe" component={AtividadeDetalheScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Favoritas" component={FavoritasScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AgendaSemanal" component={AgendaSemanalScreen} options={{ headerShown: false }} />
        
        {/* Telas de jogos */}
        <Stack.Screen name="Palavras" component={PalavrasScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Sudoku" component={SudokuScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Memoria" component={MemoriaScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Sequencia" component={SequenciaScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DificuldadeSudoku" component={DificuldadeSudoku} options={{ headerShown: false }} />
        <Stack.Screen name="Parabens" component={ParabensScreen} options={{ headerShown: false }} />

        {/* Tela do motorista - pode ser acessada via navegação condicional após login */}
        <Stack.Screen name="MotoristaDashboard" component={MotoristaDashboardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CardChamado" component={CardChamado} options={{ headerShown: false }} />
        
        {/* Telas de parceiro - pode ser acessada via navegação condicional após login */}
        <Stack.Screen name="ClinicaDashboard" component={ClinicaDashboardScreen} options={{ headerShown: false }} />

      </Stack.Navigator>

    </NavigationContainer>
  );
}
