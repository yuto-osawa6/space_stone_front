import { ShareMain } from "components/share/main/ShareMain"
import { execChangeGrid } from "lib/api/main"
import { getCurrentUser } from "lib/api/users/sign"
import { useUser } from "lib/data/user/useUser"
import Link from "next/link"
import { useEffect } from "react"
import useSWR from "swr"

type Props = {
  // getLayout: (page: any) => JSX.Element
}

const Ota: React.FC<Props>& { getLayout: (page: any) => JSX.Element } = (Props) => {
  // const {data,error} = getCurrentUser()
  // const { data, error } = useSWR('/session_user')
  const { userSwr, error } = useUser()
  // console.log(data)
  const changeGridexec = async() => {
    // console.log(grid)
    const res = await execChangeGrid("01")
    if (res.status === 200) {
      // dispatch(GridAction(res.data.grid))
    }
  }

  useEffect(()=>{
    console.log(window)
    // if(typeof window !== 'undefined')return
    changeGridexec()
  },[])
  return(
    <>
      {/* <ShareMain> */}
        aaaaaaaaajklkaaaaafl
        {userSwr.user?.nickname}
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