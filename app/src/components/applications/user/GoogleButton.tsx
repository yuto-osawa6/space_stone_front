import { useRouter } from "next/router"

export const GoogleButton:React.FC = function Btn(){
  // pathname
  const router = useRouter()
  // console.log(router)
  const handleClickGoogle = () => {
    let blankForm = document.createElement('form')
    blankForm.method = 'post'
    blankForm.action = `${process.env.NEXT_PUBLIC_AUTH_URL}${router.pathname}`
    // blankForm.action = `http://localhost:3001/auth/google_oauth2${router.pathname}`

    blankForm.style.display = 'none'
    document.body.appendChild(blankForm)
    blankForm.submit()
    console.log(blankForm)
    document.body.removeChild(blankForm)
  }
  
  return (
    <>
      <a href={`${process.env.NEXT_PUBLIC_AUTH_URL}${router.pathname}`}>Sign in with Google</a>

      <p><button onClick={handleClickGoogle}>clickButton</button></p>

      {/* <form action={`${process.env.NEXT_PUBLIC_AUTH_URL}${router.pathname}`} method="post">
        <p><input type="submit" name="submit" value="clickaggghh" /></p>
      </form> */}
    </>
  )
}