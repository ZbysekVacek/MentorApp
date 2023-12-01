import React, { useEffect } from 'react'
import { Card, Col, Row, Typography } from 'antd'
import RestrictedRoute from '../../../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { Routes } from '../../../feature/routing/routes'
import MentoringTabs from './MentoringTabs'
import {
  useMeetingFromMentorsList,
  useMeetingList,
  useMentoringRetrieve,
  useUserCurrentRetrieve,
} from '../../../api/generated/generatedApiComponents'
import { Link, useParams } from 'react-router-dom'
import ProfileCard from '../../../feature/user/ProfileCard'
import PageLoader from '../../../components/PageLoader'
import MeetingCard from '../../../feature/meeting/MeetingCard'

// TODO MentorApp: implement the page
const MentoringDetailPage = () => {
  const params = useParams<{ id: string }>()
  const {
    data: currentUser,
    isError: isCurrentUserError,
    isLoading: isCurrentUserLoading,
  } = useUserCurrentRetrieve({})
  const {
    data: mentoring,
    isError: isMentoringError,
    isLoading: isMentoringLoading,
  } = useMentoringRetrieve({
    pathParams: { id: Number(params.id) },
  })
  const {
    data: meetingsFromUser,
    isError: isMeetingsFromUserError,
    isLoading: isMeetingsFromUserLoading,
  } = useMeetingList({})
  const {
    data: meetingsFromMentors,
    isError: isMeetingsFromMentorsError,
    isLoading: isMeetingsFromMentorsLoading,
  } = useMeetingFromMentorsList({})
  const isCurrentUserMentor = currentUser?.id === mentoring?.mentor?.id
  const title =
    mentoring && currentUser
      ? isCurrentUserMentor
        ? `Mentoring detail for mentee ${
            mentoring?.mentee.first_name + ' ' + mentoring?.mentee.last_name
          }`
        : `Mentoring detail for mentor ${
            mentoring.mentor.first_name + ' ' + mentoring.mentor.last_name
          }`
      : `Mentoring detail for menotring with ID ${params.id}`
  useDocumentTitle(title)

  const isLoading =
    isCurrentUserLoading ||
    isMentoringLoading ||
    isMeetingsFromUserLoading ||
    isMeetingsFromMentorsLoading
  const isError =
    isCurrentUserError ||
    isMentoringError ||
    isMeetingsFromUserError ||
    isMeetingsFromMentorsError

  if (isLoading) {
    return <PageLoader />
  }

  if (isError) {
    return <Typography.Title>Something went wrong</Typography.Title>
  }

  if (!currentUser || !mentoring || !meetingsFromUser || !meetingsFromMentors) {
    return <Typography.Title>Something went wrong</Typography.Title>
  }

  const meetings = isCurrentUserMentor ? meetingsFromUser : meetingsFromMentors
  const meetingsForMentoring = meetings.filter(
    (meeting) =>
      meeting.registered_mentee && // Meeting doesn't have to have registered mentee yet
      meeting.author.id === mentoring.mentor.id &&
      meeting.registered_mentee.id === mentoring.mentee.id
  )
  const latestMeeting = meetingsForMentoring.length
    ? meetingsForMentoring.sort(
        (first, second) => (first?.id ?? 0) - (second?.id ?? 0)
      )[meetingsForMentoring.length - 1]
    : null

  return (
    <RestrictedRoute>
      <MentoringTabs />
      <Typography.Title>Mentoring detail</Typography.Title>
      <Row gutter={[20, 20]}>
        <Col lg={12} sm={24}>
          <Card title={isCurrentUserMentor ? 'Mentee' : 'Mentor'}>
            <ProfileCard
              user={isCurrentUserMentor ? mentoring.mentee : mentoring.mentor}
              isConnected={true}
              hasMentoring={true}
              isConnectionRequestedByMe={false}
              isConnectionRequestedByOtherUser={false}
              currentUserId={currentUser?.id ?? -1}
            />
          </Card>
        </Col>
        <Col lg={12} sm={24}>
          <Card
            title="Latest meetings"
            actions={[<Link to={Routes.Meetings}>See all meetings</Link>]}
          >
            {!latestMeeting && (
              <Typography.Paragraph>
                There are no meetings yet
              </Typography.Paragraph>
            )}
            {!!latestMeeting && <MeetingCard meeting={latestMeeting} />}
          </Card>
        </Col>
      </Row>
    </RestrictedRoute>
  )
}

export default MentoringDetailPage
