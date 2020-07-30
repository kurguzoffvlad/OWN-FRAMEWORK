import {$} from './CoreDom'
import {CoreEmitter} from './CoreEmitter'
import {StoreSubscriber} from './store/StoreSubscriber'
import {preventDefault} from './functions/utils'
import {updateDate} from '../redux/actions'
import {classRoot} from '../constants'

/* getRoot - СОБРАТЬ И ПЕРЕДАТЬ В CorePage СОЗДАННЫЙ HTML СТРАНИЦЫ
    СОЗДАТЬ ОБОЛОЧКУ - ROOT - ДЛЯ ПОЛУЧЕННЫХ КОМПОНЕНТОВ
    ЦИКЛОМ ПО ПОЛУЧЕННЫМ КОМПОНЕНТАМ:
    1. СОЗДАТЬ DIV С КЛАССОМ ДЛЯ КОМПОНЕНТА
    2. СОЗДАТЬ ИНСТАНС КЛАССА КОМПОНЕНТА С EMITTER & STORE
    3. К ДИВУ НАВЕСИТЬ HTML
    4. ДИВ КОМПОНЕНТА ДОБАВИТЬ К ROOT
*/

export class CoreComponentWrapper {
  constructor(options) {
    this.className = options.className
    this.components = options.components || []
    this.store = options.store
    this.emitter = new CoreEmitter()
    this.subscriber = new StoreSubscriber(this.store)
  }

  getRoot() {
    const $root = $.create('div', classRoot + this.className)

    const componentOptions = {emitter: this.emitter, store: this.store}

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el, componentOptions)
      $el.html(component.toHTML())
      $root.append($el)

      return component // интстанс компонента
    })

    return $root // 'СОБРАННАЯ' ИЗ html КОМПОНЕНТОВ СТРАНИЦА
  }
  // инициализация компонентов в основном это в CoreComponent - initDOMListeners
  init() {
    if (process.env.NODE_ENV === 'production') {
      document.addEventListener('contextmenu', preventDefault)
    }

    // СОЗДАНИЕ В ХРАНИЛИЩЕ данных СТРАНИЦ после dispatchState
    this.store.dispatchState(updateDate()) // openedDate ДЛЯ EXCEL!!!

    // подписка по ключу для компонентов если у них есть subscribe: ['key']
    this.subscriber.subscribeComponents(this.components)

    this.components.forEach(component => component.init())
  }

  // инициализация компонентов в основном это в CoreComponent-removeDOMListeners
  destroy() {
    this.subscriber.unsubscribeFromStore()
    this.components.forEach(component => component.destroy())
    document.removeEventListener('contextmenu', preventDefault)
  }
}
