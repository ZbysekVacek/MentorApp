import React from 'react'
import { Typography } from 'antd'
import { MeetingsList } from '../components/MeetingsList'
import { CreateMeeting } from '../components/CreateMeeting'
import RestrictedRoute from '../feature/routing/RestrictedRoute'

const MeetingsPage: React.FC = () => {
  return (
    <RestrictedRoute>
      <Typography.Title level={2}>Current meetings</Typography.Title>
      <MeetingsList />
      <Typography.Title level={2}>Create meeting</Typography.Title>
      <CreateMeeting />
    </RestrictedRoute>
  )
}

export default MeetingsPage
