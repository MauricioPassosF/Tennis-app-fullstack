export default function validatePlayersId(playerAId:number, playerBId:number): void {
  if (playerAId < 1 || playerBId < 1) {
    throw new Error('Jogador não selecionado');
  }
  if (playerAId === playerBId) {
    throw new Error('Jogadores selecionados iguais');
  }
}
