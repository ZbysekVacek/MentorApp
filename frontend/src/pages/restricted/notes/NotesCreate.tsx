import React from 'react'
import { Typography } from 'antd'
import RestrictedRoute from '../../../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { getRouteTitle } from '../../../feature/routing/routeDocumentTitle'
import { Routes } from '../../../feature/routing/routes'
import { Link } from 'react-router-dom'
import Button from '../../../components/Button'
import NoteForm from './NoteForm'

/** Displays form for creating a note */
const NotesPage: React.FC = () => {
  useDocumentTitle(getRouteTitle(Routes.Notes))

  return (
    <RestrictedRoute>
      <Typography.Title level={2}>Create note</Typography.Title>
      <Link to={Routes.Notes}>
        <Button type="primary">Back to all notes</Button>
      </Link>
      <br />
      <br />
      <NoteForm />
    </RestrictedRoute>
  )
}

export default NotesPage
