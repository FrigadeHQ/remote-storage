import 'styles/globals.scss'


import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { NextSeo } from 'next-seo'
import Head from 'next/head'

const title = 'remoteStorage'
const description = 'Easily persist data across browsers and devices.'
const siteUrl = 'https://remote.storage'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <NextSeo
        title={`${description} — ${title}`}
        description={description}
        openGraph={{
          type: 'website',
          url: siteUrl,
          title,
          description: description + '.',
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
