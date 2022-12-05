function* myGenerator() {
  console.log(yield Promise.resolve(1))   //1
  console.log(yield Promise.resolve(2))   //2
  console.log(yield Promise.resolve(3))   //3
}

run(myGenerator);

function run(generator) {
  return new Promise((resolve, reject) => {
    const gen = generator();

    function _next(val) {
      let res = null;
      try {
        res = gen.next(val);
      } catch(e) {
        reject(e);
      }

      const { value, done } = res;
      if (done) {
        return resolve(value);
      }

      //res.value包装为promise，以兼容yield后面跟基本类型的情况
      Promise.resolve(value).then((val) => {
        _next(val);
      }, (e) => {
        g.throw(e);
      });
    }

    _next();
  });
}

