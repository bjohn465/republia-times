import { customAlphabet } from 'nanoid'
import { newsItemIDAlphabet, newsItemIDLength } from '#app/news-item-id'

const nanoid = customAlphabet(newsItemIDAlphabet, newsItemIDLength)
console.log(nanoid())
