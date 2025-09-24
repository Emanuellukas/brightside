// Constants to avoid magic numbers
const DRAG_DISMISS_THRESHOLD = 100
const ANIMATION_DURATION_SECONDS = .5
const EXIT_ANIMATION_DURATION_SECONDS = .4
const STACK_MAX_ROTATE_DEGREES = 8
const STACK_BASE_ROTATE_DEGREES = 2
const STACK_STEP_X_PIXELS = 8
const STACK_MAX_X_PIXELS = 48
const STACK_STEP_Y_PIXELS = 10
const STACK_MAX_Y_PIXELS = 80
const DRAG_VELOCITY_THRESHOLD = 600 // px/s aproximado

export const useFeedAnimations = ({
  lastDragOffsetX, lastDragOffsetY, removingArticles
}) => {
  const computeStackOffsets = (index) => {
    if (index === 0) {
      return { x: 0, y: 0, rotate: 0 }
    }
    const rotate = Math.min(STACK_MAX_ROTATE_DEGREES, STACK_BASE_ROTATE_DEGREES + index)
    const x = Math.min(STACK_MAX_X_PIXELS, index * STACK_STEP_X_PIXELS)
    const y = Math.min(STACK_MAX_Y_PIXELS, index * STACK_STEP_Y_PIXELS)
    return { x, y, rotate }
  }
  
  const getInitial = (index) => {
    const { x, y, rotate } = computeStackOffsets(index)
    return { scale: 0, x, y, rotate, opacity: 1 }
  }
  
  const getAnimate = (index) => {
    const { x, y, rotate } = computeStackOffsets(index)
    
    if (removingArticles.value.has(index)) {
      return { 
        scale: 0.8, 
        x: x + (lastDragOffsetX.value * 0.1), 
        y: y + (lastDragOffsetY.value * 0.1), 
        rotate: rotate + 15, 
        opacity: 0,
        transition: { 
          duration: EXIT_ANIMATION_DURATION_SECONDS,
          ease: "easeInOut"
        } 
      }
    }
    
    return { scale: 1, x, y, rotate, opacity: 1, transition: { duration: ANIMATION_DURATION_SECONDS } }
  }

  return {
    DRAG_DISMISS_THRESHOLD,
    DRAG_VELOCITY_THRESHOLD,
    getInitial,
    getAnimate
  }
}
