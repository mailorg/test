import fetch from '@mailobj-browser/front/js/fetchers/fetch.js'
import defaults from '@mailobj-browser/front/js/selectors/defaults.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import href from './href.js'

const report = async param => {
  const { window } = defaults
  const { FormData, Request } = window
  const url = href('util/log')
  const body = new FormData()
  
  console.error(param)
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

export const fromEvent = async ({ error }, ea_link_file = null) => {
  const { message } = error
  const json = JSON.stringify({ ...error, message })
  const parts = [ea_link_file, json].filter(Boolean)
  
  return report(parts.join(' '))
}

export default report
