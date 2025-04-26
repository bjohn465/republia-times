import { Trans } from '@lingui/react/macro'
import { useMemo } from 'react'
import { useFetcher, useFetchers, useLoaderData } from 'react-router'
import * as v from 'valibot'
import { Intents, type Intent } from '#app/intents.ts'
import { ArticleSize } from '#app/state/article-size.ts'
import {
	type NewsItem,
	NewsItemIdSchema,
	type NewsItemId,
} from '#app/state/news-item.ts'
import { hydratePaper } from '#app/state/state-utils.ts'
import { type loader } from './day.data.ts'

export default function Day() {
	const { newsItems, paper: dehydratedPaper } = useLoaderData<typeof loader>()
	const pendingArticles = usePendingArticles(newsItems)
	const pendingArticleIds = new Set(
		pendingArticles.map((article) => article.newsItem),
	)
	const pendingNewsFeedItemIds = usePendingNewsItemIds(
		Intents.RemoveFromPaper,
		newsItems,
	)
	const articlesInPaper = dehydratedPaper.articles
		.filter((article) => !pendingNewsFeedItemIds.has(article.newsItem))
		.concat(pendingArticles)
	const newsItemIdsInPaper = new Set(
		articlesInPaper.map((article) => article.newsItem),
	)
	// When `Iterator.prototype.filter` is supported more generally,
	// we can skip the conversion to an array with `Array.from` here.
	// See https://caniuse.com/mdn-javascript_builtins_iterator_filter
	const newsItemsArray = Array.from(newsItems.values())
	const newsItemsInNewsFeed = newsItemsArray.filter(
		(newsItem) => !newsItemIdsInPaper.has(newsItem.id),
	)
	const paper = hydratePaper({
		newsItems,
		paper: {
			...dehydratedPaper,
			articles: articlesInPaper,
		},
	})

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
					<NewsFeedItem
						key={newsItem.id}
						id={newsItem.id}
						state={
							pendingNewsFeedItemIds.has(newsItem.id)
								? NewsFeedItemStates.Pending
								: NewsFeedItemStates.Displayed
						}
					>
						{newsItem.feedText}
					</NewsFeedItem>
				))}
			</ul>
			<h2 id="paperHeading">
				<Trans>The Republia Times</Trans>
			</h2>
			<ol aria-labelledby="paperHeading">
				{paper.articles.map((article) => (
					<ArticleItem
						key={article.newsItem.id}
						newsItemId={article.newsItem.id}
						size={article.size}
						state={
							pendingArticleIds.has(article.newsItem.id)
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

function usePendingNewsItemIds(
	intent: Intent,
	newsItems: ReadonlyMap<NewsItemId, NewsItem>,
) {
	const fetchers = useFetchers()
	const pendingNewsItemIds = useMemo(
		() =>
			fetchers.reduce((ids, fetcher) => {
				if (fetcher.formData?.get('intent') !== intent) {
					return ids
				}
				const potentialIdResult = v.safeParse(
					NewsItemIdSchema,
					fetcher.formData.get('id'),
				)
				if (
					potentialIdResult.success &&
					newsItems.has(potentialIdResult.output)
				) {
					ids.add(potentialIdResult.output)
				}
				return ids
			}, new Set<NewsItemId>()),
		[fetchers, intent, newsItems],
	)
	return pendingNewsItemIds
}

function usePendingArticles(newsItems: ReadonlyMap<NewsItemId, NewsItem>) {
	function addArticleSize(size: ArticleSize) {
		return (id: NewsItemId) => ({ newsItem: id, size })
	}
	const smallArticleIds = usePendingNewsItemIds(
		Intents.AddToPaperAsSmallArticle,
		newsItems,
	)
	const mediumArticleIds = usePendingNewsItemIds(
		Intents.AddToPaperAsMediumArticle,
		newsItems,
	)
	const largeArticleIds = usePendingNewsItemIds(
		Intents.AddToPaperAsLargeArticle,
		newsItems,
	)
	const pendingArticles = useMemo(
		() =>
			Array.from(smallArticleIds)
				.map(addArticleSize(ArticleSize.Small))
				.concat(
					Array.from(mediumArticleIds).map(addArticleSize(ArticleSize.Medium)),
					Array.from(largeArticleIds).map(addArticleSize(ArticleSize.Large)),
				),
		[smallArticleIds, mediumArticleIds, largeArticleIds],
	)
	return pendingArticles
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
	state,
}: {
	children: React.ReactNode
	id: NewsItemId
	state: NewsFeedItemState
}) {
	const newsItemFormID = getNewsItemFormID(id)

	return (
		<li>
			{children}
			{state === NewsFeedItemStates.Pending && (
				<small>
					<Trans>(Pending)</Trans>
				</small>
			)}
			{state === NewsFeedItemStates.Displayed && (
				<>
					<button
						type="submit"
						form={newsItemFormID}
						name="intent"
						value={Intents.AddToPaperAsSmallArticle}
					>
						<Trans>Add to paper as small article</Trans>
					</button>
					<button
						type="submit"
						form={newsItemFormID}
						name="intent"
						value={Intents.AddToPaperAsMediumArticle}
					>
						<Trans>Add to paper as medium article</Trans>
					</button>
					<button
						type="submit"
						form={newsItemFormID}
						name="intent"
						value={Intents.AddToPaperAsLargeArticle}
					>
						<Trans>Add to paper as large article</Trans>
					</button>
				</>
			)}
		</li>
	)
}

function ArticleItem({
	children,
	newsItemId,
	size,
	state,
}: {
	children: React.ReactNode
	newsItemId: NewsItemId
	size: ArticleSize
	state: ArticleState
}) {
	return (
		<li className={size}>
			{children}
			{state === ArticleStates.Pending && (
				<small>
					<Trans>(Pending)</Trans>
				</small>
			)}
			{state === ArticleStates.Added && (
				<button
					type="submit"
					form={getNewsItemFormID(newsItemId)}
					name="intent"
					value={Intents.RemoveFromPaper}
				>
					<Trans>Remove from paper</Trans>
				</button>
			)}
		</li>
	)
}

const NewsFeedItemStates = Object.freeze({
	Pending: 'pending',
	Displayed: 'displayed',
})
type NewsFeedItemState =
	(typeof NewsFeedItemStates)[keyof typeof NewsFeedItemStates]

const ArticleStates = Object.freeze({
	Pending: 'pending',
	Added: 'added',
})
type ArticleState = (typeof ArticleStates)[keyof typeof ArticleStates]
