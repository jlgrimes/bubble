import type { Match } from '../features/Tournament/Pairings/types';
import type { Player } from '../features/Tournament/Player/types';

export const SAMPLE_PLAYER: Player = {
  id: '0',
  name: 'Player',
  matches: [
    { opponentId: '1', result: 'win' },
    { opponentId: '2', result: 'loss' },
    { opponentId: '3', result: 'tie' },
  ],
  record: {
    wins: 1,
    ties: 1,
    losses: 1
  },
  matchPoints: 4
};

export const generateEmptyPlayers = (number: number) => Array.from(Array(number).keys()).map((id) => ({
  id: `${id}`,
  name: `Player ${id}`,
  matches: [],
  record: {
    wins: 0,
    ties: 0,
    losses: 0
  },
  matchPoints: 0
}));

export const SAMPLE_EMPTY_PLAYERS = [1, 2, 3, 4, 5, 6, 7, 8].map((id) => ({
  id: `${id}`,
  name: `Player ${id}`,
  matches: [],
  record: {
    wins: 0,
    ties: 0,
    losses: 0
  },
  matchPoints: 0
}));

export const SAMPLE_MATCH_TIERED_PLAYERS: Player[] = [
  {
    id: '0',
    name: 'Player',
    matches: [],
    record: {
      wins: 2,
      ties: 0,
      losses: 0
    },
    matchPoints: 6
  }, {
    id: '1',
    name: 'Player',
    matches: [],
    record: {
      wins: 2,
      ties: 0,
      losses: 0
    },
    matchPoints: 6
  }, {
    id: '2',
    name: 'Player',
    matches: [],
    record: {
      wins: 1,
      ties: 0,
      losses: 1
    },
    matchPoints: 3
  }, {
    id: '3',
    name: 'Player',
    matches: [],
    record: {
      wins: 1,
      ties: 0,
      losses: 1
    },
    matchPoints: 3
  }, {
    id: '4',
    name: 'Player',
    matches: [],
    record: {
      wins: 1,
      ties: 0,
      losses: 1
    },
    matchPoints: 3
  }, {
    id: '5',
    name: 'Player',
    matches: [],
    record: {
      wins: 1,
      ties: 0,
      losses: 1
    },
    matchPoints: 3
  }, {
    id: '6',
    name: 'Player',
    matches: [],
    record: {
      wins: 0,
      ties: 0,
      losses: 2
    },
    matchPoints: 0
  }, {
    id: '7',
    name: 'Player',
    matches: [],
    record: {
      wins: 0,
      ties: 0,
      losses: 2
    },
    matchPoints: 0
  }
];

export const SAMPLE_ODD_MATCH_TIERED_PLAYERS: Player[] = [
  {
    id: '0',
    name: 'Player',
    matches: [],
    record: {
      wins: 2,
      ties: 0,
      losses: 0
    },
    matchPoints: 6
  },  {
    id: '1',
    name: 'Player',
    matches: [],
    record: {
      wins: 1,
      ties: 0,
      losses: 1
    },
    matchPoints: 3
  }, {
    id: '2',
    name: 'Player',
    matches: [],
    record: {
      wins: 1,
      ties: 0,
      losses: 1
    },
    matchPoints: 3
  }, {
    id: '3',
    name: 'Player',
    matches: [],
    record: {
      wins: 0,
      ties: 0,
      losses: 2
    },
    matchPoints: 0
  }
];

export const JARED: Player = {
  id: '0',
  name: 'Jared',
  matches: [
    { opponentId: '3', result: 'win' },
    { opponentId: '1', result: 'win' },
  ],
  record: {
    wins: 2,
    ties: 0,
    losses: 0
  },
  matchPoints: 6
};

export const NOAH: Player = {
  id: '1',
  name: 'Noah',
  matches: [
    { opponentId: '2', result: 'win' },
    { opponentId: '1', result: 'loss' },
  ],
  record: {
    wins: 1,
    ties: 0,
    losses: 1
  },
  matchPoints: 3
};

export const RYAN: Player = {
  id: '2',
  name: 'Ryan',
  matches: [
    { opponentId: '1', result: 'loss' },
    { opponentId: '3', result: 'win' },
  ],
  record: {
    wins: 1,
    ties: 0,
    losses: 1
  },
  matchPoints: 3
};

export const KENNY: Player = {
  id: '3',
  name: 'Kenny',
  matches: [
    { opponentId: '0', result: 'loss' },
    { opponentId: '0', result: 'loss' },
  ],
  record: {
    wins: 0,
    ties: 0,
    losses: 2
  },
  matchPoints: 0
};

export const SAMPLE_UNSORTED_PLAYER_LIST: Player[] = [
  KENNY, JARED, NOAH, RYAN
];

export const SAMPLE_SORTED_PLAYER_LIST: Player[] = [
  JARED, NOAH, RYAN, KENNY
];

export const SAMPLE_MATCH_RESULTS: Match[] = [
  // Jared beat player 4
  { playerIds: ['4', '0'], result: 'loss' },
  // Noah beat player 5
  { playerIds: ['5', '2'], result: 'loss' },
  // Ryan lost to player 6
  { playerIds: ['6', '2'], result: 'win' },
  // Kenny lost to player 7
  { playerIds: ['3', '7'], result: 'loss' },
]

export const SAMPLE_PAIRINGS: string[][] =  [
  ['0', '1'],
  ['2', '3']
];