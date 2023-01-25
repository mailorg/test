import input from '@mailobj-browser/front/js/events/types/input.js'
import capture from '@mailobj-browser/front/js/events/options/capture.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import all from '@mailobj-browser/front/js/selectors/all.js'
import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import * as menu from './menu.js'

export const {
  close,
  open,
  opener
} = menu

const selected = ''

const onInput = object(listener, {
  type: input,
  capture,
  task: (
    list,
    { target }
  ) => {
    const { parentNode, value } = target
    const { textContent } = parentNode
    const { options } = opener(list)
    const [option] = options
    
    Object.assign(option, { selected, textContent, value })
  }
})

export default (
  list
) => {
  const select = opener(list)
  
  for (const input of all('input', list)) {
    if (input.value === select.value) {
      input.focus()
    }
  }
  
  onInput.listen(list)
}
