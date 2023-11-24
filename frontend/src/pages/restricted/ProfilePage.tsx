import React from 'react'
import { Typography } from 'antd'
import RestrictedRoute from '../../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { getRouteTitle } from '../../feature/routing/routeDocumentTitle'
import { Routes } from '../../feature/routing/routes'
import { useParams } from 'react-router-dom'

// TODO MentorApp: implement the page
const ProfilePage: React.FC = () => {
  useDocumentTitle(getRouteTitle(Routes.Notifications))
  const params = useParams<{ userId: string }>()

  return (
    <RestrictedRoute>
      <Typography.Title>Profile {params.userId}</Typography.Title>
    </RestrictedRoute>
  )
}

export default ProfilePage
