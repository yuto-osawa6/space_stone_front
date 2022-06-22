import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import React, { useEffect, useRef, useState } from "react";
import { useGetCurrentUser, signOut } from "@/lib/api/users/sign";
import { userLoginAction } from "@/store/user/actions";
import Cookies from "js-cookie";
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { IoChevronDownOutline, IoSettingsOutline } from "react-icons/io5";
import { userInitialState } from "@/store/user/reducer";
import { useRouter } from "next/router";
import { OpenContext } from "@/contexttype/contexttype";
import { UserModalSign } from "./UserModalSign";
import { BiUserCircle } from "react-icons/bi"
import { mutate } from "swr";
import { SettingUserModal } from "./setting/SettingUserModal";
import { getCurrentUserMock } from "@/mocks/api/user/signin";
import { useLocale } from "@/lib/ini/local/local";

export const UserCertification:React.FC = function UserCertification(){
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const dispatch = useDispatch();
  const router = useRouter()
  const {userSwr,error} = useGetCurrentUser()
  const handleSignOut = async (e: React.MouseEvent<HTMLDivElement>) => {
    try {
      const res = await signOut()
      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")
        mutate('/session_user')
      } else {
      }
    } catch (err) {
    }
  }

  // open menu
  const [openMenu,setOpenMenu] = useState<boolean>(false)
  const clickOpenMenuHandler = () => {
    if (openMenu==false){
      setOpenMenu(true)
    }else{
      setOpenMenu(false)
    }
  }

  const ref = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    const checkIfClickedOutside = (e:any) => {
      if (openMenu && ref.current && !ref.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [openMenu]); 
    // setting
    const [settngModalOpen,setSettingModalOpen] = useState<boolean>(false)
    const SettingModalHandler = () => {
      setSettingModalOpen(true)
      setOpenMenu(false)
    }
    // navigate
    const MovetoMypageHandler = () =>{
      if(userSwr.user==undefined)return
      router.push(`/users/${userSwr.user.id}`)
    }
    const adminHandler = () => {
      router.push(`/admins`)
    }
    const { t } = useLocale()
  return(
    <>
      {!userSwr.login||!userSwr.user?
        <>
          <div className = "user_box_true">
            <div className = "user_sign_in">
              <div className = "model_btn"
              onClick={handleOpen}
              >
                <div><div>
                <IoMdLogIn/>
                {t.UserInfomation.SIGNIN}
                </div><div className = {"home"}>{t.SubHeader.SINGIN}</div></div>
              </div>
              {open&&(
              <OpenContext.Provider value={{ open, setOpen }}>
                <UserModalSign/>
              </OpenContext.Provider>
              )} 
            </div>
          </div>
        </>
      :
      
      <>
      
        <div className = "user_box_false"
        ref = {ref}
        >
          <div className = "user_mypage"
          onClick={clickOpenMenuHandler}
          >
            <div><div><BiUserCircle/> {t.Headers.USERMENU} </div><div className = {"home"}>{t.SubHeader.USERMENU}</div></div><IoChevronDownOutline
            className={`leftDownArrow ${openMenu == true?"addTitleOnTime":""}`}
            />
          </div>
          
          <div className = "userNavigationDummy">
            {openMenu == true &&(
              <>
                <div className = "userNavigationDummyAbusolute">
                  <div className="UserNavigateDummyAbusoluteTop">
                    <div className="UserNavigateDummyAbusoluteTopImg">
                      <img src = {userSwr.user.image}></img>                   
                    </div>
                    <div className="UserNavigateDummyAbusoluteTopName">
                      {userSwr.user.nickname}                   
                    </div>
                  </div>
                  <div className = "user_logout"
                  onClick={MovetoMypageHandler}
                  >
                    <AiOutlineUser/>  {t.UserInfomation.MYPAGE}
                  </div>
                  <div className = "user_logout"
                  onClick={SettingModalHandler}
                  >
                    <IoSettingsOutline/> {t.UserInfomation.SETTING}
                  </div>
                  <div className = "user_logout"
                  onClick={handleSignOut}
                  >
                    <IoMdLogOut/>{t.UserInfomation.LOGOUT}
                  </div>
                  {userSwr.user.administratorGold == true &&(
                    <>
                      <div className = "user_logout"
                        onClick={adminHandler}
                        >
                          {t.UserInfomation.ADMIN}
                      </div>
                    </>
                  )}
                  </div> 
                </>
              )}
            </div>
          </div>
            {settngModalOpen==true&&(
              <>
                <SettingUserModal
                settngModalOpen = {settngModalOpen}
                setSettingModalOpen = {setSettingModalOpen}
                />
              </>
            )}
        </>
      }
    </>
  )
} 