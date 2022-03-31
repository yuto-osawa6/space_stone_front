import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";

// material-ui
import Modal from '@mui/material/Modal';
import React, { useEffect, useRef, useState } from "react";
// import { UsersSign } from "./UsersSign";
import { getCurrentUser, signOut } from "lib/api/users";
import { userLoginAction } from "store/user/actions";
import { FaLaptopHouse } from "react-icons/fa";
import Cookies from "js-cookie";
// import { useNavigate } from "react-router";
// import { UserModalSign } from "./UserModalSign";
import { createContext } from "vm";
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";
// import { OpenContext } from "contexttype/contexttype";
import { AiOutlineUser } from "react-icons/ai";
import { MdKeyboardArrowDown, MdOutlineAdminPanelSettings, MdSupervisedUserCircle } from "react-icons/md";
import { IoSettings, IoSettingsOutline } from "react-icons/io5";
import { userInitialState } from "store/user/reducer";
// import { SettingUserModal } from "./User/SettingUserModal";
// import { Link } from "react-router-dom";


export const UserCertification:React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const [open, setOpen] = useState<boolean>(false);
  const [userloding,setUserloding] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser()

      if (res?.data.isLogin === true) {
        // setIsSignedIn(true)
        // setCurrentUser(res?.data.data)
        // const dispatch = useDispatch();
        dispatch(userLoginAction(true,res.data.data))

        console.log(res?.data.data)
      } else {
        console.log("No current user")
      }
    } catch (err) {
      // console.log(err)
    }

    setUserloding(true)
  }

  useEffect(()=>{
    handleGetCurrentUser()
  },[])


  const handleSignOut = async (e: React.MouseEvent<HTMLDivElement>) => {
    try {
      const res = await signOut()

      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")
        // doneyet(check )
        dispatch(userLoginAction(userInitialState.login,userInitialState.user))
        // setIsSignedIn(false)
        // histroy.push("/signin")

        console.log("Succeeded in sign out")
      } else {
        console.log("Failed in sign out")
      }
    } catch (err) {
      console.log(err)
    }
  }


  // open menu
  const [openMenu,setOpenMenu] = useState<boolean>(false)

    //symple handler 
    const clickOpenMenuHandler = () => {
      if (openMenu==false){
        console.log(user.user)
        setOpenMenu(true)
      }else{
        setOpenMenu(false)
      }
    }
    // console.log(user)
    // menu close over window
    const ref = useRef<HTMLDivElement>(null!);
    useEffect(() => {
      const checkIfClickedOutside = (e:any) => {
        // If the menu is open and the clicked target is not within the menu,
        // then close the menu
        if (openMenu && ref.current && !ref.current.contains(e.target)) {
          setOpenMenu(false);
        }
        console.log(e.target)
        console.log(ref.current)
      };
      document.addEventListener("mousedown", checkIfClickedOutside);
      return () => {
        // Cleanup the event listener
        document.removeEventListener("mousedown", checkIfClickedOutside);
      };
    }, [openMenu]); 

    // setting
    const [settngModalOpen,setSettingModalOpen] = useState<boolean>(false)

    const SettingModalHandler = () => {
      setSettingModalOpen(true)
      setOpenMenu(false)
    }

    const MovetoMypageHandler = () =>{
      navigate(`/users/${user.user.id}`)
    }

    const adminHandler = () => {
      navigate(`/admins`)
    }

  return(
    <>
    {/* {userloding &&( */}
       {!user.login&&userloding ? 
       <>
        <div className = "user_box_true">
          <div className = "user_sign_in">
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <div className = "model_btn"
            // onClick={navigate_sign_in}
            onClick={handleOpen}
            >
              <IoMdLogIn/>
              SignIn
            </div>
            {/* <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <div className = "user_social_login"
                onClick={handleClose}
                >
                  <UsersSign/>
                
                </div>
                
            </Modal> */}
            {/* {open&&(
              <>
                <UserModalSign
                open = {open}
                />
              </>
            )} */}
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
            <MdSupervisedUserCircle/>UserMenu<MdKeyboardArrowDown
            className={`leftDownArrow ${openMenu == true?"addTitleOnTime":""}`}
            />
            {/* {user.id} */}
          </div>
          
          <div className = "userNavigationDummy">
            {openMenu == true &&(
              <>
                <div className = "userNavigationDummyAbusolute">
                  <div className="UserNavigateDummyAbusoluteTop">
                    <div className="UserNavigateDummyAbusoluteTopImg">
                      <img src = {user.user.image}></img>                   
                    </div>
                    <div className="UserNavigateDummyAbusoluteTopName">
                      {user.user.nickname}                   
                    </div>
                  </div>
                  <div className = "user_logout"
                  onClick={MovetoMypageHandler}
                  >
                    <AiOutlineUser/>マイページ
                  </div>
                  <div className = "user_logout"
                  onClick={SettingModalHandler}
                  >
                    <IoSettingsOutline/>設定
                  </div>
                  <div className = "user_logout"
                  onClick={handleSignOut}
                  >
                    <IoMdLogOut/>ログアウト
                  </div>
                  {user.user.administratorGold == true &&(
                    <>
                      <div className = "user_logout"
                        onClick={adminHandler}
                        >
                          {/* <Link to = "/admins"> */}
                            <MdOutlineAdminPanelSettings/>アドミン
                          {/* </Link> */}
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
    {/* )} */}
    </>
  )
} 