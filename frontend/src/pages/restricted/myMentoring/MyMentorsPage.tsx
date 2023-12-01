import React from 'react'
import { Typography } from 'antd'
import RestrictedRoute from '../../../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { getRouteTitle } from '../../../feature/routing/routeDocumentTitle'
import { Routes } from '../../../feature/routing/routes'
import MentoringTabs from './MentoringTabs'
import { useMentoringAsMenteeList } from '../../../api/generated/generatedApiComponents'
import PageLoader from '../../../components/PageLoader'
import MentoringCard from '../../../feature/mentoring/MentoringCard'

// TODO MentorApp: implement the page
const MyMentoringPage: React.FC = () => {
  useDocumentTitle(getRouteTitle(Routes.MyMentoringMyMentors))
  const {
    data: myMentorings,
    isError: isMentorsError,
    isLoading: isMentorLoading,
  } = useMentoringAsMenteeList({})

  const isLoading = isMentorLoading
  const isError = isMentorsError

  return (
    <RestrictedRoute>
      <MentoringTabs />
      <Typography.Title>My Mentors</Typography.Title>
      {isLoading && <PageLoader />}
      {isError && <Typography.Text>Something went wrong</Typography.Text>}
      {!isLoading && !isError && myMentorings && (
        <div>
          {myMentorings.map((currMentoring) => (
            <MentoringCard mentoring={currMentoring} who="mentor" />
          ))}
          {myMentorings.length === 0 && (
            <Typography.Text>You have no mentors</Typography.Text>
          )}
        </div>
      )}
    </RestrictedRoute>
  )
}

export default MyMentoringPage
