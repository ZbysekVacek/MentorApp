import React from 'react'
import { Typography } from 'antd'
import RestrictedRoute from '../../../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { getRouteTitle } from '../../../feature/routing/routeDocumentTitle'
import { Routes } from '../../../feature/routing/routes'
import TasksTabs from './TasksTabs'

// TODO MentorApp: implement the page
const TasksPage: React.FC = () => {
  useDocumentTitle(getRouteTitle(Routes.Tasks))

  return (
    <RestrictedRoute>
      <TasksTabs />
      <Typography.Title>Tasks</Typography.Title>
    </RestrictedRoute>
  )
}

export default TasksPage
