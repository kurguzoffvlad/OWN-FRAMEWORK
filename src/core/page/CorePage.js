import {CorePageInit} from './CorePageInit'
import {CoreComponentWrapper} from '../CoreComponentWrapper'

// ЧЕРЕЗ CoreComponentWrapper:
// 1. getRoot - СОБРАТЬ И ПЕРЕДАТЬ В РОУТИНГ HTML СТРАНИЦЫ
// 2. afterRender - ИНИЦИАЛИЗАЦИЯ (initDOMListeners) ДЛЯ ВСЕХ КОМПОНЕНТОВ

export class CorePage extends CorePageInit {
  constructor(options) {
    super(options.param, options.className)
    this.components = options.components
    this.className = options.className
  }

  async getRoot() {
    this.coreComponentWrapper = new CoreComponentWrapper({
      components: this.components,
      className: this.className,
      store: this.store || null
    })

    // !!!!! 'СОБРАННАЯ' ИЗ html КОМПОНЕНТОВ СТРАНИЦА
    return this.coreComponentWrapper.getRoot()
  }
  // инициализация компонентов в основном это в CoreComponent - initDOMListeners
  afterRender() { this.coreComponentWrapper.init() }

  // инициализация компонентов в основном это в CoreComponent-removeDOMListeners
  destroy() { this.coreComponentWrapper.destroy() }
}
