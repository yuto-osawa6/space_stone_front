// import { execGoogle } from 'lib/api/users';
import GoogleLogin from 'react-google-login';
// import { GoogleAPI, GoogleLogin, GoogleLogout } from "react-google-oauth";
// import FacebookLogin from 'react-facebook-login';


import Cookies from "js-cookie"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { userLoginAction } from '@/store/user/actions';
import { execGoogle } from '@/lib/api/users/sign';
import { pussingMessageDataAction } from '@/store/message/actions';
import { ErrorMessage } from '@/lib/ini/message';
import { mutate } from 'swr';

// import { GoogleButton } from '@/components/applications/user/AuthButton'


export const UsersSign:React.FC = function UsersSignFunc(){
  // const key = process.env.NEXT_PUBLIC_GOOGLE_KEY
  const key = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_P_GOOGLE_KEY : process.env.NEXT_PUBLIC_GOOGLE_KEY

  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  // execGoogle 
  const responseGoogle = async(response:any) =>{
    console.log("aa")
    console.log("bb")
    // console.log("aabb")
    const res = await execGoogle(response)
    console.log(res)
    // console.log("resoponseGoogle")
    // if(res==undefined){
    //   dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
    //   console.log("aaaaaaaaaaaiueeeppppp")
    //   return
    // }
    // // console.log(res)
    // if (res.data.status === 200) {
    //   Cookies.set("_access_token", res.data.headers.accessToken)
    //   Cookies.set("_client", res.data.headers.client)
    //   Cookies.set("_uid", res.data.headers.uid)
    //   // console.log(res)
    //   // dispatch(userLoginAction(true,res.data.data))
    //   mutate('/session_user')
    // }else{
    //   dispatch(pussingMessageDataAction({title:ErrorMessage.failedLogin,select:0}))
    // }
  }

  const responseFailure = () => {
    console.log("resoponseGoogle2")
    dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
  }

  return (
    <>

     <GoogleLogin
      clientId={String(key)}
      buttonText="Googleでログイン"
      onSuccess={responseGoogle}
      onFailure={err => console.log('fail', err)}
      cookiePolicy={'single_host_origin'}
    />
    {/* <GoogleAPI className="GoogleLogin" clientId={String(key)}>
      <div>
        <GoogleLogin
          height="10"
          width="500px"
          backgroundColor="#4285f4"
          access="offline"
          scope="email profile"
          onLoginSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
      </div>
    </GoogleAPI> */}
      {/* <FacebookLogin
      appId={`${process.env.REACT_APP_FACEBOOK_KEY}`}
      autoLoad={false}
      fields="name,email,picture"
      // onClick={componentClicked}
      callback={responseGoogle} /> */}
      {/* <GoogleButton/> */}
    </>
  )
}