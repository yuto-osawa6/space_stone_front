import { rest } from "msw";
import { mockProductReds } from "@/mocks/api/product_red"
import { execGoogleMock, getCurrentUserMock, signOutMock } from "./api/user/signin";
import { execLeftMock } from "./api/left/left_mock";
// import sucessResponse from "./sucessResponse.json";

export const API = "http://localhost:3001/api/v1"
export const APISOCIAL = "http://localhost:3001"
export const API2 = "http://api:3001/api/v1"

export const handlers = [
  rest.get(`${API}/products/red`, mockProductReds),
  rest.get(`${API2}/products/red`, mockProductReds),
  rest.post(`${APISOCIAL}/social_auth/callback`,execGoogleMock),
  rest.get(`${API}/session_user`,getCurrentUserMock),
  rest.delete(`${APISOCIAL}/auth/sign_out`,signOutMock),
  rest.get(`${API}/products/left`,execLeftMock),

  // rest.get("https://sample/api/list", (_, res, ctx) => {
  //     return res(
  //       ctx.json(sucessResponse),
  //     );
  //   },
  // ),
];