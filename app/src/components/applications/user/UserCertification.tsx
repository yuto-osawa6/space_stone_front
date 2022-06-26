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
import { useWindowDimensions } from "@/hook/useWindowResize";
import { height } from "@mui/system";

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
    openMenu==false?document.body.style.overflowY = "hidden":document.body.style.overflowY = ""
  }

  const ref = useRef<HTMLDivElement>(null!);
  const windowSize = useWindowDimensions()
  useEffect(() => {
    const checkIfClickedOutside = (e:any) => {
      const s_ref = document.getElementsByClassName("SettingModalSmartFon")
      console.log(s_ref)
      if ( openMenu && ref.current && !ref.current.contains(e.target)&& s_ref.length == 0) {
        document.body.style.overflowY = ""
        setOpenMenu(false);
        console.log("aaaaa3")
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
      if(windowSize.width >= 768){
        setOpenMenu(false)
      }
      // setOpenMenu(false)
      // document.body.style.overflowY = ""
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

    useEffect(()=>{
      if(windowSize.width >= 768)return
      if(settngModalOpen==true)return
      document.body.style.overflowY = "hidden"

    },[settngModalOpen])
  return(
    <>
      {!userSwr.login||!userSwr.user?
        <>
          <div className = "user_box_true">
            <div className = "user_sign_in">
              <div className = "model_btn"
              onClick={handleOpen}
              >
                <div>
                  <div
                  style={{
                    display:"block!important"
                  }}
                  >
                    <IoMdLogIn/>
                    {t.UserInfomation.SIGNIN}
                  </div>
                  {windowSize.width >= 768 &&(
                    <div className = {"home"}>
                      {t.SubHeader.SINGIN}
                    </div>
                  )}
                </div>
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
          style={windowSize.width < 768?{
            position: "relative",
            padding: "17px"
          }:{}}  
          onClick={clickOpenMenuHandler}
          >
            <div
            style={windowSize.width < 768?{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "1.5rem"
            }:{}}      
            >
              <div>
                <AiOutlineUser/> 
                {windowSize.width >= 768 &&(
                <>
                  {t.Headers.USERMENU} 
                </>
                )}
              </div>
              {windowSize.width >= 768 &&(<div className = {"home"}>
                {t.SubHeader.USERMENU}</div>
              )}
            </div>
            {windowSize.width >= 768 &&(
            <IoChevronDownOutline
              className={`leftDownArrow ${openMenu == true?"addTitleOnTime":""}`}
            />
            )}
          </div>
          
          <div className = "userNavigationDummy">
            {windowSize.width >= 768 &&openMenu == true &&(
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

            {windowSize.width < 768 &&openMenu == true &&(
              <>
                <div className = "userNavigationDummyAbusolute2"
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100vh",
                  backgroundColor: "#1a252f",
                  marginTop: 56.8,
                  padding: "20px",
                  overflow: "scroll",
                  fontSize: "1.2rem"
                }}
                >
                  <div className="UserNavigateDummyAbusoluteTop2">
                    <div className="UserNavigateDummyAbusoluteTopImg2"
                    style={{
                      padding: "20px"
                    }}
                    >
                      <img src = {userSwr.user.image}
                      style = {{
                        width: "60px",
                        height: "60px"
                      }}
                      ></img>                   
                    </div>
                    <div className="UserNavigateDummyAbusoluteTopName2"
                    style={{
                      padding: "20px"
                    }}
                    >
                      {userSwr.user.nickname}                   
                    </div>
                  </div>
                  <div className = "user_logout2"
                  style={{
                    padding: "20px"
                  }}
                  onClick={MovetoMypageHandler}
                  >
                    <AiOutlineUser/>  {t.UserInfomation.MYPAGE}
                  </div>
                  <div className = "user_logout2"
                  style={{
                    padding: "20px"
                  }}
                  onClick={SettingModalHandler}
                  >
                    <IoSettingsOutline/> {t.UserInfomation.SETTING}
                  </div>
                  <div className = "user_logout2"
                  style={{
                    padding: "20px"
                  }}
                  onClick={handleSignOut}
                  >
                    <IoMdLogOut/>{t.UserInfomation.LOGOUT}
                  </div>
                  {userSwr.user.administratorGold == true &&(
                    <>
                      <div className = "user_logout2"
                      style={{
                        padding: "20px"
                      }}
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
             {settngModalOpen==true&&(
              <>
                <SettingUserModal
                settngModalOpen = {settngModalOpen}
                setSettingModalOpen = {setSettingModalOpen}
                />
              </>
            )}
          </div>
            {/* {settngModalOpen==true&&(
              <>
                <SettingUserModal
                settngModalOpen = {settngModalOpen}
                setSettingModalOpen = {setSettingModalOpen}
                />
              </>
            )} */}
        </>
      }
    </>
  )
} 