import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importando suas telas
import AgendaScreen from './screens/AgendaScreen';
import AtividadesScreen from './screens/AtividadesScreen';
import HomeScreen from './screens/HomeScreen';
import LugaresScreen from './screens/LugaresScreen';
import MedicamentosScreen from './screens/MedicamentosScreen';
import PerfilScreen from './screens/PerfilScreen';
import ReceitasScreen from './screens/ReceitasScreen';
import TransportesScreen from './screens/TransportesScreen';

// Crie os demais conforme for precisando


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Tela inicial */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }} // usamos o Header personalizado
        />

        {/* Telas secundárias */}
        <Stack.Screen name="Agenda" component={AgendaScreen} />
        <Stack.Screen name="Transportes" component={TransportesScreen} />
        <Stack.Screen name="Medicamentos" component={MedicamentosScreen} />
        <Stack.Screen name="Perfil" component={PerfilScreen} />
        <Stack.Screen name="Atividades" component={AtividadesScreen} />
        <Stack.Screen name="Receitas" component={ReceitasScreen} />
        <Stack.Screen name="Lugares" component={LugaresScreen} />

        {/* Exemplo de como adicionar as demais: */}
        {/* <Stack.Screen name="Transporte" component={TransporteScreen} /> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
}

