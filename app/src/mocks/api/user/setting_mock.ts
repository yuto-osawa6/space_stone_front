import { MockedRequest, ResponseResolver, restContext } from "msw";

// export const execSettingUserHandler = (nickname:string,user_id:number) => {
//   return client.patch("/users/setting",{
//     nickname:nickname,
//     user_id:user_id
//   })
// }

// status:200,message:"nicknameを更新しました。",user:@user

export const execSettingUserHandlerMock: ResponseResolver<MockedRequest, typeof restContext> = 
(req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
    message:"test_nicknameを更新しました。",
    users:{
      administratorGold: false,
      backgroundImage: "",
      id: 1,
      image: "",
      nickname: "ailis_test",
      overview: "test-overview",
      provider: "test-provider"
    }
  }))
}