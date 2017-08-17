// @flow
export default function outputRevision (): void {
  // flowlint-next-line sketchy-null-string:off
  console.info(`Revision ${process.env.GIT_REVISION || 'unknown'}`)
}
