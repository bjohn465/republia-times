import { type FormDataInfo, decode } from 'decode-formdata'
import * as v from 'valibot'
import { invariant, invariantResponse } from '#app/invariant.ts'

export function parseFormData<TOutput, TIssue extends v.GenericIssue>(
	schema: FormDataSchema<TOutput, TIssue>,
	formData: FormData,
	formDataParsingOptions: FormDataInfo = {},
) {
	const parseResult = v.safeParse(
		{
			...schema,
			message: schema.message ?? 'Invalid form data',
		},
		decode(formData, formDataParsingOptions),
	)
	invariantResponse(parseResult.success, () => {
		invariant(
			parseResult.issues,
			'Form data parsing failed without returning any issues',
		)
		return JSON.stringify(v.flatten(parseResult.issues))
	})
	return parseResult.output
}

type FormDataSchema<TOutput, TIssue extends v.GenericIssue> = v.GenericSchema<
	Record<string, unknown>,
	TOutput,
	TIssue
> & {
	message?: v.ErrorMessage<TIssue>
}
