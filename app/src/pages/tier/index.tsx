import { ShareMain } from "@/components/share/main/ShareMain"
import { Top100 } from "@/components/mains/sub/Top100"
import { WeekliyRankingsMain } from "@/components/mains/sub/WeeklyRankingMain"
import { TierSeasonMain } from "@/components/mains/sub/TierSeasonMain"
import { useLocale } from "@/lib/ini/local/local"
import { NextSeo } from "next-seo"

type Props = {
}

const TierIndex: React.FC<Props>& { getLayout: (page: any) => JSX.Element }  = (Props) => {
  const {t} = useLocale()

  return(
    <>
      <NextSeo
      title={`Tier - ${t.domain}`}
      description = {`過去のTier(ティア)情報。シーズンごとのTierをチェックして、アニメの比較。`}
      openGraph={{
        type: "website",
        title: "Tier情報",
        description: `過去のTier(ティア)情報。シーズンごとのTierをチェックして、アニメの比較。`,
        site_name: "MeruPlanet",
        url: `https://meruplanet.com/tier`,
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
      

      <TierSeasonMain/>
    </>
  )
}

export default TierIndex

TierIndex.getLayout = (page) => {
  return (
    <ShareMain
      // locationNumber={1}
    >
        {page}
    </ShareMain>
  )
}