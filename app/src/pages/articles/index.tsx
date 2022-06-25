import { Reviews } from "@/components/reviews/Reviews"
import MainSearch from "@/components/search/MainSearch"
import { ShareMain } from "@/components/share/main/ShareMain"
import { ProductShow } from "@/components/title/productShow"
import { Top } from "@/components/title/top/Top"
import { productShow } from "@/interfaces/product"
import { GetServerSideProps } from "next"
import { Articles }  from '@/components/articles/Articles';
import { NextSeo } from "next-seo"
import { useLocale } from "@/lib/ini/local/local"

type Props = {
}

const ArticlesIndex: React.FC<Props>& { getLayout: (page: any) => JSX.Element }  = (Props) => {
  const {t} = useLocale()

  return(
  <>
      <NextSeo
      title={`Article - ${t.domain}`}
      description = {`記事一覧。気になる記事をチェックしよう。`}
        openGraph={{
          type: "website",
          title: "Article",
          description: `記事一覧。気になる記事をチェックしよう。`,
          site_name: "MeruPlanet",
          url: `https://meruplanet.com/articles`,
          // images: [
          //   {
          //   // url: "https://www.example.ie/og-image-01.jpg",
          //     // url: image_path,
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

export default ArticlesIndex

ArticlesIndex.getLayout = (page) => {
  return (
    <ShareMain
    >
      <Articles>
        {page}
      </Articles>
    </ShareMain>
  )
}