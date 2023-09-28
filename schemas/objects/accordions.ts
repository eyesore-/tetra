import { ChevronDownIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

import accordion from './accordion'

export default defineType({
  title: 'Accordion List',
  name: 'accordions',
  type: 'object',
  icon: ChevronDownIcon,
  fields: [
    defineField({
      title: 'Accordions',
      name: 'items',
      type: 'array',
      of: [{ type: accordion.name }],
    }),
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare({ items }) {
      return {
        title: 'Accordion List',
        subtitle: `${items.length} item(s)`,
      }
    },
  },
})
