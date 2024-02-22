import Head from 'next/head'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { siteName } from '~/constants/site'
import { Metadata } from '~/types/common'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  author?: string
  publishedTime?: string
  metadata?: Metadata
}

export const SEO: FC<SEOProps> = ({ title, description, image, author, publishedTime, metadata }) => {
  const { pathname } = useRouter()

  // const favicon = process.env.siteFavicon
  // const titleSuffix = process.env.siteTitle
  const _image = image || process.env.siteImagePreviewURL
  const metaDescription = description || process.env.siteDescription

  const siteUrl = process.env.siteUrl
  const siteDomain = process.env.siteDomain
  const metaTitle = title ? `${title} | ${siteName}` : siteName
  // const siteFavicon = favicon
  const imagePreview = _image?.includes('https://') ? _image : `${process.env.siteUrl}${_image}`

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta
        httpEquiv="X-UA-Compatible"
        content="IE=edge"
      />
      <meta
        property="title"
        content={metaTitle}
      />
      <meta
        name="description"
        content={metaDescription}
      />
      {publishedTime && (
        <meta
          name="publish_date"
          property="og:publish_date"
          content={publishedTime}
        />
      )}
      {author && (
        <meta
          name="author"
          content={author}
        />
      )}
      <link
        href="https://app.hedgey.finance/favicon-dark.svg"
        rel="icon"
        media="(prefers-color-scheme: light)"
      />
      <link
        href="https://app.hedgey.finance/favicon-light.svg"
        rel="icon"
        media="(prefers-color-scheme: dark)"
      />
      {/* Open Graph */}
      <meta
        property="og:title"
        content={metaTitle}
        key="ogtitle"
      />
      <meta
        name="image"
        property="og:image"
        content={imagePreview}
        key="ogimage"
      />
      <meta
        property="og:site_name"
        content={siteName}
        key="ogsitename"
      />
      <meta
        property="og:description"
        content={metaDescription}
        key="ogdesc"
      />
      <meta
        property="og:type"
        content="website"
      />

      {/* <!-- Facebook Meta Tags --> */}
      <meta
        property="og:url"
        content={`${siteUrl}${pathname}`}
      />

      {/* <!-- Twitter Meta Tags --> */}
      <meta
        property="twitter:domain"
        content={siteDomain}
      />
      <meta
        property="twitter:url"
        content={siteUrl}
      />
      <meta
        name="twitter:card"
        content="summary_large_image"
      />
      <meta
        name="twitter:title"
        content={metaTitle}
      />
      <meta
        name="twitter:description"
        content={metaDescription}
      />
      <meta
        name="twitter:image"
        content={imagePreview}
      />

      {/* Tab theme colour */}
      <meta
        name="theme-color"
        content="#FF6900"
      />

      <title>{metaTitle}</title>
    </Head>
  )
}
