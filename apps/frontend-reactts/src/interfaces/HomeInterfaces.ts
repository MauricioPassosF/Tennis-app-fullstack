import { PlayerInfo } from '../types/Player';

export interface IPlayerInfoState {
  playerInfoState: {
    setPlayerInfo: React.Dispatch<React.SetStateAction<PlayerInfo | undefined>>;
    playerInfo: PlayerInfo | undefined;
  }
}

export interface IShouldFetchProp {
  shouldFetchProp: {
    setShouldFetchUserData: React.Dispatch<React.SetStateAction<boolean>>;
    shouldFetchUserData: boolean;
  }
}
