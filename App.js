import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

import "./config/firebaseInit"; // força inicialização antes de tudo
import { auth } from "./config/firebaseInit"; // importa o auth corretamente

// Importando suas telas
import AgendaScreen from "./screens/AgendaScreen";
import AmigoScreen from "./screens/AmigoScreen";
import AtividadesScreen from "./screens/AtividadesScreen";
import AuthScreen from "./screens/AuthScreen";
import ComplementoCadastroScreen from "./screens/ComplementoCadastroScreen";
import CriarCompromissoScreen from "./screens/CriarCompromissoScreen";
import EscolherMotoristaScreen from "./screens/EscolherMotoristaScreen";
import HomeScreen from "./screens/HomeScreen";
import LugaresScreen from "./screens/LugaresScreen";
import MedicamentosScreen from "./screens/MedicamentosScreen";
import NovoMedicamentoScreen from "./screens/NovoMedicamentoScreen";
import NovoTransporteScreen from "./screens/NovoTransporteScreen";
import PerfilScreen from "./screens/PerfilScreen";
import ReceitaDetalheScreen from "./screens/ReceitaDetalheScreen";
import ReceitasScreen from "./screens/ReceitasScreen";
import TransportesScreen from "./screens/TransportesScreen";

// Configurando navegadores

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// 🔹 Tab Navigator (menu fixo)
function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "#fff", height: 80, paddingTop: 10 },
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
            case "Auth": iconName = "alert-circle-outline"; break;
            default: iconName = "ellipse-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Agenda" component={AgendaScreen} />
      <Tab.Screen name="Transporte" component={TransportesScreen} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Medicamentos" component={MedicamentosScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
      <Tab.Screen name="Atividades" component={AtividadesScreen} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Receitas" component={ReceitasScreen} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Lugares" component={LugaresScreen} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Amigo" component={AmigoScreen} />
          
    </Tab.Navigator>
  );
}

function MainDrawer() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Início" component={HomeScreen} />
      <Drawer.Screen name="Agenda" component={AgendaScreen} />
      <Drawer.Screen name="Perfil" component={PerfilScreen} />
      <Drawer.Screen name="Medicamentos" component={MedicamentosScreen} />
      <Drawer.Screen name="Tabs" component={MainTabs} options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="Transportes" component={TransportesScreen} options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="Receitas" component={ReceitasScreen} options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="Atividades" component={AtividadesScreen} options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="Lugares" component={LugaresScreen} options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="Amigo" component={AmigoScreen} options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="Auth" component={AuthScreen} options={{ drawerItemStyle: { display: 'none' } }} />     
    </Drawer.Navigator>
  );
}


// 🔹 Stack Navigator (envolve Auth + Tabs + extras)
export default function App() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Usuário detectado:", user?.uid || "Nenhum usuário logado");
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
        {/* <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} /> */}
        <Stack.Screen name="MainDrawer" component={MainDrawer} options={{ headerShown: false }} />
        <Stack.Screen name="ReceitaDetalhe" component={ReceitaDetalheScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ComplementoCadastro" component={ComplementoCadastroScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CriarCompromisso" component={CriarCompromissoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NovoMedicamento" component={NovoMedicamentoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NovoTransporte" component={NovoTransporteScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EscolherMotorista" component={EscolherMotoristaScreen} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
