import * as v from 'valibot'

export const newsItemIdAlphabet = '6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz'
export const newsItemIdLength = 4

export const NewsItemIdSchema = v.pipe(
	v.string(),
	v.regex(
		new RegExp(`^[${newsItemIdAlphabet}]+$`),
		({ input }) => `Invalid characters in news item ID "${input}"`,
	),
	v.length(
		newsItemIdLength,
		({ input }) => `News item ID "${input}" is not the correct length`,
	),
	v.brand('NewsItemId'),
)

export type NewsItemId = v.InferOutput<typeof NewsItemIdSchema>

export function toNewsItemId(id: string) {
	return v.parse(NewsItemIdSchema, id)
}

export function newsItemIdTag(
	strings: TemplateStringsArray,
	...args: string[]
) {
	const combinedStrings = strings.map(
		(string, index) => `${string}${args[index] || ''}`,
	)
	return toNewsItemId(combinedStrings.join(''))
}

export const NewsItemSchema = v.pipe(
	v.object({
		id: NewsItemIdSchema,
		articleText: v.string(),
		feedText: v.string(),
	}),
	v.readonly(),
)

export type NewsItem = v.InferOutput<typeof NewsItemSchema>
