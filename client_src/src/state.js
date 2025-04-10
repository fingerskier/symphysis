if (typeof window.$ !== 'object') window.$ = {
  hash: [],
  query: {},
}

const context = {}

if (typeof window._ !== 'object') window._ = new Proxy(context, {
  get(target, prop) {
    return JSON.parse(localStorage.getItem(prop))
  },
  
  
  set(target, prop, value) {
    localStorage.setItem(prop, JSON.stringify(value))
    return true
  },
})


let edges = {}


const parseURL = () => {
  const params = new URLSearchParams(window.location.search)
  for (const [key, value] of params.entries()) {
    $.query[key] = value
  }
  
  $.hash = window.location.hash.substring(1).split('/')
}



window.addEventListener('popstate', parseURL)

window.addEventListener('hashchange', parseURL)
