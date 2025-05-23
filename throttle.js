function throttle(fn, delay) {
  let start = new Date().getTime()
  return function (...args) {
    const now = new Date().getTime()
    if (now - start >= delay) {
      fn.apply(this.args)
      start = now
    }
  }
}

function throttle1(fn, delay) {
  let inThrottle
  return function (...args) {
    if (!inThrottle) {
      inThrottle = true
      setTimeout(() => {
        fn.apply(this, args)
        inThrottle = false
      }, delay)
    }
  }
}

function throttle3(fn, delay) {
  let timer
  return function (...args) {
    const context = this
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(context, args)
        timer = null
      }, delay)
    }
  }
}

const print = () => {
  console.log('print')
}

const throttleFn = throttle3(print, 3000)
const app = document.getElementById('app')
app.addEventListener('click', throttleFn)