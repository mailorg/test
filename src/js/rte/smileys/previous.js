import all from '@mailobj-js/front/js/selectors/all.js'
import click from '@mailobj-js/front/js/events/types/click.js'
import functions from '@mailobj-js/utilities/js/ea/functions.js'
import listener from '@mailobj-js/front/js/events/listeners/listener.js'
import object from '@mailobj-js/front/js/utils/object.js'
import one from '@mailobj-js/front/js/selectors/one.js'
import preventDefault from '@mailobj-js/front/js/events/hooks/preventDefault.js'
import rte from '../rte.js'

const onClick = object(listener, {
  type: click,
  hooks: [preventDefault],
  task (
	  previous
  ) {
	const contextMenu = one('#div_contextmenu')
	if (contextMenu) {
	  const pages = all('.cl_rte_smiley_table', contextMenu)
	  const currentPage = one('.cl_rte_smiley_table:not(.cl_display_none)', contextMenu)
	  const current = pages.indexOf(currentPage)
	  const previous = ((current === 0) ? pages.length : current) - 1

	  functions.ea_display(currentPage, false)
	  functions.ea_display(pages[previous], true)
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
