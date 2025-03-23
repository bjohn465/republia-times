import { Trans } from '@lingui/react/macro'
import { useLoaderData } from 'react-router'
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
					<li key={newsItem.id}>{newsItem.feedText}</li>
				))}
			</ul>
			<h2 id="paperHeading">
				<Trans>The Republia Times</Trans>
			</h2>
			<ol aria-labelledby="paperHeading">
				{paper.articles.map((article) => (
					<li key={article.newsItem.id}>{article.newsItem.articleText}</li>
				))}
			</ol>
		</>
	)
}
