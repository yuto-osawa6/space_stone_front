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
       //  description={Props.data.products.}
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