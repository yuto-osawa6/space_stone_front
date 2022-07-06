import { product } from "@/interfaces/product"
import { memo, useCallback, useEffect, useState } from "react"
import { DragPreviewImage, useDrag } from "react-dnd"
import { ItemType } from "../CreateTier"

type Props = {
  product : product
  index: number
  group:number
}

export const DraggableFistContainer:React.FC<Props> = memo(function DraggableFistContainerFunc(Props){
  const previewOptions = {
    offsetX: 2000,
    offsetY: 0
  };
  const [{ handlerId2,isDragging }, drag, preview] = useDrag({
    // previewOptions,
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

  const[loaded,setLoaded] = useState<boolean>(false)
  

  useEffect(() => {
    if(!Props.product.imageUrl)return
    const img = new Image();
    // img.src = Props.product.imageUrl?Props.product.imageUrl.replace("api:3000", "localhost:3001"):""
    img.src = Props.product.imageUrl?Props.product.imageUrl:""
    const ctx = document.createElement('canvas').getContext('2d') as CanvasRenderingContext2D;
    ctx.canvas.width = 120;
    ctx.canvas.height = 63;
    img.crossOrigin = "localhost";

    img.onload = () => {
    ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
    img.src = ctx.canvas.toDataURL();
    preview(img);
    // setImageUrl(ctx.canvas.toDataURL())
    };
    setLoaded(true)
}, []);

// const img = new Image();
//     img.src = Props.product.imageUrl?Props.product.imageUrl.replace("api:3000", "localhost:3001"):"";
//     preview(img, previewOptions);

//     const callbackRef = useCallback(
//         (node) => {
//             drag(node);
//             preview(node, previewOptions);
//         },
//         [drag, preview],
//     );
  return(
    <>
      <div ref={drag}
        data-handler-id={handlerId2}
        style={{
          opacity,
          width: "52.5",
          position:"relative",
          marginBottom: "10px",
        }}
        >
          

        <DragPreviewImage connect={preview} src={Props.product.imageUrl?Props.product.imageUrl:""}/>
        {loaded&&(
        <img src = {Props.product.imageUrl?Props.product.imageUrl:""}
        style={{
          top:"0",
          width:"120px",
          height:"63px",
          objectFit:"cover"
        }}
        />
        )}
      </div>
    </>
  )
})