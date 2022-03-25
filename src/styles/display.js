import object from '@mailobj-js/front/utils/object.js'

export const classes = object(null, {
  none: 'ea_utilities__display-none'
})

export default object(null, {
  none: ({ classList }) => classList.add(classes.none),
  show: ({ classList }) => classList.remove(classes.none)
})
