import { ShareMain } from "@/components/share/main/ShareMain"
import { GetServerSideProps, GetStaticProps } from "next"
import nookies from 'nookies'

type Props = {
}

const ErrorPage403: React.FC<Props>& { getLayout: (page: any) => JSX.Element } = (Props) => {
  return(
    <>
      エラーが発生しました。もう一度やり直すか、お問合せください。
    </>
  )
}
export default ErrorPage403

ErrorPage403.getLayout = function getLayout(page) {
  return (
    <ShareMain>
      {page}
    </ShareMain>
  )
}