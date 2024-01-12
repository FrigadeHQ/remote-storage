import 'styles/globals.scss'

import type {AppProps} from 'next/app'
import {ThemeProvider} from 'next-themes'
import {NextSeo} from 'next-seo'
import Head from 'next/head'
import {useEffect} from 'react'
import {useRouter} from 'next/router'

import posthog from 'posthog-js'

// Check that PostHog is client-side (used to handle Next.js SSR)
if (typeof window !== 'undefined') {
  posthog.init("phc_N7OxUp5H8Tt5zZyaYevvnr748X4VserVtAvUBk0Ve17", {
    api_host: 'https://app.posthog.com',
    // Enable debug mode in development
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug()
    }
  })
}

const title = 'remoteStorage'
const description = 'Easily persist data across browsers and devices.'
const siteUrl = 'https://remote.storage'
const packageJson = require('../../../packages/js-client/package.json')

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter()

  useEffect(() => {
    // Track page views
    const handleRouteChange = () => posthog?.capture('$pageview')
    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <NextSeo
        title={`${description} — ${title}`}
        description={packageJson.description}
        openGraph={{
          type: 'website',
          url: siteUrl,
          title,
          description: packageJson.description,
          images: [
            {
              url: `${siteUrl}/og.png`,
              alt: title,
            },
          ],
        }}
      />
      <ThemeProvider disableTransitionOnChange attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
