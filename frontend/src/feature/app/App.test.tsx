import React from 'react'
import { render, screen } from '@testing-library/react'

test.skip('App test', () => {
  render(<div />)
  const linkElement = screen.getByText(/Current meetings/i)
  expect(linkElement).toBeInTheDocument()
})
