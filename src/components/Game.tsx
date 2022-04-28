import { createContext, ReactNode, useContext } from 'react'

interface KnightPositionType {
  position: [number, number]
  moveKnight: (_toX: number, _toY: number) => void
}

const KnightPositionContext = createContext<KnightPositionType | null>(null)

export const KnightPositionProvider = ({
  value,
  children,
}: {
  value: KnightPositionType
  children: ReactNode
}) => {
  return <KnightPositionContext.Provider value={value}>{children}</KnightPositionContext.Provider>
}

export const canMoveNight = (current: [number, number], next: [number, number]) => {
  const [x, y] = current
  const [toX, toY] = next

  const dx = toX - x
  const dy = toY - y

  return (Math.abs(dx) === 2 && Math.abs(dy) === 1) || (Math.abs(dx) === 1 && Math.abs(dy) === 2)
}

export const useKnightPosition = () => {
  const v = useContext(KnightPositionContext)
  if (v === null) throw new Error('Wrap the root element to use KnightPositionProvider')
  return v
}
