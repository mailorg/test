import object from '@mailobj-browser/front/js/utils/object.js'

const block = 'ea_utilities'

export const elements = object(null, {
  lightbox: `${block}__lightbox`,
})

export const modifiers = object(null, {
  open: `${elements.lightbox}-open`
})
