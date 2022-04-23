import { useState } from 'react'

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const reorder = <T,>(list: T[], sourceIndex: number, destIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(sourceIndex, 1)
  result.splice(destIndex, 0, removed)
  return result
}

export default function ReactBeautifulDnD() {
  const [items, setItems] = useState(
    Array(10)
      .fill('')
      .map((_, index) => ({
        key: index,
        name: `item ${index}`,
      }))
  )

  const onDragEnd: DragDropContext['props']['onDragEnd'] = (result, _provided) => {
    if (!result.destination) return
    if (result.source.index === result.destination.index) return
    const newItems = reorder(items, result.source.index, result.destination.index)
    setItems(newItems)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, _snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => (
              <Draggable key={item.key} draggableId={item.key.toString()} index={index}>
                {(provided, _snapshpt) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {item.name}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
