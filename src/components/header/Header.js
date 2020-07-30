import {CoreComponent} from '../../core/CoreComponent'
import {$} from '../../core/CoreDom'
import {changeTitle} from '../../redux/actions'
import {defaultTitle, pageItem} from '../../constants'
import {CoreActiveRoute} from '../../core/routes/CoreActiveRoute'
import {debounce} from '../../core/functions/utils'

export class Header extends CoreComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    })
  }

  prepare() { this.onInput = debounce(this.onInput, 300) }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `
      <input type="text" class="input" value="${title}" />

      <div>

        <div class="button" data-button="remove">
          <i class="material-icons" data-button="remove">delete</i>
        </div>

        <div class="button" data-button="exit">
          <i class="material-icons" data-button="exit">exit_to_app</i>
        </div>

      </div>
    `
  }

  onClick(event) {
    const $target = $(event.target)

    if ($target.data.button === 'remove') {
      const decision = confirm('Вы действительно хотите удалить эту таблицу?')

      if (decision) {
        localStorage.removeItem(pageItem[1] + CoreActiveRoute.param)
        CoreActiveRoute.navigate('')
      }
    } else if ($target.data.button === 'exit') {
      CoreActiveRoute.navigate('')
    }
  }

  onInput(event) {
    const $target = $(event.target)
    this.$$dispatchState(changeTitle($target.text()))
  }
}
