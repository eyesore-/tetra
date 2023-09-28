import { ThLargeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

import gridColumn from '../objects/grid-column'

const sizes = Array.from({ length: 12 }, (_, i) => ++i)

export default defineType({
  title: 'Content Grid',
  name: 'grid',
  type: 'object',
  icon: ThLargeIcon,
  fields: [
    defineField({
      title: 'Grid Size',
      name: 'size',
      type: 'number',
      description:
        'Set the default number of column spaces available for this grid',
      options: {
        list: sizes.map((s) => ({ title: `${s}`, value: s })),
      },
      validation: (rule) => rule.required(),
      initialValue: 12,
    }),
    defineField({
      title: 'Columns',
      name: 'columns',
      type: 'array',
      of: [{ type: gridColumn.name }],
      description: 'Columns that make up grid',
    }),
  ],
  preview: {
    select: {
      columns: 'columns',
    },
    prepare({ columns }) {
      const image = (columns[0].blocks[0].content || []).find(
        (b) => b._type === 'photo',
      )

      return {
        title: `${columns.length} Column${columns.length === 1 ? '' : 's'}`,
        media: image,
      }
    },
  },
})
