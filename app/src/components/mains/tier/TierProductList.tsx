import { product } from "interfaces/product"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
// import { useNavigate } from "react-router-dom"
import { actionSettingProductData2 } from "store/product/actions"

type tierProduct = {
  id:number
  avg:string
  imageUrl:string
  title:string
}
type Props = {
  // product:tierProduct
  product:product
}

export const TierProductList:React.FC<Props> = (Props) => {
  // const navigate = useNavigate()
  // console.log(Props)
  const dispatch = useDispatch()
  const router = useRouter()
  const handleNavigateShowProduct = () => {
    dispatch(actionSettingProductData2(Props.product));
    router.push(`/products/${Props.product.id}`)
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
        <img src = {Props.product.imageUrl?Props.product.imageUrl.replace("api:3000", "localhost:3001"):""}
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