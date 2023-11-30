import React from 'react'
import { User } from '../../api/generated/generatedApiSchemas'
import { Avatar, Badge, Card, Col, Row, Tag, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { urlGenerator } from '../routing/routes'
import CompetenciesList from '../competency/CompetenciesList'
import './ProfileCard.css'

type Props = {
  user: User
  isConnected: boolean
}
const ProfileCard = (props: Props) => {
  const { user, isConnected } = props

  const card = (
    <Card
      className="ProfileCard"
      actions={[
        <Link to={urlGenerator.profile(user.id)}>See profile</Link>,
        // TODO MentorApp: implement the button
        <Typography.Text>
          Request connection / Lose connections
        </Typography.Text>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar src={user?.profile?.avatar} />}
        title={
          <div>
            {user.first_name + ' ' + user.last_name}
            {user.profile?.accepts_mentees && (
              <div>
                <Tag color="green"> Mentor</Tag>
              </div>
            )}
          </div>
        }
        description={user.profile?.about}
      />
      <Row gutter={[20, 20]}>
        {user.profile?.skills && (
          <Col lg={12} sm={24}>
            <div>
              <Typography.Title level={5}>My Expertise</Typography.Title>
              <Typography.Paragraph>
                {user.profile?.skills}
              </Typography.Paragraph>
            </div>
          </Col>
        )}
        {!!user.profile?.competencies?.length && (
          <Col lg={12} sm={24}>
            <div>
              <Typography.Title level={5}>Competencies</Typography.Title>
              <CompetenciesList
                competencyIds={user.profile?.competencies ?? []}
              />
            </div>
          </Col>
        )}
      </Row>
    </Card>
  )

  if (isConnected) {
    return <Badge.Ribbon text="Connected">{card}</Badge.Ribbon>
  }

  return card
}

export default ProfileCard
