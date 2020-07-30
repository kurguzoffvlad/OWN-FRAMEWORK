export function Store(rootReducer, initialState = {}) {
  let state = rootReducer({...initialState}, {type: '__INIT__'})
  let listeners = []

  return {
    subscribeState(fn) {
      listeners.push(fn)
      return () => {
        if (listeners) {listeners = listeners.filter(l => l !== fn)}
      }
    }, // в StoreSubscriber и в компонентах в виде subscribe: ['key']
    dispatchState(action) {
      // rootReducer - место обновления state по action
      state = rootReducer(state, action)
      listeners.forEach(listener => listener(state))
    },
    getState() { return JSON.parse(JSON.stringify(state)) }
  }
}
