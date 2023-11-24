import React from 'react'

import { Routes } from '../feature/routing/routes'
import { Typography } from 'antd'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { getRouteTitle } from '../feature/routing/routeDocumentTitle'
import UserInfo from '../feature/user/UserInfo'

// TODO MentorApp: implement the page
const LoginPage = () => {
  useDocumentTitle(getRouteTitle(Routes.Login))

  return (
    <>
      <Typography.Title level={1}>Log in to the MentorApp</Typography.Title>
      <Typography.Title level={3}>
        TODO MentorApp: implement the page
      </Typography.Title>
      <UserInfo />
    </>
  )
}

export default LoginPage
