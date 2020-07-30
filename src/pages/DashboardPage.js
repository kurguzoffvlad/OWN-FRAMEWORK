import {Dashboard} from '../components/dashboard/Dashboard'
import { CorePageStore } from '../core/page/CorePageStore'
import { pageDashboard } from '../constants'
import { checkTheme } from '../core/functions/theme'

// УКАЗАТЬ КАКИЕ КОМПОНЕНТЫ БУДУТ НА СТРАНИЦЕ
// УКАЗАТЬ КАКОЙ CSS КЛАСС ПРИСВОИТЬ СТРАНИЦЕ

export class DashboardPage extends CorePageStore {
  static className = pageDashboard
  static components = [Dashboard]

  constructor(options) { super(options) }

  afterRender() { super.afterRender(); checkTheme() }
}
