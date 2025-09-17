import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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
import HomeScreen from "./screens/HomeScreen";
import LugaresScreen from "./screens/LugaresScreen";
import MedicamentosScreen from "./screens/MedicamentosScreen";
import PerfilScreen from "./screens/PerfilScreen";
import ReceitaDetalheScreen from "./screens/ReceitaDetalheScreen";
import ReceitasScreen from "./screens/ReceitasScreen";
import TransportesScreen from "./screens/TransportesScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 🔹 Tab Navigator (menu fixo)
function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "#fff", height: 70 },
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
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Agenda" component={AgendaScreen} />
      <Tab.Screen name="Transporte" component={TransportesScreen} />
      <Tab.Screen name="Medicamentos" component={MedicamentosScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
      <Tab.Screen name="Atividades" component={AtividadesScreen} />
      <Tab.Screen name="Receitas" component={ReceitasScreen} />
      <Tab.Screen name="Lugares" component={LugaresScreen} />
      <Tab.Screen name="Amigo" component={AmigoScreen} />
    </Tab.Navigator>
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
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="ReceitaDetalhe" component={ReceitaDetalheScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ComplementoCadastro" component={ComplementoCadastroScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
