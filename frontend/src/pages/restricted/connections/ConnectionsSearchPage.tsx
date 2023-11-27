import React from 'react'
import { Typography } from 'antd'
import RestrictedRoute from '../../../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { getRouteTitle } from '../../../feature/routing/routeDocumentTitle'
import { Routes } from '../../../feature/routing/routes'
import ConnectionsTabs from './ConnectionsTabs'

// TODO MentorApp: implement the page
const ConnectionsSearchPage: React.FC = () => {
  useDocumentTitle(getRouteTitle(Routes.ConnectionsSearch))

  return (
    <RestrictedRoute>
      <ConnectionsTabs />
      <Typography.Title>Search For Connection</Typography.Title>
    </RestrictedRoute>
  )
}

export default ConnectionsSearchPage
