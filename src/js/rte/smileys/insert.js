import click from '@mailobj-browser/front/js/events/types/click.js'
import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import one from '@mailobj-browser/front/js/selectors/one.js'
import {close} from '../../lightboxes/menus/menu.js'
import * as lightbox from '../../lightboxes/lightbox.js'

const onClick = object(listener, {
  type: click,
  task (
    button
  ) {
    const { src } = one('img', button)
    const origin = lightbox.opener(button.closest('[data-contract="menu.library"]'))
    const form = origin.closest('form')
    const rte = one('[data-rte]', form)
    const {contentDocument, contentWindow} = rte

    if (rte) {
      //@todo améliorer cette partie, enlever setTimeout et remplacer execCommand
      setTimeout(() => {
        contentWindow.focus()
      }, 100)

      contentDocument.execCommand("InsertImage", false, src)
    }

    close()
  }
})

export default button => {
  onClick.listen(button)
}

