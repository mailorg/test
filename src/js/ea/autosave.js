import object from '@mailobj-browser/front/js/utils/object.js'
import wait from '@mailobj-browser/front/js/utils/wait.js'
import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import capture from '@mailobj-browser/front/js/events/options/capture.js'
import input from '@mailobj-browser/front/js/events/types/input.js'
import submit from '@mailobj-browser/front/js/events/types/submit.js'
import { post } from './ajax.js'
import removed from '../wait/removed.js'
import { href } from './ea.js'

const autosave = 1
const params = object(null, { autosave })
const forms = new Set()

const onInput = object(listener, {
  type: input,
  capture,
  task: form => {
    forms.add(form)
  }
})

const onSubmit = object(listener, {
  type: submit,
  capture,
  task: form => {
    forms.delete(form)
  }
})

export default meta => {
  const { content, ownerDocument } = meta
  const { defaultView } = ownerDocument
  const { FormData } = defaultView
  const delay = content * 1000
  
  queueMicrotask(async () => {
    while (ownerDocument.includes(meta)) {
      await wait(delay)
    
      for (const target of forms) {
        const { action } = target
        const body = new FormData(target)
        const url = href(action, params)
        
        forms.delete(target)
        await post(url, body, { target })
      }
    }
  })
}

export const set = (
  form
) => {
  if (!forms.has(form)) {
    queueMicrotask(async () => {
      await removed(form)
      onInput.forget(form)
      onSubmit.forget(form)
      forms.delete(form)
    })
  }
  
  onInput.listen(form)
  onSubmit.listen(form)
}
