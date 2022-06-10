import type {AppProps} from "next/app"
import "styles/global.sass"
import {Provider} from "react-redux"
import {IoProvider} from "socket.io-react-hook"
import Page from "components/Page"
import store from "store"

export default function App({Component, pageProps}: AppProps) {
  return (
    <Provider store={store}>
      <IoProvider>
        <Page {...pageProps.pageConfig}>
          <Component {...pageProps}/>
        </Page>
      </IoProvider>
    </Provider>
  )
}
