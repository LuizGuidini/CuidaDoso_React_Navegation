import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

export const loginComGoogle = async (response, navigation, tipoInicial = null) => {
  if (response?.type === 'success') {
    const { id_token } = response.params;
    const credential = GoogleAuthProvider.credential(id_token);
    await signInWithCredential(auth, credential);
    navigation.navigate('ComplementoCadastro', { tipoInicial });
  }
};

//Feito instação do expo-auth-session