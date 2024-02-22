import type { DocumentProps } from 'next/document'
import { Head, Html, Main, NextScript } from 'next/document'
import { FC } from 'react'

export const Document: FC<DocumentProps> = () => (
  <Html lang="en">
    <Head>
      {/*------------------------------------- PWA META START -------------------------------------*/}
      {/* <meta
        name="application-name"
        content={process.env.siteTitle}
      />
      <meta
        name="apple-mobile-web-app-capable"
        content="yes"
      />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="default"
      />
      <meta
        name="apple-mobile-web-app-title"
        content={process.env.siteTitle}
      />

      <meta
        name="format-detection"
        content="telephone=no"
      />
      <meta
        name="mobile-web-app-capable"
        content="yes"
      />

      <meta
        name="msapplication-config"
        content="/pwa/browserconfig.xml"
      />
      <meta
        name="msapplication-TileColor"
        content="#FFFFFF"
      />
      <meta
        name="msapplication-tap-highlight"
        content="no"
      />

      <link
        rel="apple-touch-icon"
        href="/pwa/touch-icon-iphone.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/pwa/touch-icon-ipad.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/pwa/touch-icon-iphone-retina.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="167x167"
        href="/pwa/touch-icon-ipad-retina.png"
      />

      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/pwa/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/pwa/favicon-16x16.png"
      />

      <link
        rel="manifest"
        href="/manifest.json"
      />
      <link
        rel="mask-icon"
        href="/favicon.svg"
        color="#FFFFFF"
      /> */}
      {/*------------------------------------- PWA META END -------------------------------------*/}
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document
