import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import capture from '@mailobj-browser/front/js/events/options/capture.js'
import click from '@mailobj-browser/front/js/events/types/click.js'
import submit from '@mailobj-browser/front/js/events/types/submit.js'
import defaults from '@mailobj-browser/front/js/selectors/defaults.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import html from '@mailobj-browser/front/js/fetchers/html.js'
import fetch from '@mailobj-browser/front/js/fetchers/fetch.js'
import globals from '@mailobj-browser/utilities/js/ea/globals.js'
import href from './href.js'

const { document } = defaults

const selectors = [
  'form input[type="image"]',
  'form input[type="submit"]',
  'form button[type="submit"]',
  'form button:not([type])'
]

const empty = object()
const selector = `${selectors}`
const candidates = new Set()
const submitters = new WeakMap()

const onClick = object(listener, {
  type: click,
  capture,
  task: (document, event) => {
    const { target } = event
    
    if (target.matches(selector)) {
      candidates.clear()
      candidates.add(target)
    }
  }
})

const onSubmit = object(listener, {
  type: submit,
  capture,
  task: (document, event) => {
    const { submitter } = event
    
    if (submitter) {
      submitters.set(event, submitter)
      
      return
    }
    
    const { activeElement } = document
    
    if (activeElement?.matches(selector)) {
      submitters.set(event, activeElement)
      
      return
    }
    
    submitters.set(event, ...[...candidates, empty].filter(Boolean))
  }
})

const anchor = (
  target,
  event,
  params
) => {
  const { download, href: url } = target
  
  return get(href(url, params), {
    ...!download && { target }
  })
}

const form = (
  target,
  event
) => {
  const submitter = submitters.get(event) ?? empty
  const { name, value, ownerDocument } = submitter
  const action = submitter.formAction ?? target.action
  const method = submitter.formMethod ?? target.method ?? 'GET'
  const { defaultView } = ownerDocument
  const { FormData, URL, URLSearchParams } = defaultView
  const body = new FormData(target)
  
  submitters.delete(event)
  
  if (name) {
    body.append(name, value)
  }
  
  if (method.toUpperCase() === 'GET') {
    const url = Object.assign(new URL(action), {
      search: `${new URLSearchParams(body)}`
    })
    
    return get(`${url}`, { target })
  }
  
  return post(action, body, { target })
}

const call = async (
  request,
  { target } = {}
) => {
  if (target) {
    const { response } = await html(object(null, {
      request,
      target
    }))

    return response
  }
  
  fetch(object(null, { request }))
}

onClick.listen(document)
onSubmit.listen(document)

export const get = async (
  url,
  { target } = {}
) => {
  const { window } = defaults
  const { Request } = window
  const method = 'GET'
  const options = { method }
  const request = new Request(url, options)
  
  return call(request, { target })
}

export const post = async (
  url,
  body,
  { target } = {}
) => {
  const { window } = defaults
  const { Request } = window
  const method = 'POST'
  const options = { body, method }
  const request = new Request(url, options)
  
  return call(request, { target })
}

export const fromEvent = async (
  target,
  event
) => {
  const { type } = event
  const request = type === 'submit' ? form : anchor
  const result = await request(target, event)
  
  globals.ea_screen_adjust()
  
  return result
}
