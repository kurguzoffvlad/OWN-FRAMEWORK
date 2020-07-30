import {CoreActiveRoute} from './core/routes/CoreActiveRoute'
import {CoreRouter} from './core/routes/CoreRouter'

import {DashboardPage} from './pages/DashboardPage'
import {ExcelPage} from './pages/ExcelPage'

import './scss/index.scss'
import { pageExcel, pageDashboard } from './constants'

// ТОЧКА ВХОДА В ПРИЛОЖЕНИЕ - ЛОГИКА ПРИСВОЕНИЯ КЛАССА ПРИ СМЕНЕ АДРЕСА
export const appPages = {[pageDashboard]: DashboardPage, [pageExcel]: ExcelPage}

// прописываем логику отображения страниц для CoreRouter при смене адреса
// реализуется класс страницы в зависимости от пути
export function selectPage() {
  let Page = null
  if (CoreActiveRoute.path.includes(Object.entries(appPages)[1][0])) {
    Page = Object.entries(appPages)[1][1]
  } else {
    Page = Object.entries(appPages)[0][1]
  }
  return Page // отправляем в CoreRouter
}

new CoreRouter('#app', appPages)
