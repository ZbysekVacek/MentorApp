import React from 'react'
import { Typography } from 'antd'
import RestrictedRoute from '../../../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { getRouteTitle } from '../../../feature/routing/routeDocumentTitle'
import { Routes } from '../../../feature/routing/routes'
import { Link, useParams } from 'react-router-dom'
import Button from '../../../components/Button'
import NoteForm from './NoteForm'

/** Displays notes detail */
const NotesDetailPage: React.FC = () => {
  useDocumentTitle(getRouteTitle(Routes.NoteDetail))
  const params = useParams<{ id: string }>()

  return (
    <RestrictedRoute>
      <Typography.Title level={2}>Note detail</Typography.Title>
      <Link to={Routes.Notes}>
        <Button type="primary">Back to all notes</Button>
      </Link>
      <NoteForm noteId={Number(params.id)} />
    </RestrictedRoute>
  )
}

export default NotesDetailPage
