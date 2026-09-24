import { type Handle } from 'remix/component'
import { type RemixNode } from 'remix/component/jsx-runtime'

interface LayoutProps {
	children?: RemixNode
}

export function Layout(handle: Handle<LayoutProps>) {
	return () => handle.props.children
}

export function LoadingIndicator() {
	return () => <div role="status">Loading…</div>
}
