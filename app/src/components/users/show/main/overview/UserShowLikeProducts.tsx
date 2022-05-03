import { product } from "@/interfaces/product"

type Props = {
  product : product
}

export const UserShowLikeProducts:React.FC<Props> = function UserShowLikeProductsFunc(Props){
  
  return (
    <>
      <div className="UserShowLikeProduct"
      
      >
        <img src={Props.product.imageUrl}/>
      </div>
    </>
  )
}