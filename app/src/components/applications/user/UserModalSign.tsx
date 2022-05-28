// import { execGoogle } from 'lib/api/users';
// import GoogleLogin from 'react-google-login';
import Cookies from "js-cookie"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { userLoginAction } from '@/store/user/actions';
import { Modal } from '@mui/material';
import { UsersSign } from './UsersSign';
import { useContext, useState } from 'react';
import { OpenContext } from '@/contexttype/contexttype';
// import { OpenContext } from './UserCertification';

// type Props = {
//   open :boolean
// }

export const UserModalSign:React.FC = function UserModalSign(){
  // const key = process.env.REACT_APP_GOOGLE_KEY;
  const user = useSelector((state: RootState) => state.user);
  const {open, setOpen} = useContext(OpenContext)
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  }

  const dispatch = useDispatch();
  
  // console.log(process.env.NEXT_PUBLIC_A1)
  // console.log(process.env.NEXT_PUBLIC_A4)
  // console.log(process.env.NEXT_PUBLIC_GOOGLE_KEY)
  // console.log(process.env.NEXT_PUBLIC_P_GOOGLE_KEY)
  // console.log(process.env)
  // console.log("aaaaa")
  // console.log(process.env.MY_ENV_VAR)
  // console.log(process.env.MY_ENV_VAR2)
  // console.log(process.env.API_ORIGIN4)
  // console.log(process.env.NEXT_PUBLIC_API_ORIGIN4)
  // console.log(process.env.NEXT_PUBLIC_FOO)
  // console.log(process.env.NEXT_PUBLIC_A5)
  // console.log(process.env.NEXT_PUBLIC_A9)


  // console.log(ENV["NEXT_PUBLIC_A1"])
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className = "social_login_all">
          <div className = "social_login_title">
            Sign In
            {process.env.NEXT_PUBLIC_A1}
            {process.env.NEXT_PUBLIC_A3}
            {process.env.NEXT_PUBLIC_A4}


          </div>
          <div className = "user_social_login"
          onClick={handleClose}
          >
            <UsersSign
            />
          </div>
        </div>

                
      </Modal>
     {/* <GoogleLogin
      clientId={String(key)}
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
  />, */}
    </>
  )
}