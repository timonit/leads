import { TableHeaders } from './table-headers.js';
import { TableRow } from './table-row.js';

const colNames = [
  {
    title: 'ID',
    prop: 'id'
  },
  {
    title: 'Название',
    prop: 'name'
  },
  {
    title: 'Дата создания',
    prop: 'created_at'
  },
  {
    title: 'Удален',
    prop: 'is_deleted'
  },
  {
    title: 'цена',
    prop: 'price'
  },
  {
    title: 'Ответственное лицо',
    prop: 'responsible_user_id'
  },
  {
    title: 'Счет',
    prop: 'score'
  },
  {
    title: 'Статус',
    prop: 'status_id'
  },
  {
    title: 'Обновлен в',
    prop: 'updated_at'
  },
  {
    title: 'Автор обновления',
    prop: 'updated_by'
  },
]

export class Table {
  containerTagName = 'table';

  #state = [];
  
  /**
   * @type {TableHeaders}
   */
  collumns;

  set state(value) {
    this.#state = value;
  }

  get state() {
    return this.#state;
  }

  constructor() {
    this.collumns = new TableHeaders();
    
    this.collumns.push(...colNames);
  }

  render() {
    const table = document.createElement('div');
    table.classList.add('table');

    table.appendChild(this.collumns.render());
    
    this.#state.forEach((item) => {
      const row = new TableRow(item);
      row.setCollumns(this.collumns.map(el => el.prop));
      table.appendChild(row.render());
    });

    return table;
  }
}
