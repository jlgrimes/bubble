import { generateEmptyPlayers, SAMPLE_PLAYER } from '../../../../helpers/testConstants';
import { Match } from '../../Pairings/types';
import { byePlayer } from '../constants';
import reducer, {
  addPlayer,
  nextRound,
  removePlayer,
} from '../tournamentSlice';
import { TournamentState } from '../TournamentState';
import { ViewState } from '../ViewState';

describe('tournament reducers', () => {
  const initialState: TournamentState = {
    round: 0,
    pairings: [],
    players: [],
    matchResults: [],
    maxRounds: 5,
    topCut: undefined,
    viewState: 'tournament'
  }

  describe('addPlayer', () => {
    it('should add player', () => {
      expect(reducer(initialState, addPlayer(SAMPLE_PLAYER))).toEqual({
        ...initialState,
        players: [SAMPLE_PLAYER],
      });
    });
  });

  describe('removePlayer', () => {
    it('should remove player', () => {
      const previousState = {
        ...initialState,
        players: [SAMPLE_PLAYER],
      };
      expect(reducer(previousState, removePlayer('0'))).toEqual(initialState);
    });
  });

  // describe('nextRound', () => {
  //   it('should generate next round pairings with bye', () => {
  //     const players = [...generateEmptyPlayers(5), byePlayer];
  //     const previousState = {
  //       round: 1,
  //       pairings: [['0', '1'], ['2', '3'], ['4', 'bye']],
  //       players,
  //       matchResults: [
  //         { playerIds: ['0', '1'], result: 'win' } as Match,
  //         { playerIds: ['2', '3'], result: 'win' } as Match,
  //         { playerIds: ['4', 'bye'], result: 'win' } as Match,
  //       ],
  //       deterministicPairing: true,
  //       maxRounds: 5,
  //       topCut: undefined,
  //       viewState: 'tournament' as ViewState
  //     };
  //     expect(reducer(previousState, nextRound())).toMatchSnapshot();
  //   });
  // });
});
