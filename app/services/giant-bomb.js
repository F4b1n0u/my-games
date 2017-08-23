import 'rxjs'
import { ajax } from 'rxjs/observable/dom/ajax'
import qs from "query-string"
import _ from 'lodash'
import {
  API_KEY,
} from 'react-native-dotenv'

const defaultQueryParams = {
  api_key: API_KEY,
  format: 'json',
}

const markGamesAsComplete = response => {
  response.results = response.results.map(game => _.merge(game, {isComplete: true}))
  return response
}

const markFranchiseGamesAsIncomplete = response => {
  response.results.games = response.results.games.map(game => _.merge(game, {isComplete: false}))
  return response
}

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
        'franchise'
      ].join(','),
      field_list: "",
      limit: 6,
    }
  )

  return ajax.getJSON(`https://www.giantbomb.com/api/search/?${qs.stringify(queryParams)}`)
}

export const fetchGames = (
  searchText,
  params = {
    offset: 0,
  },
) => {
  const {
    offset,
  } = params

  const queryParams = _.merge(
    {},
    defaultQueryParams,
    {
      filter: `name:%${searchText.replace(' ', '%')}%`,
      field_list: "id,name,image,images,deck,platforms",
      limit: 10,
      offset,
    }
  )

  console.log(`${qs.stringify(queryParams)}`)

  return ajax
    .getJSON(`https://www.giantbomb.com/api/games/?${qs.stringify(queryParams)}`)
}

export const fetchGame = ({id}) => {
  const prefix = 3030 // don't ask me why see that with giantBomb xD, looks like the prefix depend of the endpoint
  const queryParams = _.merge(
    {},
    defaultQueryParams,
    {
      field_list: 'id,name,image,images,deck,platforms'
    }
  )

  return ajax
    .getJSON(`https://www.giantbomb.com/api/game/${prefix}-${id}/?${qs.stringify(queryParams)}`)
}

export const fetchFranchiseCompletion = ({id}) => {
  const prefix = 3025 // don't ask me why see that with giantBomb xD, looks like the prefix depend of the endpoint
  const queryParams = _.merge(
    {},
    defaultQueryParams,
    {
      field_list: 'games'
    }
  )

  return ajax
    .getJSON(`https://www.giantbomb.com/api/franchise/${prefix}-${id}/?${qs.stringify(queryParams)}`)
    .map(markFranchiseGamesAsIncomplete)
}