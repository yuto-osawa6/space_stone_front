import { MockedRequest, ResponseResolver, restContext } from "msw";
export const execLeftMock: ResponseResolver<MockedRequest, typeof restContext> = 
(req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      genres:[{
      id:1,
      name:"genre_test_name",
      count:1
    }], 
    styles:[{
      id:1,
      name:"styles_test_name",
      count:1
    }]
  }))
}