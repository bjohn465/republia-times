import { customAlphabet } from 'nanoid'
import {
	newsItemIdAlphabet,
	newsItemIdLength,
} from '#app/state/news-item-id.ts'

const nanoid = customAlphabet(newsItemIdAlphabet, newsItemIdLength)
console.log(nanoid())
