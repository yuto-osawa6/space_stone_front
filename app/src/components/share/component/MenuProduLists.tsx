import { product } from "interfaces/product"
import { AiOutlineCheckCircle } from "react-icons/ai"

type Props = {
  products:product
  product:product | undefined
  setProduct:React.Dispatch<React.SetStateAction<product | undefined>>
  setMenuOpen:React.Dispatch<React.SetStateAction<boolean>>
  setCurrent:React.Dispatch<React.SetStateAction<number>>
}
export const MenuProduLists:React.FC<Props> = (Props) => {

  const setProductHandler = () => {
    Props.setCurrent(1)
    Props.setProduct(Props.products)
    Props.setMenuOpen(false)
  }
  const deleteProductHandler = () => {
    Props.setCurrent(1)
    Props.setProduct(undefined)
    Props.setMenuOpen(false)
  }

  return(
    <>
      
      <li
      onClick={Props.products.id!=Props.product?.id?setProductHandler:deleteProductHandler}
      >
        {Props.products.id==Props.product?.id&&(
           <AiOutlineCheckCircle/>
        )}
        {Props.products.title}
        
      </li>
    </>
  )
}