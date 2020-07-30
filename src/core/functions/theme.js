import { storage } from './utils';
import { pageItem, themePage } from '../../constants';

export function setTheme(theme) {
  document.documentElement.setAttribute('theme', theme);
}

export function checkTheme() {
  const theme = storage(pageItem[0])
      ? storage(pageItem[0]).theme
      : themePage[0]
  setTheme(theme)
}
