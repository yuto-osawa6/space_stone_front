import Link from "next/link"
import { FaDiscord } from "react-icons/fa"


export const  Footer:React.FC = () => {

  return(
    <>
      <div className="Footer">
          <div className="FooterSns box26">
            <div className="FooterSnsTitle box-title">community</div>
            <p><a href = "https://discord.gg/umAaS5JvNM"><FaDiscord/></a></p>
            <div className="FooterSnsTitleD">
            </div>
          </div>
          <div className="FooterContents">
            <Link href="/terms"><a className = "terms_auth">利用規約</a></Link>
            <Link href="/privacy"><a className="terms_auth">プライバシーポリシー</a></Link>
          </div>
          <div className="FooterCopyright">
            ©️ 2022 Meruplanet
          </div>
      </div>
    </>
  )
}