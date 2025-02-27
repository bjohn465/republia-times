import { Trans } from '@lingui/react/macro'
import { useLoaderData } from 'react-router'
import { type loader } from './day.data.ts'

export default function Day() {
	const { newsItems } = useLoaderData<typeof loader>()
	return (
		<>
			<h1>
				<Trans>Day 1</Trans>
			</h1>
			<NewsFeed newsItems={newsItems} />
		</>
	)
}

function NewsFeed({ newsItems }: { newsItems: NewsItems }) {
	return (
		<>
			<h2 id="newsFeedHeading">
				<Trans>News Feed</Trans>
			</h2>
			<ul aria-labelledby="newsFeedHeading">
				{
					// When `Iterator.prototype.map` is supported more generally,
					// we can skip the conversion to an array with `Array.from` here.
					// See https://caniuse.com/mdn-javascript_builtins_iterator_map
					Array.from(newsItems.values()).map((newsItem) => (
						<NewsFeedItem key={newsItem.id} newsItem={newsItem} />
					))
				}
			</ul>
		</>
	)
}

function NewsFeedItem({ newsItem }: { newsItem: NewsItem }) {
	return <li>{newsItem.feedText}</li>
}

type NewsItems = ReturnType<typeof useLoaderData<typeof loader>>['newsItems']
type NewsItem = NewsItems extends ReadonlyMap<unknown, infer V> ? V : never
