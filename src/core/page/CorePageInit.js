import { pageDashboard } from '../../constants';

// params - ИД СТРАНИЦ
export class CorePageInit {
  constructor(params, page) {
    page !== pageDashboard
      ? this.params = params || Date.now().toString()
      : this.params = ''
  }

  getRoot() {throw new Error('Method "getRoot" should be implemented') }

  afterRender() {}

  destroy() {}
}
