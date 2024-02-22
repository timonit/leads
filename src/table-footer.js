import { Table } from './table.js';

export class TableFooter {
  /**
   * @type {Table}
   */
  table;

  /**
   * @type {() => void}
   */
  onPrevPage;

  /**
   * @type {() => void}
   */
  onNextPage;

  /**
   * @param {Table} table 
   */
  constructor(table) {
    this.table = table;
  }

  /**
   * @param {string} title 
   * @param  {string[]} classes 
   * @returns {HTMLButtonElement}
   */
  static createBtn(title, classes) {
    const btn = document.createElement('button');
    btn.classList.add(...classes);
    btn.textContent = title;
   
    return btn;
  }

  createNextBtn() {
    const btn = TableFooter.createBtn('next', ['btn', 'btn__next']);

    if (!this.table.store.state) {
      btn.disabled = true;
      return btn
    }

    if (this.table.store.state._links.next) {
      btn.addEventListener('click', async () => {
        await this.table.store.fetchNextPage();
      });
    } else btn.disabled = true;
    
    return btn;
  }

  createPrevBtn() {
    const btn = TableFooter.createBtn('prev', ['btn', 'btn__prev']);

    if (!this.table.store.state) {
      btn.disabled = true;
      return btn
    }

    if (this.table.store.state._links.prev) {
      btn.addEventListener('click', async () => {
        await this.table.store.fetchPrevPage();
      });
    } else btn.disabled = true;

    return btn;
  }

  createPageBtn() {
    const btn = document.createElement('div');
    if (!this.table.store.state) return btn;

    btn.textContent = this.table.store.state._page;
    btn.classList.add('table-footer_page', 'table-footer_page__current')
    
    return btn;
  }

  createLimitBtns() {
    const container = document.createElement('div');
    container.classList.add('table-footer_limit-btns');

    const text = document.createElement('span');
    text.textContent = 'Выводить по: ';

    container.appendChild(text);

    [ 2, 5, 10, 'all' ].forEach((count) => {
      const btn = TableFooter.createBtn(count, ['btn']);
      btn.addEventListener('click', () => {
        this.table.limit = count;
        this.table.fetchData();
      });
      container.appendChild(btn);
    });

    return container;
  }

  createFirstPageBtn() {
    const btn = TableFooter.createBtn('1', ['btn', 'btn__first']);
    if (!this.table.store.state || !this.table.store.state._links.first) return '';

    if (this.table.store.state._links.first) {
      btn.addEventListener('click', async () => {
        await this.table.store.fetchFirstPage();
      });
    } else btn.disabled = true;

    return btn;
  }

  render() {
    const footer = document.createElement('tfoot');
    const rowFooter = document.createElement('tr');
    rowFooter.classList.add('table-footer');
    footer.appendChild(rowFooter);
    
    const cell = document.createElement('td');
    cell.colSpan = 10;
    rowFooter.appendChild(cell);

    const tools = document.createElement('div');
    tools.classList.add('tools');
    cell.appendChild(tools);

    const paginator = document.createElement('div');
    paginator.classList.add('paginator');
   
    paginator.appendChild(this.createPrevBtn());
    paginator.append(this.createFirstPageBtn());
    paginator.appendChild(this.createPageBtn());
    paginator.appendChild(this.createNextBtn());

    tools.appendChild(paginator);
    tools.appendChild(this.createLimitBtns());

    return footer;
  }
}
