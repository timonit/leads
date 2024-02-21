/**
 * @typedef {{title: string}} Col
 */

/**
 * @extends Array<Col>
 */
export class TableHeaders extends Array {
  render() {
    const rowHeader = document.createElement('div');
    rowHeader.classList.add('table-head');
    
    this.forEach((col) => {
      const th = document.createElement('div');
      th.classList.add('table-head_th');
      th.innerText = col.title;
      rowHeader.appendChild(th);
    });

    return rowHeader;
  }
}
