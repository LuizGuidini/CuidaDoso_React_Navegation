import { useEffect, useRef, useState } from 'react';
import { Animated, Image, Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles/Onboarding.styles';

export default function OnboardingScreen({ navigation }) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  // Animação de pulso
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const nextSlide = () => {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    } else {
      navigation.replace('Auth'); // ou 'MainDrawer' se já estiver logado
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo com animação de pulso */}
      <Animated.Image
        source={require('../assets/images/Logo_semfundo.png')}
        style={[styles.logo, { transform: [{ scale: scaleAnim }] }]}
      />

      {/* Slide ilustrativo */}
      <Image source={slide.image} style={styles.image} />
      <Text style={styles.title}>{slide.title}</Text>
      <Text style={styles.text}>{slide.text}</Text>

      {/* Botão de navegação */}
      <TouchableOpacity style={styles.button} onPress={nextSlide}>
        <Text style={styles.buttonText}>
          {index < slides.length - 1 ? 'Próximo' : 'Começar'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// Slides fora do componente para evitar recriação
const slides = [
  {
    title: 'Bem-vindo ao CuidaDoso',
    text: 'Estamos aqui para te acompanhar com carinho e segurança.',
    image: require('../assets/images/onboarding1.png'),
  },
  {
    title: 'Organize sua rotina',
    text: 'Medicamentos, compromissos e transportes em um só lugar.',
    image: require('../assets/images/onboarding2.png'),
  },
  {
    title: 'Ajuda rápida',
    text: 'Em caso de emergência, toque no botão Ajuda.',
    image: require('../assets/images/onboarding5.png'),
  },
];
