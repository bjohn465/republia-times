import escapeStringRegexp from 'escape-string-regexp'
import * as v from 'valibot'

export const newsItemIDAlphabet = '6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz'
export const newsItemIDLength = 4

export const NewsItemIDSchema = v.pipe(
	v.string(),
	v.length(newsItemIDLength),
	v.regex(new RegExp(`^[${escapeStringRegexp(newsItemIDAlphabet)}]+$`)),
	// Use a "branded type" for the news item ID,
	// so not just any string is used for an ID.
	v.brand('NewsItemID'),
)
export type NewsItemID = v.InferOutput<typeof NewsItemIDSchema>

export function newsItemID(strings: TemplateStringsArray): NewsItemID {
	return v.parse(NewsItemIDSchema, String.raw({ raw: strings }))
}
