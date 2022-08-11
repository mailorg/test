import all from '@mailobj-js/front/js/selectors/all.js'
import click from '@mailobj-js/front/js/events/types/click.js'
import listener from '@mailobj-js/front/js/events/listeners/listener.js'
import object from '@mailobj-js/front/js/utils/object.js'
import one from '@mailobj-js/front/js/selectors/one.js'
import preventDefault from '@mailobj-js/front/js/events/hooks/preventDefault.js'
import functions from '../../ea/functions.js'
import rte from '../rte.js'

const onClick = object(listener, {
  type: click,
  hooks: [preventDefault],
  task (
    next
  ) {
	const contextMenu = one('#div_contextmenu')
	if (contextMenu) {
	  const pages = all('.cl_rte_smiley_table', contextMenu)
	  const currentPage = one('.cl_rte_smiley_table:not(.cl_display_none)', contextMenu)
	  const current = pages.indexOf(currentPage)
	  const next = (current + 1) % pages.length

	  functions.ea_display(currentPage, false)
	  functions.ea_display(pages[next], true)
	}
  }
})

export const test = () => {
	return false
}

export default button => {
	onClick.listen(button)
	rte(button, object(null, { test }))
}

