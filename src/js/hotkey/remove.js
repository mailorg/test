import object from '@mailobj-browser/front/js/utils/object.js'
import one from '@mailobj-browser/front/js/selectors/one.js'
import globals from '@mailobj-browser/utilities/js/ea/globals.js'

export default object(null, {
    task(
        element
    ) {
        const { ownerDocument, dataset } = element
        const { body } = ownerDocument
        const { confirm } = dataset
        const { name, action, selectors } = this
        const e = one(`input[name='${name}]`, body)
        e.value = action
        globals.ea_list(e, "", selectors, null, confirm)
    }
})

