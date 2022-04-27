import { ShareMain } from "@/components/share/main/ShareMain"
import { ProductShow } from "@/components/title/productShow"
import { ProductReviews } from "@/components/title/review/form/ProductReviews"
import { ProductShowReviews } from "@/components/title/review/ProductReviews"
import { UserShowReviews } from "@/components/users/show/main/reviews/UserShowReviews"
import { UsersShow } from "@/components/users/show/UsersShow"




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
      locationNumber={1}
    >
      <UsersShow>
        <UserShowReviews>
          {page}
        </UserShowReviews>
       </UsersShow>
    </ShareMain>
  )
}