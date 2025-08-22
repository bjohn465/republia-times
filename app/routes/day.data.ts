import { type ActionFunctionArgs } from 'react-router'
import * as v from 'valibot'
import { parseFormData } from '#app/form-data.ts'
import { Intents, intentSchema } from '#app/intents.ts'
import { ArticleSize } from '#app/state/article-size.ts'
import { DayState } from '#app/state/day-state.ts'
import { getExpectedGameState, updateGameState } from '#app/state/game-state.ts'
import { NewsItemIdSchema } from '#app/state/news-item.ts'
import { dehydratePaper } from '#app/state/state-utils.ts'
import { UnsupportedValueError } from '#app/unsupported-value-error.ts'

export function loader() {
	const gameState = getExpectedGameState(
		DayState,
		'Invalid game state for "day" loader',
	)
	return {
		newsItems: gameState.newsItems,
		paper: dehydratePaper(gameState.paper),
	}
}

export async function action({ request }: ActionFunctionArgs) {
	const gameState = getExpectedGameState(
		DayState,
		'Invalid game state for "day" action',
	)
	const data = parseFormData(DayActionFormDataSchema, await request.formData())
	switch (data.intent) {
		case Intents.AddToPaperAsSmallArticle: {
			updateGameState(gameState.addToPaper(data.id, ArticleSize.Small))
			return { ok: true }
		}
		case Intents.AddToPaperAsMediumArticle: {
			updateGameState(gameState.addToPaper(data.id, ArticleSize.Medium))
			return { ok: true }
		}
		case Intents.AddToPaperAsLargeArticle: {
			updateGameState(gameState.addToPaper(data.id, ArticleSize.Large))
			return { ok: true }
		}
		case Intents.RemoveFromPaper: {
			updateGameState(gameState.removeFromPaper(data.id))
			return { ok: true }
		}
		default:
			throw new UnsupportedValueError(data)
	}
}

const DayActionFormDataSchema = v.variant('intent', [
	v.object({
		intent: intentSchema(Intents.AddToPaperAsSmallArticle),
		id: NewsItemIdSchema,
	}),
	v.object({
		intent: intentSchema(Intents.AddToPaperAsMediumArticle),
		id: NewsItemIdSchema,
	}),
	v.object({
		intent: intentSchema(Intents.AddToPaperAsLargeArticle),
		id: NewsItemIdSchema,
	}),
	v.object({
		intent: intentSchema(Intents.RemoveFromPaper),
		id: NewsItemIdSchema,
	}),
])
