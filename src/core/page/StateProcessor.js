import {debounce} from '../../core/functions/utils'

export class StateProcessor {
  constructor(client, delay = 300) {
    this.client = client
    this.save = debounce(this.save.bind(this), delay)
  }

  save(state) { this.client.save(state) }

  get() { return this.client.get() }
}
