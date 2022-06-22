import { product } from "@/interfaces/product"
import { memo, useEffect, useState } from "react"
import { DragPreviewImage, useDrag } from "react-dnd"
import { ItemType } from "../CreateTier"

type Props = {
  product : product
  index: number
  group:number
}

export const DraggableFistContainer:React.FC<Props> = memo(function DraggableFistContainerFunc(Props){
  const [{ handlerId2,isDragging }, drag, preview] = useDrag({
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

  const [imageUrl,setImageUrl] = useState<string>("")
  return(
    <>
      <div ref={drag}
        data-handler-id={handlerId2}
        style={{
          opacity,
          width: "52.5",
          position:"relative"
        }}
        >
          
        <img src = {Props.product.imageUrl?Props.product.imageUrl:""}
        style={{
          top:"0",
          width:"120px",
          height:"63px",
          objectFit:"cover"
        }}
        />
      </div>
    </>
  )
})