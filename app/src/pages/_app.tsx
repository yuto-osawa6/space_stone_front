import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'
// import store from 'store'
import '@/styles/globals.scss'
import 'react-quill/dist/quill.snow.css'; 
import 'react-quill/dist/quill.bubble.css'; 
import { DefaultSeo } from 'next-seo';
import store from '@/store'
import { SessionProvider } from 'next-auth/react'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Script from 'next/script'
import NextNprogress from 'nextjs-progressbar';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'



type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
// function MyApp({ Component, pageProps }: AppPropsWithLayout) {
function MyApp({ Component,   pageProps: { session, ...pageProps }, }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  // console.log("aagdafafefefesfes")
  // console.log(process.env.RECAPTCHA_KEY)
  // console.log(process.env.NEXT_PUBLIC_RECAPTCHA_KEY)
  // console.log("aagdafafefefesfes")
  return(
      <Provider store={store}> 
        {/* <SessionProvider session={session}> */}
        {getLayout( 
          <>
            <DefaultSeo
              defaultTitle = "MeruPlanet - アニメ！"
              description = "おすすめなアニメを評価・レビュー・ティアーで共有しよう！今期や来期のアニメ情報や流行している・高評価のアニメも探せます。"
              // レビュー、スレッドで共有し、ティアーで比較しよう！!
              // あにこれβはおすすめアニメ動画を成分タグ・ランキング・レビュー感想や放送時期でさがせるアニメ評価サイト。参加するとアニメ動画をコレクションできるアニメ棚がもらえるぞ。あにこれβで今すぐアニメを棚で管理！おすすめアニメ動画をみんなで教えあおう！
              // AniList：次世代アニメプラットフォーム・AniListを使用して、お気に入りのアニメやマンガを追跡、共有、発見します。・サイトのテーマ。
              openGraph={{
                type: "website",
                title: "MeruPlanet",
                description: "おすすめなアニメを評価・レビュー・ティアーで共有しよう！今期や来期のアニメ情報や流行している・高評価のアニメも探せます。",
                site_name: "MeruPlanet",
                url: "https://meruplanet.com",
                images: [
                  {
                  // url: "https://www.example.ie/og-image-01.jpg",
                    url: "https://meruplanet.com/3.png",
                    // width: 800,
                    // height: 600,
                    alt: 'Og Image Alt',
                    type: 'image/png',
                  },
                ],
              }}
              twitter={{
                handle: '@handle',
                site: '@site',
                cardType: 'summary_large_image',
              }}
            />
            <NextNprogress
              color="#29D"
              startPosition={0.3}
              stopDelayMs={200}
              height={2}
              options={{ showSpinner: false }}
              showOnShallow={true}
            />
            <Script src="https://accounts.google.com/gsi/client" />
            <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY} language="ja">
              <Component {...pageProps} />
            </GoogleReCaptchaProvider>
          </>
        )}
        {/* </SessionProvider> */}
      </Provider>
  )
}

export default MyApp
