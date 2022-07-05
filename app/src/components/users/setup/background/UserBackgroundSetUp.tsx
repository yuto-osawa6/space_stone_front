import { useState } from "react"
// import { UserBackgroupdModal } from "./UserBackgroundModal"
import UserBackgroupdModalV2 from "./v2/UserBackGroundV2"

export const UserBackgroupdSetUp:React.FC = function UserBackgroupdSetUpFunc(){
  const [on,setOn] = useState<boolean>(false)
  const changeOnHandler = () => setOn(true)
  return(
    <>
     <div className = "UsersShowTopSettingListBackgroudImage UsersShowTopSettingListBackgroudImage2"
      onClick={changeOnHandler}
      style={{
        cursor:"pointer"
      }}
      >
        背景画像の変更
      </div>
      
      {/* <UserBackgroupdModal
      on = {on}
      setOn = {setOn}
      /> */}
      <UserBackgroupdModalV2
      on = {on}
      setOn = {setOn}
      />
    </>
  )
}