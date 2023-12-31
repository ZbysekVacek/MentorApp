import React from 'react'
import { Link } from 'react-router-dom'
import { useDocumentTitle } from '@uidotdev/usehooks'

import { Routes } from '../../feature/routing/routes'
import { Button, Result } from 'antd'

/** Page not found */
const NotFoundPage: React.FC = () => {
  useDocumentTitle('Page not found - MentorApp')

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, we couldn't find the page you're looking for"
      extra={
        <Link to={Routes.HomePage}>
          <Button type="primary">Go back to the Home page</Button>
        </Link>
      }
    />
  )
}

export default NotFoundPage
