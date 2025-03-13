import { Trans } from '@lingui/react/macro'
import { useLoaderData } from 'react-router'
import { hydratePaper } from '#app/state/state-utils.ts'
import { type loader } from './day.data.ts'

export default function Day() {
	const { newsItems, paper: dehydratedPaper } = useLoaderData<typeof loader>()
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
				{
					// When `Iterator.prototype.map` is supported more generally,
					// we can skip the conversion to an array with `Array.from` here.
					// See https://caniuse.com/mdn-javascript_builtins_iterator_map
					Array.from(newsItems.values()).map((newsItem) => (
						<li key={newsItem.id}>{newsItem.feedText}</li>
					))
				}
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
