// import { execGoogle } from 'lib/api/users';
// import GoogleLogin from 'react-google-login';
// // import FacebookLogin from 'react-facebook-login';


// import Cookies from "js-cookie"
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from 'store';
// import { userLoginAction } from 'store/user/actions';


// export const UsersSign:React.FC = () =>{
//   const key = process.env.REACT_APP_GOOGLE_KEY;
//   const user = useSelector((state: RootState) => state.user);
//   const dispatch = useDispatch();
//   // execGoogle 
//   const responseGoogle = async(response:any) =>{
//     const res = await execGoogle(response)
//     console.log(res)
    
//     if (res.status === 201) {
//       Cookies.set("_access_token", res.data.headers.accessToken)
//       Cookies.set("_client", res.data.headers.client)
//       Cookies.set("_uid", res.data.headers.uid)
//       console.log(res)
//       dispatch(userLoginAction(true,res.data.data))
//     }else{
//       console.log("失敗しました。")
//     }
//   }

//   return (
//     <>
//      <GoogleLogin
//       clientId={String(key)}
//       buttonText="Googleでログイン"
//       onSuccess={responseGoogle}
//       onFailure={responseGoogle}
//       cookiePolicy={'single_host_origin'}
//   />
//       {/* <FacebookLogin
//       appId={`${process.env.REACT_APP_FACEBOOK_KEY}`}
//       autoLoad={false}
//       fields="name,email,picture"
//       // onClick={componentClicked}
//       callback={responseGoogle} /> */}
//     </>
//   )
// }