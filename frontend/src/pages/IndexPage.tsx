import React from 'react'
import UserInfo from '../feature/user/UserInfo'
import { useUserRetrieve } from '../api/generated/generatedApiComponents'
import { Link } from 'react-router-dom'

import { Routes } from '../feature/routing/routes'
import { Button, Typography } from 'antd'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { getRouteTitle } from '../feature/routing/routeDocumentTitle'

const IndexPage: React.FC = () => {
  const { data: userData, isLoading } = useUserRetrieve({})
  useDocumentTitle(getRouteTitle(Routes.Index))

  return (
    <>
      <Typography.Title level={1}>Welcome to MentorApp</Typography.Title>
      {!userData && !isLoading && (
        <div>
          <Typography.Title level={3}>Please log in</Typography.Title>
          <UserInfo />
        </div>
      )}
      {userData && (
        <Link to={Routes.HomePage}>
          <Button type="primary">Enter the application</Button>
        </Link>
      )}
      <UserInfo />
    </>
  )
}

export default IndexPage
