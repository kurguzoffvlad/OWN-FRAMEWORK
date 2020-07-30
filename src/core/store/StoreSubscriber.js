import {isEqual} from '../functions/utils'

export class StoreSubscriber {
  constructor(store) {
    this.store = store
    this.sub = null
    this.prevState = {}
  }

  // подписка на изменения в сторе компонентов
  subscribeComponents(components) {
    this.prevState = this.store.getState()

    this.sub = this.store.subscribeState(state => {
      Object.keys(state).forEach(key => {
        if (!isEqual(this.prevState[key], state[key])) {
          components.forEach(component => {
            if (component.isWatching(key)) {
              const changes = {[key]: state[key]}
              // по ключу изменения-в компоненте если есть подписка storeChanged
              component.storeChanged(changes)
            }
          })
        }
      })

      this.prevState = this.store.getState()

      if (process.env.NODE_ENV === 'development') {
        window['redux'] = this.prevState
      }
    })
  }

  unsubscribeFromStore() { this.sub() }
}
