import { CommonActions, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { View } from 'react-native';

export default function InicioWrapper() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'Tabs',
            state: {
              index: 0,
              routes: [{ name: 'Inicio' }],
            },
          },
        ],
      })
    );
  }, [navigation]);

  return <View />;
}


