import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders Current meetings', () => {
  render(<App />)
  const linkElement = screen.getByText(/Current meetings/i)
  expect(linkElement).toBeInTheDocument()
})
