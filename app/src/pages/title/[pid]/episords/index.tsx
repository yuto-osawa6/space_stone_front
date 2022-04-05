import { ShareMain } from "components/share/main/ShareMain"
import { ProductShowEpisords } from "components/title/episords/ProductShowEpisords"
import { ProductShow } from "components/title/productShow"




type Props = {
  // data:productShow
}

const TitleIndex: React.FC<Props>& { getLayout: (page: any) => JSX.Element }  = (Props) => {
  console.log(Props)
  // const fallback= Props.fallback
  return(
    <>
      <ProductShowEpisords/>
    </>
  )
}

export default TitleIndex

TitleIndex.getLayout = (page) => {
  return (
    <ShareMain
      locationNumber={1}
    >
      <ProductShow
      // data = {Props.data}
      >
        {page}
      </ProductShow>   
    </ShareMain>
  )
}