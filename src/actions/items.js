import { add, get, listenItems } from "../services/firebaseApi"

export function itemsHasErrored(bool) {
  return {
    type: 'ITEMS_HAS_ERRORED',
    hasErrored: bool
  }
}

export function itemsIsLoading(bool) {
  return {
    type: 'ITEMS_IS_LOADING',
    isLoading: bool
  }
}

export function itemsFetchDataSuccess(items) {
  return {
    type: 'ITEMS_FETCH_DATA_SUCCESS',
    items
  }
}

export function itemsFetchData(url) {
  return (dispatch) => {
    listenItems((items) => dispatch(itemsFetchDataSuccess(items)))

    dispatch(itemsIsLoading(true))
    get()
      .then((items) => dispatch(itemsIsLoading(false)))
      .catch((e) => dispatch(itemsHasErrored(true)))
    }
}

export function itemsSetData(data) {
  return (dispatch) => {
    dispatch(itemsIsLoading(true))
    add(data)
      .then((response) => dispatch(itemsIsLoading(false)))
      .catch((e) => dispatch(itemsHasErrored(true)))
    }
}
