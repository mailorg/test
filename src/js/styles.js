import object from '@mailobj-browser/front/js/utils/object.js'

export const block = 'ea_utilities'

export const elements = object(null, {
  aside_alerts: `${block}__aside_alerts`,
  aside_confirms: `${block}__aside_confirms`,
  aside_lightboxes: `${block}__aside_lightboxes`,
  display: `${block}__display`,
  is_sr_only: `${block}__is_sr_only`,
  overflow: `${block}__overflow`,
  position: `${block}__position`,
  show_more: `${block}__show_more`,
  visibility: `${block}__visibility`,
})

export const modifiers = object(null, {
  display: object(null, {
    none: `${elements.display}-none`
  }),
  overflow: object(null, {
    hidden: `${elements.overflow}-hidden`
  }),
  position: object(null, {
    fixed: `${elements.position}-fixed`
  }),
  show_more: object(null, {
    hide: `${elements.show_more}-hide`
  }),
  visibility: object(null, {
    hidden: `${elements.visibility}-hidden`
  }),
})