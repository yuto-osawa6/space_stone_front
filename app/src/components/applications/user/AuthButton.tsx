import { useLocale } from "@/lib/ini/local/local"
import { useRouter } from "next/router"

export const AuthButton:React.FC = function Btn(){
  const router = useRouter()
  const {t} = useLocale()
  return (
    <>
      <a href={`${process.env.NEXT_PUBLIC_AUTH_URL}${router.asPath}`}>{t.Component.USER.Google}</a>
      {process.env.NODE_ENV === "production"&&(
        <>
          <a href={`${process.env.NEXT_PUBLIC_TWITTER_URL}${router.asPath}`}>{t.Component.USER.Twitter}</a>
          <a href={`${process.env.NEXT_PUBLIC_FACEBOOK_URL}${router.asPath}`}>{t.Component.USER.FaceBook}</a>
        </>
      )}
    </>
  )
}