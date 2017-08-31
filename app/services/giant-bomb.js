import 'rxjs'
import { ajax } from 'rxjs/observable/dom/ajax'
import qs from 'query-string'
import _ from 'lodash'
import {
  API_KEY,
} from 'react-native-dotenv'

const defaultQueryParams = {
  api_key: API_KEY,
  format: 'json',
}

const markGameCompletionLevel = (
  completionLevel,
  game
) => _.merge(
  {},
  game,
  {
    completionLevel,
  }
)

export const extractPagination = response => ({
  max: response.limit,
  amount: response.number_of_page_results,
  total: response.number_of_total_results,
  offset: response.offset,
})

export const fetchFranchises = (searchText) => {
  const queryParams = _.merge(
    {},
    defaultQueryParams,
    {
      query: `%${searchText}%`,
      resources: [
        'franchise',
      ].join(','),
      field_list: '',
      limit: 6,
    }
  )

  return ajax.getJSON(`https://www.giantbomb.com/api/search/?${qs.stringify(queryParams)}`)
}

export const fetchGamesBySearch = (
  searchText,
  params = {
    offset: 0,
  }
) => {
  const {
    offset,
  } = params

  const queryParams = _.merge(
    {},
    defaultQueryParams,
    {
      filter: `name:%${searchText.replace(' ', '%')}%`,
      field_list: 'id,name,image,deck,platforms',
      limit: 10,
      offset,
    }
  )

  return ajax
    .getJSON(`https://www.giantbomb.com/api/games/?${qs.stringify(queryParams)}`)
    .map((response) => {
      response.results = response.results.map(markGameCompletionLevel.bind(null, 2))
      return response
    })
}

export const fetchFullGame = ({ id }) => {
  // don't ask me why see that with giantBomb xD, looks like the prefix depend of the endpoint
  const prefix = 3030
  const queryParams = _.merge(
    {},
    defaultQueryParams,
    {
      field_list: 'id,name,image,images,deck,platforms',
    }
  )

  return ajax
    .getJSON(`https://www.giantbomb.com/api/game/${prefix}-${id}/?${qs.stringify(queryParams)}`)
    .map((response) => {
      response.results = markGameCompletionLevel(3, response.results)
      return response
    })
}

export const fetchGamesByBulk = (games) => {
  const queryParams = _.merge(
    {},
    defaultQueryParams,
    {
      field_list: 'id,name,image,deck,platforms',
      filter: `id:${games.map(game => game.id).join('|')}`,
    }
  )
  return ajax
    .getJSON(`https://www.giantbomb.com/api/games/?${qs.stringify(queryParams)}`)
    .map((response) => {
      response.results = response.results.map(markGameCompletionLevel.bind(null, 2))
      return response
    })
}

export const fetchFranchiseCompletion = ({ id }) => {
  // don't ask me why see that with giantBomb xD, looks like the prefix depend of the endpoint
  const prefix = 3025
  const queryParams = _.merge(
    {},
    defaultQueryParams,
    {
      field_list: 'games',
    }
  )

  return ajax
    .getJSON(`https://www.giantbomb.com/api/franchise/${prefix}-${id}/?${qs.stringify(queryParams)}`)
    .map((response) => {
      response.results.games = response.results.games.map(markGameCompletionLevel.bind(null, 1))
      return response
    })
}
