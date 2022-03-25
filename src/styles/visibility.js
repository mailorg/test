import object from '@mailobj-js/front/utils/object.js'

export const classes = object(null, {
  hidden: 'ea_utilities__visibility-hidden'
})

export default object(null, {
  hidden: ({ classList }) => classList.add(classes.hidden),
  unset: ({ classList }) => classList.remove(classes.hidden)
})
