import { ShareMain } from "@/components/share/main/ShareMain"
import { Policy } from "@/components/terms/policy"
import { Terms } from "@/components/terms/terms"
import { useLocale } from "@/lib/ini/local/local"
import { NextSeo } from "next-seo"


type Props = {

}

const ThreadsIndex: React.FC<Props>& { getLayout: (page: any) => JSX.Element }  = (Props) => {
  const {t} = useLocale()

  return(
    <>
      <NextSeo
      title={`プライバシーポリシー`}></NextSeo>
      <Policy/>
    </>
  )
}

export default ThreadsIndex

ThreadsIndex.getLayout = (page) => {
  return (
    <ShareMain
      locationNumber={1}
    >
        {page}
    </ShareMain>
  )
}