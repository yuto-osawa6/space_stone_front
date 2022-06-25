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
      description = {`アニメの検索。ジャンル・スタジオ・キャスト・シーズンなど。さまざまな形式で絞り込めます。また評価、感情などからソート可能。`}
      openGraph={{
        type: "website",
        title: "Search",
        description: `アニメの検索。ジャンル・スタジオ・キャスト・シーズンなど。さまざまな形式で絞り込めます。また評価、感情などからソート可能。`,
        site_name: "MeruPlanet",
        url: `https://meruplanet.com/search`,
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