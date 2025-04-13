import { Trans } from '@lingui/react/macro'
import { useFetcher, useFetchers, useLoaderData } from 'react-router'
import * as v from 'valibot'
import { Intents } from '#app/intents.ts'
import { NewsItemIdSchema, type NewsItemId } from '#app/state/news-item.ts'
import {
	getNewsItemFromCollection,
	hydratePaper,
} from '#app/state/state-utils.ts'
import { type loader } from './day.data.ts'

export default function Day() {
	const { newsItems, paper: dehydratedPaper } = useLoaderData<typeof loader>()
	const fetchers = useFetchers()
	const pendingArticleNewsItemIds = fetchers.reduce((ids, fetcher) => {
		if (fetcher.formData?.get('intent') !== Intents.AddToPaper) {
			return ids
		}
		const potentialIdResult = v.safeParse(
			NewsItemIdSchema,
			fetcher.formData.get('id'),
		)
		if (potentialIdResult.success && newsItems.has(potentialIdResult.output)) {
			ids.add(potentialIdResult.output)
		}
		return ids
	}, new Set<NewsItemId>())
	const newsItemIdsInPaper = new Set(
		dehydratedPaper.articles
			.map((article) => article.newsItem)
			.concat(Array.from(pendingArticleNewsItemIds)),
	)
	// When `Iterator.prototype.filter` is supported more generally,
	// we can skip the conversion to an array with `Array.from` here.
	// See https://caniuse.com/mdn-javascript_builtins_iterator_filter
	const newsItemsArray = Array.from(newsItems.values())
	const newsItemsInNewsFeed = newsItemsArray.filter(
		(newsItem) => !newsItemIdsInPaper.has(newsItem.id),
	)
	const paper = hydratePaper({ newsItems, paper: dehydratedPaper })
	const paperArticles = paper.articles.concat(
		Array.from(pendingArticleNewsItemIds).map((id) => ({
			newsItem: getNewsItemFromCollection(newsItems, id),
		})),
	)

	return (
		<>
			<h1>
				<Trans>Day 1</Trans>
			</h1>
			{newsItemsArray.map((newsItem) => (
				<NewsItemForm key={newsItem.id} newsItemID={newsItem.id} />
			))}
			<h2 id="newsFeedHeading">
				<Trans>News Feed</Trans>
			</h2>
			<ul aria-labelledby="newsFeedHeading">
				{newsItemsInNewsFeed.map((newsItem) => (
					<NewsFeedItem key={newsItem.id} id={newsItem.id}>
						{newsItem.feedText}
					</NewsFeedItem>
				))}
			</ul>
			<h2 id="paperHeading">
				<Trans>The Republia Times</Trans>
			</h2>
			<ol aria-labelledby="paperHeading">
				{paperArticles.map((article) => (
					<ArticleItem
						key={article.newsItem.id}
						state={
							pendingArticleNewsItemIds.has(article.newsItem.id)
								? ArticleStates.Pending
								: ArticleStates.Added
						}
					>
						{article.newsItem.articleText}
					</ArticleItem>
				))}
			</ol>
		</>
	)
}

function NewsItemForm({ newsItemID }: { newsItemID: NewsItemId }) {
	const fetcher = useFetcher()
	return (
		<fetcher.Form id={getNewsItemFormID(newsItemID)} method="post">
			<input type="hidden" name="id" value={newsItemID} />
		</fetcher.Form>
	)
}

function getNewsItemFormID(id: NewsItemId) {
	return `news-item-${id}-form`
}

function NewsFeedItem({
	children,
	id,
}: {
	children: React.ReactNode
	id: NewsItemId
}) {
	return (
		<li>
			{children}
			<button
				type="submit"
				form={getNewsItemFormID(id)}
				name="intent"
				value={Intents.AddToPaper}
			>
				<Trans>Add to paper</Trans>
			</button>
		</li>
	)
}

function ArticleItem({
	children,
	state,
}: {
	children: React.ReactNode
	state: ArticleState
}) {
	return (
		<li>
			{children}
			{state === ArticleStates.Pending && (
				<small>
					<Trans>(Pending)</Trans>
				</small>
			)}
		</li>
	)
}

const ArticleStates = Object.freeze({
	Pending: 'pending',
	Added: 'added',
})
type ArticleState = (typeof ArticleStates)[keyof typeof ArticleStates]
