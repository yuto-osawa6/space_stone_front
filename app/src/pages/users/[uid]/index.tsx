import { ShareMain } from "@/components/share/main/ShareMain"
import { UserShowOverview } from "@/components/users/show/main/overview/UserShowOverview"
import { UserOverviewTop } from "@/components/users/show/main/UserOverviewTop"
import { UsersShow } from "@/components/users/show/UsersShow"


type Props = {
  // data:productShow
}

const ArticleShow: React.FC<Props>& { getLayout: (page: any) => JSX.Element }  = (Props) => {
  return(
    <>
      <UserShowOverview/>
    </>
  )
}

export default ArticleShow

ArticleShow.getLayout = (page) => {
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