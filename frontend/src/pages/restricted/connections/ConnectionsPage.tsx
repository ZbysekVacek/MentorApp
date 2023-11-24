import React from 'react'
import { Typography } from 'antd'
import RestrictedRoute from '../../../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { getRouteTitle } from '../../../feature/routing/routeDocumentTitle'
import { Routes } from '../../../feature/routing/routes'
import ConnectionsTabs from './ConnectionsTabs'

// TODO MentorApp: implement the page
const ConnectionsPage: React.FC = () => {
  useDocumentTitle(getRouteTitle(Routes.Connections))

  return (
    <RestrictedRoute>
      <ConnectionsTabs />
      <Typography.Title>My Connections</Typography.Title>
    </RestrictedRoute>
  )
}

export default ConnectionsPage
