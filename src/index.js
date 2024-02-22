import { Table } from './table.js';

const app = document.createElement('div');
app.id = 'app';
document.body.appendChild(app);

const table = new Table(app);

await table.init();
