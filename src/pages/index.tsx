import { useCallback, useMemo, useState } from 'react'

import dynamic from 'next/dynamic'

import { KnightPositionProvider } from '@components/Game'

const Board = dynamic(() => import('@components/Board'), { ssr: false })

export default function Home() {
  const [knightPosition, setKnightPosition] = useState<[number, number]>([0, 0])
  const updatePosition = useCallback(
    (toX: number, toY: number) => setKnightPosition([toX, toY]),
    []
  )
  const value = useMemo(
    () => ({
      position: knightPosition,
      moveKnight: updatePosition,
    }),
    [knightPosition, updatePosition]
  )

  return (
    <main style={{ width: '100%', height: '100vh' }}>
      <KnightPositionProvider value={value}>
        <Board knightPosition={knightPosition} />
      </KnightPositionProvider>
    </main>
  )
}

// Home.getLayout = function getLayout(page: ReactElement) {
//   return <Layout>{page}</Layout>
// }
