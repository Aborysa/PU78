let rx = require('rxjs');

let Observable = rx.Observable;
let Subject = rx.Subject;

let fetch = require('node-fetch');
let Request = require('node-fetch').Request;
let Headers = require('node-fetch').Headers;
//not currently used
const CLIENT_SECRET = "XXX";
const CLIENT_ID = "XXX";
const API_AUTH = "XXX";


class HttpServiceProvider {

  constructor(CLIENT_SECRET,CLIENT_ID,API_AUTH) {
    // Request queue used for 503 and 401 responses
    this.client_secret = CLIENT_SECRET;
    this.client_id = CLIENT_ID;
    this.auth_url = API_AUTH;
    
    this.requestQueue = [];
    this.auth_token = '';
    this.waitingForToken = false;
    this.requestSubject = new Subject();
    this.count = 0;
    // Subject for handling requests, each request is seperated by 100ms
    // Should be made for dynamic
    // Prevents 'DOS' protection
    this.requestSubject
      // Zip each request with an interval stream
      .zip(Observable.interval(100).skipUntil(this.requestSubject), (a, b) => a)
      // Subscrive to this stream
      .subscribe((requestPair) => {
        // preforme request
        this.count++;
        Observable.fromPromise(fetch(requestPair.request))
          /*
            Send response to handleResponse()
            handleResponse will resolve or will queue the request in case of
            401 error, when token is renewed it will then try to performe the request
          */
          .flatMap(response => this.handleResponse(response, requestPair.request))
          // When the request is resolved, send it back to the source of the request
          .subscribe((r) => {
            requestPair.subject.next(r);
          }, (error) => {
            requestPair.subject.error(error);
          }, () => {
            requestPair.subject.complete();
          });
      });
  }
  renewToken() {
    if (!this.waitingForToken) {
      this.waitingForToken = true;
      // Request new token
      this.post(`${this.auth_url}`, {
        client_secret: this.client_secret,
        client_id: this.client_id,
        grant_type: 'client_credentials',
      }, true)
        .subscribe((data) => {
          this.auth_token = data.access_token;
          // Performe requests from request queue
          for (const i of this.requestQueue) {
            this.request(i.request).subscribe((r) => {
              i.subject.next(r);
            }, (error) => {
              i.subject.error(error);
            }, () => {
              i.subject.complete();
            });
          }
          this.requestQueue = [];
        }, (e) => {
          console.log('Error', e);
        }, () => {
        // Use a timeout to prevent a feedback loop
          setTimeout(() => {
            this.waitingForToken = false;
          }, 5000);
        });
    }
  }

  handleResponse(r, req) {
    /* TODO: handle 503(service unavailable) responses
      adjust delay up when a 503 responses happens
      and retry
    */
    if (!r.ok) {
      // 401 Unauthorized
      if (r.status == 401) {
        // Add request to queue
        const resolver = new Subject();
        this.requestQueue.push({ request: req, subject: resolver });
        // Renew token if not waiting for token, because access denied
        this.renewToken();
        return resolver.asObservable();
      }
      return Observable.throw(r);
    }
    return r.json();
  }
  /** Performs a general request
   * @param {Request} url
   * @return Observable<{}>
   */
  request(request) {
    // Add token to request
    request.headers.set('Authorization', `Bearer ${this.auth_token}`);
    const resolver = new Subject();
    // Push request into request 'stream'/queue
    this.requestSubject.next({ request, subject: resolver });
    return resolver.asObservable();
  }
  /** performes a get request
   * @param {string} url
   * @param {params} {key: value}
   * @return Observable<{}>
   */
  get(url, params) {
    let pUrl = url;
    if (params) {
      pUrl += HttpServiceProvider.urlEncode(params);
    }
    // Create request
    const request = new Request(pUrl, { method: 'get',credentials: "same-origin" });
    const clone = request.clone();
    return this.request(request,clone);
  }

  static urlEncode(data) {
    let ret = '';
    for (const key in data) {
      if (ret != '') {
        ret += '&';
      }
      ret += `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`;
    }
    return `?${ret}`;
  }
  /** Performs a post request
   * @param {string} url
   * @param {params} {key: value}
   * @param {boolean} url_encoded
   * @return Observable<{}>
   */
  post(url, body, url_encoded) {
    let pUrl = url;
    let pBody = body;
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    if (url_encoded) {
      pUrl += HttpServiceProvider.urlEncode(pBody);
      headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      pBody = null;
    } else {
      pBody = JSON.stringify(pBody);
    }
    // Create request
    const request = new Request(pUrl, {
      method: 'POST',
      body: pBody,
      headers: headers,
      credentials: "same-origin"
    });
    const clone = request.clone();
    return this.request(request,clone);
  }
}
// Export default single instance, does not do auth
const http = new HttpServiceProvider();

module.exports = {
  HttpServiceProvider: HttpServiceProvider,
  http: http
}
