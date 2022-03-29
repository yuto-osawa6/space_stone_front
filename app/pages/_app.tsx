// import '../styles/globals.scss'
import { AppProps } from 'next/app'
import 'styles/globals.scss'
// import type { AppProps } from 'next/app'
// import { Provider } from "react-redux"
// import store from '../store'
// import store from "store/"

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    // <Provider store={store}>  
    //   <Component {...pageProps} />
    // </Provider>
    <Component {...pageProps} />
  )
}

export default MyApp
