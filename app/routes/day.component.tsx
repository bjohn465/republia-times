import { Trans } from '@lingui/react/macro'
import { useLoaderData } from 'react-router'
import { type NewsItem } from '#app/state/news-items.ts'
import { type loader } from './day.data'

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

function NewsFeed({ newsItems }: NewsFeedProps) {
	return (
		<>
			<h2 id="newsFeedHeading">
				<Trans>News Feed</Trans>
			</h2>
			<ul aria-labelledby="newsFeedHeading">
				{newsItems.map((newsItem) => (
					<NewsFeedItem key={newsItem.id} newsItem={newsItem} />
				))}
			</ul>
		</>
	)
}
interface NewsFeedProps {
	newsItems: readonly Readonly<NewsItem>[]
}

function NewsFeedItem({ newsItem }: NewsFeedItemProps) {
	return <li>{newsItem.feedText}</li>
}
interface NewsFeedItemProps {
	newsItem: Readonly<NewsItem>
}
