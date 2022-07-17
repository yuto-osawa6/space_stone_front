

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
      description = {`レビュー、一覧。気になるアニメのレビューをチェックして、感想をシェアしよう。`}
      openGraph={{
        type: "website",
        title: "Review",
        description:`レビュー、一覧。気になるアニメのレビューをチェックして、感想をシェアしよう。`,
        site_name: "アニメティア",
        url: `https://anime-tier.com/reviews`,
        // images: [
        //   {
        //   // url: "https://www.example.ie/og-image-01.jpg",
        //     url: image_path,
        //     width: 1200,
        //     height: 630,
        //     alt: 'Og Image Alt',
        //     type: 'image/png',
        //   },
        // ],
      }}
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