import { CancelExecutor, CancelTokenSource, Canceler } from '../types';
import Cancel from './Cancel';

interface ResolvePromise {
  (reason?: Cancel): void;
}

export default class CancelToken {
  promise: Promise<Cancel>;
  reason?: Cancel;

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise;

    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve;
    });

    // pending: 初始状态，成功或失败状态。 等待状态
    // fulfilled: 意味着操作成功完成。    resolve
    // rejected: 意味着操作失败           rejected
    // console.log('1111111111111message')
    executor(message => {
      // console.log('1111111111111message')
      if (this.reason) {
        return;
      }

      this.reason = new Cancel(message);
      resolvePromise(this.reason);
    });
  }

  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler;
    const token = new CancelToken(c => {
      cancel = c;
    });
    return {
      cancel,
      token
    };
  }
}
