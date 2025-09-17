// auth/authApple.js
import * as AppleAuthentication from 'expo-apple-authentication';
import { OAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../config/firebaseInit';

//import { auth } from '../config/firebaseConfig';

export const loginComApple = async (navigation, tipoInicial = null) => {
  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });

    if (!credential.identityToken) {
      throw new Error("Token de identidade não encontrado");
    }

    const appleCredential = OAuthProvider('apple.com').credential({
      idToken: credential.identityToken,
    });

    await signInWithCredential(auth, appleCredential);
    navigation.navigate('ComplementoCadastro', { tipoInicial });
  } catch (error) {
    console.error('Erro com Apple:', error);
  }
};


//Feito instação do expo-apple-authentication