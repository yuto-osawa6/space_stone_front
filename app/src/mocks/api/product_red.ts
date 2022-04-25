import { MockedRequest, ResponseResolver, restContext } from 'msw';
// import jwt, { SignOptions } from 'jsonwebtoken';

// export const mockLogin: ResponseResolver<MockedRequest, typeof restContext> =
//   async (req, res, ctx) => {
//   const token = await jwt.sign({ uid: 1 }, JWT_SERCRET_KEY, {expiresIn: '1h'});
  
//   return res(
//     ctx.status(200),
//     ctx.cookie(COOKIE_NAME, token, {
//       httpOnly: true,
//       path: '/'
//     }),
//     ctx.json({
//       name: '星宮いちご',
//     }
//   ));
// };

// export const mockLogout: ResponseResolver<MockedRequest, typeof restContext> = 
//   (req, res, ctx) => {
//   return res(
//     ctx.status(200),
//     ctx.cookie(COOKIE_NAME, null, {
//       expires: new Date(0),
//     }),
//     ctx.json('logout')
//   );
// };


export const mockProductReds: ResponseResolver<MockedRequest, typeof restContext> = 
  (req, res, ctx) => {
  return res(
    ctx.status(200),
    // ctx.cookie(COOKIE_NAME, null, {
    //   expires: new Date(0),
    // }),
    ctx.json({message:"aaa"})
  );
};