import { ShareMain } from "@/components/share/main/ShareMain"
import { Top100 } from "@/components/mains/sub/Top100"
import { useLocale } from "@/lib/ini/local/local"
import { NextSeo } from "next-seo"

type Props = {
}

const Top100Index: React.FC<Props>& { getLayout: (page: any) => JSX.Element }  = (Props) => {
  const {t} = useLocale()

  return(
    <>
      <NextSeo
        title={`Top100`}
        description = "スコア・いいね・流行・アクセス・などからTop100を絞り込めます。現在どんなアニメがTop100に入っているか、チェックしよう！。"
        openGraph={{
          type: "website",
          title: "MeruPlanet",
          description: "スコア・いいね・流行・アクセス・などからTop100を絞り込めます。現在どんなアニメがTop100に入っているか、チェックしよう！",
          site_name: "MeruPlanet",
          url: "https://meruplanet.com/top100",
          images: [
            {
              url: "https://meruplanet.com/MeruPlanetOgp.png",
              width: 1200,
              height: 630,
              alt: 'Og Image Alt',
              type: 'image/png',
            },
          ],
        }}
        // twitter={{
        //   handle: '@handle',
        //   site: '@site',
        //   cardType: 'summary_large_image',
        // }}
      ></NextSeo>
      <Top100/>
    </>
  )
}

export default Top100Index

Top100Index.getLayout = (page) => {
  return (
    <ShareMain
      // locationNumber={1}
    >
      {/* <ProductShow
      // data = {Props.data}
      > */}
        {page}
      {/* </ProductShow>    */}
    </ShareMain>
  )
}