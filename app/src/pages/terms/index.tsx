import { ShareMain } from "@/components/share/main/ShareMain"
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
      title={`利用規約`}
      description = {``}
      openGraph={{
        type: "website",
        title: "利用規約",
        description: ``,
        site_name: "アニメティア",
        url: `https://anime-tier.com/terms`,
        // images: [
        //   {
        //   // url: "https://www.example.ie/og-image-01.jpg",
        //     url: image_path,
        //     width: 1200,
        //     height: 630,
        //     alt: 'Og Image Alt',
        //     type: 'image/png',
        //   },
        // ],
      }}>

      </NextSeo>
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