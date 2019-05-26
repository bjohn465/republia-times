// @flow strict
import type t from 'format-message'

// For src/locales/en.json
declare module './en.json' {
  declare type Setup = $PropertyType<t, 'setup'>
  declare type Translations = $PropertyType<$Call<Setup>, 'translations'>
  declare module.exports: Translations
}
