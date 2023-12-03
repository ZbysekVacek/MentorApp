import React from 'react'
import { Alert, Form, Input, Popover, Table, Typography } from 'antd'
import RestrictedRoute from '../../../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { getRouteTitle } from '../../../feature/routing/routeDocumentTitle'
import { Routes, urlGenerator } from '../../../feature/routing/routes'
import { Link } from 'react-router-dom'
import Button from '../../../components/Button'
import { Note } from '../../../api/generated/generatedApiSchemas'
import { formatDateTime } from '../../../utils/utils'
import { useNotesList } from '../../../api/generated/generatedApiComponents'

const NotesPage: React.FC = () => {
  useDocumentTitle(getRouteTitle(Routes.Notes))
  const { data: notes } = useNotesList({})

  return (
    <RestrictedRoute>
      <Typography.Title level={2}>Notes</Typography.Title>
      <Link to={Routes.NoteCreate}>
        <Button type="primary">Create note</Button>
      </Link>
      <br />
      <br />
      <Typography.Paragraph>
        You can hover over the note title to see summary of the note
      </Typography.Paragraph>

      <Table<Note>
        dataSource={notes ?? []}
        rowKey="id"
        columns={[
          {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (title, currNote) => (
              <Popover content={currNote.summary} title="Summary">
                {title}
              </Popover>
            ),
          },
          {
            title: 'Created at',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (date) => formatDateTime(date),
          },
          {
            title: 'Detail',
            key: 'detail',
            render: (_, currNote) => (
              <Link to={urlGenerator.noteDetail(currNote.id)}>Detail</Link>
            ),
          },
        ]}
      />
    </RestrictedRoute>
  )
}

export default NotesPage
