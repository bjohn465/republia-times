import { Trans } from '@lingui/react/macro'
import { useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'

enum DevToolsIntents {
	Navigate = 'Navigate',
}

export default function DevTools() {
	const dialogRef = useRef<HTMLDialogElement>(null)
	const toggleDialogOpen = useCallback(() => {
		const dialog = dialogRef.current
		if (!dialog) return
		if (dialog.open) {
			dialog.close()
		} else {
			dialog.show()
		}
	}, [])
	useEffect(() => {
		const handleKeydown: GlobalEventHandlers['onkeydown'] = (event) => {
			if (!event.ctrlKey || !event.shiftKey || event.key !== 'D') {
				return
			}
			toggleDialogOpen()
		}
		document.addEventListener('keydown', handleKeydown)
		return () => {
			document.removeEventListener('keydown', handleKeydown)
		}
	}, [toggleDialogOpen])

	const navigate = useNavigate()
	const handleForm = (formData: FormData) => {
		const intent = formData.get('intent')
		if (intent === DevToolsIntents.Navigate) {
			const navigateTo = String(formData.get('navigateTo'))
			toggleDialogOpen()
			return navigate(navigateTo)
		}
	}

	return (
		<dialog aria-labelledby="devToolsHeading" ref={dialogRef}>
			<h2 id="devToolsHeading">
				<Trans>Dev Tools</Trans>
			</h2>

			<form action={handleForm}>
				<label htmlFor="navigateTo">
					<Trans>Navigate to</Trans>
				</label>
				<select name="navigateTo" id="navigateTo">
					<option>/morning</option>
					<option>/day</option>
				</select>
				<button type="submit" name="intent" value={DevToolsIntents.Navigate}>
					<Trans>Go</Trans>
				</button>
			</form>

			<form method="dialog">
				<button type="submit">
					<Trans>Close</Trans>
				</button>
			</form>
		</dialog>
	)
}
