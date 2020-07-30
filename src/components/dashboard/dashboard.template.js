import {createRecordsTable} from '../../functions/dashboard.functions'
import { pageExcel } from '../../constants'

export function createTemplate(s) {
  const now = Date.now().toString()
  return `
    <div class="db">
      <div class="db__header">
        <h1>Excel. Панель Управления (${s.theme})</h1>
        <div class="db__theme">
            <input
              type="button"
              data-theme="theme"
              value="ТЕМА"
              id="toggle-theme"
            />
        </div>
      </div>

      <div class="db__new">
        <div class="db__view">
          <a href="#${pageExcel}/${now}" class="db__create">
            Новая <br /> Таблица
          </a>
        </div>
      </div>

      <div class="db__table db__view">
        ${createRecordsTable()}
      </div>
    </div>
  `
}
