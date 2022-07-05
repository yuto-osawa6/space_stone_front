import Cookies from "js-cookie"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { userLoginAction } from '@/store/user/actions';
import { Modal } from '@mui/material';
import { UsersSign } from './UsersSign';
import { useContext, useState } from 'react';
import { OpenContext } from '@/contexttype/contexttype';
import { AuthButton } from "./AuthButton";
import { useLocale } from "@/lib/ini/local/local";

export const UserModalSign:React.FC = function UserModalSign(){
  const user = useSelector((state: RootState) => state.user);
  const {open, setOpen} = useContext(OpenContext)
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  }
  const dispatch = useDispatch();
  const {t} = useLocale()

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
            {"ログイン"}
          </div>
          <div className = "user_social_login"
          onClick={handleClose}
          >
          <AuthButton/>
          </div>
        </div>        
      </Modal>
    </>
  )
}