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
    const rte = one('[data-rte]', form)
    const {contentDocument, contentWindow} = rte

    if (rte) {

      close()
      console.log(rte.tagName);


      setTimeout(() => {
        contentWindow.focus()
      }, 100)

      // let caret = contentWindow.getSelection().anchorNode

      // console.log("1")
      // const {body} = contentDocument
      // let rteValue = `<img alt="" src="${src}">`
      // rte.focus()
      // contentDocument.open()
      // contentDocument.write('0123456789')
      // contentDocument.getSelection().collapseToStart()
      // contentDocument.close()

      // globals.ea_rte_exec_insert_link(rte.id, src, 'image')



      // rte.focus()
    }
  }
})

export default button => {
  onClick.listen(button)
}

