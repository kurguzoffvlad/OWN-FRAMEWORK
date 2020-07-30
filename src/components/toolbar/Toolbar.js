import {createToolbar} from './toolbar.template'
import {$} from '../../core/CoreDom'
import {StateComponent} from '../../core/store/StateComponent'
import {defaultStyles} from '../../constants'

export class Toolbar extends StateComponent {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options
    })
  }

  prepare() { this.initState(defaultStyles) }

  get template() { return createToolbar(this.state) }

  toHTML() { return this.template }

  storeChanged(changes) { this.setState(changes.currentStyles) }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value)
      this.$emit('toolbar:applyStyle', value)
    }
  }
}
