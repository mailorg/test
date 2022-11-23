import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import preventDefault from '@mailobj-browser/front/js/events/hooks/preventDefault.js'
import click from '@mailobj-browser/front/js/events/types/click.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import rte, { insert } from '../rte.js'

const onClick = object(listener, {
  type: click,
  hooks: [preventDefault],
  task (
    button
  ) {
    const id = Math.random()
    const text = '<span eaid=\'draw-' + id + '\'></span>'
    const { ownerDocument } = button
    const form = one('form[name="send_valid"]', ownerDocument)
    
    insert('id_msg_text', text)
    globals.ea_mail_submit(form, '', 'attach_draw_rte_' + id, 1)
  }
})

export const test = (
  text
) => {
  return text
}

export default button => {
  onClick.listen(button)
  rte(button, object(null, { test }))
}
