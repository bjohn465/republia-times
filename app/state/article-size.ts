import * as v from 'valibot'

export const ArticleSize = Object.freeze({
	Small: 'small',
	Medium: 'medium',
	Large: 'large',
})

export const ArticleSizeSchema = v.picklist(
	Object.values(ArticleSize),
	'Invalid article size',
)
export type ArticleSize = v.InferOutput<typeof ArticleSizeSchema>
