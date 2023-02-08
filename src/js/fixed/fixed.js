import object from '@mailobj-browser/front/js/utils/object.js'

const angle = object()

export const topLeft = object(angle, {})
export const topRight = object(angle, {})
export const bottomLeft = object(angle, {})
export const bottomRight = object(angle, {})

const init = object(null, {
  clientX: 0,
  clientY: 0
})

const coords = (
  target
) => {
  const { ownerDocument } = target
  const { documentElement } = ownerDocument
  const { clientHeight, clientWidth } = documentElement
  const { height, width, x, y } = rect(target)
  
  return object(null, {
    clientHeight,
    clientWidth,
    height,
    width,
    x,
    y
  })
}

export const rect = (
  target
) => {
  const rect = target.getBoundingClientRect()
  const { bottom, height, left, right, top, width, x, y } = rect

  return object(null, { bottom, height, left, right, top, width, x, y })
}

export const fromEvent = (
  target,
  event,
  angle = bottomLeft
) => {
  const { clientHeight, clientWidth, height, width } = coords(target)
  let { clientX, clientY } = event
  
  switch (angle) {
    case bottomLeft: {
      if (clientX - width < 0) {
        clientX = 0
      } else {
        clientX -= width
      }
      
      if (clientY + height > clientHeight) {
        clientY = clientHeight - height
      }
      
      break
    }
    case bottomRight: {
      if (clientX + width > clientWidth) {
        clientX = clientWidth - width
      }
      
      if (clientY + height > clientHeight) {
        clientY = clientHeight - height
      }
      
      break
    }
    case topLeft: {
      if (clientX - width < 0) {
        clientX = 0
      } else {
        clientX -= width
      }
      
      if (clientY - height < 0) {
        clientY = 0
      } else {
        clientY -= height
      }
      
      break
    }
    case topRight: {
      if (clientX + width > clientWidth) {
        clientX = clientWidth - width
      }
      
      if (clientY - height < 0) {
        clientY = 0
      } else {
        clientY -= height
      }
      
      break
    }
  }
  
  return object(null, {
    clientX,
    clientY
  })
}

export const fromNode = (
  target,
  node,
  angle = bottomLeft
) => {
  const { clientHeight, clientWidth, height, width } = coords(target)
  const { bottom, left, right, top } = rect(node)
  let { clientX = 0, clientY = 0 } = {}
  
  switch (angle) {
    case bottomLeft: {
      if (left + width > clientWidth) {
        clientX = right - width
      } else {
        clientX = left
      }

      if (bottom + height > clientHeight) {
        clientY = top - height
      } else {
        clientY = bottom
      }
      
      break
    }
    case bottomRight: {
      if (right - width < 0) {
        clientX = left
      } else {
        clientX = right - width
      }
      
      if (bottom + height > clientHeight) {
        clientY = top - height
      } else {
        clientY = bottom
      }
      
      break
    }
    case topLeft: {
      if (left + width > clientWidth) {
        clientX = right - width
      } else {
        clientX = left
      }
      
      if (top - height < 0) {
        clientY = bottom
      } else {
        clientY = top - height
      }
      
      break
    }
    case topRight: {
      if (right - width < 0) {
        clientX = left
      } else {
        clientX = right - width
      }
      
      if (top - height < 0) {
        clientY = bottom
      } else {
        clientY = top - height
      }
      
      break
    }
  }

  return object(null, {
    clientX,
    clientY
  })
}

export const move = (
  target,
  { clientX, clientY } = init
) => {
  const {style} = target
  
  style.setProperty('--ea_context_menu_left', `${clientX}px`)
  style.setProperty('--ea_context_menu_top', `${clientY}px`)
}

export const resize = (
  target,
  node
) => {
  const {style} = target
  const {clientHeight} = coords(target)
  const {bottom, top} = rect(node)
  const max = Math.max(top, clientHeight - bottom)
  
  style.setProperty('--ea_context_menu_max_height', `${max}px`)
}
