import { ShareMain } from "components/share/main/ShareMain"
import { ProductShow } from "components/title/productShow"
import { ProductReviews } from "components/title/review/form/ProductReviews"
import { ProductShowReviews } from "components/title/review/ProductReviews"
import { Reviews } from "components/reviews/Reviews"




type Props = {
  // data:productShow
}

const ReviewShow: React.FC<Props>& { getLayout: (page: any) => JSX.Element }  = (Props) => {
  console.log(Props)
  // const fallback= Props.fallback
  return(
    <>
      <ProductReviews/>
    </>
  )
}

export default ReviewShow

ReviewShow.getLayout = (page) => {
  return (
    <ShareMain
      // locationNumber={1}
    >
      {/* <ProductShow
      // data = {Props.data}
      > */}
        {/* <ProductShowReviews> */}
        <Reviews>
          {page}
        </Reviews>
        {/* </ProductShowReviews> */}
      {/* </ProductShow>    */}
    </ShareMain>
  )
}