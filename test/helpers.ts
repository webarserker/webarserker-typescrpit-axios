export function getAjaxRequest(): Promise<JasmineAjaxRequest> {
  return new Promise(function(resolve) {
    setTimeout(() => {
      // console.log(jasmine.Ajax.requests, 'jasmine.Ajax.requestsjasmine.Ajax.requestsjasmine.Ajax.requestsjasmine.Ajax.requests')
      return resolve(jasmine.Ajax.requests.mostRecent());
    }, 0);
  });
}
