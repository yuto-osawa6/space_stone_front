import { ShareMain } from "@/components/share/main/ShareMain"
import { UserShowLikesProducts } from "@/components/users/show/main/likes/UserShowLikesProducts"
import { UserShowMyTiers } from "@/components/users/show/main/mytiers/UserShowMyTiers"
import { UserShowOverview } from "@/components/users/show/main/overview/UserShowOverview"
import { UserShowReviews } from "@/components/users/show/main/reviews/UserShowReviews"
import { UserShowScoresProducts } from "@/components/users/show/main/scores/UserShowScoresProducts"
import { UserShowThreads } from "@/components/users/show/main/threads/UserShowThreads"
import { UserOverviewTop } from "@/components/users/show/main/UserOverviewTop"
import { UsersShow } from "@/components/users/show/UsersShow"


type Props = {
  // data:productShow
}

const UserScoreShow: React.FC<Props>& { getLayout: (page: any) => JSX.Element }  = (Props) => {
  console.log(Props)
  // const fallback= Props.fallback
  return(
    <>
      <UserShowMyTiers/>
    </>
  )
}

export default UserScoreShow

UserScoreShow.getLayout = (page) => {
  return (
    <ShareMain
      locationNumber={1}
    >
      <UsersShow>
        {page}
      </UsersShow>
    </ShareMain>
  )
}