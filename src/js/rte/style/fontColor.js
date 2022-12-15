import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import preventDefault from '@mailobj-browser/front/js/events/hooks/preventDefault.js'
import load from '@mailobj-browser/front/js/events/types/load.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import one from '@mailobj-browser/front/js/selectors/one.js'
import href from '@mailobj-browser/utilities/js/ea/href.js'
import globals from '../../ea/globals.js'
import rte from '../rte.js'

const onLoad = object(listener, {
  type: load,
  // hooks: [preventDefault],
  task(
    fontColor
  ) {
    const rte = one('iframe', fontColor.closest('form'))

    if (rte) {
      const url = href('auth/colorpanel', {
        'id_txt': 'rte',
        'id_bkg': 'rte',
        'table': '12x19',
        'preview': 1,
        'cancel': 1,
        'color': globals.ea_rte_forecolor
      });

      globals.ea_rte_update_editor(globals.ea_rte_current);
      globals.ea_rte_context_menu(fontColor, null, rte.id, 'forecolor', 'rte_opt_cp', url);
    }
  }
})

export const test = (
  text
) => {
  return text.closest('font[color]')
}

export default button => {
  onLoad.listen(button)
  rte(button, object(null, {test}))
}
