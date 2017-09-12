import lzwCompress from 'lzwcompress'

export default function ObjectToUrl (url, prefix, objects, fireDirectly) {
  this.url = url || window.location
  this.objects = []
  this.prefix = prefix || ''

  if (objects) {
    for (let obj of objects) {
      if (Array.isArray(obj) && obj[0] && obj[1]) {
        AddObject(obj[0], obj[1])
      }
    }
  }
  if (fireDirectly) {
    fire()
  }

  function AddObject (key, value) {
    let keyStr, valueStr
    if (typeof key === 'object') {
      keyStr = JSON.stringify(key)
    } else if (typeof key === 'string') {
      keyStr = key
    }

    if (typeof value === 'object') {
      valueStr = JSON.stringify(value)
    } else if (typeof value === 'string') {
      valueStr = value
    }
    let keyCompressed = lzwCompress.pack(keyStr)
    keyStr = decodeURIComponent(window.btoa(keyCompressed))
    let valueCompressed = lzwCompress.pack(valueStr)
    valueStr = decodeURIComponent(window.btoa(valueCompressed))

    this.objects.push([this.prefix + keyStr, valueStr])
  }

  function fire () {
    let pairs = ''
    for (let obj of this.objects) {
      pairs += obj[0] + '=' + obj[1] + '&'
    }
    window.location = this.url + '?' + pairs
  }
}

/*  function encodeUtf8 (s) {
  return unescape(encodeURIComponent(s))
}

function decodeUtf8 (s) {
  return decodeURIComponent(escape(s))
}  */
