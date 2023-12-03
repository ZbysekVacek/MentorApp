import React from 'react'
import { Flex, message, Space, Typography } from 'antd'
import RestrictedRoute from '../../../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { Routes } from '../../../feature/routing/routes'
import { getRouteTitle } from '../../../feature/routing/routeDocumentTitle'
import {
  useMeetingDeleteDestroy,
  useMeetingFromMentorsList,
  useMeetingList,
  useMeetingUpdatePartialUpdate,
  useUserCurrentRetrieve,
} from '../../../api/generated/generatedApiComponents'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PageLoader from '../../../components/PageLoader'
import Button from '../../../components/Button'
import { formatDateTime } from '../../../utils/utils'
import { useQueryClient } from '@tanstack/react-query'

/** Displays meeting detail */
const MeetingDetailPage: React.FC = () => {
  useDocumentTitle(getRouteTitle(Routes.MeetingDetail))
  const { data: createdMeetings } = useMeetingList({})
  const { data: mentorsMeetings } = useMeetingFromMentorsList({})
  const params = useParams<{ id: string }>()
  const { data: currentUser } = useUserCurrentRetrieve({})
  const deleteMeeting = useMeetingDeleteDestroy()
  const updateMeeting = useMeetingUpdatePartialUpdate()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  if (!createdMeetings || !mentorsMeetings) {
    return (
      <RestrictedRoute>
        <PageLoader />
      </RestrictedRoute>
    )
  }

  const meetingDetail = [...createdMeetings, ...mentorsMeetings].find(
    (meeting) => meeting?.id === Number(params.id)
  )
  const isOwner = meetingDetail?.author?.id == currentUser?.id

  const buttons = (
    <Flex gap={20}>
      <Link to={Routes.Meetings}>
        <Button>Back to all meetings</Button>
      </Link>
      {meetingDetail && isOwner && (
        <>
          <Space />
          <Button
            type="primary"
            loading={deleteMeeting.isPending}
            onClick={() => {
              deleteMeeting.mutate(
                {
                  pathParams: { id: meetingDetail?.id ?? -1 },
                },
                {
                  onSuccess: () => {
                    navigate(Routes.Meetings)
                    queryClient.invalidateQueries({
                      predicate: (query) =>
                        Array.isArray(query.queryKey) &&
                        query.queryKey.includes('meeting'),
                    })
                    message.success('Meeting deleted successfully')
                  },
                  onError: () => {
                    message.error('Meeting cannot be created')
                  },
                }
              )
            }}
          >
            Delete meeting
          </Button>
        </>
      )}

      {meetingDetail && !isOwner && !meetingDetail.registered_mentee?.id && (
        <>
          <Space />
          <Button
            type="primary"
            loading={updateMeeting.isPending}
            onClick={() => {
              updateMeeting.mutate(
                {
                  pathParams: { id: meetingDetail?.id ?? -1 },
                  body: {
                    registered_mentee: currentUser?.id,
                  },
                },
                {
                  onSuccess: () => {
                    queryClient.invalidateQueries({
                      predicate: (query) =>
                        Array.isArray(query.queryKey) &&
                        query.queryKey.includes('meeting'),
                    })
                    message.success('You were registered for the meeting')
                  },
                  onError: () => {
                    message.error(
                      'You cannot be registered for the meeting created'
                    )
                  },
                }
              )
            }}
          >
            Register for meeting
          </Button>
        </>
      )}
      {meetingDetail &&
        !isOwner &&
        meetingDetail.registered_mentee?.id === currentUser?.id && (
          <>
            <Space />
            <Button
              type="primary"
              loading={updateMeeting.isPending}
              onClick={() => {
                updateMeeting.mutate(
                  {
                    pathParams: { id: meetingDetail?.id ?? -1 },
                    body: {
                      registered_mentee: null,
                    },
                  },
                  {
                    onSuccess: () => {
                      queryClient.invalidateQueries({
                        predicate: (query) =>
                          Array.isArray(query.queryKey) &&
                          query.queryKey.includes('meeting'),
                      })
                      message.success('You were unregistered for the meeting')
                    },
                    onError: () => {
                      message.error(
                        'You cannot be unregistered for the meeting created'
                      )
                    },
                  }
                )
              }}
            >
              Unregister
            </Button>
          </>
        )}
    </Flex>
  )

  return (
    <RestrictedRoute>
      <Typography.Title level={2}>Meetings detail</Typography.Title>
      {buttons}
      {!meetingDetail && (
        <Typography.Title level={3}>Meeting not found</Typography.Title>
      )}
      {meetingDetail && (
        <>
          <Typography.Title level={3}>
            Meeting: {meetingDetail.title}
          </Typography.Title>
          <Typography.Title level={5}>
            Date: {formatDateTime(meetingDetail.meeting_date)}
          </Typography.Title>
          <Typography.Title level={5}>
            At: {meetingDetail.location}
          </Typography.Title>
          <Typography.Title level={5}>
            Availability:
            {meetingDetail.registered_mentee?.id
              ? `Registered mentee: ${meetingDetail.registered_mentee?.first_name} ${meetingDetail.registered_mentee.last_name}`
              : 'Free slot'}
          </Typography.Title>
          <Typography.Title level={5}>Description:</Typography.Title>
          <Typography.Paragraph>
            {meetingDetail.description}
          </Typography.Paragraph>
        </>
      )}
    </RestrictedRoute>
  )
}

export default MeetingDetailPage
