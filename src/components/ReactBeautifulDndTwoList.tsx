import { useState } from 'react'

import { DragDropContext, Draggable, DraggableLocation, Droppable } from 'react-beautiful-dnd'

const DroppableTypes = {
  LIST: 'LIST',
  LIST_ITEMS: 'LIST_ITEMS',
} as const

const reorder = <T,>(list: T[], sourceIndex: number, destIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(sourceIndex, 1)
  result.splice(destIndex, 0, removed)
  return result
}

const move = <T,>(
  source: T[],
  destination: T[],
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
) => {
  const sourceClone = Array.from(source)
  const destClone = Array.from(destination)

  const [removed] = sourceClone.splice(droppableSource.index, 1)
  destClone.splice(droppableDestination.index, 0, removed)

  const result: { [_key in string]: T[] } = {}
  result[droppableSource.droppableId] = sourceClone
  result[droppableDestination.droppableId] = destClone

  return result
}

const DraggableListItems = ({
  listName,
  items,
}: {
  listName: string
  items: { key: string; name: string }[]
}) => (
  <Droppable droppableId={listName} type={DroppableTypes.LIST_ITEMS}>
    {provided => (
      <div
        {...provided.droppableProps}
        ref={provided.innerRef}
        style={{ margin: 8, borderWidth: 1, borderColor: 'black', borderStyle: 'solid' }}
      >
        {items.map((item, index) => (
          <Draggable key={item.key} index={index} draggableId={item.key}>
            {provided => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <span
                  style={{
                    margin: 8,
                    borderWidth: 1,
                    borderColor: 'black',
                    borderStyle: 'solid',
                  }}
                >
                  {item.name}
                </span>
              </div>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
)

export default function ReactBeautifulDnDHorizontal() {
  const [list, setList] = useState(
    Array(10)
      .fill('')
      .map((_, index) => ({
        key: index,
        name: `list-${index}`,
      }))
  )
  const [listItems, setListItems] = useState(
    Object.fromEntries(
      list.map(v => [
        v.name,
        Array(10)
          .fill('')
          .map((_, index) => ({
            key: `${v.name}-${index}`,
            name: `${v.name}-${index}`,
          })),
      ])
    )
  )

  const onDragEnd: DragDropContext['props']['onDragEnd'] = (result, _provided) => {
    if (!result.destination) return

    if (result.type === DroppableTypes.LIST) {
      const newList = reorder(list, result.source.index, result.destination.index)
      setList(newList)
      return
    }

    if (result.source.droppableId === result.destination.droppableId) {
      if (result.source.index === result.destination.index) return

      const newListItems = {
        ...listItems,
        [result.source.droppableId]: reorder(
          listItems[result.source.droppableId],
          result.source.index,
          result.destination.index
        ),
      }
      setListItems(newListItems)
      return
    }

    const newListItems = {
      ...listItems,
      ...move(
        listItems[result.source.droppableId],
        listItems[result.destination.droppableId],
        result.source,
        result.destination
      ),
    }
    setListItems(newListItems)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list" type={DroppableTypes.LIST} direction="horizontal">
        {provided => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ display: 'flex', flexDirection: 'row' }}
          >
            {list.map((listName, index) => (
              <Draggable key={listName.name} index={index} draggableId={listName.name}>
                {provided => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <DraggableListItems listName={listName.name} items={listItems[listName.name]} />
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
