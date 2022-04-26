import { Button, Modal, TextField } from "@mui/material"
import { execSettingUserHandler } from "@/lib/api/users"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { updateNicknameAction } from "@/store/user/actions"
import { execDeleteUser } from "@/lib/api/users"
// import { Navigate, useNavigate, useParams } from "react-router-dom"
// import { signOut } from "lib/api/users";
import Cookies from "js-cookie";
import { userInitialState } from "@/store/user/reducer";
import { userLoginAction } from "@/store/user/actions";
// import { ErrorMessage } from "share/message"
import { pussingMessageDataAction } from "@/store/message/actions"
import { signOut } from "@/lib/api/users/sign"
import { useUser } from "@/lib/data/user/useUser"
import { ErrorMessage } from "@/lib/ini/message"
import { useRouter } from "next/router"
import { mutate } from "swr"



type Props = {
  settngModalOpen : boolean
  setSettingModalOpen : React.Dispatch<React.SetStateAction<boolean>>
}

export const SettingUserModal:React.FC<Props> = (Props) => {

  const handleClose = () => {
    Props.setSettingModalOpen(false)
  }
  // changeTextHandler
  const [nickname,setNickname] = useState<string>("")
  const [validateText,setValidateText] = useState<string>("")
  const changeTextHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value)
    if (validateText.length != 0){
      setValidateText("")
    }
  }

    // redux
    // const UserStore = useSelector((state:RootState)=>state.user)
    // swr
    const {userSwr,error} = useUser()
    const router = useRouter()

    const dispatch = useDispatch()
    // const navigate = useNavigate()
    const handleSubmit = async() => {
    if (nickname.length < 3){
      setValidateText("3文字以上で入力してください")
      return
    }else if (nickname.length > 20 ){
      setValidateText("20文字以内で入力してください")
      return
    }

    const res = await execSettingUserHandler(nickname,userSwr.user.id)
    if (res.status === 200){
      console.log(res)
      // dispatch(updateNicknameAction(userSwr.user,res.data.user.nickname))
      mutate('/session_user')
      handleClose()
    }else{
      dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
    }
  }
  const handleDeleteUser = async() => {
    if(window.confirm('ユーザーを削除しますか？')){
        handleSignOut()
    }
    else{
      window.alert('キャンセルされました')
    }
  }

  // sighout
  const handleSignOut = async () => {
    // console.log("aaaaaaghh")
    try {
      const res = await signOut()
      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")
        // dispatch(userLoginAction(userInitialState.login,userInitialState.user))
        const res2 = await execDeleteUser(userSwr.user.id)
        if(res2.data.status === 200){
          Props.setSettingModalOpen(false)
          router.push('/')
        }else if(res2.data.status === 500){
          dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
        }
        console.log(res)
        console.log("Succeeded in sign out")
      } else {
        console.log("Failed in sign out")
      }
    } catch (err) {
      dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
      // console.log(err)
    }
  }

  return(
    <>
      <Modal
        open={Props.settngModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <div className = "settingModalOpenClass">
            <div className = "settingModalOpenClassTitle">
              Setting
            </div>
            <div className = "settingModalOpenClassMain">
                
              <div className = "settingModalOpenClassNickname">
                {/* Nickname */}
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
                  // value={"title"}
                />
              </div>
              <div className = "settingModalOpenClassImage">
                Image
              </div>
              <div className = "settingModalOpenClassImageExplain">
                *画像は各SNSプラットフォームサービスの画像を使用させていただいておりますので、下記のリンクから設定をお願い致します。
                {userSwr.user.provider==="google_oauth2"&&(
                  <a href = "https://myaccount.google.com/personal-info" target="_blank" rel="noopener noreferrer">
                    https://myaccount.google.com/personal-info
                  </a>
                )}
              </div>
            </div>
            <div className = "settingModalOpenClassButton"
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button variant="contained" role="setting-button"
                // className = "TheredModalButton"
                onClick = { handleSubmit }
              >
                Submit
              </Button>
              <Button variant="contained"
                style={{backgroundColor:"#ff3073"}}
                onClick = { handleDeleteUser }
              >
                Delete
              </Button>
            </div>
          </div>
        </>             
      </Modal>
    </>
  )
}