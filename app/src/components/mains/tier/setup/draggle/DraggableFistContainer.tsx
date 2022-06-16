import { product } from "@/interfaces/product"
import { memo, useEffect, useState } from "react"
import { DragPreviewImage, useDrag } from "react-dnd"
import { ItemType } from "../CreateTier"
import { knightImage } from "./images"

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

//   useEffect(() => {
//     console.log("aa")
//     if(Props.product.imageUrl==null)return
//     const img = new Image();
//     img.src = Props.product.imageUrl.replace("api:3000", "localhost:3001");
//     const ctx = document.createElement('canvas').getContext('2d');
//     if(ctx == null) return
//     ctx.canvas.width = 120;
//     ctx.canvas.height = 63;
//     img.crossOrigin = "localhost"; 
//     img.onload = () => {
//     ctx?.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
//           img.src = ctx.canvas.toDataURL();
//           // console.log(img.src)
//           setImageUrl(img.src)
//     preview(img);
//     };
// }, []);

  // console.log(Props.product.imageUrl)
  return(
    <>
      {/* <DragPreviewImage connect={preview} src={imageUrl}></DragPreviewImage> */}
      {/* <DragPreviewImage connect={preview} src={Props.product.imageUrl?Props.product.imageUrl.replace("api:3000", "localhost:3001"):""}></DragPreviewImage> */}

      <div ref={drag}
        data-handler-id={handlerId2}
        style={{
          opacity,
          width: "52.5",
          // paddingTop:"142.857%",
          position:"relative"
        }}
        >
          
        <img src = {Props.product.imageUrl?Props.product.imageUrl.replace("api:3000", "localhost:3001"):""}
        style={{
          // borderRadius:"5px",
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
 {/* <img src={Props.product.imageUrl} */}
        {/* <img src = {Props.product.imageUrl?Props.product.imageUrl.replace("api:3000", "localhost:3001"):""} */}