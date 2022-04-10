import { ShareMain } from "components/share/main/ShareMain"
import { Top100 } from "components/mains/sub/Top100"
import { WeekliyRankingsMain } from "components/mains/sub/WeeklyRankingMain"
import { TierSeasonMain } from "components/mains/sub/TierSeasonMain"

type Props = {
  // data:productShow
}

const TierIndex: React.FC<Props>& { getLayout: (page: any) => JSX.Element }  = (Props) => {
  console.log(Props)
  // const fallback= Props.fallback
  return(
    <>
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
      {/* <ProductShow
      // data = {Props.data}
      > */}
        {page}
      {/* </ProductShow>    */}
    </ShareMain>
  )
}