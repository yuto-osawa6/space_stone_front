import applyCaseMiddleware from "axios-case-converter"
import axios from "axios"

// applyCaseMiddleware:
// axiosで受け取ったレスポンスの値をスネークケース→キャメルケースに変換
// または送信するリクエストの値をキャメルケース→スネークケースに変換してくれるライブラリ

// ヘッダーに関してはケバブケースのままで良いので適用を無視するオプションを追加
const options = {
  ignoreHeaders: true 
}

 const client = applyCaseMiddleware(axios.create({
  // baseURL: "http://localhost:3001/api/v1",
  baseURL: process.env.NODE_ENV === "production" ? "https://api.meruplanet.com/api/v1" : "http://localhost:3001/api/v1",
  withCredentials: true,
  // headers: { 'X-Requested-With': 'XMLHttpRequest' }
  // ,"Content-Type": "multipart/form-data" 
  // headers: {
  //   "Content-Type": "multipart/form-data" // 画像ファイルを取り扱うのでform-dataで送信
  // }
  // headers: { 'X-Requested-With': 'XMLHttpRequest' },

}), 
options
)

// client.defaults.xsrfCookieName = 'CSRF-TOKEN'
// client.defaults.xsrfHeaderName = 'X-CSRF-Token'
// client.defaults.withCredentials = true

export default client
// http://api.meruplanet.com/api/v1/products/red