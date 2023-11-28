import React from 'react'
import UserInfo from '../../feature/user/UserInfo'
import { useUserCurrentRetrieve } from '../../api/generated/generatedApiComponents'

import { Routes } from '../../feature/routing/routes'
import { Typography } from 'antd'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { getRouteTitle } from '../../feature/routing/routeDocumentTitle'

// TODO MentorApp: implement the page
const IndexPage: React.FC = () => {
  const { data: userData, isLoading } = useUserCurrentRetrieve({})
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
    </>
  )
}

export default IndexPage
