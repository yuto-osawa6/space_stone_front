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

export const UserModalSign:React.FC = () =>{
  const key = process.env.REACT_APP_GOOGLE_KEY;
  const user = useSelector((state: RootState) => state.user);
  const {open, setOpen} = useContext(OpenContext)
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  }

  const dispatch = useDispatch();
  

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