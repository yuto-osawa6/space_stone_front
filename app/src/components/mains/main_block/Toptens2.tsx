import { memo } from "react"
import { ToptensLikeAll } from "./topten/list/ToptenLikeAll"
import { ToptensAcsessAll } from "./topten/list/ToptensAcsessAll"
import { ToptensAcsessMonth } from "./topten/list/ToptensAcsessMonth"
import { ToptensLikeMonth } from "./topten/list/ToptensLikeMonth"
import { ToptensReviewsAll } from "./topten/list/ToptensReviewsAll"
import { ToptensReviewsMonth } from "./topten/list/ToptensReviewsMonth"
import { ToptensScoreAll } from "./topten/list/ToptensScoreAll"
import { ToptensScoreMonth } from "./topten/list/ToptensScoreMonth"


export const Toptens2:React.FC = memo(() => {

  return(
    <>
      <ToptensLikeAll/>
      <ToptensLikeMonth/>
      <ToptensScoreAll/>
      <ToptensScoreMonth/>
      <ToptensAcsessAll/>
      <ToptensAcsessMonth/>
      <ToptensReviewsAll/>
      <ToptensReviewsMonth/>
    </>
  )
})