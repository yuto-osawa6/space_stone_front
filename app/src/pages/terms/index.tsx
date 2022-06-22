import { ShareMain } from "@/components/share/main/ShareMain"
import { Terms } from "@/components/terms/terms"
import { useLocale } from "@/lib/ini/local/local"


type Props = {

}

const ThreadsIndex: React.FC<Props>& { getLayout: (page: any) => JSX.Element }  = (Props) => {
  const {t} = useLocale()

  return(
    <>
      {/* <NextSeo
      title={`Thread - ${t.domain}`}></NextSeo> */}
      <Terms/>
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