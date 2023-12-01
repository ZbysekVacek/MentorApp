import React from 'react'
import { Typography } from 'antd'
import RestrictedRoute from '../../../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { Routes } from '../../../feature/routing/routes'
import { getRouteTitle } from '../../../feature/routing/routeDocumentTitle'

const MeetingsPage: React.FC = () => {
  useDocumentTitle(getRouteTitle(Routes.Meetings))

  return (
    <RestrictedRoute>
      <Typography.Title level={2}>Current meetings</Typography.Title>
      <Typography.Title level={2}>Create meeting</Typography.Title>
    </RestrictedRoute>
  )
}

export default MeetingsPage
