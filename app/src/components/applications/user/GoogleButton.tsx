declare global {
  interface Window { google: any; }
}

export const GoogleButton:React.FC = function Btn(){
  const onResponse = async ({ credential }:any) => {
    console.log("aaaa")
    console.log(credential)
    // send `credential` to backend
  }
  
  const onClick = () => {
    console.log("saa")
    window.google.accounts.id.initialize({
      client_id: process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_P_GOOGLE_KEY : process.env.NEXT_PUBLIC_GOOGLE_KEY,
      callback: onResponse,
      // auto_select: false
    })
    // window.google.accounts.id.prompt()
  }
  
  return <button onClick={onClick}>Sign in with Google</button>
} 