import React from 'react'
import { Table, Typography } from 'antd'
import RestrictedRoute from '../../../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { Routes, urlGenerator } from '../../../feature/routing/routes'
import { getRouteTitle } from '../../../feature/routing/routeDocumentTitle'
import {
  useMeetingFromMentorsList,
  useMeetingList,
} from '../../../api/generated/generatedApiComponents'
import { Meeting } from '../../../api/generated/generatedApiSchemas'
import { Link } from 'react-router-dom'
import Button from '../../../components/Button'
import { formatDateTime } from '../../../utils/utils'

/** Lists all meetings */
const MeetingsPage: React.FC = () => {
  useDocumentTitle(getRouteTitle(Routes.Meetings))
  const { data: createdMeetings } = useMeetingList({})
  const { data: mentorsMeetings } = useMeetingFromMentorsList({})

  return (
    <RestrictedRoute>
      <Typography.Title level={2}>Meetings you created</Typography.Title>
      <Link to={Routes.MeetingCreate}>
        <Button type="primary">Create meeting</Button>
      </Link>
      <br />
      <br />
      <Table<Meeting>
        dataSource={createdMeetings ?? []}
        rowKey="id"
        columns={[
          {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
          },
          {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
          },
          {
            title: 'Date',
            dataIndex: 'meeting_date',
            key: 'meeting_date',
            render: (date) => formatDateTime(date),
          },
          {
            title: 'Registered mentee',
            dataIndex: 'registered_mentee',
            key: 'registered_mentee',
            render: (_, currMeeting) => (
              <>
                {currMeeting.registered_mentee?.id ? (
                  <Link
                    to={urlGenerator.profile(currMeeting.registered_mentee?.id)}
                  >
                    See profile
                  </Link>
                ) : (
                  <>No mentee registered</>
                )}
              </>
            ),
          },
          {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, currMeeting) => (
              <Link to={urlGenerator.meetingDetail(currMeeting.id)}>
                Detail
              </Link>
            ),
          },
        ]}
      />
      <Typography.Title level={2}>Meetings from your mentors</Typography.Title>
      <Table<Meeting>
        dataSource={mentorsMeetings ?? []}
        rowKey="id"
        columns={[
          {
            title: 'Mentor',
            dataIndex: 'author',
            key: 'author',
            render: (_, currMeeting) => (
              <Link to={urlGenerator.profile(currMeeting.author?.id)}>
                {currMeeting.author?.first_name} {currMeeting.author?.last_name}
              </Link>
            ),
          },
          {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
          },
          {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
          },
          {
            title: 'Date',
            dataIndex: 'meeting_date',
            key: 'meeting_date',
            render: (date) => formatDateTime(date),
          },
          {
            title: 'Is slot available',
            dataIndex: 'registered_mentee',
            key: 'registered_mentee',
            render: (_, currMeeting) => (
              <>{currMeeting.registered_mentee?.id ? <>No</> : <>Yes</>}</>
            ),
          },
          {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, currMeeting) => (
              <Link to={urlGenerator.meetingDetail(currMeeting.id)}>
                Detail and registration
              </Link>
            ),
          },
        ]}
      />
    </RestrictedRoute>
  )
}

export default MeetingsPage
