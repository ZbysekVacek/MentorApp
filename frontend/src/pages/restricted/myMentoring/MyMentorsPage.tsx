import React from 'react'
import { Typography } from 'antd'
import RestrictedRoute from '../../../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { getRouteTitle } from '../../../feature/routing/routeDocumentTitle'
import { Routes } from '../../../feature/routing/routes'
import MentoringTabs from './MentoringTabs'

// TODO MentorApp: implement the page
const MyMentoringPage: React.FC = () => {
  useDocumentTitle(getRouteTitle(Routes.MyMentoringMyMentors))

  return (
    <RestrictedRoute>
      <MentoringTabs />
      <Typography.Title>My Mentors</Typography.Title>
    </RestrictedRoute>
  )
}

export default MyMentoringPage
