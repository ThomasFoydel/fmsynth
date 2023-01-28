import '../styles/globals.css'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const SynthProvider = dynamic(() => import('../context/Synth/SynthProvider'), {
  ssr: false
})

const RotationProvider = dynamic(
  () => import('../context/Rotation/RotationProvider'),
  { ssr: false }
)

const AuthProvider = dynamic(() => import('../context/Auth/AuthProvider'), {
  ssr: false
})

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <meta
          property='og:image:url'
          content='http://fm-synth.herokuapp.com/imgs/preview.jpg'
        />

        <meta property='og:image:width' content='1800px' />
        <meta property='og:image:height' content='1800px' />
        <meta property='og:title' content='F M - S Y N T H' />
        <meta
          property='og:description'
          content='An FM synth for the browser.'
        />
        <meta property='og:url' content='https://fm-synth.herokuapp.com' />
        <meta property='og:type' content='website' />

        <meta charset='utf-8' />
        <link rel='icon' href='/favicon.ico' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#000000' />
        <meta
          name='description'
          content='A Frequency Modulation Synthesizer for the Browser'
        />
        <link rel='apple-touch-icon' href='/logo192.png' />

        <title>FM SYNTH</title>
      </Head>
      <AuthProvider>
        <RotationProvider>
          <SynthProvider>
            <Component {...pageProps} />
          </SynthProvider>
        </RotationProvider>
      </AuthProvider>
    </div>
  )
}

export default MyApp
