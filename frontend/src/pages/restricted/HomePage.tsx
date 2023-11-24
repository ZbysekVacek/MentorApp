import React from 'react'
import { Typography } from 'antd'
import UserInfo from '../../feature/user/UserInfo'
import RestrictedRoute from '../../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { getRouteTitle } from '../../feature/routing/routeDocumentTitle'
import { Routes } from '../../feature/routing/routes'
import { useUserRetrieve } from '../../api/generated/generatedApiComponents'

// TODO MentorApp: implement the page
const HomePage: React.FC = () => {
  useDocumentTitle(getRouteTitle(Routes.HomePage))
  const { data: user } = useUserRetrieve({})

  let userFullName =
    user && user.first_name && user.last_name
      ? ` ${user.first_name} ${user.last_name}`
      : ''

  return (
    <RestrictedRoute>
      <Typography.Title>Welcome back {userFullName}</Typography.Title>
    </RestrictedRoute>
  )
}

export default HomePage