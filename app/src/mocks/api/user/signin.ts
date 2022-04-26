import { MockedRequest, ResponseResolver, restContext } from 'msw';

export const execGoogleMock : ResponseResolver<MockedRequest, typeof restContext> = 
(req, res, ctx) => {
  return res(
    ctx.status(200),
    // ctx.cookie(COOKIE_NAME, null, {
    //   expires: new Date(0),
    // }),
    ctx.json({headers:{
      uid:20000,
      client:"aaaaaa",
      accessToken:"aaaaaaaaa"
    }})
  );
}



export const getCurrentUserMock: ResponseResolver<MockedRequest, typeof restContext> = 
(req, res, ctx) => {
  return res(
    ctx.status(200),
    // ctx.cookie(COOKIE_NAME, null, {
    //   expires: new Date(0),
    // }),
    ctx.json({data:{
      administratorGold: false,
      backgroundImage: "",
      id: 1,
      image: "",
      nickname: "ailis",
      overview: "test-overview",
      provider: "test-provider"
    }, is_login:true})
  );
}

// export const signOut = () => {
//   return  clientSocial.delete("/auth/sign_out", { headers: {
//     "access-token": `${Cookies.get("_access_token")}`,
//     "client": `${Cookies.get("_client")}`,
//     "uid": `${Cookies.get("_uid")}`
//   }})  
// }
export const signOutMock: ResponseResolver<MockedRequest, typeof restContext> = 
(req, res, ctx) => {
  return res(
    ctx.status(200),
    // ctx.cookie(COOKIE_NAME, null, {
    //   expires: new Date(0),
    // }),
    ctx.json({success:true})
  );
}
