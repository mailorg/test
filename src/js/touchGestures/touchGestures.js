import listener from '@mailobj-browser/front/js/events/listeners/listener.js'
import touchEnd from "@mailobj-browser/front/js/events/types/touchEnd.js"
import touchStart from '@mailobj-browser/front/js/events/types/touchStart.js'
import touchMove from '@mailobj-browser/front/js/events/types/touchMove.js'
import passive from '@mailobj-browser/front/js/events/options/passive.js'
import object from '@mailobj-browser/front/js/utils/object.js'

let Swipe = (function () {
  function Swipe(element) {
    this.xDown = null;
    this.yDown = null;
    this.element = typeof (element) === 'string' ? document.querySelector(element) : element;
    this.element.addEventListener('touchstart', function (evt) {
      this.xDown = evt.touches[0].clientX;
      this.yDown = evt.touches[0].clientY;
    }.bind(this), false);
  }

  Swipe.prototype.onLeft = function (callback) {
    this.onLeft = callback;
    return this;
  };
  Swipe.prototype.onRight = function (callback) {
    this.onRight = callback;
    return this;
  };
  Swipe.prototype.onUp = function (callback) {
    this.onUp = callback;
    return this;
  };
  Swipe.prototype.onDown = function (callback) {
    this.onDown = callback;
    return this;
  };

  Swipe.prototype.handleTouchMove = function (evt) {
    if (!this.xDown || !this.yDown) {
      return;
    }
    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;
    this.xDiff = this.xDown - xUp;
    this.yDiff = this.yDown - yUp;

    if (Math.abs(this.xDiff) !== 0) {
      if (this.xDiff > 2) {
        typeof (this.onLeft) === "function" && this.onLeft();
      } else if (this.xDiff < -2) {
        typeof (this.onRight) === "function" && this.onRight();
      }
    }

    if (Math.abs(this.yDiff) !== 0) {
      if (this.yDiff > 2) {
        typeof (this.onUp) === "function" && this.onUp();
      } else if (this.yDiff < -2) {
        typeof (this.onDown) === "function" && this.onDown();
      }
    }
    // Reset values.
    this.xDown = null;
    this.yDown = null;
  };

  Swipe.prototype.run = function () {
    this.element.addEventListener('touchmove', function (evt) {
      this.handleTouchMove(evt);
    }.bind(this), false);
  };

  return Swipe;
}());


// const swipe = {
//  startX: 0,
//  startY: 0,
//  endX: 0,
//  endY: 0
// }
// const directions = Object.freeze({
//  UP: 'up',
//  DOWN: 'down',
//  RIGHT: 'right',
//  LEFT: 'left'
// })
// let direction = null
//
// export default async element => {
//  console.log(element)
//  onTouchStart.listen(element)
//  onTouchMove.listen(element)
//  onTouchEnd.listen(element)
// }
//
// export const touchDirection = () => {
//  return direction
// }
//
// const onTouchStart = object(listener, {
//  type: touchStart,
//  passive,
//  task(
//   element,
//   event
//  ) {
//   console.log("onTouchStart");
//   const { touches } = event
//
//   swipe.startX = touches[0].screenX
//   swipe.startY = touches[0].screenY
//  }
// })
//
// const onTouchMove = object(listener, {
//  type: touchMove,
//  passive,
//  task(
//   element,
//   event
//  ) {
//   console.log("onToucheMove");
//   const { touches } = event
//
//   swipe.endX = touches[0].screenX
//   swipe.endY = touches[0].screenY
//  }
// })
//
// export const onTouchEnd = object(listener, {
//  type: touchEnd,
//  passive,
//  task() {
//   console.log("onTouchEnd");
//   const deltaX = swipe.endX - swipe.startX
//   const deltaY = swipe.endY - swipe.startY
//
//   if (deltaY === 0 || Math.abs(deltaX / deltaY) > 1) {
//    direction = deltaX > 0 ? directions.RIGHT : directions.LEFT
//   } else {
//    direction = deltaY > 0 ? directions.UP : directions.DOWN
//   }
//
//   return direction
//  }
// })