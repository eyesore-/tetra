import { groq } from 'next-sanity'

const postFields = groq`
  _id,
  title,
  date,
  _updatedAt,
  excerpt,
  coverImage,
  "slug": slug.current,
  "author": author->{name, picture},
`

export const settingsQuery = groq`*[_type == "settings"][0]`

export const indexQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`

export const postAndMoreStoriesQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${postFields}
  }
}`

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`

const BLOCKS = groq`
  _type == 'freeform' => {
    _type,
    _key,
    content[],
    textAlign,
    maxWidth
  },
  _type == 'accordions' => {
    _type,
    _key,
    items[]{
      "id": _key,
      title,
      content[],
    }
  },
`
const MODULES = groq`
_type == 'grid' => {
  _type,
  _key,
  size,
  columns[]{
    sizes[]{
      breakpoint,
      width,
      justify,
      align,
      start
    },
    blocks[]{
      ${BLOCKS}
    }
  }
},
_type == 'hero' => {
  _type,
  _key,
  content[],
  photo,
}
`
export const ALL_SLUGS = groq`*[_type == "page" && defined(slug.current)]{"slug": slug.current, title}`
export const pageQuery = (slug: string) => {
  const slugs = JSON.stringify([slug, `/${slug}`, `/${slug}/`])

  return groq`
    *[_type == "page" && slug.current in ${slugs}] | order(_updatedAt desc)[0]{
      "id": _id,
      "slug": slug.current,
      modules[]{
        defined(_ref) => { ...@->content[0] {
          ${MODULES}
        }},
        !defined(_ref) => {
          ${MODULES},
        }
      },
      title,
      seo
    }
  `
}

export interface Author {
  name?: string
  picture?: any
}

export interface Page {
  slug: string
  title: string
}

export interface Post {
  _id: string
  title?: string
  coverImage?: any
  date?: string
  _updatedAt?: string
  excerpt?: string
  author?: Author
  slug?: string
  content?: any
}

export interface Settings {
  title?: string
  description?: any[]
  ogImage?: {
    title?: string
  }
}
