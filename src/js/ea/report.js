import fetch from '@mailobj-browser/front/js/fetchers/fetch.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import href from './href.js'

export default async (param) => {

  /* param peut être string ou Array : */
  const values = [param].flat()
  const url = href('util/log')
  const keys = Array.from({length: values.length}, (x, i) => 'param_' + i)
  const data = new FormData()
  data.append('fct', 'JS_LOG')
  for (const i in keys) {
   data.append(keys[i], values[i])
  }

  const { fetched } = await fetch(object(null, {
    request: new Request(`${url}`, {
      method: 'POST',
      body : data
    })	  
  }))
  return fetched
}
