import {storage} from '../core/functions/utils'

function storageName(pageName, param) { return pageName + '-page:' + param }

export class LocalStorageClient {
  constructor(param, pageName) {
    this.name = storageName(pageName, param)
  }
  save(state) {
    storage(this.name, state)
    return Promise.resolve()
  }

  get() {
    return new Promise(resolve => {
      const state = storage(this.name)
      // лоадер крутиться
      setTimeout(() => { resolve(state) }, 400)
    })
  }
}
