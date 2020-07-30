import {
  defaultStyles,
  defaultTitle,
  themePage,
  pageDashboard
} from '../constants'
import {clone} from '../core/functions/utils'

const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  user: '',
  currentStyles: defaultStyles,
  openedDate: new Date().toJSON()
}

const stateDefault = {
  theme: themePage[0],
  openedDate: new Date().toJSON()
}

const normalize = (state, page) => (
  page === pageDashboard
    ? {...state}
    :{
      ...state,
      currentStyles: defaultStyles,
      currentText: ''
    }
)

export function normalizeInitialState(state, page) {
  const defaults = page === pageDashboard ? stateDefault : defaultState
  return state ? normalize(state, page) : clone(defaults)
}
