import axios, { AxiosRequestHeaders, Method } from "axios";

export type ApiResponse = {
  result: boolean;
  data: any;
  message?: string;
};
class HttpAgent {
  private _headers: AxiosRequestHeaders = {};
  private _baseURL: string;

  constructor(url: string = "") {
    this._baseURL = url;
  }

  setHeaders(headers: AxiosRequestHeaders) {
    this._headers = { ...this._headers, ...headers };
  }

  resetHeaders() {
    this._headers = {};
  }

  request(method: Method, url: string, data?: any) {
    return new Promise<ApiResponse>((resolve, reject) => {
      axios
        .request({
          baseURL: this._baseURL,
          method,
          url,
          data,
          headers: this._headers,
        })
        .then((res) => {
          if (res.status === 200) {
            resolve({
              result: true,
              data: res.data,
              message: res.statusText,
            });
          } else {
            reject(res);
          }
        })
        .catch((e) => {
          console.error(e);
          reject(e.message);
        });
    });
  }
}

export default HttpAgent;

export const GithubAgent = new HttpAgent("https://api.github.com");
