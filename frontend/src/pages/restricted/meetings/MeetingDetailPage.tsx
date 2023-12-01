import React from 'react'
import { Typography } from 'antd'
import RestrictedRoute from '../../../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { Routes } from '../../../feature/routing/routes'
import { getRouteTitle } from '../../../feature/routing/routeDocumentTitle'

const MeetingDetailPage: React.FC = () => {
  useDocumentTitle(getRouteTitle(Routes.MeetingDetail))

  return (
    <RestrictedRoute>
      <Typography.Title level={2}>Meetings detail</Typography.Title>
    </RestrictedRoute>
  )
}

export default MeetingDetailPage
