import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { View } from 'react-native';

export default function PerfilWrapper() {
  const navigation = useNavigation();

   useEffect(() => {
    navigation.navigate('MainDrawer', {
        screen: 'Tabs',
        params: { screen: 'Perfil' },
    });
  }, [navigation]);

  return <View />;
}
