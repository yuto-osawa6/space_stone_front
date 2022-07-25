import { ShareMain } from "@/components/share/main/ShareMain"
import { Top100 } from "@/components/mains/sub/Top100"
import { WeekliyRankingsMain } from "@/components/mains/sub/WeeklyRankingMain"
import { Admins } from "@/components/admins/Admins"
import { AdminsTop } from "@/components/admins/top/AdminsTop"

type Props = {
}

const AdminsIndex: React.FC<Props>& { getLayout: (page: any) => JSX.Element }  = (Props) => {
  return(
    <>
      <AdminsTop/>
    </>
  )
}

export default AdminsIndex

AdminsIndex.getLayout = (page) => {
  return (
    <ShareMain
      // locationNumber={1}
    >
      <Admins>
        {page}
      </Admins>
    </ShareMain>
  )
}