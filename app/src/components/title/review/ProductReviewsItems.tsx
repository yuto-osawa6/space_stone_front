import { useNavigate } from "react-router-dom"

type Props = {
  item : Review
}
type Review = {
  content: string
  episordId: null | number
  id: number
  productId:number
}
export const ProductReviewsItems:React.FC<Props> = (Props) => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/products/${Props.item.productId}/review/${Props.item.id}`)
  }

  
  return(
    <>
      <li
      onClick={handleNavigate}

      >
        {/* {Props.}   */}
      </li>
    </>
  )
}