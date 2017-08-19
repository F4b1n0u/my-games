import 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';

import {
  API_KEY,
} from 'react-native-dotenv'

export function fetchSuggestions(searchText) {
  return ajax.getJSON(`http://www.giantbomb.com/api/search/?api_key=${API_KEY}&format=json&query="${searchText}"&resources[0]=game&field_list=name,image`)
}