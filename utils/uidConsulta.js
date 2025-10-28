import { auth } from '../config/firebaseInit';

/**
 * Retorna o UID correto para consultas e gravações
 * @param {string} tipoUsuario - 'usuario' ou 'amigo'
 * @param {string} uidVinculado - UID do usuário principal (se for amigo)
 * @returns {string} UID a ser usado
 */
export function getUidConsulta(tipoUsuario, uidVinculado) {
  return tipoUsuario === 'amigo' ? uidVinculado : auth.currentUser.uid;
}
