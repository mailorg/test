import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import click from '@mailobj-browser/front/js/events/types/click.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import one from '@mailobj-browser/front/js/selectors/one.js'
import { elements } from './styles.js'
import { modifiers as genericsModifiers } from '@mailobj-browser/components-generics/js/styles.js'

const onClick = object(listener, {
  type: click,
  task(
    button
  ) {
    button.classList.toggle(genericsModifiers.show_more.hide)
    const parent = button.closest('div')
    const containerActions = one(`.${elements.advanced_actions}`, parent)
    containerActions.classList.toggle(genericsModifiers.display.none)
  }
})

export default button => {
  onClick.listen(button)
}