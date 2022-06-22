import GoogleLogin from 'react-google-login';
import Cookies from "js-cookie"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { userLoginAction } from '@/store/user/actions';
import { execGoogle } from '@/lib/api/users/sign';
import { pussingMessageDataAction } from '@/store/message/actions';
import { ErrorMessage } from '@/lib/ini/message';
import { mutate } from 'swr';

export const UsersSign:React.FC = function UsersSignFunc(){
  const key = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_P_GOOGLE_KEY : process.env.NEXT_PUBLIC_GOOGLE_KEY
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  // execGoogle 
  const responseGoogle = async(response:any) =>{
    const res = await execGoogle(response)
  }

  const responseFailure = () => {
    console.log("resoponseGoogle2")
    dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
  }

  return (
    <>
    {/* <GoogleLogin
      clientId={String(key)}
      buttonText="Googleでログイン"
      onSuccess={responseGoogle}
      onFailure={err => console.log('fail', err)}
      cookiePolicy={'single_host_origin'}
    /> */}
    </>
  )
}