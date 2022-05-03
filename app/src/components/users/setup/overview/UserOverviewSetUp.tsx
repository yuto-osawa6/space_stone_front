import { useState } from "react"
import { UserOverviewModal } from "./UserOverviewModal"


export const UserOverviewSetUp:React.FC = function UserOverviewSetUpFunc(){
  const [on,setOn] = useState<boolean>(false)
  const changeOnHandler = () => setOn(true)
  return(
    <>
      <div className = "UsersShowTopSettingListBackgroudImage"
      style={{
        cursor:"pointer"
      }}
      onClick={changeOnHandler}
      >
        概要の変更
      </div>
      
      <UserOverviewModal
      on = {on}
      setOn = {setOn}
      />
    </>
  )
}