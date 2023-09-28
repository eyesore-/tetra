import { SplitVerticalIcon } from '@sanity/icons'
import { Avatar } from '@sanity/ui'
import { defineField, defineType } from 'sanity'

import accordions from './accordions'
import freeform from './freeform'
import gridSize from './grid-size'

export default defineType({
  title: 'Column',
  name: 'gridColumn',
  type: 'object',
  icon: SplitVerticalIcon,
  fields: [
    defineField({
      title: 'Column Sizes',
      name: 'sizes',
      type: 'array',
      of: [{ type: gridSize.name }],
      description:
        'Define the display size of this column for different screen widths',
      validation: (rule) => rule.required().min(1),
    }),
    {
      title: 'Content Blocks',
      name: 'blocks',
      type: 'array',
      description: 'The content that exists inside this column',
      of: [{ type: accordions.name }, { type: freeform.name }],
    },
  ],
  preview: {
    select: {
      sizes: 'sizes.0',
      blocks: 'blocks',
    },
    prepare({ sizes }) {
      const { width } = sizes

      return {
        title: 'Block',
        media: <Avatar initials={width} size={1} />,
      }
    },
  },
})
