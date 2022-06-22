import MainSearch from "@/components/search/MainSearch"
import { ShareMain } from "@/components/share/main/ShareMain"
import { useLocale } from "@/lib/ini/local/local"
import { NextSeo } from "next-seo"

const SearchIndex: React.FC& { getLayout: (page: any) => JSX.Element }  = () => {
  const {t} = useLocale()

return(
  <>
    <NextSeo
      title={`Search - ${t.domain}`}
     //  description={Props.data.products.}
    ></NextSeo>
      <MainSearch/>
    </>
  )
}

export default SearchIndex

SearchIndex.getLayout = (page) => {
  return (
    <ShareMain
      locationNumber={0}
    >
      <div className = "mainContents share_middle_container01">
        {page}
      </div>
    </ShareMain>
  )
}