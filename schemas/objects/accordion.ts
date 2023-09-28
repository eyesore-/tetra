import { ChevronDownIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

import portableText from './portable-text'

export default defineType({
  title: 'Accordion',
  name: 'accordion',
  type: 'object',
  icon: ChevronDownIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      title: 'Content',
      name: 'content',
      type: portableText.name,
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
