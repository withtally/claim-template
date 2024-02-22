import type { DocumentProps } from 'next/document'
import { Head, Html, Main, NextScript } from 'next/document'
import { FC } from 'react'

export const Document: FC<DocumentProps> = () => (
  <Html lang="en">
    <Head>
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed&display=swap"
        rel="stylesheet"
      />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document
