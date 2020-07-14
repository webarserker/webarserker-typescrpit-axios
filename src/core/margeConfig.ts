import { AxiosRequestConfig } from '../types';
import { isPlainObject, deepMerge } from '../helpers/util';

const strats = Object.create(null);

function defaultStrat(val1: AxiosRequestConfig, val2: AxiosRequestConfig): AxiosRequestConfig {
  // console.log(val2,val1, 'config2![key]config2![key]')
  return typeof val2 != 'undefined' ? val2 : val1;
}

function fromVal2Strat(val1: any, val2: any): any {
  if (typeof val2 != 'undefined') {
    return val2;
  }
}

function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2);
  } else if (typeof val2 !== 'undefined') {
    return val2;
  } else if (isPlainObject < val1) {
    return deepMerge(val1);
  } else {
    return val1;
  }
}

const stratkeysFromVal2 = ['url', 'params', 'data'];

stratkeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat;
});

const stratKeysDeepMerge = ['headers', 'auth'];
stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat;
});

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  // console.log(config2, '22222222222222')
  // console.log(config1, '11111111111111')

  if (!config2) {
    config2 = {};
  }
  const config = Object.create(null);

  for (let key in config2) {
    // console.log(config2[key], 'key2222222222')
    mergeField(key);
  }

  // console.log(config ,'key2222222222')

  for (let key in config1) {
    //  console.log(config1[key], 'key11111111111')
    if (!config2[key]) {
      mergeField(key);
    }
  }

  // console.log(config ,'key2222222222')

  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat;
    // console.log(strat, 'strat')
    // if(key == 'data') {console.log(config2![key], 'config2![key]config2![key]')}
    config[key] = strat(config1[key], config2![key]);
    // if(key == 'data') {console.log(config2![key], 'config2![key]config2![key]')}
    // console.log(config1[key] + ':' + config2![key], 'zzzzzzzzzzz')
  }

  // console.log(config)
  return config;
}
