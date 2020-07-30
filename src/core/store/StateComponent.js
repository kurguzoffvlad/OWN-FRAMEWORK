import {CoreComponent} from '../CoreComponent'

/*
  В ПОТОМКЕ ДОЛЖНО БЫТЬ РЕАЛИЗОВАНО ОПЦИОНАЛЬНО:
  0. prepare() { this.initState(defaultStyles) }
  1. get template() { return createTemplate(this.state) }
  2. toHTML() { return this.template }
  3. storeChanged(changes) { this.setState(changes.KEY) }
    changes.KEY - ЛЮБОЙ КЛЮЧ ИЗ СТОРА
  4. ПЛЮС В КОНСТРУКТОРЕ ДОЛЖНО БЫТЬ - subscribe: ['KEY'],
*/

export class StateComponent extends CoreComponent {
  constructor(...args) { super(...args) }

  get template() {
    const name = this.name || ''
    throw new Error (
        `get template not implemented in ${name} Component for StateComponent`
    )
  }

  initState(initialState = {}) { this.state = {...initialState} }

  setState(newState) {
    this.state = {...this.state, ...newState}
    this.$root.html(this.template)
  }
}
