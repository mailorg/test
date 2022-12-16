import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import click from '@mailobj-browser/front/js/events/types/click.js'
import load from '@mailobj-browser/front/js/events/types/load.js'
import object from '@mailobj-browser/front/js/utils/object.js'
import rte, { command } from '../rte.js'

const onClick = object(listener, {
	type: click,
	task (
		button
	) {
		console.log(button)
		command('id_msg_text', 'fontname', button.value)
	}
})

export const test = (
	text
) => {
	return text
}

export default button => {
	button.setAttribute('style', `font-family:'${button.value}'`)
	onClick.listen(button)
	rte(button, object(null, { test }))
}
