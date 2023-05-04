import html from '@mailobj-browser/front/js/fetchers/html.js'
import wait from '@mailobj-browser/front/js/utils/wait.js'
import removed from '../wait/removed.js'

const states = new Map()
const method = 'POST'

export default meta => {
  const { content, ownerDocument } = meta
  const { defaultView } = ownerDocument
  const { FormData, Request } = defaultView
  const [url, seconds] = content.split(';')
  const delay = seconds * 1000
  
  queueMicrotask(async () => {
    while (ownerDocument.includes(meta)) {
      await wait(delay)
    
      const body = new FormData()
    
      for (const [key, value] of states) {
        body.set(key, value)
      }
    
      await html(object(null, {
        request: new Request(url, {
          body,
          method
        }),
        target: meta
      }))
    }
  })
}

export const set = (
  element,
  { dataset: { refresh: { state } } }
) => {
  if (!states.has(element)) {
    queueMicrotask(async () => {
      await removed(element)
      states.delete(element)
    })
  }
  
  states.set(element, state)
}
