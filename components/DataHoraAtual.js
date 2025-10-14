// components/DataHoraAtual.js
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export default function DataHoraAtual() {
  const [agora, setAgora] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setAgora(new Date());
    }, 60000); // atualiza a cada 60 segundos

    return () => clearInterval(intervalo); // limpa ao desmontar
  }, []);

  const dataFormatada = format(agora, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  const horaFormatada = format(agora, "HH:mm");

  return (
    <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
      <Text style={{ fontSize: 16, color: '#555' }}>{dataFormatada}</Text>
      <Text style={{ fontSize: 14, color: '#888' }}>Horário atual: {horaFormatada}</Text>
    </View>
  );
}
