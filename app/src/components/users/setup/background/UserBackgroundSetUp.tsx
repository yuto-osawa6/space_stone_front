import { useState } from "react"
import { UserBackgroupdModal } from "./UserBackgroundModal"

export const UserBackgroupdSetUp:React.FC = () => {
  const [on,setOn] = useState<boolean>(false)
  // symple handler
  const changeOnHandler = () => setOn(true)
  return(
    <>
     <div className = "UsersShowTopSettingListBackgroudImage"
      onClick={changeOnHandler}
      style={{
        cursor:"pointer"
      }}
      >
        背景画像の変更
      </div>
      
      <UserBackgroupdModal
      on = {on}
      setOn = {setOn}
      />
    </>
  )
}