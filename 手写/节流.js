// 时间戳：立刻执行，停止触发后没有办法再执行
function throttle(func, wait) {
  let pre = 0;

  return function() {
    const now = new Date();
    const context = this;
    const args = arguments;
    if (now - pre > wait) {
      func.apply(context, args);
      pre = now;
    }
  }
}

// 定时器：n 秒后第一次执行，停止触发后依然会再执行一次事件
function throttle(func, wait) {
  let timeout = null;

  if (!timeout) {
    return function() {
      const context = this;
      const args = arguments;
      timeout = setTimeout(() => {
        func.apply(context, args);
        timeout = null;
      }, wait);
    }
  }
}