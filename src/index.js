import { LeadStore } from './store.js';

const store = new LeadStore();

const result = await store.getLeads();

console.log(result);
