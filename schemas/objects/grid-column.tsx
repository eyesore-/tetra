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
      blocks: 'blocks',
    },
    prepare({ blocks }) {
      console.log('blocks', blocks)
      return {
        title: 'Block',
        subtitle: blocks ? blocks.map((b) => b._type).join(', ') : '',
      }
    },
  },
})
