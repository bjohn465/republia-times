import { expect, test } from 'vitest'
import { UnsupportedValueError } from './unsupported-value-error.ts'

test.each`
	value                             | message
	${'a'}                            | ${'Unsupported value: [object String]'}
	${1}                              | ${'Unsupported value: [object Number]'}
	${true}                           | ${'Unsupported value: [object Boolean]'}
	${null}                           | ${'Unsupported value: [object Null]'}
	${undefined}                      | ${'Unsupported value: [object Undefined]'}
	${Symbol()}                       | ${'Unsupported value: [object Symbol]'}
	${[]}                             | ${'Unsupported value: [object Array]'}
	${{}}                             | ${'Unsupported value: [object Object]'}
	${Object.create(null)}            | ${'Unsupported value: [object Object]'}
	${new Date()}                     | ${'Unsupported value: [object Date]'}
	${/a/}                            | ${'Unsupported value: [object RegExp]'}
	${new Error()}                    | ${'Unsupported value: [object Error]'}
	${() => {}}                       | ${'Unsupported value: [object Function]'}
	${new Map()}                      | ${'Unsupported value: [object Map]'}
	${new Set()}                      | ${'Unsupported value: [object Set]'}
	${new WeakMap()}                  | ${'Unsupported value: [object WeakMap]'}
	${new WeakSet()}                  | ${'Unsupported value: [object WeakSet]'}
	${new Promise(() => {})}          | ${'Unsupported value: [object Promise]'}
	${new URL('https://example.com')} | ${'Unsupported value: [object URL]'}
	${new URLSearchParams()}          | ${'Unsupported value: [object URLSearchParams]'}
`('Uses correct error message for $value', ({ value, message }) => {
	expect(() => {
		throw new UnsupportedValueError(value as never)
	}).toThrowError(message)
})
