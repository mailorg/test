import object from '@mailobj-browser/front/js/utils/object.js'

const block = 'ea_generics__rte'

export const elements = object(null, {
  advanced_actions: `${block}_advanced_actions`,
  show_more: `${block}__show_more`,
})

export const modifiers = object(null, {
  show_more: object(null, {
    hide: `${elements.show_more}-hide`
  })
})