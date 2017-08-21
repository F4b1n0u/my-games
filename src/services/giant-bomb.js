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

export function fetchSuggestions(searchText) {
  const queryParams = _.merge(
    defaultQueryParams,
    {
      query: searchText,
      resources: "game",
      field_list: "name,image,id",
      limit: 6,
    }
  )

  return ajax.getJSON(`http://www.giantbomb.com/api/search/?${qs.stringify(queryParams)}`)
}