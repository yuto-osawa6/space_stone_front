import { product } from "@/interfaces/product"
import { memo } from "react"
import { useDrag } from "react-dnd"
import { ItemType } from "../CreateTier"

type Props = {
  product : product
  index: number
  group:number
}

export const DraggableFistContainer:React.FC<Props> = memo(function DraggableFistContainerFunc(Props){
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

  console.log(Props.product.imageUrl)
  return(
    <>
      <div ref={drag}
        data-handler-id={handlerId2}
        style={{
          opacity,
          width: "52.5",
          // paddingTop:"142.857%",
          position:"relative"
        }}
        >
        <img src={Props.product.imageUrl}
        style={{
          borderRadius:"5px",
          top:"0",
          // position:"absolute",
          // width:"52.5px",
          // height:"75px",
          width:"120px",
          height:"63px",
          objectFit:"cover"
        }}
        />
      </div>
    </>
  )
})