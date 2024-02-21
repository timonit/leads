import { LeadStore } from './store.js';
import { Table } from './table.js';

const store = new LeadStore();
const result = await store.getLeads();
const body = document.body;

console.log(result);

const table = new Table();

table.state = result._embedded.leads;
body.appendChild(table.render());
