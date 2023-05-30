import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import capture from '@mailobj-browser/front/js/events/options/capture.js'
import click from '@mailobj-browser/front/js/events/types/click.js'
import submit from '@mailobj-browser/front/js/events/types/submit.js'
import defaults from '@mailobj-browser/front/js/selectors/defaults.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import html from '@mailobj-browser/front/js/fetchers/html.js'
import fetch from '@mailobj-browser/front/js/fetchers/fetch.js'

const { document } = defaults

const selectors = [
  'form input[name][type="image"]',
  'form input[name][type="submit"]',
  'form button[name][type="submit"]',
  'form button[name][form]',
  'form button[name]:not([type])'
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
    const { activeElement } = event
    const { submitter } = event
    
    if (activeElement?.matches(selector)) {
      candidates.add(activeElement)
    }
    
    if (submitter?.matches(selector)) {
      candidates.add(submitter)
    }
  
    submitters.set(event, ...[...candidates, empty].filter(Boolean))
  }
})

const anchor = (
  target,
  event,
  params
) => {
  const { download, href } = target
  
  return get(href, params, {
    ...!download && { target }
  })
}

const form = (
  target,
  event,
  params
) => {
  const { action, method = 'GET', ownerDocument } = target
  const { defaultView } = ownerDocument
  const { FormData, URL, URLSearchParams } = defaultView
  const { name, value } = submitters.get(event) ?? empty
  const body = new FormData(target)
  const entries = Object.entries(params)
  
  submitters.delete(event)
  
  if (name) {
    entries.push([name, value])
  }
  
  for (const [name, value] of entries) {
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
  
  await fetch(object(null, { request }))
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
  
  return call(request(target, event), { target })
}
