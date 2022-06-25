import { ShareMain } from "@/components/share/main/ShareMain"
import { Top100 } from "@/components/mains/sub/Top100"
import { WeekliyRankingsMain } from "@/components/mains/sub/WeeklyRankingMain"
import { NextSeo } from "next-seo"
import { useLocale } from "@/lib/ini/local/local"

type Props = {
  // data:productShow
}

const WeeklyIndex: React.FC<Props>& { getLayout: (page: any) => JSX.Element }  = (Props) => {
  const {t} = useLocale()

  return(
    <>
      <NextSeo
        title={`過去のエピソードアンケート - ${t.domain}`}
        description = "１週間の範囲で、過去に放送されたエピソードのアンケート結果。放送されたエピソードの比較。"
        openGraph={{
          type: "website",
          title: "過去のエピソードアンケート",
          description: "１週間の範囲で、過去に放送されたエピソードのアンケート結果。放送されたエピソードの比較。",
          site_name: "MeruPlanet",
          url: "https://meruplanet.com/weekly",
          images: [
            {
              url: "https://meruplanet.com/MeruPlanetOgp.png",
              width: 1200,
              height: 630,
              alt: 'Og Image Alt',
              type: 'image/png',
            },
          ],
        }}
        // twitter={{
        //   handle: '@handle',
        //   site: '@site',
        //   cardType: 'summary_large_image',
        // }}
      ></NextSeo>
      <WeekliyRankingsMain/>
    </>
  )
}

export default WeeklyIndex

WeeklyIndex.getLayout = (page) => {
  return (
    <ShareMain
      // locationNumber={1}
    >
        {page}
    </ShareMain>
  )
}