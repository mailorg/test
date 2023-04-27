import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import capture from '@mailobj-browser/front/js/events/options/capture.js'
import click from '@mailobj-browser/front/js/events/types/click.js'
import submit from '@mailobj-browser/front/js/events/types/submit.js'
import defaults from '@mailobj-browser/front/js/selectors/defaults.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import href from './href.js'
import html from '@mailobj-browser/front/js/fetchers/html.js'

const { document } = defaults

const selectors = [
  'form input[name][type="image"]',
  'form input[name][type="submit"]',
  'form button[name][type="submit"]',
  'form button[name][form]',
  'form button[name]:not([type])'
]

const GET = 'GET'
const init = object(null, { method: GET })
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
  element,
  event,
  params
) => {
  const { href: action, ownerDocument } = element
  const { defaultView } = ownerDocument
  const { Request } = defaultView
  
  return new Request(href(action, params), {
    ...init
  })
}

const form = (
  element,
  event,
  params
) => {
  const { action, method = 'GET', ownerDocument } = element
  const { defaultView } = ownerDocument
  const { FormData, Request, URL, URLSearchParams } = defaultView
  const { name, value } = submitters.get(event)
  const body = new FormData(element)
  const entries = Object.entries(params)
  
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
    
    return new Request(`${url}`, {
      ...init
    })
  }
  
  return new Request(action, {
    ...init,
    body,
    method
  })
}

const build = (
  target,
  event,
  params
) => {
  const { type } = event
  
  return type === 'submit' ?
    form(target, event, params) :
    anchor(target, event, params)
}

onClick.listen(document)
onSubmit.listen(document)

export const fromEvent = async (
  target,
  event,
  { ...params } = {}
) => {
  const request = build(target, event, params)
  const context = object(null, { request, target })
  const { response } = html(context)
  
  return response
}
