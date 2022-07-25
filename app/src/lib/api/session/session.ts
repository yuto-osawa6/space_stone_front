import client from "@/lib/client/client"

export const exec_sessions = () => {
  return  client.get("sessions/show", { 
  //   headers: {
  //   "access-token": `${Cookies.get("_access_token")}`,
  //   "client": `${Cookies.get("_client")}`,
  //   "uid": `${Cookies.get("_uid")}`
  // }
})  
}