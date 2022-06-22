

import { Reviews } from "@/components/reviews/Reviews"
import MainSearch from "@/components/search/MainSearch"
import { ShareMain } from "@/components/share/main/ShareMain"
import { ProductShow } from "@/components/title/productShow"
import { Top } from "@/components/title/top/Top"
import { productShow } from "@/interfaces/product"
import { useLocale } from "@/lib/ini/local/local"
import { GetServerSideProps } from "next"
import { NextSeo } from "next-seo"


type Props = {
  // data:productShow
}

const ReviesIndex: React.FC<Props>& { getLayout: (page: any) => JSX.Element }  = (Props) => {
const {t} = useLocale()

return(
  <>
    <NextSeo
      title={`Review - ${t.domain}`}
    ></NextSeo>
    </>
  )
}

export default ReviesIndex

ReviesIndex.getLayout = (page) => {
  return (
    <ShareMain
      // locationNumber={1}
    >
      <Reviews />
        {page}
    </ShareMain>
  )
}