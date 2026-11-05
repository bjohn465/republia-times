import { type Handle, on } from 'remix/component'
import { Layout } from '../../ui/app-shell.tsx'

export function WorkPage(handle: Handle) {
	const blurbs: NewsItem[] = [mockNewsItem]
	const articles: NewsItem[] = []

	return () => (
		<Layout>
			<h1>Day 1</h1>
			<form>
				<h2 id="news-feed-heading">News Feed</h2>
				<ul aria-labelledby="news-feed-heading">
					{blurbs.map((blurb) => {
						const isInPaper = articles.includes(blurb)
						return (
							<li
								key={blurb.blurbText}
								style={{ opacity: isInPaper ? 0.55 : 1 }}
							>
								{blurb.blurbText}{' '}
								<button
									type="button"
									disabled={isInPaper}
									mix={on('click', () => {
										articles.push(blurb)
										void handle.update()
									})}
								>
									Add
								</button>
							</li>
						)
					})}
				</ul>
			</form>
			<section>
				<h2 id="paper-heading">The Republia Times</h2>
				<ul aria-labelledby="paper-heading">
					{articles.map((article, index) => (
						<li key={article.articleText}>
							{article.articleText}{' '}
							<button
								type="button"
								mix={on('click', () => {
									articles.splice(index, 1)
									void handle.update()
								})}
							>
								Remove
							</button>
						</li>
					))}
				</ul>
			</section>
		</Layout>
	)
}

interface NewsItem {
	readonly blurbText: string
	readonly articleText: string
}

const mockNewsItem = Object.freeze({
	blurbText: 'This is a test news item blurb',
	articleText: 'Only a test',
}) satisfies NewsItem
