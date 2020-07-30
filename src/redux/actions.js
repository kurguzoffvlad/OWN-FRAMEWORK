import {
  CHANGE_TEXT,
  CHANGE_STYLES,
  TABLE_RESIZE,
  APPLY_STYLE,
  CHANGE_TITLE,
  CHANGE_THEME,
  UPDATE_DATE,
  GET_USER
} from './types'

// Action Creator
export function tableResize(data) { return { type: TABLE_RESIZE, data } }

export function updateDate() { return { type: UPDATE_DATE } }

export function changeText(data) { return { type: CHANGE_TEXT, data } }

export function changeTheme(data) { return { type: CHANGE_THEME, data } }

export function changeStyles(data) { return { type: CHANGE_STYLES, data } }

export function changeTitle(data) { return { type: CHANGE_TITLE, data } }
// value, ids
export function applyStyle(data) { return { type: APPLY_STYLE, data } }

export function getUser(data) { return { type: GET_USER, data } }

