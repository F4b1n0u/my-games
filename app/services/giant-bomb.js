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
  response.results = response.results.map(game => _.merge(game, {isComplet: true}))
  return response
}

const markGamesAsIncomplete = response => {
  response.results = response.results.map(game => _.merge(game, {isComplet: false}))
  return response
}

export const fetchFranchiseFranchises = (searchText) => {
  const queryParams = _.merge(
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

export const fetchGames = (searchText) => {
  const queryParams = _.merge(
    defaultQueryParams,
    {
      filter: `name:%${searchText.replace(' ', '%')}%`,
      sort: 'number_of_user_reviews:desc',
      field_list: "id,name,image,deck,platforms",
    }
  )

  return ajax
    .getJSON(`https://www.giantbomb.com/api/games/?${qs.stringify(queryParams)}`)
    .map(markGamesAsComplete)
}

export const fetchGame = ({id}) => {
  const gamePrefix = 3030 // don;t ask me why see that with giantBomb xD, looks like the prefix depend of the endpoint
  const queryParams = _.merge(
    defaultQueryParams,
    {
      filter: `name:%${searchText.replace(' ', '%')}%`,
      sort: 'number_of_user_reviews:desc',
      field_list: 'id,name,image,deck,platforms'
    }
  )

  return ajax
    .getJSON(`https://www.giantbomb.com/api/game/${gamePrefix}-${id}?${qs.stringify(queryParams)}`)
    .map(markGamesAsComplete)
}