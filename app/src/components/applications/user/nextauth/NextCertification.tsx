
import { useSession, signIn, signOut } from "next-auth/react"

export const NextCertification:React.FC = function Component() {
  const { data: session } = useSession()
  console.log(session)
  console.log(session)

  if (session) {
    return (
      <>
        Signed in as {session.user?.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}