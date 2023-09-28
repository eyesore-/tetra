import { defineField, defineType } from 'sanity'

export default defineType({
  title: 'SEO / Share Settings',
  name: 'seo',
  type: 'object',
  options: {
    collapsible: true,
  },
  fields: [
    defineField({
      title: 'Meta Title',
      name: 'metaTitle',
      type: 'string',
      description: 'Title used for search engines and browsers',
      validation: (rule) =>
        rule.max(50).warning('Longer title truncated by search engines'),
    }),
    defineField({
      title: 'Meta Description',
      name: 'metaDesc',
      type: 'text',
      rows: 3,
      description: 'Description for search engines',
      validation: (rule) =>
        rule.max(150).warning('Longer description truncated by search engines'),
    }),
    defineField({
      title: 'Share Title',
      name: 'shareTitle',
      type: 'string',
      description: 'Title used for social sharing cards',
      validation: (rule) =>
        rule.max(50).warning('Longer title truncated by social sites'),
    }),
    defineField({
      title: 'Share Description',
      name: 'shareDesc',
      type: 'text',
      rows: 3,
      description: 'Description used for social sharing cards',
      validation: (rule) =>
        rule.max(150).warning('Longer description truncated by social sites'),
    }),
    defineField({
      title: 'Share Graphic',
      name: 'shareGraphic',
      type: 'image',
      description: 'Recommended: 1200x630 (PNG or JPG)',
    }),
  ],
})
