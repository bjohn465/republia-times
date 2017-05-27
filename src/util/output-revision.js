// @flow
export default function outputRevision (): void {
  console.info(`Revision ${process.env.GIT_REVISION || 'unknown'}`)
}
