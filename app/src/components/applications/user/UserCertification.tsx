import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import React, { useEffect, useRef, useState } from "react";
import { useGetCurrentUser, signOut } from "@/lib/api/users/sign";
import { userLoginAction } from "@/store/user/actions";
import Cookies from "js-cookie";
import { IoMdClose, IoMdLogIn, IoMdLogOut } from "react-icons/io";
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
import { Modal } from "@mui/material";
import Image from "next/image";
import { url } from "@/utils/config";

export const UserCertification:React.FC = function UserCertification(){
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const dispatch = useDispatch();
  const router = useRouter()
  const {userSwr,error,userLoaded} = useGetCurrentUser()
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
    // openMenu==false?document.body.style.overflowY = "hidden":document.body.style.overflowY = ""
  }

  const ref = useRef<HTMLDivElement>(null!);
  const windowSize = useWindowDimensions()
  // useEffect(() => {
  //   const checkIfClickedOutside = (e:any) => {
  //     const s_ref = document.getElementsByClassName("SettingModalSmartFon")
  //     console.log(s_ref)
  //     if ( openMenu && ref.current && !ref.current.contains(e.target)&& s_ref.length == 0) {
  //       document.body.style.overflowY = ""
  //       setOpenMenu(false);
  //       console.log("aaaaa3")
  //     }
  //   };
  //   document.addEventListener("mousedown", checkIfClickedOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", checkIfClickedOutside);
  //   };
  // }, [openMenu]); 
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

    // useEffect(()=>{
    //   if(windowSize.width >= 768)return
    //   if(settngModalOpen==true)return
    //   document.body.style.overflowY = "hidden"

    // },[settngModalOpen])

    // useEffect(()=>{
    //   const touchHandler = (event: any) => {
    //     if(windowSize.width >= 768){
        
    //     }else{
    //       event.preventDefault();
    //     }
    //   };
    //   document.addEventListener('touchmove', touchHandler, {
    //     passive: false
    //   });
    //   return () => {
    //     document.removeEventListener("touchmove", touchHandler);
    //   };
    // },[windowSize.width])
  return(
    <>
      {userLoaded&&(
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
                    {windowSize.width >= 768 &&(
                      // <div className="">
                      <>
                      {t.UserInfomation.SIGNIN}
                      </>
                      // </div>
                  )}
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
            padding: "16px",
            borderRadius: "100%",
            border: "1.5px solid",
            color: "white",
            backgroundColor: "#ff3073"
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
          
          <div className = "userNavigationDummy"
          >
            {windowSize.width >= 768 && openMenu == true &&(
              <>
              <Modal
                open={openMenu}
                onClose={clickOpenMenuHandler}
                className={windowSize.width<768?"SettingModalSmartFon":""}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <>
                <div className="userMypageModal"
                style={{
                  // display: "grid",
                  // gridTemplateColumns: "1fr",
                  // maxWidth: 500,
                  // borderRadius: 30,
                  // top: "50%",
                  // position: "absolute",
                  // left: "50%",
                  // transform: "translate(-50%, -50%)",
                  // width: "100%",
                  // flexFlow: "column",
                  // backgroundColor: "white",
                }}
                >
                
                {/* <div className=""
                style={{
                  backgroundColor: "1a252",
                  padding: 20,
                  minHeight: 400,
                  position: "relative",
                  borderRadius: "5px 0px 0px 5px"
                  
                }}
                >
                  <img src={url('/meruplanet-usermenu.png')} alt="Sample image" 
                  style={{
                    width:"100%",
                    top: 0,
                    left: 0,
                    height: "100%",
                    borderRadius: "5px 0px 0px 5px",
                    position: "absolute",
                    objectFit: "cover",
                    // height:""
                  }}
                  />

                </div> */}
                <div className = "userNavigationDummyAbusolute"
                  style={{
                    padding: 20,
                    display: "flex",
                    flexFlow: "column",
                    gap: 20,
                    fontSize: "1.1rem",
                    position: "relative",
                  }}
                >
                  <div className="CloseButton2"
                  onClick={clickOpenMenuHandler}
                  >
                  <IoMdClose/>
                </div>
                  {/* <div className="UserNavigateDummyAbusoluteTopName"
                  style={{
                    // padding: 10,
                    // border: "2px solid",
                    // borderRadius: "5px",
                  }}
                  >
                    ユーザー情報
                  </div> */}
                  <div className="UserNavigateDummyAbusoluteTop"
                  style={{
                    display: "flex",
                    gap: "20px"
                  }}
                  >
                    <div className="UserNavigateDummyAbusoluteTopImg">
                      <img src = {userSwr.user.image}
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "100%",
                      }}
                      ></img>                   
                    </div>
                    <div className="UserNavigateDummyAbusoluteTopName"
                    style={{
                      display:"flex",
                      wordBreak:"break-all",
                      alignItems: "center"
                    
                      // alien
                    }}
                    >
                      {userSwr.user.nickname}                
                    </div>
                  </div>
                  <div className="user_menu_parent">
                  <div className = "user_logout user_menu_2"
                  onClick={MovetoMypageHandler}
                  >
                    <AiOutlineUser/>  {t.UserInfomation.MYPAGE}
                  </div>
                  <div className = "user_logout user_menu_2"
                  onClick={SettingModalHandler}
                  >
                    <IoSettingsOutline/> {t.UserInfomation.SETTING}
                  </div>
                  <div className = "user_logout user_menu_2"
                  onClick={handleSignOut}
                  >
                    <IoMdLogOut/>{t.UserInfomation.LOGOUT}
                  </div>
                  {userSwr.user.administratorGold == true &&(
                    <>
                      <div className = "user_logout user_menu_2"
                        onClick={adminHandler}
                        >
                          {t.UserInfomation.ADMIN}
                      </div>
                    </>
                  )}
                  </div> 
                  </div>
                  </div>
                  </>
                  </Modal>
                </>
              )}

            {windowSize.width < 768 && openMenu == true &&(
              <>
              <Modal
                open={openMenu}
                onClose={clickOpenMenuHandler}
                className={windowSize.width<768?"SettingModalSmartFon":""}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <>
                <div className="CloseButton2"
                  onClick={clickOpenMenuHandler}
                  >
                  <IoMdClose/>
                </div>
                <div className="userMypageModal"
                style={{
                  // display: "grid",
                  // gridTemplateColumns: "1fr",
                  // maxWidth: 500,
                  // borderRadius: 50,
                  // width: "calc(100% - 40px)",
                  // top: "50%",
                  // position: "absolute",
                  // left: "50%",
                  // transform: "translate(-50%, -50%)",
                  // flexFlow: "column",
                  // backgroundColor: "white",
                }}
                >
                
                {/* <div className=""
                style={{
                  backgroundColor: "1a252",
                  padding: 20,
                  minHeight: 400,
                  position: "relative",
                  borderRadius: "5px 0px 0px 5px"
                  
                }}
                > */}
                  {/* <Image src = "/MeRuPla09.png" layout='fill' alt='logo'/> */}
                  {/* <img src={url('/meruplanet-usermenu.png')} alt="Sample image" 
                  style={{
                    width:"100%",
                    top: 0,
                    left: 0,
                    height: "100%",
                    objectFit: "cover",
                    position: "absolute",
                    borderRadius: "5px 0px 0px 5px"
                    // height:""
                  }}
                  /> */}

                {/* </div> */}
                <div className = "userNavigationDummyAbusolute"
                  style={{
                    padding: 20,
                    display: "flex",
                    flexFlow: "column",
                    gap: 20,
                    fontSize: "1.1rem",
                  }}
                >
                  {/* <div className="UserNavigateDummyAbusoluteTopName"
                  style={{
                    // padding: 10,
                    // border: "2px solid",
                    // borderRadius: "5px",
                  }}
                  >
                    ユーザー情報
                  </div> */}
                  <div className="UserNavigateDummyAbusoluteTop"
                  style={{
                    display: "flex",
                    gap: "20px"
                  }}
                  >
                    <div className="UserNavigateDummyAbusoluteTopImg">
                      <img src = {userSwr.user.image}
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "100%",
                      }}
                      ></img>                   
                    </div>
                    <div className="UserNavigateDummyAbusoluteTopName"
                    style={{
                      display:"flex",
                      wordBreak:"break-all",
                      alignItems: "center"
                    
                      // alien
                    }}
                    >
                      {userSwr.user.nickname}                
                    </div>
                  </div>
                  <div className="user_menu_parent">
                  <div className = "user_logout user_menu_2"
                  onClick={MovetoMypageHandler}
                  >
                    <AiOutlineUser/>  {t.UserInfomation.MYPAGE}
                  </div>
                  <div className = "user_logout user_menu_2"
                  onClick={SettingModalHandler}
                  >
                    <IoSettingsOutline/> {t.UserInfomation.SETTING}
                  </div>
                  <div className = "user_logout user_menu_2"
                  onClick={handleSignOut}
                  >
                    <IoMdLogOut/>{t.UserInfomation.LOGOUT}
                  </div>
                  {userSwr.user.administratorGold == true &&(
                    <>
                      <div className = "user_logout user_menu_2"
                        onClick={adminHandler}
                        >
                          {t.UserInfomation.ADMIN}
                      </div>
                    </>
                  )}
                  </div> 
                  </div>
                  </div>
                  </>
                  </Modal>
                </>
              )}

            {/* {windowSize.width < 768 &&openMenu == true &&(
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
                        height: "60px",
                        borderRadius: "100%"
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
              )} */}
               
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
      )}
    </>
  )
} 