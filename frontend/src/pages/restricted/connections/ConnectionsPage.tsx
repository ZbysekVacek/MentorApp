import React from 'react'
import { Avatar, Badge, Card, Col, Row, Tag, Typography } from 'antd'
import RestrictedRoute from '../../../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { getRouteTitle } from '../../../feature/routing/routeDocumentTitle'
import { Routes, urlGenerator } from '../../../feature/routing/routes'
import ConnectionsTabs from './ConnectionsTabs'
import { useConnectionsList } from '../../../api/generated/generatedApiComponents'
import PageLoader from '../../../components/PageLoader'
import { Link } from 'react-router-dom'
import CompetenciesList from '../../../feature/competency/CompetenciesList'

// TODO MentorApp: implement the page
const ConnectionsPage: React.FC = () => {
  useDocumentTitle(getRouteTitle(Routes.Connections))
  const { data: allConnections, isLoading, isError } = useConnectionsList({})

  return (
    <RestrictedRoute>
      <ConnectionsTabs />
      <Typography.Title>My Connections</Typography.Title>
      {isLoading && <PageLoader />}
      {isError && (
        <Typography.Text type="danger">Cannot load connections</Typography.Text>
      )}
      {allConnections && (
        <>
          {allConnections.map((currConnection) => {
            return (
              <Badge.Ribbon text="Connected">
                <Card
                  key={currConnection.id}
                  actions={[
                    <Link to={urlGenerator.profile(currConnection.id)}>
                      See profile
                    </Link>,
                    // TODO MentorApp: implement the button
                    <Typography.Text>
                      Request connection / Lose connections
                    </Typography.Text>,
                  ]}
                >
                  <Card.Meta
                    avatar={<Avatar src={currConnection.to?.profile?.avatar} />}
                    title={
                      <div>
                        {currConnection.to?.first_name +
                          ' ' +
                          currConnection.to?.last_name}
                        {currConnection.to?.profile?.accepts_mentees && (
                          <div>
                            <Tag color="green"> Mentor</Tag>
                          </div>
                        )}
                      </div>
                    }
                    description={currConnection.to?.profile?.about}
                  />
                  <Row gutter={[20, 20]}>
                    {currConnection.to?.profile?.skills && (
                      <Col lg={12} sm={24}>
                        <div>
                          <Typography.Title level={5}>
                            My Expertise
                          </Typography.Title>
                          <Typography.Paragraph>
                            {currConnection.to?.profile?.skills}
                          </Typography.Paragraph>
                        </div>
                      </Col>
                    )}
                    {!!currConnection.to?.profile?.competencies?.length && (
                      <Col lg={12} sm={24}>
                        <div>
                          <Typography.Title level={5}>
                            Competencies
                          </Typography.Title>
                          <CompetenciesList
                            competencyIds={
                              currConnection.to?.profile?.competencies ?? []
                            }
                          />
                        </div>
                      </Col>
                    )}
                  </Row>
                </Card>
              </Badge.Ribbon>
            )
          })}
        </>
      )}
    </RestrictedRoute>
  )
}

export default ConnectionsPage
