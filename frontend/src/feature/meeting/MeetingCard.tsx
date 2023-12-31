import React from 'react'
import { Meeting } from '../../api/generated/generatedApiSchemas'
import { Avatar, Card } from 'antd'
import { Link } from 'react-router-dom'
import { urlGenerator } from '../routing/routes'
import Button from '../../components/Button'
import { formatDate } from '../../utils/utils'
import './MeetingCard.css'
import { CalendarOutlined } from '@ant-design/icons'

type Props = {
  meeting: Meeting
}
/** Component for displaying a meeting */
const MeetingCard = ({ meeting }: Props) => {
  return (
    <Card
      className="MeetingCard"
      actions={[
        <Link to={urlGenerator.meetingDetail(meeting.id)}>
          <Button>See meeting detail</Button>
        </Link>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar icon={<CalendarOutlined />} />}
        title={<div>{meeting.title}</div>}
        description={<span>Since {formatDate(meeting.created_at)}</span>}
      />
    </Card>
  )
}

export default MeetingCard
