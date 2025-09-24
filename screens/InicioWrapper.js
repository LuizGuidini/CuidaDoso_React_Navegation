import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { View } from 'react-native';

export default function InicioWrapper() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.navigate('MainDrawer', {
        screen: 'Tabs',
        params: { screen: 'Inicio' },
    });
  }, [navigation]);

  return <View />;
}

