/**
 * @typedef {{title: string}} Col
 */

/**
 * @extends Array<Col>
 */
export class TableHeaders extends Array {
  render() {
    const head = document.createElement('thead');
    const rowHeader = document.createElement('tr');
    head.appendChild(rowHeader);
    rowHeader.classList.add('table-head');
    
    this.forEach((col) => {
      const th = document.createElement('th');
      th.classList.add('table-head_th');
      th.innerText = col.title;
      rowHeader.appendChild(th);
    });

    return head;
  }
}
