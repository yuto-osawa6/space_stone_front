import { ViewProductContext } from "@/contexttype/contexttype"
import { product } from "@/interfaces/product"
import { memo, useContext, useEffect, useRef, useState } from "react"
import { CSSTransition } from "react-transition-group"

type Props = {
  index:number
  product :product
}

export const WorldGridContainer:React.FC<Props> = memo(function WorldGridContainerFunc(Props){

  const nodeRef = useRef(null)
  const [imageloding,setImageLoding] = useState<boolean>(false)
  const {viewproduct, setViewproduct,useraction,setUseraction,viewProductV2,setViewProductV2,products} = useContext(ViewProductContext)
  const handleClick = () =>{
    if (Props.index==products.length-1){
      setViewProductV2([products[Props.index-1],products[Props.index],products[0]])
    }else if (Props.index==0){
      setViewProductV2([products[products.length-1],products[Props.index],products[1]])
    } else {
      setViewProductV2([products[Props.index-1],products[Props.index],products[Props.index+1]])
    }
    setViewproduct(products[Props.index])
    setUseraction(true)
  }

   useEffect(()=>{
    const img = new Image()
    img.src = Props.product.imageUrl
    img.onload = () => {
      setImageLoding(true)
    };
  },[])
  return(
    <>
      <div className = "WorldClassContainerGridList">
        {viewproduct&&(
        <div 
        onClick={handleClick}
        className = {
          viewProductV2.some((u) => u.id === Props.product.id) ? "WorldClassContainerGridListImage worldclassactive" : "WorldClassContainerGridListImage"
        }
        >
          <CSSTransition in={imageloding}  nodeRef={nodeRef} timeout={300} classNames="my-node"  unmountOnExit>

          {<img src = {Props.product.imageUrl} ref={nodeRef}
          />}
          </CSSTransition>
          </div>
          )}
        <div className = "WorldClassContainerGridListTitle">
        </div>
      </div>

    </>
  )
})