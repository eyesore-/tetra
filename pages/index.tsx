import IndexPage from 'components/IndexPage'
import PreviewIndexPage from 'components/PreviewIndexPage'
import { readToken } from 'lib/sanity.api'
import { getClient, getSettings } from 'lib/sanity.client'
import { Page, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import { groq } from 'next-sanity'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  pages: Page[]
  settings: Settings
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const { pages, settings, draftMode } = props

  if (draftMode) {
    return <PreviewIndexPage pages={pages} settings={settings} />
  }

  return <IndexPage pages={pages} settings={settings} />
}

const allPageSlugs = groq`*[_type == "page" && defined(slug.current)]{"slug": slug.current, title}`

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [settings, pages = []] = await Promise.all([
    getSettings(client),
    client.fetch(allPageSlugs),
  ])

  return {
    props: {
      pages,
      settings,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}
