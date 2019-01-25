const debounce = (method, delay) => {
  let timer = null
  return function(...args) {
    let context = this
    clearTimeout(timer)
    timer = setTimeout(function() {
      method.apply(context, args)
    }, delay)
  }
}

export { debounce }
