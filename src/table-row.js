/**
 * @typedef {{
 *  account_id:31584886
 *  closed_at:null
 *  closest_task_at:null
 *  created_at:1708512570
 *  created_by:10705910
 *  custom_fields_values:null
 *  group_id:0
 *  id:1746819
 *  is_deleted:false
 *  labor_cost:null
 *  loss_reason_id:null
 *  name:"Сделка #1746819"
 *  pipeline_id:7830514
 *  price:15000
 *  responsible_user_id:10705910
 *  score:null
 *  status_id:64471062
 *  updated_at:1708512570
 *  updated_by:10705910
* }} Cell
*/

export class TableRow {
 collumns = [];

 /**
  * @type {Cell}
  */
 #item;

 /**
  * @param {Cell} cell 
  */
 set item(cell) {
   this.#item = cell;
 }

 /**
  * @returns {Cell}
  */
 get item() {
   return this.#item;
 }

 /**
  * @param {Cell} item 
  */
 constructor(item) {
  this.item = item;
 }

 /**
  * @param {string[]} cols 
  */
 setCollumns(cols) {
   this.collumns = cols;
 }

 /**
  * @returns {string[]}
  */
 getCollumns() {
   return this.collumns;
 }

 render() {
   const row = document.createElement('tr');
   row.classList.add('table-row');
   
   this.getCollumns().forEach((col) => {
     const td = document.createElement('td');
     td.classList.add('table-row_td');
     if (['created_at', 'updated_at'].includes(col)) {
      td.textContent = dayjs.unix(this.item[col]).toDate().toLocaleString();
     } else td.textContent = this.item[col];
     row.appendChild(td);
   });

   return row;
 } 
}
