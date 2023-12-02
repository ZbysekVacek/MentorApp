import React from 'react'
import { Typography } from 'antd'
import RestrictedRoute from '../../../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { Routes } from '../../../feature/routing/routes'
import { getRouteTitle } from '../../../feature/routing/routeDocumentTitle'

const MeetingsCreatePage: React.FC = () => {
  useDocumentTitle(getRouteTitle(Routes.Meetings))

  return (
    <RestrictedRoute>
      <Typography.Title level={1}>Meetings</Typography.Title>
      <Typography.Title level={2}>Create</Typography.Title>
    </RestrictedRoute>
  )
}

export default MeetingsCreatePage
