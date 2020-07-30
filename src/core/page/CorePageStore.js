import {CorePage} from './CorePage'
import {Store} from '../store/Store'
import {rootReducer} from '../../redux/rootReducer'
import {normalizeInitialState} from '../../redux/initialState'
import {StateProcessor} from '../page/StateProcessor'
import {LocalStorageClient} from '../../functions/LocalStorageClient'

// ДОБАВЛЯЕТ СТОР К СТРАНИЦЕ

export class CorePageStore extends CorePage {
  constructor(options) {
    super(options)
    this.storeSub = null
    this.store = null
    // ОПРЕДЕЛЯЕТ КЛИЕНЕТА ДЛЯ ХРАНЕНИЯ ДАННЫХ
    this.processor = new StateProcessor(
        new LocalStorageClient(this.params, options.className)
    )
    this.className = options.className
  }

  async getRoot() {
    // получаем стейт
    const state = await this.processor.get() // получить стартовый state из БД
    const initialState = normalizeInitialState(state, this.className)

    this.store = new Store(rootReducer, initialState) // создаем store
    // передаем функцию в listeners СТОРА
    this.storeSub = this.store.subscribeState(this.processor.save)

    // 'СОБРАННАЯ' ИЗ html КОМПОНЕНТОВ СТРАНИЦА
    return super.getRoot()
  }

  // "закрытие" компонентов в основном это в CoreComponent-removeDOMListeners
  destroy() { super.destroy(); this.storeSub() }
}
