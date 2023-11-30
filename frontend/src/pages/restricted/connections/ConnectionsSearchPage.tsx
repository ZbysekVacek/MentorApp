import React from 'react'
import { Select, Typography } from 'antd'
import RestrictedRoute from '../../../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { getRouteTitle } from '../../../feature/routing/routeDocumentTitle'
import { Routes } from '../../../feature/routing/routes'
import ConnectionsTabs from './ConnectionsTabs'
import {
  useCompetencyAllList,
  useConnectionsList,
  useConnectionsRequestsList,
  useUserCurrentRetrieve,
  useUserSearchList,
  useUserSearchList2,
} from '../../../api/generated/generatedApiComponents'
import PageLoader from '../../../components/PageLoader'
import ProfileCard from '../../../feature/user/ProfileCard'
import './ConnectionsSearchPage.css'

const ConnectionsSearchPage: React.FC = () => {
  useDocumentTitle(getRouteTitle(Routes.ConnectionsSearch))

  const { data: competenciesList } = useCompetencyAllList({})
  const [selectedCompetencies, setSelectedCompetencies] = React.useState([])

  const { data: loggedUser } = useUserCurrentRetrieve({})
  const {
    data: connectionRequests,
    isLoading: isLoadingConnectionRequests,
    isError: isErrorConnectionRequests,
  } = useConnectionsRequestsList({})
  const {
    data: connections,
    isLoading: isLoadingConnections,
    isError: isErrorConnections,
  } = useConnectionsList({})
  const {
    data: pureSearch,
    isError: isErrorPureSearch,
    isLoading: isLoadingPureSearch,
  } = useUserSearchList({}, { enabled: selectedCompetencies?.length === 0 })
  const {
    data: search,
    isError: isErrorSearch,
    isLoading: isLoadingSearch,
  } = useUserSearchList2(
    { pathParams: { competencyIds: selectedCompetencies.join(',') } },
    { enabled: selectedCompetencies?.length !== 0 }
  )
  const isLoading =
    isLoadingPureSearch ||
    isLoadingConnectionRequests ||
    isLoadingConnections ||
    isLoadingSearch
  const isError =
    isErrorPureSearch ||
    isErrorConnectionRequests ||
    isErrorConnections ||
    isErrorSearch
  const results = selectedCompetencies?.length > 0 ? search : pureSearch

  return (
    <RestrictedRoute>
      <ConnectionsTabs />
      <Typography.Title>Search For Connection</Typography.Title>
      {isLoading && <PageLoader />}
      {isError && <Typography.Title>Cannot load data</Typography.Title>}
      {!isLoading &&
        !isError &&
        results &&
        connections &&
        connectionRequests && (
          <div>
            <Typography.Title level={5}>Competencies</Typography.Title>
            <Typography.Paragraph>
              Select competencies you want to limit search to
            </Typography.Paragraph>
            <Select
              mode="multiple"
              className="ConnectionsSearchPage"
              value={selectedCompetencies}
              onChange={(value) => setSelectedCompetencies(value)}
              options={competenciesList?.map((currCompetency) => ({
                label: currCompetency.name,
                value: currCompetency.id,
              }))}
            />
            {results.map((curResult) => (
              <ProfileCard
                user={curResult}
                isConnected={connections.some(
                  (cur) => cur.to?.id === curResult.id
                )}
                hasMentoring={false} // TODO MentorApp implement
                isConnectionRequestedByMe={connectionRequests.some(
                  (cur) =>
                    cur.from_user?.id === loggedUser?.id &&
                    cur.to_user?.id === curResult.id
                )}
                isConnectionRequestedByOtherUser={connectionRequests.some(
                  (cur) =>
                    cur.to_user?.id === loggedUser?.id &&
                    cur.from_user?.id === curResult.id
                )}
                currentUserId={loggedUser?.id ?? -1}
                connectionId={
                  connections.find((curr) => curr.to?.id === curResult.id)?.id
                }
                connectionRequestId={
                  connectionRequests.find(
                    (curr) =>
                      curr.from_user?.id === curResult.id ||
                      curr.to_user?.id === curResult.id
                  )?.id
                }
              />
            ))}
          </div>
        )}
    </RestrictedRoute>
  )
}

export default ConnectionsSearchPage
