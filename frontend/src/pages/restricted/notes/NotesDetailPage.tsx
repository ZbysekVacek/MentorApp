import React from 'react'
import { Typography } from 'antd'
import RestrictedRoute from '../../../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { getRouteTitle } from '../../../feature/routing/routeDocumentTitle'
import { Routes } from '../../../feature/routing/routes'

// TODO MentorApp: implement the page
const NotesPage: React.FC = () => {
  useDocumentTitle(getRouteTitle(Routes.NoteDetail))

  return (
    <RestrictedRoute>
      <Typography.Title>Notes detail</Typography.Title>
    </RestrictedRoute>
  )
}

export default NotesPage
