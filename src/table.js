import { TableFooter } from './table-footer.js';
import { TableHeaders } from './table-headers.js';
import { TableRow } from './table-row.js';
import { LeadStore } from './store.js';
import { Tableloader } from './table-loader.js';

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
    title: 'Бюджет',
    prop: 'price'
  },
  {
    title: 'Ответственное лицо',
    prop: 'responsible_user_id'
  },
  {
    title: 'Дата создания',
    prop: 'created_at'
  },
  {
    title: 'Дата изменения',
    prop: 'updated_at'
  }
]

export class Table {
  /**
   * @type {TableHeaders}
   */
  collumns;

  limit = 5;

  page = 1;

  order = {
    id: 'asc',
  }

  store = new LeadStore();

  /**
   * @type {HTMLElement}
   */
  appEl;

  tableFooter = new TableFooter(this);

  constructor(appEl) {
    this.appEl = appEl;
    this.collumns = new TableHeaders(this);
    this.collumns.push(...colNames);
  }

  async init() {
    this.tableFooter.onNextPage = async () => {
      await this.store.fetchNextPage();
      this.render();
    };

    this.tableFooter.onPrevPage = async () => {
      await this.store.fetchPrevPage();
      this.render();
    }

    this.store.addEventListener('fetchStart', this.render.bind(this));
    this.store.addEventListener('chunkLoaded', this.render.bind(this));
    this.store.addEventListener('fetchEnd', this.render.bind(this));

    this.fetchData();
  }

  async fetchData() {
    this.store.fetchLeads({
      page: this.page,
      limit: this.limit,
      order: this.order
    });
  }

  render() {
    this.appEl.innerHTML = '';
    const table = document.createElement('table');
    table.classList.add('table');

    table.appendChild(this.collumns.render());

    const tBody = document.createElement('tbody');
    
    if (this.store.state) {
      this.store.state._embedded.leads.forEach((item) => {
        const row = new TableRow(item);
        row.setCollumns(this.collumns.map(el => el.prop));
        tBody.appendChild(row.render());
      });
    }

    if (this.store.fetching) tBody.appendChild(new Tableloader().render());

    table.appendChild(tBody);
    table.appendChild(this.tableFooter.render());

    this.appEl.appendChild(table);
  }
}
