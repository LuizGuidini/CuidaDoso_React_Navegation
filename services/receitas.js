import axios from 'axios';

const API_URL = 'https://api-receitas-pi.vercel.app';

// Buscar receitas por descrição
export const buscarReceitasPorDescricao = async (descricao, limit = 20) => {
  try {
    const res = await axios.get(`${API_URL}/receitas/descricao`, {
      params: {
        descricao: descricao.toLowerCase(),
        page: 1,
        limit,
      },
    });
    return res.data.data || [];
  } catch (error) {
    console.error('Erro ao buscar por descrição:', error.message);
    return [];
  }
};


// Buscar receitas por tipo ("doce", "salgado", "agridoce")
export const buscarReceitasPorTipo = async (tipo) => {
  try {
    const res = await axios.get(`${API_URL}/receitas/tipo/${tipo}`);
    return res.data || [];
  } catch (error) {
    console.error('Erro ao buscar por tipo:', error.message);
    return [];
  }
};

// Buscar 3 receitas aleatórias de tipos variados
export const buscarReceitasAleatorias = async () => {
  try {
    const tipos = ['doce', 'salgado', 'agridoce'];
    const todas = await Promise.all(
      tipos.map(async (tipo) => {
        const res = await axios.get(`${API_URL}/receitas/tipo/${tipo}`);
        return res.data || [];
      })
    );
    const combinadas = todas.flat().filter((r) => r?.receita && r?.link_imagem);
    const embaralhadas = combinadas.sort(() => 0.5 - Math.random());
    return embaralhadas.slice(0, 3);
  } catch (error) {
    console.error('Erro ao buscar receitas aleatórias:', error.message);
    return [];
  }
};

