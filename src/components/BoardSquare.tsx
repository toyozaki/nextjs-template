import { ReactNode, VFC } from 'react'

import { useDrop } from 'react-dnd'

import { ItemTypes } from './Constans'
import { canMoveNight, useKnightPosition } from './Game'
import { Square } from './Square'

interface Props {
  x: number
  y: number
  children: ReactNode
}

export const BoardSquare: VFC<Props> = ({ x, y, children }) => {
  const { position, moveKnight } = useKnightPosition()

  const black = (x + y) % 2 === 1
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.KNIGHT,
      canDrop: () => canMoveNight(position, [x, y]),
      drop: () => moveKnight(x, y),
      collect: monitor => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [position, x, y]
  )
  return (
    <div ref={drop} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Square black={black}>{children}</Square>
      {renderOverlay(isOver, canDrop)}
    </div>
  )
}

const renderOverlay = (isOver: boolean, canDrop: boolean) => {
  if (isOver && !canDrop) return <Overlay color="red" />
  if (!isOver && canDrop) return <Overlay color="yellow" />
  if (isOver && canDrop) return <Overlay color="green" />
}

const Overlay = ({ color }: { color: string }) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      zIndex: 1,
      opacity: 0.5,
      backgroundColor: color,
    }}
  />
)
