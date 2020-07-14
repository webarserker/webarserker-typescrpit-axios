import { isPlainObject, deepMerge } from './util';
import { Method } from '../types';

function normalizeHeaderName(headers: any, normalizeNmae: string): void {
  if (!headers) {
    return;
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizeNmae && name.toUpperCase() === normalizeNmae.toUpperCase()) {
      headers[normalizeNmae] = headers[name];
      delete headers[name];
    }
  });
}

export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type');

  if (isPlainObject(data)) {
    // console.log(1111111111111)
    if (headers && !headers['Content-Type']) {
      // console.log(1111111111111)
      headers['Content-Type'] = 'application/json;charset=utf-8';
    }
  }
  // console.log(data, headers, 'zzzzzzzzzzzzz')
  return headers;
}

export function parseHeaders(headers: string): any {
  let parsed = Object.create(null);
  if (!headers) {
    return parsed;
  }

  headers.split('\r\n').forEach(line => {
    let [key, ...vals] = line.split(':');
    // console.log(line,vals, 'linelinelineline')
    key = key.trim().toLowerCase();
    if (!key) {
      return;
    }
    const val = vals.join(':').trim();

    parsed[key] = val;
  });

  return parsed;
}

export function flottenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers;
  }

  headers = deepMerge(headers.common, headers[method], headers);
  // console.log(  headers.common,  1111111111111)
  // console.log(  headers[method] , 1111111111111)
  // console.log(  headers, 1111111111111)
  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common'];

  methodsToDelete.forEach(method => {
    delete headers[method];
  });
  // console.log(  headers, 1111111111111)
  return headers;
}
