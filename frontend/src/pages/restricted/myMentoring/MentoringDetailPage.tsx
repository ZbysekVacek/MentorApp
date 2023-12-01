import React from 'react'
import { Card, Col, Divider, Input, message, Row, Typography } from 'antd'
import RestrictedRoute from '../../../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { Routes } from '../../../feature/routing/routes'
import MentoringTabs from './MentoringTabs'
import {
  useMeetingFromMentorsList,
  useMeetingList,
  useMentoringEditPartialUpdate,
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
import MarkdownEditor from '../../../components/markdown/MarkdownEditor'
import MarkdownDisplay from '../../../components/markdown/MarkdownDisplay'
import Button from '../../../components/Button'

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

  const saveSettingsChange = useMentoringEditPartialUpdate({})
  // TODO MentorApp: validate that handleSave works properly
  const handleSave = () => {
    saveSettingsChange.mutate(
      {
        pathParams: { id: mentoring?.id ?? -1 },
        body: {
          frequency_days: selectedFrequency,
          objectives: objectives?.length > 0 ? objectives : undefined,
          settings: contract?.length > 0 ? contract : undefined,
        },
      },
      {
        onSuccess: () => {
          message.success('Settings saved')
        },
        onError: () => {
          message.error('Error while saving settings')
        },
      }
    )
  }

  const [objectives, setObjectives] = React.useState(
    mentoring?.objectives ?? ''
  )
  const [contract, setContract] = React.useState(mentoring?.settings ?? '')

  const [selectedFrequency, setSelectedFrequency] = React.useState(
    mentoring?.frequency_days
  )

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
    isMeetingsFromMentorsLoading ||
    isTasksAssignedLoading ||
    isTasksCreatedLoading ||
    isNotesLoading ||
    saveSettingsChange.isPending
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
        <Col lg={12} sm={24}>
          <NotFinishedTaskCard tasks={notFinishedTasks} />
        </Col>
        <Col lg={12} sm={24}>
          <RelatedNotesCard notes={relatedNotes} />
        </Col>
      </Row>
      <Divider />
      <Typography.Title level={2}>Mentoring settings</Typography.Title>
      <Row gutter={[20, 20]}>
        <Col lg={12} sm={24}>
          <Typography.Title level={5}>
            {' '}
            Agreed frequency of contact
          </Typography.Title>
          <Typography.Paragraph>
            How often do you want to meet? Ideally, the frequency shouldn't be
            longer than 14 days
          </Typography.Paragraph>
          <Input
            type="number"
            min={1}
            value={selectedFrequency}
            onChange={(e) => setSelectedFrequency(Number(e.target.value))}
            disabled={!isCurrentUserMentor}
          />
        </Col>
        <Col span={24}>
          <Typography.Title level={5}>
            {' '}
            Objectives of the mentoring
          </Typography.Title>
          <Typography.Paragraph>
            What are the objectives of the mentoring? What do you both want to
            achieve? What do you both or mentee want to learn?
          </Typography.Paragraph>
          {isCurrentUserMentor ? (
            <MarkdownEditor
              markdown={objectives}
              onChange={(e) => setObjectives(e)}
            />
          ) : (
            <MarkdownDisplay markdown={objectives} />
          )}
        </Col>
        <Col span={24}>
          <Typography.Title level={5}> Mentoring contract</Typography.Title>
          <Typography.Paragraph>
            Here you can specify the mentoring contract. All settings and rules
            you want to follow during the mentoring.
          </Typography.Paragraph>
          {isCurrentUserMentor ? (
            <MarkdownEditor
              markdown={contract}
              onChange={(e) => setContract(e)}
            />
          ) : (
            <MarkdownDisplay markdown={contract} />
          )}
        </Col>
        {isCurrentUserMentor && (
          <Col span={24}>
            <Button onClick={handleSave}>Save</Button>
          </Col>
        )}
      </Row>
    </RestrictedRoute>
  )
}

export default MentoringDetailPage
