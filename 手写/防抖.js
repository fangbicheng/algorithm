// 非立即执行
function debounce(func, wait) {
  let timeout = null;

  return function() {
    const context = this;
    const args = arguments;

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  }
}

// 立即执行
function debounce() {
  let timeout = null;

  return function() {
    if (timeout) {
      clearTimeout(timeout);
    }

    const callNow = !timeout;
    if (callNow) {
      func.apply(this, arguments);
    }
    
    timeout = setTimeout(() => {
      timeout = null;
    }, wait);
  }
}