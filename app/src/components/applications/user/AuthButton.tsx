import { useLocale } from "@/lib/ini/local/local"
import Link from "next/link"
import { useRouter } from "next/router"
import { BsFacebook, BsTwitter } from "react-icons/bs"
import { FcGoogle } from "react-icons/fc"

export const AuthButton:React.FC = function Btn(){
  const router = useRouter()
  const {t} = useLocale()
  return (
    <>
      <a className = "AuthSignIn" href={`${process.env.NEXT_PUBLIC_AUTH_URL}${router.asPath}`}><FcGoogle/>{t.Component.USER.Google}</a>
      {process.env.NODE_ENV === "production"&&(
        <>
          <a className = "AuthSignIn" href={`${process.env.NEXT_PUBLIC_TWITTER_URL}${router.asPath}`}><BsTwitter/>{t.Component.USER.Twitter}</a>
          <a className = "AuthSignIn" href={`${process.env.NEXT_PUBLIC_FACEBOOK_URL}${router.asPath}`}><BsFacebook/>{t.Component.USER.FaceBook}</a>
        </>
      )}
      <div className=""
      style={{
        fontSize:"0.8rem"
      }}
      >
      ※利用開始をもって<Link href="/terms"><a className = "terms_auth">利用規約</a></Link>と<Link href="/privacy"><a className="terms_auth">プライバシーポリシー</a></Link>に同意したものとみなします。<br/>
      ※本サイトは、reCAPTCHAによって保護され、Googleのプライバシーポリシー と 利用規約 が適用されます。
      </div>
    </>
  )
}