import React from 'react'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { getRouteTitle } from '../../../feature/routing/routeDocumentTitle'
import { Routes } from '../../../feature/routing/routes'
import { Navigate } from 'react-router-dom'

const SearchMentorPage: React.FC = () => {
  useDocumentTitle(getRouteTitle(Routes.MyMentoringSearchMentor))

  return <Navigate to={Routes.ConnectionsSearch} />

  // If you want to have different search form for mentors, uncomment and edit the code below
  // return (
  //   <RestrictedRoute>
  //     <MentoringTabs />
  //     <Typography.Title>Search For Mentor</Typography.Title>
  //   </RestrictedRoute>
  // )
}

export default SearchMentorPage
