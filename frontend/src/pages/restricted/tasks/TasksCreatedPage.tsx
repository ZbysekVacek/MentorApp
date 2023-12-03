import React from 'react'
import { Table, Typography } from 'antd'
import RestrictedRoute from '../../../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { getRouteTitle } from '../../../feature/routing/routeDocumentTitle'
import { Routes, urlGenerator } from '../../../feature/routing/routes'
import TasksTabs from './TasksTabs'
import { Link } from 'react-router-dom'
import Button from '../../../components/Button'
import { Task } from '../../../api/generated/generatedApiSchemas'
import { formatDateTime } from '../../../utils/utils'
import { useTasksList } from '../../../api/generated/generatedApiComponents'

const TasksCreatedPage: React.FC = () => {
  useDocumentTitle(getRouteTitle(Routes.Tasks))
  const { data: tasksCreated } = useTasksList({})

  return (
    <RestrictedRoute>
      <TasksTabs />
      <Typography.Title>Tasks</Typography.Title>
      <Link to={Routes.TasksCreate}>
        <Button type="primary">Create task</Button>
      </Link>
      <br />
      <br />
      <Table<Task>
        dataSource={tasksCreated ?? []}
        rowKey="id"
        columns={[
          {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
          },
          {
            title: 'Assigned on',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (date) => formatDateTime(date),
          },
          {
            title: 'Is resolved',
            dataIndex: 'resolved',
            key: 'resolved',
            render: (resolved) => (resolved ? 'Yes' : 'No'),
          },
          {
            title: 'Assignee',
            dataIndex: 'assignee',
            key: 'assignee',
            render: (_, currTask) => (
              <>
                <Link to={urlGenerator.profile(currTask.assignee ?? -1)}>
                  See profile
                </Link>
              </>
            ),
          },
          {
            title: 'Mentoring detail',
            dataIndex: 'related_mentoring',
            key: 'related_mentoring',
            render: (_, currTask) => (
              <>
                {currTask.related_mentoring && (
                  <Link
                    to={urlGenerator.mentoringDetail(
                      currTask.related_mentoring ?? -1
                    )}
                  >
                    See mentoring
                  </Link>
                )}
              </>
            ),
          },
          {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, currTask) => (
              <Link to={urlGenerator.taskDetail(currTask.id)}>Detail</Link>
            ),
          },
        ]}
      />
    </RestrictedRoute>
  )
}

export default TasksCreatedPage
