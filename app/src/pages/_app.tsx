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
import { usePageView } from "@/hook/usePreview";


type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
// function MyApp({ Component, pageProps }: AppPropsWithLayout) {
function MyApp({ Component,   pageProps: { session, ...pageProps }, }: AppPropsWithLayout) {
  usePageView();
  const getLayout = Component.getLayout ?? ((page) => page)
  // console.log("aagdafafefefesfes")
  // console.log(process.env.RECAPTCHA_KEY)
  // console.log(process.env.NEXT_PUBLIC_RECAPTCHA_KEY)
  // console.log("aagdafafefefesfes")
  return(
      <Provider store={store}> 
        {/* <SessionProvider session={session}> */}
        <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY} language="ja">
        {getLayout( 
          <>
            <DefaultSeo
              defaultTitle = "MeruPlanet - アニメ！"
              description = "おすすめなアニメを評価・レビュー・ティアで共有しよう！今期や来期のアニメ情報や流行している・高評価のアニメも探せます。"
              openGraph={{
                type: "website",
                title: "MeruPlanet - アニメ！ ",
                description: "おすすめなアニメを評価・レビュー・ティアで共有しよう！今期や来期のアニメ情報や流行している・高評価のアニメも探せます。",
                site_name: "MeruPlanet",
                url: "https://meruplanet.com",
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
              twitter={{
                handle: '@handle',
                site: '@site',
                cardType: 'summary_large_image',
              }}
            />
            <NextNprogress
              color="#ff3073"
              startPosition={0.3}
              stopDelayMs={200}
              height={4}
              options={{ showSpinner: false }}
              showOnShallow={true}
            />
            <Script src="https://accounts.google.com/gsi/client" />
            {/* <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY} language="ja"> */}
              <Component {...pageProps} />
            {/* </GoogleReCaptchaProvider> */}
          </>
        )}
        {/* </SessionProvider> */}
        </GoogleReCaptchaProvider>
      </Provider>
  )
}

export default MyApp
