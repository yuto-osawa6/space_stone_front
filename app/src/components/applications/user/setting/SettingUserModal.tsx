import { Button, Modal, TextField } from "@mui/material"
import { execSettingUserHandler } from "@/lib/api/users"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { updateNicknameAction } from "@/store/user/actions"
import { execDeleteUser } from "@/lib/api/users"
import Cookies from "js-cookie";
import { userInitialState } from "@/store/user/reducer";
import { userLoginAction } from "@/store/user/actions";
import { pussingMessageDataAction } from "@/store/message/actions"
import { signOut } from "@/lib/api/users/sign"
import { useUser } from "@/lib/data/user/useUser"
import { ErrorMessage } from "@/lib/ini/message"
import { useRouter } from "next/router"
import { mutate } from "swr"
import { TopImageSetUp } from "@/components/users/setup/topimage/TopImageSetUp"
import { useLocale } from "@/lib/ini/local/local"
import { useWindowDimensions } from "@/hook/useWindowResize"

type Props = {
  settngModalOpen : boolean
  setSettingModalOpen : React.Dispatch<React.SetStateAction<boolean>>
}

export const SettingUserModal:React.FC<Props> = function SettingUserModalFunc(Props){
  const {t} = useLocale()
  const {userSwr,error} = useUser()
  const handleClose = (e:React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>) => {
    if (windowSize.width < 768){
      document.body.style.overflowY = "hidden"
    }
    Props.setSettingModalOpen(false)
  }
  // changeTextHandler
  const [nickname,setNickname] = useState<string>(userSwr.user.nickname)
  const [validateText,setValidateText] = useState<string>("")
  const changeTextHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value)
    if (validateText.length != 0){
      setValidateText("")
    }
  }
    const router = useRouter()
    const dispatch = useDispatch()
    const handleSubmit = async(e:React.MouseEvent<HTMLButtonElement>) => {
    if (nickname.length < 3){
      setValidateText(t.Component.SettingUserModal.THREE)
      return
    }else if (nickname.length > 20 ){
      setValidateText(t.Component.SettingUserModal.TWENTY)
      return
    }
    const res = await execSettingUserHandler(nickname,userSwr.user.id)
    if (res.data.status === 200){
      mutate('/session_user')
      handleClose(e)
    }else{
      dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
    }
  }
  const handleDeleteUser = async() => {
    if(window.confirm(t.Component.SettingUserModal.DELETE)){
        handleSignOut()
    }
    else{
      window.alert(t.Component.SettingUserModal.CANCEL)
    }
  }

  // sighout
  const handleSignOut = async () => {
    try {
      const res = await signOut()
      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")
        const res2 = await execDeleteUser(userSwr.user.id)
        if(res2.data.status === 200){
          Props.setSettingModalOpen(false)
          router.push('/')
        }else if(res2.data.status === 500){
          dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
        }
      } else {
      }
    } catch (err) {
      dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
    }
  }
  const windowSize = useWindowDimensions()

  
  return(
    <>
      <Modal
        open={Props.settngModalOpen}
        onClose={handleClose}
        className={windowSize.width<768?"SettingModalSmartFon":""}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <div className = "settingModalOpenClass">
            <div className = "settingModalOpenClassTitle">
              {t.Component.USER.Setting}
            </div>
            <div className = "settingModalOpenClassMain">
                
              <div className = "settingModalOpenClassNickname">
                <TextField 
                  role="input"
                  id="standard-basic" 
                  label="NickName" 
                  variant="standard" 
                  placeholder="3~20文字以内"
                  inputProps={{ maxLength: 20, pattern: "^[a-zA-Z0-9_]+$" }}
                  onChange={changeTextHandler}
                  helperText={validateText}
                  defaultValue={userSwr.user.nickname}
                />
              </div>
              <div className = "settingModalOpenClassImage"
              style={{fontSize:"1rem",color:"rgba(0, 0, 0, 0.6)"}}
              >
                {t.Component.USER.Image}
              </div>
              <img src = {userSwr.user.image}
              style = {{width:"70px",height:"70px",borderRadius:"70px",margin:"10px"}}
              />
              <TopImageSetUp/>
            </div>
            <div className = "settingModalOpenClassButton"
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button variant="contained" role="setting-button"
                onClick = { handleSubmit }
              >
                {t.Component.USER.Store}
              </Button>
              <Button variant="contained"
                style={{backgroundColor:"#ff3073"}}
                onClick = { handleDeleteUser }
              >
                {t.Component.USER.Delete}
              </Button>
            </div>
          </div>
        </>             
      </Modal>
    </>
  )
}