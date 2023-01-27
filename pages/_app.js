import '../styles/globals.css'
import dynamic from 'next/dynamic'

const Store = dynamic(() => import('../context/Store'), { ssr: false })

function MyApp({ Component, pageProps }) {
  return (
    <Store>
      <Component {...pageProps} />
    </Store>
  )
}

export default MyApp
