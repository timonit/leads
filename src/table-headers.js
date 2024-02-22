import { Table } from './table.js';

/**
 * @typedef {'asc' | 'desc'} SortType
 */

/**
 * @typedef {{title: string, prop: string}} Col
 */

/**
 * @extends Array<Col>
 */
export class TableHeaders extends Array {
    /**
   * @type {Table}
   */
  table;

  /**
   * 
   * @param {Table} table 
   */
  constructor(table) {
    super();
    this.table = table;
  }

  /**
   * 
   * @param {SortType} type 
   */
  setOrderName(colName) {
    if (this.table.order[colName] === 'asc') this.table.order[colName] = 'desc';
    else this.table.order[colName] = 'asc';

    this.table.order = {
      [colName]: this.table.order[colName]
    }

    this.table.fetchData();
  }

  /**
   * 
   * @param {SortType} type 
   */
  setOrderBudget(type) {
    
  }

  createSortIndicator(colName) {
    const indicator = document.createElement('span');
    
    if (!this.table.order[colName]) return indicator;

    if (this.table.order[colName] === 'desc') indicator.textContent = '↓';
    else indicator.textContent = '↑';

    return indicator;
  }

  render() {
    const head = document.createElement('thead');
    const rowHeader = document.createElement('tr');
    head.appendChild(rowHeader);
    rowHeader.classList.add('table-head');
    
    this.forEach((col) => {
      const th = document.createElement('th');
      th.classList.add('table-head_th');
      th.innerText = col.title;

      if (['updated_at', 'created_at','id'].includes(col.prop)) {
        th.addEventListener('click', this.setOrderName.bind(this, col.prop));
        th.classList.add('cursor');
        th.appendChild(this.createSortIndicator(col.prop));
      }

      rowHeader.appendChild(th);
    });

    return head;
  }
}
