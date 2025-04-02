function debounce(fn, delay) {
  let timer = null
  return (...args) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this. args)
    }, delay)
  }
}

const print = () => {
  console.log('print')
}

const debounceFn = debounce(print, 1000)
const app = document.getElementById('app')
app.addEventListener('click', debounceFn)