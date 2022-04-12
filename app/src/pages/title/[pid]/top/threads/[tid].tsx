import { ShareMain } from "components/share/main/ShareMain"
import { ProductShow } from "components/title/productShow"
import { ProductReviews } from "components/title/review/form/ProductReviews"
import { ProductThreads } from "components/title/thread/form/ProductThreads"
import { Top } from "components/title/top/Top"




type Props = {
  // data:productShow
}

const ThreadShow: React.FC<Props>& { getLayout: (page: any) => JSX.Element }  = (Props) => {
  console.log(Props)
  // const fallback= Props.fallback
  return(
    <>
      <ProductThreads/>
    </>
  )
}

export default ThreadShow

ThreadShow.getLayout = (page) => {
  return (
    <ShareMain
      locationNumber={1}
    >
      <ProductShow
      >
        <Top>
          {page}
        </Top>
      </ProductShow>   
    </ShareMain>
  )
}