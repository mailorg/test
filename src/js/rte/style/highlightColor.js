import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import preventDefault from '@mailobj-browser/front/js/events/hooks/preventDefault.js'
import click from '@mailobj-browser/front/js/events/types/click.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import one from '@mailobj-browser/front/js/selectors/one.js'
import href from '@mailobj-browser/utilities/js/ea/href.js'
import matchingOrClosest from '@mailobj-browser/front/js/selectors/matchingOrClosest.js'
import functions from '../../ea/functions.js'
import rte from '../rte.js'

const onClick = object(listener, {
  type: click,
  hooks: [preventDefault],
  task (
    highlightColor
  ) {
    const rte = one('iframe', highlightColor.closest('form'))

	if (rte) {
      const url = href('auth/colorpanel', {
	    'id_txt': 'rte',
	    'id_bkg': 'rte',
	    'table': '12x19',
	    'preview': 1,
	    'cancel': 1,
	    'color': functions.ea_rte_hilitecolor
	  });

	  functions.ea_rte_update_editor(functions.ea_rte_current);
   	  functions.ea_rte_context_menu(highlightColor, null, rte.id, 'hilitecolor', 'rte_opt_cp', url);
	}

  }
})

export const test = (
	text
) => {
	return matchingOrClosest('font[style*="background-color:"]', text)
}

export default button => {
  onClick.listen(button)
	rte(button, object(null, { test }))
}
