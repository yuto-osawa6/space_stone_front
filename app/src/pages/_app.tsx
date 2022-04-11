import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'
import store from 'store'
import 'styles/globals.scss'
import 'react-quill/dist/quill.snow.css'; 
import 'react-quill/dist/quill.bubble.css'; 
import { DefaultSeo } from 'next-seo';
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return(
      <Provider store={store}> 
        {getLayout( 
          <>
            <DefaultSeo
              defaultTitle = "SpaceTone"
              description = "SpaceToneは、評価やレビューで探せるアニメ評価サイトです。あなたが評価したい作品を正当に評価でき、共有されることを願っています。"
              // あにこれβはおすすめアニメ動画を成分タグ・ランキング・レビュー感想や放送時期でさがせるアニメ評価サイト。参加するとアニメ動画をコレクションできるアニメ棚がもらえるぞ。あにこれβで今すぐアニメを棚で管理！おすすめアニメ動画をみんなで教えあおう！
              // AniList：次世代アニメプラットフォーム・AniListを使用して、お気に入りのアニメやマンガを追跡、共有、発見します。・サイトのテーマ。
            // openGraph={{
            //   type: 'website',
            //   locale: 'en_IE',
            //   url: 'https://www.url.ie/',
            //   site_name: 'SiteName',
            // }}
            // twitter={{
            //   handle: '@handle',
            //   site: '@site',
            //   cardType: 'summary_large_image',
            // }}
            />
            <Component {...pageProps} />
          </>
        )}
      </Provider>
  )
}

export default MyApp
