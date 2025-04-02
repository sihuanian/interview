function throttle(fn, delay) {
  let start = new Date().getTime()
  return function(...args) {
    const now = new Date().getTime()
    if (now - start >= delay) {
      fn.apply(this. args)
      start = now
    }
  }
}

const print = () => {
  console.log('print')
}

const throttleFn = throttle(print, 1000)
const app = document.getElementById('app')
app.addEventListener('click', throttleFn)