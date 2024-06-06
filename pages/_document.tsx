import type { DocumentProps } from 'next/document'
import { Head, Html, Main, NextScript } from 'next/document'
import { FC } from 'react'
import { ColorModeScript } from '@chakra-ui/react'
import Link from 'next/link'


export const Document: FC<DocumentProps> = () => (
  <Html lang="en">
    <Head>
      <link
        rel="icon"
        href="./favicon.ico"
      />
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
        href="https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed&family=Poppins:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
    </Head>
    <body>
      <ColorModeScript initialColorMode="dark" />
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document
