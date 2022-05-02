// import { ShowHeader } from "component/products/show/header/header"
// import { getCurrentUser } from "lib/api/users"
import { useUser } from "@/lib/data/user/useUser"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
// import { Outlet } from "react-router-dom"
import { RootState } from "@/store"

type Props = {
  children: React.ReactNode
}

export const Admins:React.FC<Props> = (Props) => {
  const {userSwr} = useUser()
  const user = userSwr
  // const user = useSelector((state:RootState) => state.user)
  const [admin,setAdmin] = useState<boolean>(false)
  const usercheck = () => {
    if(user.user.administratorGold != true){
    }else{
      setAdmin(true)
    }
  }

  useEffect(()=>{
    usercheck()
  },[user.login])

  return(
  <>
    {admin == true ?
    <> 
      <div className = "insert_box">
        {Props.children}
          {/* <Outlet/> */}
      </div>
    </>
    :
    <>
      404エラー
    </>
      }
  </>
  )
}