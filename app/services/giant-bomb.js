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
      query: `%${searchText}%`,
      resources: [
        'game'
      ].join(','),
      field_list: "id,name,image,deck,api_detail_url,platforms",
    }
  )

  return ajax.getJSON(`https://www.giantbomb.com/api/search/?${qs.stringify(queryParams)}`)
}