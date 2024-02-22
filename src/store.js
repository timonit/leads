const DOMAIN = 'http://localhost:3500';

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

  accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjZkNGE0NmY4NGU1Nzg1Y2I5ZjQ1OWU2YWVmMDE2Y2MxMjVkZmYyZmFhODNhM2VlOTgxYjUzNTI0ZWY4M2NlYjE3MTdhZGVkMmI1MmMxZWRhIn0.eyJhdWQiOiJkMDU0OTI4Ni1jZWM1LTQ4NWEtOThlNi05MTIwZWI4YmZmYmYiLCJqdGkiOiI2ZDRhNDZmODRlNTc4NWNiOWY0NTllNmFlZjAxNmNjMTI1ZGZmMmZhYTgzYTNlZTk4MWI1MzUyNGVmODNjZWIxNzE3YWRlZDJiNTJjMWVkYSIsImlhdCI6MTcwODUxNTcxMCwibmJmIjoxNzA4NTE1NzEwLCJleHAiOjE3MTAwMjg4MDAsInN1YiI6IjEwNzA1OTEwIiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxNTg0ODg2LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiODZmZGYxNzktYWYyMC00YjljLWFlNmEtZTNhNDc2NDFmOGM2In0.Npx3X_icHCIfCXtEG2wnUxvAWsdyFkm60dFDeb4fHHETgSur9oOu77k_FG0ijCbqILxe6ihW7Llo5wbLncnrrXuKhu0mJVjFBZjYyeyKSgQTvwmhe6MKgbOT5PgMInil2Pm5hZ81MS_1x4LTSivgRbk0fLpeMEllwos8TWNqk2JPNrsEu_h_ReofSjK7Oeoi1zLWMf-zlcIWAHIybfaXQR03oquf1fo2_LiiILbZ3cGLLy25BTGmsFcXXUfx26WmDdudyMmAYkCQs7kDvaxfOCQcqHex1GflcKI_Kz3pqGWOKbOQdHMv5X0AxcapuovPM_JiAbejqpYKXN6j1E7ZMw';

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
