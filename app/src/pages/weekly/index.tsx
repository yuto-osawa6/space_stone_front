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
        title={`過去のアンケート - ${t.domain}`}
       //  description={Props.data.products.}
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