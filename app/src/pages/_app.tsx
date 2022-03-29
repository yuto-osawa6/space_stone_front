import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from 'store'
import 'styles/globals.scss'
// app/src/styles/globals.scss

// import 'styles/grobals.scss'
// import type { AppProps } from 'next/app'
// import { Provider } from "react-redux"
// import store from '../store'
// import store from "store/"

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
  // (
    // <Provider store={store}>  
    //   <Component {...pageProps} />
    // </Provider>
    // <Component {...pageProps} />
  // )
}

export default MyApp
