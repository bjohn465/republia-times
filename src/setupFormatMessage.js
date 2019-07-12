// @flow strict-local
import t from 'format-message'
import { underscored_crc32 } from 'format-message-generate-id'
import locales from './locales'

t.setup({
  generateId: underscored_crc32,
  locale: 'en',
  missingTranslation: 'ignore',
  translations: locales,
  formats: {
    time: {
      'H:mm': { hour: 'numeric', minute: '2-digit', timeZone: 'UTC' },
    },
  },
})
