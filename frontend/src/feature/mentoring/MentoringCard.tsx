import React from 'react'
import { Mentoring } from '../../api/generated/generatedApiSchemas'
import { Avatar, Card, Col, Row, Tag, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { urlGenerator } from '../routing/routes'
import Button from '../../components/Button'
import CompetenciesList from '../competency/CompetenciesList'
import { formatDate } from '../../utils/utils'
import './MentoringCard.css'

type Props = {
  mentoring: Mentoring
}
const MentoringCard = ({ mentoring }: Props) => {
  return (
    <Card
      className="MentoringCard"
      actions={[
        <Link to={urlGenerator.profile(mentoring.mentor.id)}>See profile</Link>,
        <Link to={urlGenerator.mentoringDetail(mentoring.id)}>
          <Button>Go to mentoring detail</Button>
        </Link>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar src={mentoring.mentor?.profile?.avatar} />}
        title={
          <div>
            {mentoring.mentor?.first_name + ' ' + mentoring.mentor?.last_name}
            <div>
              <Tag color="green"> Mentor</Tag>
            </div>
          </div>
        }
        description={<span>Since {formatDate(mentoring.created_at)}</span>}
      />
      <Row gutter={[20, 20]}>
        {mentoring.mentor?.profile?.skills && (
          <Col lg={12} sm={24}>
            <div>
              <Typography.Title level={5}>My Expertise</Typography.Title>
              <Typography.Paragraph>
                {mentoring.mentor?.profile?.skills}
              </Typography.Paragraph>
            </div>
          </Col>
        )}
        {!!mentoring.mentor?.profile?.competencies?.length && (
          <Col lg={12} sm={24}>
            <div>
              <Typography.Title level={5}>Competencies</Typography.Title>
              <CompetenciesList
                competencyIds={mentoring.mentor?.profile?.competencies ?? []}
              />
            </div>
          </Col>
        )}
      </Row>
    </Card>
  )
}

export default MentoringCard
