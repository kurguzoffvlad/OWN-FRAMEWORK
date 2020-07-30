import {StateComponent} from '../../core/store/StateComponent'
import { createTemplate } from './dashboard.template'
import {
  pageDashboard,
  themePage,
  stateDefault,
  pageItem
} from '../../constants'
import { changeTheme } from '../../redux/actions'
import { setTheme } from '../../core/functions/theme'
import { storage } from '../../core/functions/utils'


export class Dashboard extends StateComponent {
  static className = pageDashboard

  constructor($root, options) {
    super($root, {
      name: 'Dashboard',
      listeners: ['click'],
      subscribe: ['theme', 'openedDate'],
      ...options })
    this.store = options.store
  }

  prepare() { this.initState(storage(pageItem[0])|| stateDefault) }

  get template() { return createTemplate(this.state) }

  toHTML() { return this.template }

  onClick(e) {
    if (e.target.dataset.theme === 'theme') {
      let theme
      const data = this.store.getState().theme
      data === themePage[1]
        ? theme = themePage[0]
        : theme = themePage[1]

      this.$$dispatchState(changeTheme(theme))
    }
  }

  storeChanged(changes) {
    setTheme(changes.theme)
    this.setState(changes) // в setState this.$root.html(this.template)
  }
}
