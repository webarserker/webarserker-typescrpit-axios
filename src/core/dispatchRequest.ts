import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types';
import xhr from './xhr';
import { buildURL, isAbsoluteURL, combineURL } from '../helpers/url';
import { flottenHeaders } from '../helpers/header';
import transform from './transform';

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  // console.log(config, 'throwIfCancellationRequested')
  // console.log(config, 'xhr(config)')
  throwIfCancellationRequested(config);
  // console.log(config, 'xhr(config)')
  processConfig(config);

  // // console.log(xhr(config).then(), 1111);
  // xhr(config).then((response) => {
  //     console.log(response, 1111);
  //     // transformResponseData(response);
  //     // console.log(3333)
  // })

  return xhr(config).then(
    response => {
      return transformResponseData(response);
    },
    e => {
      if (e && e.response) {
        e.response = transformResponseData(e.response);
      }
      return Promise.reject(e);
    }
  );

  // return xhr(config).then((res)=> {

  //     console.log(2222)
  //     return transformResponseData(res)
  // })
}

function processConfig(config: AxiosRequestConfig): void {
  // console.log(config, 'xhr(config)')
  config.url = transformURL(config);
  // config.headers = transformHeaders(config)
  // config.headers = transform(config.data, config.headers, config.transformRequest)
  config.data = transform(config.data, config.headers, config.transformRequest);
  // console.log(config.headers, config.method!, 'config.headers, config.method!')
  config.headers = flottenHeaders(config.headers, config.method!);
}

export function transformURL(configs: AxiosRequestConfig): string {
  let { url, params, paramsSerializer, baseURL } = configs;
  if (baseURL && !isAbsoluteURL(url!)) {
    url = combineURL(baseURL, url);
  }
  // console.log(configs, 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  return buildURL(url!, params, paramsSerializer);
}
// export function transformURL(config: AxiosRequestConfig): string {
//     let { url, params, paramsSerializer, baseURL } = config;

//     if (baseURL && !isAbsoluteURL(url!)) {
//       url = combineURL(baseURL, url);
//     }

//     return buildURL(url!, params, paramsSerializer);
//   }

// function transformRequestData (config: AxiosRequestConfig): any {
//     return transformRequest(config.data)
// }

// function transformHeaders (config: AxiosRequestConfig): any {
//     const { headers = {}, data } = config
//     return processHeaders(headers, data)
// }

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse);
  return res;
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}
