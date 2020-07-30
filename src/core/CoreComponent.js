import {CoreDomListener} from './CoreDomListener'

// ВОЗВРАЩАЕТ HTML, ПОДПИСЫВАЕТСЯ, ЭМИТИТ И ЧИСТИТ СОБЫТИЯ
export class CoreComponent extends CoreDomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.subscribeState = options.subscribe || []
    this.store = options.store
    this.unsubscribers = []

    this.prepare()
  }

  // Настраивааем наш компонент до init
  prepare() {}

  // Возвращает шаблон компонента
  toHTML() { return '' }

  // $emit - Уведомляем слушателей про событие event===========================
  // !!! ВО ВРЕМЕНИ - СНАЧАЛА ПОДПИСАТЬСЯ ($on) ЗАТЕМ ЭМИТИТЬ ($emit)!!!
  $emit(event, ...args) { this.emitter.emit(event, ...args) }

  // $on - Подписываемся на событие event======================================
  // !!! ВО ВРЕМЕНИ - СНАЧАЛА ПОДПИСАТЬСЯ ($on) ЗАТЕМ ЭМИТИТЬ ($emit)!!!
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  $$dispatchState(action) { this.store.dispatchState(action) }

  // Сюда приходят только изменения по тем полям, на которые мы подписались
  storeChanged() {}

  isWatching(key) { return this.subscribeState.includes(key) }

  // Инициализируем компонент и Добавляем DOM слушателей
  init() { this.initDOMListeners() }

  // Удаляем компонент и Чистим слушатели
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
