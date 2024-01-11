import 'styles/globals.scss'

import type {AppProps} from 'next/app'
import {ThemeProvider} from 'next-themes'
import {NextSeo} from 'next-seo'
import Head from 'next/head'
import Script from "next/script";

const title = 'remoteStorage'
const description = 'Easily persist data across browsers and devices.'
const siteUrl = 'https://remote.storage'
const packageJson = require('../../../packages/js-client/package.json')

export default function App({ Component, pageProps }: AppProps) {
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
      <Script id="posthog">
        {`!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
          posthog.init('phc_N7OxUp5H8Tt5zZyaYevvnr748X4VserVtAvUBk0Ve17',{api_host:'https://app.posthog.com'})`}
      </Script>
      <ThemeProvider disableTransitionOnChange attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
