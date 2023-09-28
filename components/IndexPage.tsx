import Container from 'components/BlogContainer'
import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import IndexPageHead from 'components/IndexPageHead'
import * as demo from 'lib/demo.data'
import type { Page, Settings } from 'lib/sanity.queries'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  pages: Page[]
  settings: Settings
}

export default function IndexPage(props: IndexPageProps) {
  const { preview, loading, pages, settings } = props
  const { title = demo.title, description = demo.description } = settings || {}

  return (
    <>
      <IndexPageHead settings={settings} />

      <Layout preview={preview} loading={loading}>
        <Container>
          <BlogHeader title={title} description={description} level={1} />
          {pages.map((p) => (
            <a
              className="underline underline-offset-4 text-blue-600 hover:text-blue-800"
              key={p.slug}
              href={`/${p.slug}`}
            >
              {p.title}
            </a>
          ))}
        </Container>
      </Layout>
    </>
  )
}
