import React from 'react'
import { Card, Col, Divider, Row, Typography } from 'antd'
import RestrictedRoute from '../../../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { getRouteTitle } from '../../../feature/routing/routeDocumentTitle'
import { Routes } from '../../../feature/routing/routes'
import MentoringTabs from './MentoringTabs'
import {
  useMentoringRequestsFromUserList,
  useMentoringRequestsToUserList,
} from '../../../api/generated/generatedApiComponents'
import ProfileCard from '../../../feature/user/ProfileCard'
import { formatDate } from '../../../utils/utils'

// TODO MentorApp: implement the page
const MyMentoringPage: React.FC = () => {
  useDocumentTitle(getRouteTitle(Routes.MyMentoring))
  const {
    data: myRequests,
    isLoading: isMyRequestsLoading,
    isError: isMyRequestsError,
  } = useMentoringRequestsFromUserList({})
  const {
    data: requestsToMe,
    isLoading: isRequestsToMeLoading,
    isError: isRequestsToMeError,
  } = useMentoringRequestsToUserList({})

  const isLoading = isMyRequestsLoading || isRequestsToMeLoading
  const isError = isMyRequestsError || isRequestsToMeError

  return (
    <RestrictedRoute>
      <MentoringTabs />
      <Typography.Title>My Mentoring Dashboard</Typography.Title>
      {isLoading && <Typography.Text>Loading...</Typography.Text>}
      {isError && <Typography.Text>Something went wrong</Typography.Text>}
      {myRequests !== undefined && requestsToMe !== undefined && (
        <>
          <Typography.Title level={4}>My requests for mentors</Typography.Title>
          <Typography.Paragraph>
            My requests to other user to be my mentors
          </Typography.Paragraph>
          {myRequests.length === 0 && (
            <Card>
              <Typography.Text strong>No requests</Typography.Text>
            </Card>
          )}
          {myRequests.map((currRequest) => (
            <>
              {' '}
              <Typography.Paragraph strong>
                Request from day {formatDate(currRequest.created_at)}
              </Typography.Paragraph>
              <Row gutter={[20, 20]}>
                <Col lg={12} sm={24}>
                  <ProfileCard user={currRequest.to_user} />
                </Col>
                <Col lg={12} sm={24}>
                  <Card title="Request text">
                    <Typography.Paragraph>
                      {currRequest.text}
                    </Typography.Paragraph>
                  </Card>
                </Col>
              </Row>
              <Divider />
            </>
          ))}
          <Typography.Title level={4}>
            My requests to be a mentor
          </Typography.Title>
          <Typography.Paragraph>
            Requests from other users to be their mentors
          </Typography.Paragraph>
          <Divider />
          {requestsToMe.length === 0 && (
            <Typography.Text>No requests</Typography.Text>
          )}
          {requestsToMe.map((currRequest) => (
            <>
              {' '}
              <Typography.Paragraph strong>
                Request from day {formatDate(currRequest.created_at)}
              </Typography.Paragraph>
              <Row gutter={[20, 20]}>
                <Col lg={12} sm={24}>
                  <ProfileCard user={currRequest.from_user} />
                </Col>
                <Col lg={12} sm={24}>
                  <Card title="Request text">
                    <Typography.Paragraph>
                      {currRequest.text}
                    </Typography.Paragraph>
                  </Card>
                </Col>
              </Row>
              <Divider />
            </>
          ))}
        </>
      )}
    </RestrictedRoute>
  )
}

export default MyMentoringPage
