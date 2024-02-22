export class Tableloader {
  render() {
    const row = document.createElement('tr');

    const cell = document.createElement('td');
    cell.colSpan = 10;
    cell.classList.add('table-row_td__all');
    row.appendChild(cell);

    const loaderContainer = document.createElement('div');
    loaderContainer.classList.add('table-row-loader');
    cell.appendChild(loaderContainer)


    const loader = document.createElement('div');
    loader.classList.add('loader');
    loaderContainer.appendChild(loader);

    return row;
  } 
}
