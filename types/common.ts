export interface Metadata {
  favicon: {
    url: string
  }
  globalSeo: {
    siteName: string
    titleSuffix: string
    fallbackSeo: {
      title: string
      image: {
        url: string
      }
      description: string
    }
  }
}
