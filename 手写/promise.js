const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(executor) {
    this.status = PENDING;
    this.value = null;
    this.reason = null;
    this.onFulfilledCallback = [];
    this.onRejectedCallback =[];

    try {
      executor(this.resolve, this.reject);
    } catch(e) {
      this.reject(e);
    }
  }

  resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
      this.onFulfilledCallback.forEach(cb => cb(value));
    }
  };

  reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
      this.onRejectedCallback.forEach(cb => cb(reason));
    }
  };

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const fulfilledMicro = () => {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(x, resolve, reject);
          } catch(e) {
            reject(e);
          }
        }, 0);
      };

      const rejectedMicro = () => {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(x, resolve, reject);
          } catch(e) {
            reject(e);
          }
        }, 0);
      };

      if (this.status === FULFILLED) {
        fulfilledMicro();
      }
      if (this.status === REJECTED) {
        rejectedMicro();
      }
      if (this.status === PENDING) {
        this.onFulfilledCallback.push(fulfilledMicro);
        this.onRejectedCallback.push(rejectedMicro);
      }
    });
  }

  // 相当于一个没有成功的 then
  catch(callback) {
    return this.then(null, callback);
  }

  // 无论结果是fulfilled或者是rejected，都会执行指定的回调函数。在finally之后，还可以继续then。并且会将值原封不动的传递给后面的then
  finally(callback) {
    return this.then((value) => {
      return MyPromise.resolve(callback()).then(() => value);
    }, (reason) => {
      return MyPromise.resolve(callback()).then(() => { throw reason });
    });
  }
}

function resolvePromise(x, resolve, reject) {
  if (x instanceof MyPromise) {
    x.then(resolve, reject);
  } else {
    resolve(x);
  }
}

MyPromise.resolve = function(value) {
  return new MyPromise((resolve, reject) => {
    resolve(value);
  });
}

MyPromise.reject = function(reason) {
  return new MyPromise((resolve, reject) => {
    reject(reason);
  });
}

MyPromise.race = function(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((p) => {
      p.then(resolve, reject);
    });
  });
}

MyPromise.all = function(promises) {
  let count = 0;
  let res = [];

  return new MyPromise((resolve, reject) => {
    promises.forEach((p) => {
      p.then((value) => {
        res[i] = value;
        count++;
        if (count === promises.length) {
          resolve(res);
        }
      }, reject);
    });
  });
}


new MyPromise((resolve, reject) => {
  resolve(123);
}).then((res) => {
  console.log(res);
  return new MyPromise((resolve) => resolve(456));
})
.then((res) => {
  console.log(res);
  return 678;
})
.then((res) => console.log(res))