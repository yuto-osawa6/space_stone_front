import { ShareMain } from "components/share/main/ShareMain"
import { getCurrentUser } from "lib/api/users/sign"
import { useUser } from "lib/data/user/useUser"
import Link from "next/link"
import useSWR from "swr"

type Props = {
  // getLayout: (page: any) => JSX.Element
}

const Ota: React.FC<Props>& { getLayout: (page: any) => JSX.Element } = (Props) => {
  // const {data,error} = getCurrentUser()
  // const { data, error } = useSWR('/session_user')
  const { user, error } = useUser()
  // console.log(data)
  return(
    <>
      {/* <ShareMain> */}
        aaaaaaaaajklkaaaaafl
        {user.user?.nickname}
      {/* </ShareMain> */}
      <Link href="/">
          <a>Home</a>
      </Link>
    </>
  )
}

export default Ota


Ota.getLayout = function getLayout(page) {
  return (
    <ShareMain>
      {page}
    </ShareMain>
  )
}