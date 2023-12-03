import React from 'react'
import { Divider, Typography } from 'antd'
import RestrictedRoute from '../../../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { getRouteTitle } from '../../../feature/routing/routeDocumentTitle'
import { Routes } from '../../../feature/routing/routes'
import {
  useAppSettingsList,
  useUserCurrentRetrieve,
} from '../../../api/generated/generatedApiComponents'
import NotFilledProfile from './NotFilledProfile'
import MarkdownDisplay from '../../../components/markdown/MarkdownDisplay'

/** Home page */
const HomePage: React.FC = () => {
  useDocumentTitle(getRouteTitle(Routes.HomePage))
  const { data: user } = useUserCurrentRetrieve({})

  const userFullName =
    user && user.first_name && user.last_name
      ? ` ${user.first_name} ${user.last_name}`
      : ''

  const { data: appSettings } = useAppSettingsList({})
  const homepageContent =
    appSettings?.find((curr) => curr.type === 'HOMEPAGE_CONTENT')?.content || ''

  return (
    <RestrictedRoute>
      <Typography.Title>Welcome back {userFullName}</Typography.Title>
      <NotFilledProfile />
      <Divider />
      <MarkdownDisplay markdown={homepageContent} />
    </RestrictedRoute>
  )
}

export default HomePage
