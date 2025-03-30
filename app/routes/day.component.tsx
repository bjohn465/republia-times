import { Trans } from '@lingui/react/macro'
import { useFetcher, useLoaderData } from 'react-router'
import { Intents } from '#app/intents.ts'
import { type NewsItemID } from '#app/state/news-items.ts'
import { hydratePaper } from '#app/state/state-utils.ts'
import { type loader } from './day.data.ts'

export default function Day() {
	const { newsItems, paper: dehydratedPaper } = useLoaderData<typeof loader>()
	const usedNewsItemIDs = new Set(
		dehydratedPaper.articles.map((article) => article.newsItem),
	)
	// When `Iterator.prototype.filter` is supported more generally,
	// we can skip the conversion to an array with `Array.from` here.
	// See https://caniuse.com/mdn-javascript_builtins_iterator_filter
	const displayedNewsItems = Array.from(newsItems.values()).filter(
		(newsItem) => !usedNewsItemIDs.has(newsItem.id),
	)
	const paper = hydratePaper({ newsItems, paper: dehydratedPaper })

	return (
		<>
			<h1>
				<Trans>Day 1</Trans>
			</h1>
			<h2 id="newsFeedHeading">
				<Trans>News Feed</Trans>
			</h2>
			<ul aria-labelledby="newsFeedHeading">
				{displayedNewsItems.map((newsItem) => (
					<NewsFeedItem key={newsItem.id} id={newsItem.id}>
						{newsItem.feedText}
					</NewsFeedItem>
				))}
			</ul>
			<h2 id="paperHeading">
				<Trans>The Republia Times</Trans>
			</h2>
			<ol aria-labelledby="paperHeading">
				{paper.articles.map((article) => (
					<ArticleItem key={article.newsItem.id}>
						{article.newsItem.articleText}
					</ArticleItem>
				))}
			</ol>
		</>
	)
}

function NewsFeedItem({
	children,
	id,
}: {
	children: React.ReactNode
	id: NewsItemID
}) {
	const fetcher = useFetcher()
	return (
		<li>
			<fetcher.Form method="post">
				{children}
				<input type="hidden" name="id" value={id} />
				<button type="submit" name="intent" value={Intents.AddToPaper}>
					<Trans>Add to paper</Trans>
				</button>
			</fetcher.Form>
		</li>
	)
}

function ArticleItem({ children }: { children: React.ReactNode }) {
	return <li>{children}</li>
}
