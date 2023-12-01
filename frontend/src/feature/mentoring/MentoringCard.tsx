import React from 'react'
import { Mentoring } from '../../api/generated/generatedApiSchemas'
import { Avatar, Card, Col, Row, Tag, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { urlGenerator } from '../routing/routes'
import CompetenciesList from '../competency/CompetenciesList'
import { formatDate } from '../../utils/utils'
import './MentoringCard.css'

type Props = {
  mentoring: Mentoring
  who: 'mentor' | 'mentee'
}
const MentoringCard = ({ mentoring, who }: Props) => {
  const userToShow = who === 'mentor' ? mentoring.mentor : mentoring.mentee

  return (
    <Card
      className="MentoringCard"
      actions={[
        <Link to={urlGenerator.profile(userToShow.id)}>See profile</Link>,
        <Link to={urlGenerator.mentoringDetail(mentoring.id)}>
          Go to mentoring detail
        </Link>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar src={userToShow?.profile?.avatar} />}
        title={
          <div>
            {userToShow?.first_name + ' ' + userToShow?.last_name}
            <div>
              <Tag color="green"> Mentor</Tag>
            </div>
          </div>
        }
        description={<span>Since {formatDate(mentoring.created_at)}</span>}
      />
      <Row gutter={[20, 20]}>
        {userToShow?.profile?.skills && (
          <Col lg={12} sm={24}>
            <div>
              <Typography.Title level={5}>My Expertise</Typography.Title>
              <Typography.Paragraph>
                {userToShow?.profile?.skills}
              </Typography.Paragraph>
            </div>
          </Col>
        )}
        {!!userToShow?.profile?.competencies?.length && (
          <Col lg={12} sm={24}>
            <div>
              <Typography.Title level={5}>Competencies</Typography.Title>
              <CompetenciesList
                competencyIds={userToShow?.profile?.competencies ?? []}
              />
            </div>
          </Col>
        )}
      </Row>
    </Card>
  )
}

export default MentoringCard
