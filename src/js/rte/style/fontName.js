import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import preventDefault from '@mailobj-browser/front/js/events/hooks/preventDefault.js'
import click from '@mailobj-browser/front/js/events/types/click.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import rte, { command } from '../rte.js'

const onChange = object(listener, {
	type: click,
	hooks: [preventDefault],
	task (
		button
	) {
		console.log(button)
		command('id_msg_text', 'fontname', button.value)
		button.selectedIndex = 0
	}
})

export const test = (
	text
) => {
	return text
}

export default button => {
	onChange.listen(button)
	rte(button, object(null, { test }))
}
