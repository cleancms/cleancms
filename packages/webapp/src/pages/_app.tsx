import '../styles/global.scss'
import { AppProps } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import store from '../redux'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'

// load env
// require('dotenv').config()
// console.log('baseURL:', process.env.BASEURL)

export default function App({ Component, pageProps }: AppProps) {
  // let store = 
  const queryClientRef = React.useRef<QueryClient>()
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient()
  }

  return (
  <Provider store={store}>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />
      
     <QueryClientProvider client={queryClientRef.current}>
       <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
        </Hydrate>
     </QueryClientProvider>
  </Provider>
  )
}
