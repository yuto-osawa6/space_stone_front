import { UserShowContext } from "@/contexttype/contexttype"
import { User, UserShow } from "@/interfaces/user"
import { execUsersShowHandler } from "@/lib/api/users"
import { useRouter } from "next/router"
import { ReactNode, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { CSSTransition } from "react-transition-group"
import { RootState } from "@/store"
import { UserBackgroupdSetUp } from "../setup/background/UserBackgroundSetUp"
import { UserOverviewSetUp } from "../setup/overview/UserOverviewSetUp"
import { UserTierList } from "./main/overview/UserTierList"
import { UserOverviewTop } from "./main/UserOverviewTop"
import { UserRight } from "./right/UserRight"
import { useUser } from "@/lib/data/user/useUser"

type Props = {
  children : ReactNode
}

export const UsersShow:React.FC<Props> = function UsersShowFunc(Props){
  const router = useRouter()
  const {uid} = router.query
  const user_id = uid as string
  const [colornumber,setColornumber ]= useState<number>(0)
  const [P404page,setP404page]= useState<boolean>(false)
  // state
  const [user,setUser] = useState<UserShow>()

  // store
  const {userSwr} = useUser()
  const LoginUserStore = userSwr
  
  const setFirstDataHandler = async() => {
    const res = await execUsersShowHandler(user_id as string) 
    if(res.data.status == 200){
      setUser(res.data.user)
    }else{
      setP404page(true)
      
    }
  }

  const [imageloding,setImageLoding] = useState<boolean>(false)
  const [imageloding2,setImageLoding2] = useState<boolean>(false)


  useEffect(()=>{
    setFirstDataHandler()
    const array:number[] = [1,2,3,4,5,6,7,8,9,0]
    const colorNumber:number = array[Math.floor(Math.random() * array.length)]
    setColornumber(colorNumber)
  },[user_id])

  useEffect(()=>{
    if(LoginUserStore.user.id == Number(user_id))return
    if(user==undefined)return
    const img = new Image()
    img.src = user.backgroundImage
    img.onload = () => {
      setImageLoding(true)
    }
  },[user?.backgroundImage])

  useEffect(()=>{
    if(LoginUserStore.user.id != Number(user_id))return
    const img = new Image()
    img.src = LoginUserStore.user.backgroundImage
    img.onload = () => {
      setImageLoding2(true)
    }
  },[LoginUserStore.user.backgroundImage])

  // backgroundHandler
  const nodeRef =useRef(null)
  const nodeRef2 =useRef(null)

  return(
    <>
      <div className = "UsersShow">
        <div className ="UsersShowCenter">
          <div className = "UserShowCenterLeft">
          <div className = "UsersShowTop">
            <div className = "UsersShowTopImage">
            {LoginUserStore.user.id == Number(user_id)?
            <>  
              {LoginUserStore.user.backgroundImage!=null?
              <>
                <CSSTransition in={imageloding2}  nodeRef={nodeRef2} timeout={300} classNames="my-node"  unmountOnExit>
                {<img src={LoginUserStore.user.backgroundImage}/>}
                </CSSTransition>
              </>
              :
              <>
                <div className={`UserShowTopImageDummy`}></div>
              </>
              }
            </>
            :
            <>
              {user?.backgroundImage!=null?
                <>
                  <CSSTransition in={imageloding}  nodeRef={nodeRef} timeout={300} classNames="my-node"  unmountOnExit>
                    {<img src={user.backgroundImage}/>}
                  </CSSTransition>
                </>
                :
                <>
                  <div className={`UserShowTopImageDummy`}></div>
                </>
              }
            </>
            }
              
            </div>
            <div className = "UsersShowTopImageShadow">
              
            </div>
            
            <div className = "UsersShowTopImageUserInfo">
              <img src = {LoginUserStore.user.id == Number(user_id)?LoginUserStore.user.image:user?.image}/>
              <p>{LoginUserStore.user.id == Number(user_id)?LoginUserStore.user.nickname:user?.nickname}</p>

            </div>
          </div>
          {user!=undefined&&(
              <UserShowContext.Provider value={ {user} }>
              <UserRight
              />
              </UserShowContext.Provider>
            )}
          <div className = "UsersShowMain"
          style={{
            margin: "0px 20px"
          }}
          >
            {user!=undefined&&(
            <UserShowContext.Provider value={ {user} }>
              {Props.children}
            </UserShowContext.Provider>
            )}
          </div>
        </div>
        <div className = "UserShowCenterRight">

        </div>
      </div>
    </div>
  </>
  )
}