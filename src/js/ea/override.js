import { disable } from '@mailobj-browser/components-generics/js/hotkey/hotkey.js'
import resolvable from '@mailobj-browser/front/js/utils/resolvable.js'

const { ea_context_menu_, ea_context_menu_close } = globalThis

let resolver = resolvable()

const next = () => {
    resolve()
    resolver = resolvable()

    return resolver[0]
}

const resolve = () => {
    const [, { resolve }] = resolver

    resolve()
}

globalThis.ea_context_menu_ = (element, event, ...params) => {
    const node = element ?? event.target
    
    if (node) {
        disable(node, next())
    
        return ea_context_menu_(element, event, ...params)
    }
}

globalThis.ea_context_menu_close = () => {
    resolve()
    return ea_context_menu_close()
}