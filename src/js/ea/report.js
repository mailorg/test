import fetch from '@mailobj-browser/front/js/fetchers/fetch.js'
import defaults from '@mailobj-browser/front/js/selectors/defaults.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import href from './href.js'

const report = async param => {
  console.error(param)
  const { window } = defaults
  const { FormData, Request } = window
  const url = href('util/log')
  const body = new FormData()
  
  body.append('fct', 'JS_LOG')
  body.append(`param_0`, param)

  const { fetched } = await fetch(object(null, {
    request: new Request(`${url}`, {
      method: 'POST',
      body
    })	  
  }))
  
  return fetched
}

export const fromEvent = async ({ error }) => {
  const { message } = error
  
  return report(JSON.stringify({
    ...error,
    message
  }))
}

export default report
