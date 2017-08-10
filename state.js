import _ from 'lodash'

export const initialState = {
    search: '',
    suggestions: [],
    games: []
}

export const generateInitialState = ({hasSuggestions, amountOfGames}) => {
  let nextState = _.merge(
    {},
    initialState,
  );

  let games = [];
  for (var i = 0; i < amountOfGames; i++) {
    games = _.concat(games, generateGame());
  }

  let suggestions = [];
  if (hasSuggestions) {
    suggestions = generateSugestions();
  }

  _.merge(
    nextState,
    {
      games,
      suggestions,
    }
  );



  return nextState;
}

export const generateGame = () => {
  return {
    id: Math.floor(Math.random() * 1000),
    name: 'The Legend of Zelda: Breath of the Wild',
    platforms: [
      {
        id: Math.floor(Math.random() * 1000),
        name: 'Wii',
        abbreviation: 'Wii'
      },
      {
        id: Math.floor(Math.random() * 1000),
        name: 'Wii',
        abbreviation: 'snes'
      },
      {
        id: Math.floor(Math.random() * 1000),
        name: 'Wii',
        abbreviation: 'Wii'
      },
      {
        id: Math.floor(Math.random() * 1000),
        name: 'Wii',
        abbreviation: 'Wii'
      },
    ],
  };
} 

export const generateSugestions = () => {
  return [{
    id: 1029,
    score: 371.19376,
    name: 'The Legend of Zelda: Ocarina of Time',
    value: 'The Legend of Zelda: Ocarina of Time (1998)',
    url: '/games/the-legend-of-zelda-ocarina-of-time',
    cloudinary: 'shusfaev6gpjuskum2vp'
  },
  {
    id: 7346,
    score: 363.84894,
    name: 'The Legend of Zelda: Breath of the Wild',
    value: 'The Legend of Zelda: Breath of the Wild (2017)',
    url: '/games/the-legend-of-zelda-breath-of-the-wild',
    cloudinary: 'jk9el4ksl4c7qwaex2y5'
  },
  {
    id: 1036,
    score: 331.98355,
    name: 'The Legend of Zelda: Twilight Princess',
    value: 'The Legend of Zelda: Twilight Princess (2006)',
    url: '/games/the-legend-of-zelda-twilight-princess',
    cloudinary: 'as5ynbrxuoqrxoha1dsa'
  },
  {
    id: 1022,
    score: 304.82425,
    name: 'The Legend of Zelda',
    value: 'The Legend of Zelda (1986)',
    url: '/games/the-legend-of-zelda',
    cloudinary: 'k415aburtx4t0h64fpal'
  },
  {
    id: 2909,
    score: 303.90863,
    name: 'The Legend of Zelda: A Link Between Worlds',
    value: 'The Legend of Zelda: A Link Between Worlds (2013)',
    url: '/games/the-legend-of-zelda-a-link-between-worlds',
    cloudinary: 'r9ezsk5yhljc83dfjeqc'
  }];
}