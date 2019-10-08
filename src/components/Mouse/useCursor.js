import { useContext } from 'react'
import { CursorContext } from './CursorContext'

export const useCursor = ({
  onCursorMove,
  onCursorLeave,
  onCursorEnter,
  onMouseEnter,
  onMouseLeave,
}) => {
  const cursor = useContext(CursorContext)

  // const onMove = e => {
  //   if (onCursorMove) {
  //     onCursorMove(e, cursor)
  //     // follower.isMoving.current = false
  //   } else {
  //     // follower.isMoving.current = true
  //   }
  //   // requestAnimationFrame(onCursorEnter)
  // }

  const htmlAttributesOnly = {
    onMouseEnter: event => onMouseEnter({ event, ...cursor }),
    onMouseLeave: event => onMouseLeave({ event, ...cursor }),
  }

  return {
    ...htmlAttributesOnly,
    onCursorMove: e => onCursorMove({ e, event: e, ...cursor }),
    onCursorEnter: e => onCursorEnter({ e, event: e, ...cursor }),
    onCursorLeave: e => onCursorLeave({ e, event: e, ...cursor }),
    bind: htmlAttributesOnly,
  }
}