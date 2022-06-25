

import { Reviews } from "@/components/reviews/Reviews"
import MainSearch from "@/components/search/MainSearch"
import { ShareMain } from "@/components/share/main/ShareMain"
import { Threads } from "@/components/threads/Threads"
import { ProductShow } from "@/components/title/productShow"
import { Top } from "@/components/title/top/Top"
import { productShow } from "@/interfaces/product"
import { useLocale } from "@/lib/ini/local/local"
import { GetServerSideProps } from "next"
import { NextSeo } from "next-seo"

type Props = {
}

const ThreadsIndex: React.FC<Props>& { getLayout: (page: any) => JSX.Element }  = (Props) => {
  const {t} = useLocale()

  return(
  <>
      <NextSeo
      title={`Thread`}
      description = {`スレッド一覧。気になるアニメのスレッドをチェックして、感想をシェアしよう。`}
      openGraph={{
        type: "website",
        title: "MeruPlanet",
        description:`スレッド一覧。気になるアニメのスレッドをチェックして、感想をシェアしよう。`,
        site_name: "MeruPlanet",
        url: `https://meruplanet.com/threads`,
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
      }}
      ></NextSeo>
    </>
  )
}

export default ThreadsIndex

ThreadsIndex.getLayout = (page) => {
  return (
    <ShareMain
      // locationNumber={1}
    >
      <Threads>
        {page}
      </Threads>
    </ShareMain>
  )
}