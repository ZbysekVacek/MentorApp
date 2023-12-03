import React from 'react'
import { Alert, Card, Col, Divider, Row, Typography } from 'antd'
import RestrictedRoute from '../../../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { Routes } from '../../../feature/routing/routes'
import MentoringTabs from './MentoringTabs'
import {
  useMeetingFromMentorsList,
  useMeetingList,
  useMentoringRetrieve,
  useNotesList,
  useTasksAssignedList,
  useUserCurrentRetrieve,
} from '../../../api/generated/generatedApiComponents'
import { Link, useParams } from 'react-router-dom'
import ProfileCard from '../../../feature/user/ProfileCard'
import PageLoader from '../../../components/PageLoader'
import MeetingCard from '../../../feature/meeting/MeetingCard'
import NotFinishedTaskCard from '../../../feature/task/NotFinishedTaskCard'
import RelatedNotesCard from '../../../feature/notes/RelatedNotesCard'
import MentoringSettings from './MentoringSettings'

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
  const {
    data: tasksAssigned,
    isError: isTasksAssignedError,
    isLoading: isTasksAssignedLoading,
  } = useTasksAssignedList({})
  const {
    data: tasksCreated,
    isError: isTasksCreatedError,
    isLoading: isTasksCreatedLoading,
  } = useTasksAssignedList({})
  const {
    data: notes,
    isError: isNotesError,
    isLoading: isNotesLoading,
  } = useNotesList({})

  const isCurrentUserMentor = currentUser?.id === mentoring?.mentor?.id
  const title =
    mentoring && currentUser
      ? isCurrentUserMentor
        ? `Mentoring detail for mentee ${
            mentoring?.mentee?.first_name + ' ' + mentoring?.mentee?.last_name
          }`
        : `Mentoring detail for mentor ${
            mentoring.mentor?.first_name + ' ' + mentoring.mentor?.last_name
          }`
      : `Mentoring detail for menotring with ID ${params.id}`
  useDocumentTitle(title)

  const isLoading =
    isCurrentUserLoading ||
    isMentoringLoading ||
    isMeetingsFromUserLoading ||
    isMeetingsFromMentorsLoading ||
    isTasksAssignedLoading ||
    isTasksCreatedLoading ||
    isNotesLoading
  const isError =
    isCurrentUserError ||
    isMentoringError ||
    isMeetingsFromUserError ||
    isMeetingsFromMentorsError ||
    isTasksAssignedError ||
    isTasksCreatedError ||
    isNotesError

  if (isLoading) {
    return <PageLoader />
  }

  if (isError) {
    return <Typography.Title>Something went wrong</Typography.Title>
  }

  if (
    !currentUser ||
    !mentoring ||
    !meetingsFromUser ||
    !meetingsFromMentors ||
    !tasksAssigned ||
    !tasksCreated ||
    !notes
  ) {
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

  const validTasksAssigned = (
    isCurrentUserMentor ? tasksCreated : tasksAssigned
  ).filter((currTask) => currTask?.related_mentoring === mentoring?.id)
  const notFinishedTasks = validTasksAssigned.filter(
    (currTask) => !currTask.resolved
  )

  const relatedNotes = notes.filter(
    (note) => note.related_mentoring === mentoring.id
  )

  const isMentoringSetupped =
    mentoring?.objectives?.length ??
    (0 > 0 && mentoring?.settings?.length) ??
    (0 > 0 && !!mentoring?.frequency_days)

  return (
    <RestrictedRoute>
      <MentoringTabs />
      <Typography.Title>Mentoring detail</Typography.Title>
      {!isMentoringSetupped && (
        <>
          <Alert
            message="You haven't setup your mentoring yet"
            description="Please setup your mentoring. You should meet and
             on objectives, settings and frequency of
            meetings. Everything you agree  on should be filled into objectives
             or into mentoring contract"
            type="info"
            showIcon
          />
          <br />
        </>
      )}
      <Row gutter={[20, 20]}>
        <Col lg={12} sm={24}>
          <Card title={isCurrentUserMentor ? 'Mentee' : 'Mentor'}>
            <ProfileCard
              user={isCurrentUserMentor ? mentoring.mentee : mentoring.mentor}
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
        <Col lg={12} sm={24}>
          <NotFinishedTaskCard tasks={notFinishedTasks} />
        </Col>
        <Col lg={12} sm={24}>
          <RelatedNotesCard notes={relatedNotes} />
        </Col>
      </Row>
      <Divider />
      <Typography.Title level={2}>Mentoring settings</Typography.Title>
      <MentoringSettings
        mentoring={mentoring}
        isCurrentUserMentor={isCurrentUserMentor}
      />
    </RestrictedRoute>
  )
}

export default MentoringDetailPage
