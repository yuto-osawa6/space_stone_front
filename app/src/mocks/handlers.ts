import { rest } from "msw";
import { mockProductReds } from "@/mocks/api/product_red"
// import sucessResponse from "./sucessResponse.json";

const API = "http://localhost:3001/api/v1"
const API2 = "http://api:3001/api/v1"

export const handlers = [
  rest.get(`${API}/products/red`, mockProductReds),
  rest.get(`${API2}/products/red`, mockProductReds),

  // rest.get("https://sample/api/list", (_, res, ctx) => {
  //     return res(
  //       ctx.json(sucessResponse),
  //     );
  //   },
  // ),
];