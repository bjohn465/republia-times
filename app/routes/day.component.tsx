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
			<NewsFeed newsItems={newsItems} />
			<Paper paper={paper} />
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

function Paper({ paper }: { paper: Paper }) {
	return (
		<>
			<h2 id="paperHeading">
				<Trans>The Republia Times</Trans>
			</h2>
			<ol aria-labelledby="paperHeading">
				{paper.articles.map((article) => (
					<Article key={article.newsItem.id} article={article} />
				))}
			</ol>
		</>
	)
}

function Article({ article }: { article: Article }) {
	return <li>{article.newsItem.articleText}</li>
}

type Paper = ReturnType<typeof hydratePaper>
type Article = Paper['articles'][number]
