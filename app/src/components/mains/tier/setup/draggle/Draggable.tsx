import { product } from "@/interfaces/product"
import { memo, useRef } from "react"
import { useDrag, useDrop } from "react-dnd"
import { ItemType } from "../CreateTier"
import type { XYCoord, Identifier } from 'dnd-core'

type Props = {
  product : product
  index: number
  moveCard: (dragIndex: number, hoverIndex: number,group: number,pregroup: any | undefined,id:number) => void
  // id: number
  group:number
}
type DragItem  = {
  id:number
  index: number
  product:product
  group:number
}

export const Draggable: React.FC<Props> = memo(function DraggableFunc(Props){
  const ref = useRef<HTMLDivElement>(null)
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemType.Box,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = Props.index
      if (dragIndex === hoverIndex) {
        return
      }
      if (Props.group !== item.group) return
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleX = (ref.current?.getBoundingClientRect().width) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return
      }
    Props.moveCard(dragIndex, hoverIndex,Props.group,item.group,Props.product.id)
      item.index = hoverIndex
    },
  })
  const [{ handlerId2,isDragging }, drag] = useDrag({
    type: ItemType.Box,
    item:{ 
      id:Props.product.id,
      index:Props.index,
      group:Props.group
    },
    collect(monitor) {
      return {
        isDragging: monitor.isDragging(),
        handlerId2: monitor.getHandlerId(),
      }
    },
  })
  const opacity = isDragging ? 0 : 1
  try{
  drag(drop(ref))
  }catch(e){
  }
  return (
    <div ref={ref}
    data-handler-id={handlerId2}
    style={{
      opacity,
      width: "100%",
      paddingTop:"52.5%",
      position:"relative",
      borderRadius:"5px",
    }}
    >
      <img src = {Props.product.imageUrl?Props.product.imageUrl:""}
      style={{
        top:"0",
        position:"absolute",
        width:"100%",
        height:"100%",
        objectFit:"cover"
      }}
      />
    </div>
  )
})
