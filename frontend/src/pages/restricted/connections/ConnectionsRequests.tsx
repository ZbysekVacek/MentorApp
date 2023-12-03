import React from 'react'
import { Col, Row, Typography } from 'antd'
import {
  useConnectionsRequestsList,
  useUserCurrentRetrieve,
} from '../../../api/generated/generatedApiComponents'
import ProfileCard from '../../../feature/user/ProfileCard'
import { assertIsDefined } from '../../../utils/utils'

/** Component for displaying connection requests */
const ConnectionsRequests: React.FC = () => {
  const { data: user } = useUserCurrentRetrieve({})
  const {
    data: connectionRequests,
    isLoading,
    isError,
  } = useConnectionsRequestsList({})

  if (!user || !connectionRequests || isLoading || isError) {
    return <></>
  }

  const requestsFromMe = connectionRequests.filter(
    (currRequest) => currRequest.from_user?.id === user.id
  )
  const requestsToMe = connectionRequests.filter(
    (currRequest) => currRequest.to_user?.id === user.id
  )

  return (
    <div>
      <Typography.Title>My Requests</Typography.Title>
      <Typography.Paragraph>Requests you created</Typography.Paragraph>
      <Row gutter={[20, 20]}>
        {requestsFromMe.map((currConnection) => {
          const toUser = currConnection.to_user
          assertIsDefined(toUser, 'Current user is undefined')

          return (
            <Col lg={12} sm={24}>
              <ProfileCard user={toUser} />
            </Col>
          )
        })}
      </Row>
      <Typography.Title>Requests to you</Typography.Title>
      <Typography.Paragraph>
        Requests from other users to you
      </Typography.Paragraph>
      <Row gutter={[20, 20]}>
        {requestsToMe.map((currConnection) => {
          const fromUser = currConnection.from_user
          assertIsDefined(fromUser, 'Current user is undefined')

          return (
            <Col lg={12} sm={24}>
              <ProfileCard user={fromUser} />
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default ConnectionsRequests
