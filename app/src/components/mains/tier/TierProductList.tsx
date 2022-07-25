import { product } from "@/interfaces/product"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { actionSettingProductData2 } from "@/store/product/actions"

type tierProduct = {
  id:number
  avg:string
  imageUrl:string
  title:string
}
type Props = {
  product:product
}

export const TierProductList:React.FC<Props> = function TierProductListFunc(Props){
  const dispatch = useDispatch()
  const router = useRouter()
  const handleNavigateShowProduct = () => {
    dispatch(actionSettingProductData2(Props.product));
    router.push(`/title/${Props.product.id}`)
  }
  return(
    <>
      <li
      style={{
        cursor:"pointer",
        position:"relative"
      }}
      onClick={handleNavigateShowProduct}
      >
        <img src = {Props.product.imageUrl?Props.product.imageUrl:""}
        style={{
          borderRadius:"5px",
          top:"0",
          width:"120px",
          height:"63px",
          objectFit:"cover"
        }}
        />
      </li>
    </>
  )
}