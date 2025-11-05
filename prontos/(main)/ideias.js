//salvar imagem localmente

import * as FileSystem from 'expo-file-system';

const salvarImagemLocal = async (uriOriginal) => {
  const novoCaminho = FileSystem.documentDirectory + 'perfil.jpeg';
  await FileSystem.copyAsync({
    from: uriOriginal,
    to: novoCaminho,
  });
  return novoCaminho;
};