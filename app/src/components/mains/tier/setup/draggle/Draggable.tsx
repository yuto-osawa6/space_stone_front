import { product } from "interfaces/product"
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

export const Draggable: React.FC<Props> = memo((Props) => {
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
      console.log("aaa")
      if (!ref.current) {
        return
      }
      // console.log(ref.current?.getBoundingClientRect())
      // console.log((monitor.getClientOffset() as XYCoord).x-ref.current?.getBoundingClientRect().left,(monitor.getClientOffset() as XYCoord).y - ref.current?.getBoundingClientRect().top)
      const dragIndex = item.index
      const hoverIndex = Props.index
      console.log(dragIndex,hoverIndex)
      if (dragIndex === hoverIndex) {
        return
      }
      if (Props.group !== item.group) return
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      // const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const hoverMiddleX = (ref.current?.getBoundingClientRect().width) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      // const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
      const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left
      // console.log(hoverBoundingRect,hoverMiddleY,clientOffset,hoverClientY,(clientOffset as XYCoord).x, hoverClientX)
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return
      }
      // Dragging upwards
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
    console.log(e)
  }
  return (
    <div ref={ref}
    data-handler-id={handlerId2}
    style={{
      opacity,
      width: "100%",
      paddingTop:"52.5%",
      position:"relative"
    }}
    >
      <img src={Props.product.imageUrl?Props.product.imageUrl.replace("api", "localhost").replace("3000", "3001"):""}
      style={{
        borderRadius:"5px",
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
