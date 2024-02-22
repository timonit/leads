import { DOMAIN, ACCESS_TOKEN } from './constants.js';

/**
 * @typedef {{[p: string]: 'asc' | 'desc'}} Order
 */

/**
 * @typedef {Object} QueryOptions
 * @property {Number | 'all'} limit
 * @property {Number} page
 * @property {Order} order
 */

export class LeadStore extends EventTarget {
  domain = DOMAIN;

  accessToken = ACCESS_TOKEN;

  state;

  fetching = false;

  /**
   * 
   * @param {QueryOptions} queryOptions 
   * @param {boolean} all
   */
  static convertToQueryParams(queryOptions, all) {
    const queryParams = new URLSearchParams();

    Object.entries(queryOptions).forEach(([optName, value]) => {
      if (typeof value === 'object') {
        Object.entries(value).forEach(([orderName, orderType]) => {
          queryParams.append(`order[${orderName}]`, orderType);
        });
      } else queryParams.append(optName, value);
    })

    if (all) queryParams.set('limit', 5);

    return queryParams.toString();
  }

  #fetch(url) {
    return fetch(
      url,
      {
        headers: { 'Authorization': `Bearer ${this.accessToken}` },
      }
    );
  }

  /**
   * 
   * @param {string} url 
   * @param {boolean} all 
   */
  async #fetchState(url, all) {
    return new Promise(async (res, rej) => {
      const response = await this.#fetch(url);
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      
      const data = await response.json();

      if (!all) {
        this.state = data;
        return res();
      }
      

      if (typeof this.state === 'object') {
        this.state._embedded.leads = [...this.state._embedded.leads, ...data._embedded.leads];
        this.state._links = {}
      } else this.state = data;

      this.dispatchEvent(new Event('chunkLoaded'));

      if (data._links.next) {
        setTimeout(async () => {
          try {
            const url = new URL(data._links.next.href);
            await this.#fetchState(`${DOMAIN}${url.pathname}${url.search}`, true);
            res();
          } catch(err) {
            rej(err);
          }
        }, 2000);
      } else res();
    });
  }

  /**
   * @param {URL} url 
   * @param {boolean} all 
   */
  async goTo(url, all) {
    this.fetching = true;
    this.dispatchEvent(new Event('fetchStart'));
    
    await this.#fetchState(`${DOMAIN}${url.pathname}${url.search}&with=user`, all);
    this.fetching = false;
    this.dispatchEvent(new Event('fetchEnd'));
  }

  /**
   * 
   * @param {QueryOptions} queryOptions 
   */
  async fetchLeads(queryOptions) {
    const url = new URL(`${this.domain}/api/v4/leads`);
    url.search = LeadStore.convertToQueryParams(queryOptions, queryOptions.limit ==='all' );

    if (queryOptions.limit ==='all') this.state = undefined;
    await this.goTo(url, queryOptions.limit ==='all');
  }

  async fetchNextPage() {
    await this.goTo(new URL(this.state._links.next.href));
  }

  async fetchPrevPage() {
    await this.goTo(new URL(this.state._links.prev.href));
  }

  async fetchFirstPage() {
    await this.goTo(new URL(this.state._links.first.href));
  }
}
