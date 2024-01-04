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
const gap = 2

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
  angle = bottomRight,
  origin = null
) => {
  const { clientHeight, clientWidth, height, width, x, y } = coords(target)
  let { clientX, clientY } = event
  
  if (origin) {
    clientX -= origin.clientX - x
    clientY -= origin.clientY - y
  }
  
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
  
  clientX = Math.min(clientWidth, Math.max(0, clientX))
  clientY = Math.min(clientHeight, Math.max(0, clientY))
  
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
        clientY = top - height - gap
      } else {
        clientY = bottom + gap
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
        clientY = top - height - gap
      } else {
        clientY = bottom + gap
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
        clientY = bottom + gap
      } else {
        clientY = top - height - gap
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
        clientY = bottom + gap
      } else {
        clientY = top - height - gap
      }
      
      break
    }
  }

  clientX = Math.min(right, Math.max(0, clientX))
  if (bottom + gap > clientY) {
    clientY = Math.min(bottom, Math.max(0, clientY))
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

  style.setProperty('--ea_utilities_calculated__left', `${clientX}px`)
  style.setProperty('--ea_utilities_calculated__top', `${clientY}px`)
}

export const resize = (
  target,
  node,
  angle = null
) => {
  const { style } = target
  const { clientHeight, height } = coords(target)
  const { bottom, top } = rect(node)
  let max
  
  switch (angle) {
    case bottomLeft :
    case bottomRight : {
      if ((clientHeight - height - bottom) > -1) {
        max = height
      } else if (bottom <= clientHeight / 2) {
        max = clientHeight - bottom
      } else {
        max = top - gap
      }
      
      break;
    }
    case topLeft :
    case topRight : {
      if ((clientHeight - height - top) > -1) {
        max = height
      } else if (top <= clientHeight / 2) {
        max = clientHeight - top
      } else {
        max = bottom - gap
      }
      
      break;
    }
    default: {
      max = Math.max(top, clientHeight - bottom)
    }
  }
  
  max = Math.floor(max)
  style.setProperty('--ea_utilities_calculated__max_height', `${max}px`)
}