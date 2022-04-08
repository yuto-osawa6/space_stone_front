import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'
import store from 'store'
import 'styles/globals.scss'
import 'react-quill/dist/quill.snow.css'; 
import 'react-quill/dist/quill.bubble.css'; 
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
        <Component {...pageProps} />
        )}
      </Provider>
  )
}

export default MyApp
