import * as v from 'valibot'
import { assert, describe, expect, test } from 'vitest'
import { getThrownValue } from '#tests/utils.ts'
import { parseFormData } from './form-data.ts'

describe('parseFormData', () => {
	test('Returns parsed form data', () => {
		const formData = new FormData()
		formData.append('keyOne', 'valueOne')
		formData.append('keyTwo', 'valueTwo')
		formData.append('keyThree', 'valueThree')
		const schema = v.object({
			keyOne: v.string(),
			keyTwo: v.string(),
			keyThree: v.string(),
		})
		const result = parseFormData(schema, formData)
		expect(result).toEqual({
			keyOne: 'valueOne',
			keyTwo: 'valueTwo',
			keyThree: 'valueThree',
		})
	})

	test('Returns parsed form data with multiple values per key', () => {
		const formData = new FormData()
		formData.append('single', 'one')
		formData.append('multiple', 'one')
		formData.append('multiple', 'two')
		formData.append('multiple', 'three')
		const schema = v.object({
			single: v.string(),
			multiple: v.array(v.string()),
		})
		const result = parseFormData(schema, formData, {
			arrays: ['multiple'],
		})
		expect(result).toEqual({
			single: 'one',
			multiple: ['one', 'two', 'three'],
		})
	})

	test('Throws Response when form data is missing', async () => {
		const formData = new FormData()
		const schema = v.object({
			intent: v.literal('myIntent', 'Invalid intent'),
		})
		const thrownValue = getThrownValue(() => parseFormData(schema, formData))
		assert.instanceOf(thrownValue, Response)
		expect(thrownValue).toEqual(
			expect.objectContaining({
				status: 400,
				statusText: 'Bad Request',
			}),
		)
		await expect(thrownValue.text()).resolves.toBe(
			'{"nested":{"intent":["Invalid form data"]}}',
		)
	})

	test('Allows invalid form data message to be customized', async () => {
		const formData = new FormData()
		const schema = v.object(
			{
				intent: v.literal('myIntent', 'Invalid intent'),
			},
			'Custom message',
		)
		const thrownValue = getThrownValue(() => parseFormData(schema, formData))
		assert.instanceOf(thrownValue, Response)
		await expect(thrownValue.text()).resolves.toBe(
			'{"nested":{"intent":["Custom message"]}}',
		)
	})

	test('Throws Response when form data is invalid', async () => {
		const formData = new FormData()
		formData.append('intent', 'notAnIntent')
		const schema = v.object({
			intent: v.literal('myIntent', 'Invalid intent'),
		})
		const thrownValue = getThrownValue(() => parseFormData(schema, formData))
		assert.instanceOf(thrownValue, Response)
		expect(thrownValue).toEqual(
			expect.objectContaining({
				status: 400,
				statusText: 'Bad Request',
			}),
		)
		await expect(thrownValue.text()).resolves.toBe(
			'{"nested":{"intent":["Invalid intent"]}}',
		)
	})

	test('Handles variant schemas', async () => {
		const formData = new FormData()
		formData.append('intent', 'myIntent')
		const schema = v.variant('intent', [
			v.object({
				intent: v.literal('myIntent', 'Invalid intent'),
			}),
			v.object({
				intent: v.literal('myOtherIntent', 'Invalid intent'),
				extraData: v.string('Missing extra data'),
			}),
		])
		const result = parseFormData(schema, formData)
		expect(result).toEqual({ intent: 'myIntent' })
	})
})
