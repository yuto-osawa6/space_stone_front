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