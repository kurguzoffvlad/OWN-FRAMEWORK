// ОБРАБОТКА emit И subscribe В CoreComponent - ($emit) И ($on)
// В CoreComponentWrapper new CoreEmitter() И ЗАТЕМ ПЕРЕДАЕТСЯ ПО КОМПОНЕНТАМ
export class CoreEmitter {
  constructor() { this.listeners = {} }

  // Уведомляем слушателей если они есть - table.emit('table:select', {a: 1})
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) { return false }
    // ВЫЗЫВАЕМ КАЖДУЮ ФУНКЦИЮ ПО ЭВЕНТУ
    this.listeners[event].forEach(listener => { listener(...args) })
    return true
  }

  // Подписываемся на уведомление Добавляем нового слушателя
  // formula.subscribe('table:select', () => {})
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn) // ДЛЯ КАЖДОГО ЭВЕНТА ДОБАВЛЯЕМ ФУНКЦИЮ
    return () => {
      this.listeners[event] =
        this.listeners[event].filter(listener => listener !== fn) // ОТПИСКА
    }
  }
}
