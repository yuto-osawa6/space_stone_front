import Router, { useRouter } from "next/router"

type Props = {
  item : Review
}
type Review = {
  content: string
  episordId: null | number
  id: number
  productId:number
}
export const ProductReviewsItems:React.FC<Props> = function ProductReviewsItemsFunc(Props){
  const router = useRouter()
  const handleNavigate = () => {
    router.push(`/title/${Props.item.productId}/reviews/${Props.item.id}`)
  }
  return(
    <>
      <li
      onClick={handleNavigate}

      >
      </li>
    </>
  )
}