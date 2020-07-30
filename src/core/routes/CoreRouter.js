import {CoreLoader} from '../loader/CoreLoader'
import {CoreActiveRoute} from './CoreActiveRoute'
import {selectPage} from '../../index'
import {$} from '../CoreDom'

export class CoreRouter {
  constructor(selector, routes) {
    if (!selector) { throw new Error('Selector is not provided in CoreRouter') }

    this.$placeholder = $(selector) // главный див #app
    this.routes = routes // классы страниц

    this.loader = new CoreLoader() // определяем лоадер

    this.page = null

    // this.changePageHandler.bind(this) для дальнейшего removeEventListener
    this.changePageHandler = this.changePageHandler.bind(this)

    this.init() // инициация роутинга
  }

  init() {
    window.addEventListener('unload', (event) => {this.destroy()})

    window.addEventListener('hashchange', this.changePageHandler)

    this.changePageHandler()
  }

  async changePageHandler() {
    if (this.page) { this.page.destroy() }

    this.$placeholder.clear().append(this.loader) // на старте крутится лоадер

    // логика роутинга
    const Page = selectPage()

    const options = {
      param: CoreActiveRoute.param,
      className: Page.className,
      components: Page.components
    }
    this.page = new Page(options)

    // !!!! 'СОБРАННАЯ' ИЗ html КОМПОНЕНТОВ СТРАНИЦА
    const root = await this.page.getRoot()

    // убирается лоадер и к диву #app добавляется страница
    this.$placeholder.clear().append(root)

    this.page.afterRender() // инициализация компонентов после отрисовки
  }

  destroy() { window.removeEventListener('hashchange', this.changePageHandler) }
}
