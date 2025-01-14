import { customAlphabet } from 'nanoid'

const newsItemIDAlphabet = '6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz'
const newsItemIDLength = 4
const nanoid = customAlphabet(newsItemIDAlphabet, newsItemIDLength)
console.log(nanoid())
