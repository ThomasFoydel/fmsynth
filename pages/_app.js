import Head from 'next/head'
import dynamic from 'next/dynamic'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css'

const SynthProvider = dynamic(() => import('../context/Synth/SynthProvider'), {
  ssr: false
})

const RotationProvider = dynamic(
  () => import('../context/Rotation/RotationProvider'),
  { ssr: false }
)

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <div>
      <Head>
        <meta
          property='og:image:url'
          content='https://fmsynth.vercel.app/images/preview.jpg'
        />

        <meta property='og:image:width' content='1200px' />
        <meta property='og:image:height' content='630px' />
        <meta property='og:title' content='F M - S Y N T H' />
        <meta
          property='og:description'
          content='A frequency modulation synthesizer for the browser.'
        />
        <meta property='og:url' content='https://fmsynth.vercel.app' />
        <meta property='og:type' content='website' />

        <meta charSet='utf-8' />
        <link rel='icon' href='/images/favicon.ico' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#000000' />

        <link rel='apple-touch-icon' href='/images/logo192.png' />

        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content='https://fmsynth.vercel.app' />
        <meta property='twitter:title' content='F M - S Y N T H' />
        <meta
          property='twitter:description'
          content='A frequency modulation synthesizer for the browser.'
        />
        <meta
          property='twitter:image'
          content='https://fmsynth.vercel.app/images/preview.jpg'
        />

        <title>FM SYNTH</title>
        <meta name='title' content='FM SYNTH' />
        <meta
          name='description'
          content='A frequency modulation synthesizer for the browser.'
        />
      </Head>
      <SessionProvider session={session}>
        <RotationProvider>
          <SynthProvider>
            <Component {...pageProps} />
          </SynthProvider>
        </RotationProvider>
      </SessionProvider>
      <ToastContainer position='bottom-right' />
    </div>
  )
}

export default MyApp
