import fetch from '@mailobj-browser/front/js/fetchers/fetch.js'
import defaults from '@mailobj-browser/front/js/selectors/defaults.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import passive from '@mailobj-browser/front/js/events/options/passive.js'
import error from '@mailobj-browser/front/js/events/types/error.js'
import globals from './globals.js'
import href from './href.js'

const browser = ({
  appCodeName,
  appName,
  appVersion,
  platform,
  userAgent
}) => ({
  appCodeName,
  appName,
  appVersion,
  platform,
  userAgent
})

const append = (body, variable, data) => {
  for (const [name, value] of Object.entries(data)) {
    body.append(`${variable}[${name}]`, value)
  }
}

const report = async (error, ea_link_file = null) => {
  const { window } = defaults
  const { FormData, Request, navigator } = window
  const { message, stack, ...rest } = error
  const url = href('util/log')
  const body = new FormData()
  
  console.error(message)
  body.append('fct', 'JS_LOG')
  
  append(body, 'error', { message, stack, ...rest })
  append(body, 'navigator', browser(navigator))
  
  if (ea_link_file) {
    body.append('ea_link_file', ea_link_file)
  }

  const { fetched } = await fetch(object(null, {
    request: new Request(`${url}`, {
      method: 'POST',
      body
    })	  
  }))
  
  return fetched
}

export default report


export const onError = object(listener, {
  type: error,
  passive,
  task: async (window, { error }) => {
    const { ea_link_file } = globals
    
    await report(error, ea_link_file)
  }
})