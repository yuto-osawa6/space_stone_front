import { product } from "@/interfaces/product";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { actionSettingProductData2 } from "@/store/product/actions"

type Props = {
  product : product
}

export const UserShowLikesProductsItem:React.FC<Props> = function UserShowLikesProductsItemFunc(Props){
  const router = useRouter()
  const dispatch = useDispatch()
  const navigateHandler = () => {
    dispatch(actionSettingProductData2(Props.product));
    router.push(`/title/${Props.product.id}`)
  }
  return(
    <>
      <div className = "UserShowLikesProductsItem"
      style={{cursor:"pointer"}}
      onClick={navigateHandler}
      >
        <img src={Props.product.imageUrl}/>
      </div>
    </>
  )
}