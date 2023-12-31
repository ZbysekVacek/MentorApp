import React from 'react'
import { Col, Row, Select, Switch, Typography } from 'antd'
import RestrictedRoute from '../../../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { getRouteTitle } from '../../../feature/routing/routeDocumentTitle'
import { Routes } from '../../../feature/routing/routes'
import ConnectionsTabs from './ConnectionsTabs'
import {
  useCompetencyAllList,
  useConnectionsList,
  useConnectionsRequestsList,
  useUserSearchList,
  useUserSearchList2,
} from '../../../api/generated/generatedApiComponents'
import PageLoader from '../../../components/PageLoader'
import ProfileCard from '../../../feature/user/ProfileCard'
import './ConnectionsSearchPage.css'

/** Connections search page */
const ConnectionsSearchPage: React.FC = () => {
  useDocumentTitle(getRouteTitle(Routes.ConnectionsSearch))

  const { data: competenciesList } = useCompetencyAllList({})
  const [selectedCompetencies, setSelectedCompetencies] = React.useState([])

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

  const [showMentorsOnly, setShowMentorsOnly] = React.useState(false)

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
          <>
            <Row gutter={[20, 20]}>
              <Col lg={12} md={24}>
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
              </Col>
              <Col lg={12} md={24}>
                <Typography.Title level={5}>Show only mentors</Typography.Title>
                <Typography.Paragraph>
                  Check if you want to limit search only for mentors that accept
                  new mentees
                </Typography.Paragraph>
                <Switch
                  checkedChildren="Showing mentors only"
                  unCheckedChildren="Showing all results"
                  checked={showMentorsOnly}
                  onChange={(checked) => setShowMentorsOnly(checked)}
                />
              </Col>
            </Row>
            {results
              .filter(
                (currResult) =>
                  !showMentorsOnly || currResult.profile?.accepts_mentees
              )
              .map((curResult) => (
                <ProfileCard user={curResult} />
              ))}
          </>
        )}
    </RestrictedRoute>
  )
}

export default ConnectionsSearchPage
