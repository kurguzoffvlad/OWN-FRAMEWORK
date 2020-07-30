import {Header} from '../components/header/Header'
import {Formula} from '../components/formula/Formula'
import {Toolbar} from '../components/toolbar/Toolbar'
import {Table} from '../components/table/Table'
import {CorePageStore} from '../core/page/CorePageStore'
import { pageExcel } from '../constants'
import { checkTheme } from '../core/functions/theme'

// УКАЗАТЬ КАКИЕ КОМПОНЕНТЫ БУДУТ НА СТРАНИЦЕ
// УКАЗАТЬ КАКОЙ CSS КЛАСС ПРИСВОИТЬ СТРАНИЦЕ

export class ExcelPage extends CorePageStore {
  static className = pageExcel
  static components = [Header, Formula, Toolbar, Table]

  constructor(options) { super(options) }

  afterRender() { super.afterRender(); checkTheme() }
}
