import React from 'react'
import { Typography } from 'antd'
import { ExpectedError } from '../../api/customApiTypes'

type Props = {
  error: unknown
}

/**
 * Renders a list of validation errors
 * @param error Expected errors type: ExpectedError
 */
function ValidationErrorList({ error }: Props) {
  console.log(error)
  if (error && typeof error === 'object' && error.hasOwnProperty('payload')) {
    const typedError = error as ExpectedError
    // Make sure it's actually there. We can trust on the actual object structure
    if (typedError.payload && typeof typedError.payload === 'object') {
      return (
        <Typography.Paragraph>
          <Typography.Text strong>Issues:</Typography.Text>
          <ul>
            {Object.entries(typedError.payload)
              // Do not show status code
              .filter(([key, value]) => key !== 'status_code')
              .map(([key, value]) => {
                return (
                  <li key={key}>
                    {key}: {Array.isArray(value) ? value.join(', ') : value}
                  </li>
                )
              })}
          </ul>
        </Typography.Paragraph>
      )
    }
  }

  return <></>
}

export default ValidationErrorList
