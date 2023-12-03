import React from 'react'
import { Typography } from 'antd'
import RestrictedRoute from '../../../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { getRouteTitle } from '../../../feature/routing/routeDocumentTitle'
import { Routes } from '../../../feature/routing/routes'
import MentoringTabs from './MentoringTabs'
import { useMentoringAsMentorList } from '../../../api/generated/generatedApiComponents'
import PageLoader from '../../../components/PageLoader'
import MentoringCard from '../../../feature/mentoring/MentoringCard'

/** Displays all mentees */
const MyMenteesPage: React.FC = () => {
  useDocumentTitle(getRouteTitle(Routes.MyMentoringMyMentees))
  const {
    data: myMentorings,
    isError: isMentorsError,
    isLoading: isMentorLoading,
  } = useMentoringAsMentorList({})

  const isLoading = isMentorLoading
  const isError = isMentorsError

  return (
    <RestrictedRoute>
      <MentoringTabs />
      <Typography.Title>My Mentees</Typography.Title>
      {isLoading && <PageLoader />}
      {isError && <Typography.Text>Something went wrong</Typography.Text>}
      {!isLoading && !isError && myMentorings !== undefined && (
        <div>
          {myMentorings.map((currMentoring) => (
            <MentoringCard mentoring={currMentoring} who="mentee" />
          ))}
          {myMentorings.length === 0 && (
            <Typography.Text>You have no mentees</Typography.Text>
          )}
        </div>
      )}
    </RestrictedRoute>
  )
}

export default MyMenteesPage
