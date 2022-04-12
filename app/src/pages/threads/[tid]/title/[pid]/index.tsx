import { ShareMain } from "components/share/main/ShareMain"
import { Threads } from "components/threads/Threads"
import { ProductShow } from "components/title/productShow"
import { ProductReviews } from "components/title/review/form/ProductReviews"
import { ProductThreads } from "components/title/thread/form/ProductThreads"




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
      // locationNumber={1}
    >
      <Threads>
        {page}
      </Threads>
    </ShareMain>
  )
}