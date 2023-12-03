import React from 'react'
import { Typography } from 'antd'
import RestrictedRoute from '../../../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { getRouteTitle } from '../../../feature/routing/routeDocumentTitle'
import { Routes } from '../../../feature/routing/routes'
import ConnectionsTabs from './ConnectionsTabs'
import { useConnectionsList } from '../../../api/generated/generatedApiComponents'
import PageLoader from '../../../components/PageLoader'
import ProfileCard from '../../../feature/user/ProfileCard'
import { assertIsDefined } from '../../../utils/utils'
import ConnectionsRequests from './ConnectionsRequests'

/** Connections page */
const ConnectionsPage: React.FC = () => {
  useDocumentTitle(getRouteTitle(Routes.Connections))
  const { data: allConnections, isLoading, isError } = useConnectionsList({})
  return (
    <RestrictedRoute>
      <ConnectionsTabs />
      <ConnectionsRequests />
      <Typography.Title>My Connections</Typography.Title>
      {isLoading && <PageLoader />}
      {isError && (
        <Typography.Text type="danger">Cannot load connections</Typography.Text>
      )}
      {allConnections && (
        <>
          {allConnections.map((currConnection) => {
            const currUser = currConnection.to
            assertIsDefined(currUser, 'Current user is undefined')

            return <ProfileCard user={currUser} />
          })}
        </>
      )}
    </RestrictedRoute>
  )
}

export default ConnectionsPage
