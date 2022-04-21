import { ShareMain } from "@/components/share/main/ShareMain"
import { Top100 } from "@/components/mains/sub/Top100"

type Props = {
  // data:productShow
}

const Top100Index: React.FC<Props>& { getLayout: (page: any) => JSX.Element }  = (Props) => {
  console.log(Props)
  // const fallback= Props.fallback
  return(
    <>
      <Top100/>
    </>
  )
}

export default Top100Index

Top100Index.getLayout = (page) => {
  return (
    <ShareMain
      // locationNumber={1}
    >
      {/* <ProductShow
      // data = {Props.data}
      > */}
        {page}
      {/* </ProductShow>    */}
    </ShareMain>
  )
}