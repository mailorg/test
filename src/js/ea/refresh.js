import wait from '@mailobj-browser/front/js/utils/wait.js'
import removed from '../wait/removed.js'
import { post } from './ajax.js'

const states = new Map()


export default meta => {
  const { content, ownerDocument } = meta
  const { defaultView } = ownerDocument
  const { FormData } = defaultView
  const [url, seconds] = content.split(';')
  const delay = seconds * 1000
  
  queueMicrotask(async () => {
    while (ownerDocument.includes(meta)) {
      await wait(delay)
      const body = new FormData()
  
      for (const [element, values] of states) {
        const { dataset } = element
        const { refresh } = dataset
        const { uuid } = refresh
        
        
        body.set(uuid, values)
      }
      
      await post(url, body, meta)
    }
  })
}

export const set = (
  element,
  { dataset: { refresh: { state } } } = element
) => {
  if (!states.has(element)) {
    states.set(element, [])
    
    queueMicrotask(async () => {
      await removed(element)
      states.delete(element)
    })
  }
  
  states.get(element).push(state)
}
