import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types';

import { parseHeaders } from '../helpers/header';

import { createError } from '../helpers/error';
import { isURLSameOrigin } from '../helpers/url';
import { isFormData } from '../helpers/util';
import cookie from '../helpers/cookie';

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((reslove, reject) => {
    const {
      data = null,
      url,
      method,
      headers = {},
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth
    } = config;

    // console.log(config, 'config');

    const request = new XMLHttpRequest();

    request.open(method!.toUpperCase(), url!, true);

    configureRequest();

    addEvents();

    processHeaders();

    processCancel();
    // console.log(config, 'config');
    request.send(data);

    function configureRequest(): void {
      request.onreadystatechange = function handleLoad() {
        if (request.readyState !== 4) {
          return;
        }
        /* istanbul ignore next */
        if (request.status === 0) {
          return;
        }

        const responseHeaders = parseHeaders(request.getAllResponseHeaders());
        // const responseData = responseType !== 'text' ? request.response : request.responseText
        const responseData =
          responseType && responseType !== 'text' ? request.response : request.responseText;
        const response: AxiosResponse = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        };

        handleResponse(response);

        //  reslove(response)
      };

      if (responseType) {
        request.responseType = responseType;
      }

      if (timeout) {
        request.timeout = timeout;
      }

      if (withCredentials) {
        request.withCredentials = withCredentials;
      }
    }

    function addEvents(): void {
      request.onerror = function handleError() {
        // reject(createError('Network Error', config, null, request))
      };

      request.ontimeout = function handleTimeout() {
        // reject(createError(`timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
      };

      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress;
      }

      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress;
      }
    }

    function processHeaders(): void {
      if (isFormData(data)) {
        delete headers['Content-Type'];
      }

      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName);
        if (xsrfValue && xsrfHeaderName) {
          headers[xsrfHeaderName] = xsrfValue;
        }
      }

      if (auth) {
        headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password);
      }

      Object.keys(headers).forEach(name => {
        // console.log(headers, 'headersheadersheadersheaders')
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name];
        } else {
          // console.log(name, headers[name], '--------------')
          request.setRequestHeader(name, headers[name]);
        }
      });
    }

    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        reslove(response);
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        );
      }
    }

    function processCancel(): void {
      // console.log(data, 'cancelTokencancelTokencancelToken')
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort();
          reject(reason);
        });
      }
    }
  });
}
