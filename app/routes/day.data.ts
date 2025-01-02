import { getNewsItems } from '#app/news-items.ts'

export function loader() {
	return {
		newsItems: getNewsItems(),
	}
}
