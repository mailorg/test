import all from '@mailobj-browser/front/js/selectors/all.js'
import click from '@mailobj-browser/front/js/events/types/click.js'
import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import one from '@mailobj-browser/front/js/selectors/one.js'
import preventDefault from '@mailobj-browser/front/js/events/hooks/preventDefault.js'
import globals from '../../ea/globals.js'
import rte from '../rte.js'

const onClick = object(listener, {
  type: click,
  hooks: [preventDefault],
  task (
	  previous
  ) {
	const contextMenu = one('#div_contextmenu')
	if (contextMenu) {
	  const pages = all('.ea_generics__smileys', contextMenu)
	  const currentPage = one('.ea_generics__smileys:not(.ea_generics__display-none)', contextMenu)
	  const current = pages.indexOf(currentPage)
	  const previous = ((current === 0) ? pages.length : current) - 1
		
		globals.ea_display(currentPage, false)
		globals.ea_display(pages[previous], true)
	}
  }
})

export default button => {
	onClick.listen(button)
}
