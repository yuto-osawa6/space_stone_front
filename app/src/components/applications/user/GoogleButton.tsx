import { useRouter } from "next/router"

export const GoogleButton:React.FC = function Btn(){
  // pathname
  const router = useRouter()
  // console.log(router)
  
  return <a href={`${process.env.NEXT_PUBLIC_AUTH_URL}${router.pathname}`}>Sign in with Google</a>

}
// ${process.env.NEXT_PUBLIC_AUTH_URL}