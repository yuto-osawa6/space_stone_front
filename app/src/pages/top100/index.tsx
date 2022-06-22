import { ShareMain } from "@/components/share/main/ShareMain"
import { Top100 } from "@/components/mains/sub/Top100"
import { useLocale } from "@/lib/ini/local/local"
import { NextSeo } from "next-seo"

type Props = {
}

const Top100Index: React.FC<Props>& { getLayout: (page: any) => JSX.Element }  = (Props) => {
  const {t} = useLocale()

  return(
    <>
      <NextSeo
        title={`Top100 - ${t.domain}`}
       //  description={Props.data.products.}
      ></NextSeo>
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