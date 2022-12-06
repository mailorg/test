import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import touchEnd from "@mailobj-browser/front/js/events/types/touchEnd.js"
import touchStart from '@mailobj-browser/front/js/events/types/touchStart.js'
import touchMove from '@mailobj-browser/front/js/events/types/touchMove.js'
import passive from '@mailobj-browser/front/js/events/options/passive.js'
import object from '@mailobj-browser/front/js/utils/object.js'

const swipe = {
  startX: 0,
  startY: 0,
  endX: 0,
  endY: 0
}
const directions = Object.freeze({
  UP: 'up',
  DOWN: 'down',
  RIGHT: 'right',
  LEFT: 'left'
})
let direction = null

export default element => {
  console.log(element)
  onTouchStart.listen(element)
  onTouchMove.listen(element)
  onTouchEnd.listen(element)
}

export const touchDirection = () => {
  return direction
}

const onTouchStart = object(listener, {
  type: touchStart,
  passive,
  task(
    element,
    event
  ) {
    console.log("onTouchStart");
    const { touches } = event

    swipe.startX = touches[0].screenX
    swipe.startY = touches[0].screenY
  }
})

const onTouchMove = object(listener, {
  type: touchMove,
  passive,
  task(
    element,
    event
  ) {
    console.log("onToucheMove");
    const { touches } = event

    swipe.endX = touches[0].screenX
    swipe.endY = touches[0].screenY
  }
})

const onTouchEnd = object(listener, {
  type: touchEnd,
  passive,
  task() {
    console.log("onTouchEnd");
    const deltaX = swipe.endX - swipe.startX
    const deltaY = swipe.endY - swipe.startY

    if (deltaY === 0 || Math.abs(deltaX / deltaY) > 1) {
      direction = deltaX > 0 ? directions.RIGHT : directions.LEFT
    } else {
      direction = deltaY > 0 ? directions.UP : directions.DOWN
    }
  }
})