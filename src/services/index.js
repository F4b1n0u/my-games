/**
 * Mocking client-server processing
 */
import _suggestions from './suggestions'
import { Observable } from 'rxjs/Observable'

const TIMEOUT = 100;
const MAX_CHECKOUT = 2; // max different items

export const giantBomb = {
  getSuggestions(searchText) {
    return new Observable(observer => {
      const timerId = setTimeout(() => {
        observer.next(_suggestions);
        observer.complete();
      }, TIMEOUT);
      return () => clearTimeout(timerId);
    });
  },
}
