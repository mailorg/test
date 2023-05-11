import click from '@mailobj-browser/front/js/events/types/click.js'
import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import one from '@mailobj-browser/front/js/selectors/one.js'
import {close} from '../../lightboxes/menus/menu.js'
import {globals} from '../../ea/ea.js'
import * as lightbox from '../../lightboxes/lightbox.js'

const onClick = object(listener, {
  type: click,
  task (
    button
  ) {
    const { src } = one('img', button)
    const origin = lightbox.opener(button.closest('[data-contract="menu.library"]'))
    const form = origin.closest('form')
    const rte = one('[data-rte="chat"]', form)
    const {contentDocument} = rte
    console.log(contentDocument.getSelection())

    if (rte) {
      const {body} = contentDocument
      // let rteValue = `<img alt="" src="${src}">`
      // contentDocument.open()
      // contentDocument.write(rteValue)
      // contentDocument.close()

      close()

      contentDocument.setPosition(body, 2)

      // rte.focus()
    }
  }
})

export default button => {
  onClick.listen(button)
}

