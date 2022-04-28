import { ReactNode, VFC } from 'react'

interface Props {
  black?: boolean
  children: ReactNode
}

export const Square: VFC<Props> = ({ black = false, children }) => {
  const fill = black ? 'black' : 'white'
  const stroke = black ? 'white' : 'black'
  return (
    <div style={{ backgroundColor: fill, color: stroke, width: '100%', height: '100%' }}>
      {children}
    </div>
  )
}
