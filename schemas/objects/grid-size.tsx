import { Avatar } from '@sanity/ui'
import { defineField, defineType } from 'sanity'

const sizes = Array.from({ length: 12 }, (_, i) => ++i)

export default defineType({
  title: 'Column Size',
  name: 'gridSize',
  type: 'object',
  fieldsets: [
    {
      title: '',
      name: 'sizes',
      options: { columns: 2 },
    },
  ],
  fields: [
    defineField({
      name: 'breakpoint',
      type: 'string',
      description: 'Control what screen width this is for',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'XS (480px and up)', value: 'xs' },
          { title: 'SM (768px and up)', value: 'sm' },
          { title: 'MD (940px and up)', value: 'md' },
          { title: 'LG (1200px and up)', value: 'lg' },
          { title: 'XL (1600px and up)', value: 'xl' },
        ],
      },
      initialValue: 'default',
      validation: (rule) => rule.required(),
      fieldset: 'sizes',
    }),
    defineField({
      name: 'width',
      type: 'number',
      description: 'Set how many grid spaces this occupies',
      options: {
        list: sizes.map((s) => ({ title: `${s}`, value: s })),
      },
      validation: (rule) => rule.required(),
      fieldset: 'sizes',
    }),
    defineField({
      name: 'justify',
      type: 'string',
      description: 'Control the X-axis positioning',
      options: {
        list: [
          { title: 'Left', value: 'justify-self-start' },
          { title: 'Center', value: 'justify-self-center' },
          { title: 'Right', value: 'justify-self-end' },
        ],
      },
      fieldset: 'sizes',
    }),
    defineField({
      name: 'align',
      type: 'string',
      description: 'Control the Y-axis positioning',
      options: {
        list: [
          { title: 'Top', value: 'self-start' },
          { title: 'Middle', value: 'self-center' },
          { title: 'Bottom', value: 'self-end' },
        ],
      },
      fieldset: 'sizes',
    }),
    defineField({
      title: 'Start (offset)',
      name: 'start',
      type: 'number',
      description: 'Set the grid space this starts in',
      options: {
        list: sizes.map((s) => ({ title: `${s}`, value: s })),
      },
      fieldset: 'sizes',
    }),
  ],
  preview: {
    select: {
      breakpoint: 'breakpoint',
      width: 'width',
      start: 'start',
    },
    prepare({ breakpoint, width, start }) {
      const initial = (breakpoint && breakpoint.trim()) || 'D'
      return {
        title: `Width: ${width}`,
        subtitle: start ? `Offset: ${start}` : null,
        media: <Avatar initials={initial} size={1} />,
      }
    },
  },
})
