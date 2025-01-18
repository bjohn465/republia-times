import { getNewsItems } from '#app/state/news-items.ts'

export function loader() {
	return {
		newsItems: getNewsItems().map((item) => ({
			...item,
			// Return translated text
			// instead of the function that returns the translated text.
			feedText: item.feedText(),
			articleText: item.articleText(),
		})),
	}
}
