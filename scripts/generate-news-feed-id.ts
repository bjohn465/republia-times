import { customAlphabet } from 'nanoid'
import { newsItemIdAlphabet, newsItemIdLength } from '#app/state/news-item.ts'

const nanoid = customAlphabet(newsItemIdAlphabet, newsItemIdLength)
console.log(nanoid())
