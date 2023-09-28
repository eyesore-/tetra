import { PortableText, PortableTextReactComponents } from '@portabletext/react'
import { readToken } from 'lib/sanity.api'
import { getClient } from 'lib/sanity.client'
import { ALL_SLUGS, type Page, pageQuery } from 'lib/sanity.queries'
import { useLiveQuery } from 'next-sanity/preview'

const heroComponents: Partial<PortableTextReactComponents> = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        {children}
      </h1>
    ),
    normal: ({ children }) => (
      <p className="mt-6 text-lg leading-8 text-gray-600">{children}</p>
    ),
  },
}

const Hero = ({ data }) => (
  <div className="mx-auto max-w-2xl py-28 sm:py-36 lg:py-48">
    <div className="text-center">
      <PortableText value={data.content} components={heroComponents} />
    </div>
  </div>
)

const accordionComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => (
      <p className="mt-4 text-md text-gray-600">{children}</p>
    ),
  },
}

const Accordion = ({ data }) => (
  <details>
    <summary className="list-none font-semibold">{data.title}</summary>
    <PortableText value={data.content} components={accordionComponents} />
  </details>
)
const AccordionList = ({ data }) => (
  <ul role="list" className="divide-y divide-gray-100">
    {data.items.map((a) => (
      <li key={a._key} className="gap-x-6 py-5">
        <Accordion data={a} />
      </li>
    ))}
  </ul>
)

const Freeform = ({ data }) => <PortableText value={data.content} />

const ColumnBlock = ({ data }) => {
  const Block = {
    accordions: AccordionList,
    freeform: Freeform,
  }[data._type]

  if (!Block) return null

  return <Block data={data} />
}

const Column = ({ data }) => {
  const [size] = data.sizes

  return (
    <div className={`col-span-${size.width}`}>
      {data.blocks.map((b) => (
        <ColumnBlock key={b._key} data={b} />
      ))}
    </div>
  )
}

const Grid = ({ data }) => (
  <div className={`grid grid-cols-${data.size} gap-x-16 gap-y-16 mx-16`}>
    {data.columns.map((c, i) => (
      <Column key={i} data={c} />
    ))}
  </div>
)

const Module = ({ data }) => {
  const M = {
    hero: Hero,
    grid: Grid,
  }[data._type]

  if (!M) return null

  return <M data={data} />
}

const ProdPage = ({ data }) =>
  data?.modules.map((m) => <Module key={m._key} data={m} />)
const PreviewPage = ({ data }) => {
  const [liveData] = useLiveQuery(data, pageQuery(data.slug))

  return liveData?.modules.map((m) => <Module key={m._key} data={m} />)
}

const Page = ({ data, draftMode }) => {
  console.log({ data, draftMode })

  if (draftMode) return <PreviewPage data={data} />

  return <ProdPage data={data} />
}

export async function getStaticProps({ draftMode, params }) {
  const token = draftMode ? readToken : ''
  const client = getClient(draftMode ? { token } : undefined)
  const data = await client.fetch(pageQuery(params.slug.join('/')))

  return {
    props: { data, draftMode, token },
  }
}

export async function getStaticPaths({ draftMode }) {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const pages = await client.fetch<Page[]>(ALL_SLUGS)

  return {
    paths: pages.map((page) => {
      const slug = page.slug.split('/').filter(Boolean)

      return { params: { slug } }
    }),
    fallback: false,
  }
}

export default Page
