import { DocumentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

import grid from '../modules/grid'
import hero from '../modules/hero'

export default defineType({
  title: 'Page',
  name: 'page',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    { title: 'Content', name: 'content', default: true },
    { title: 'Settings', name: 'settings' },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'settings',
    }),
    defineField({
      title: 'URL Slug',
      name: 'slug',
      type: 'slug',
      description: 'required',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
      group: 'settings',
    }),
    defineField({
      title: 'SEO / Share Settings',
      name: 'seo',
      type: 'seo',
      group: 'settings',
    }),
    {
      title: 'Page Content',
      name: 'modules',
      type: 'array',
      of: [
        { type: grid.name },
        { type: hero.name },
        // {
        //   title: 'Reusable Section',
        //   type: 'reference',
        //   to: [{ type: 'section' }],
        // },
      ],
      group: 'content',
    },
  ],
  preview: {
    select: { title: 'title', slug: 'slug' },
    prepare({ title, slug }) {
      return {
        title,
        subtitle: slug.current ? `/${slug.current}` : '(missing slug)',
      }
    },
  },
})
