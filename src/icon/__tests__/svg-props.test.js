// @flow
import svgIconProps from '../svg-props'

describe('svgIconProps', () => {
  it('makes svg hidden by default', () => {
    expect(svgIconProps()['aria-hidden']).toBe(true)
  })

  it('makes svg non focusable in IE', () => {
    expect(svgIconProps().focusable).toBe(false)
  })

  it('sets the role to img', () => {
    expect(svgIconProps().role).toBe('img')
  })

  it('allows defaults to be overwritten by passed props', () => {
    expect(
      svgIconProps({
        'aria-hidden': null,
        'aria-label': 'Cancel',
        role: 'button'
      })
    ).toMatchObject({
      'aria-hidden': null,
      'aria-label': 'Cancel',
      role: 'button'
    })
  })

  it('adds passed className', () => {
    expect(
      svgIconProps({ className: 'klass' }).className.split(' ')
    ).toContain('klass')
  })
})
