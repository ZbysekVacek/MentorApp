import React from 'react'
import { Flex, Input, message, Space, Typography } from 'antd'
import RestrictedRoute from '../../../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { getRouteTitle } from '../../../feature/routing/routeDocumentTitle'
import { Routes, urlGenerator } from '../../../feature/routing/routes'
import {
  useTasksAssignedList,
  useTasksDeleteDestroy,
  useTasksList,
  useTasksPartialUpdate,
  useUserCurrentRetrieve,
} from '../../../api/generated/generatedApiComponents'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import PageLoader from '../../../components/PageLoader'
import Button from '../../../components/Button'
import { formatDateTime } from '../../../utils/utils'
import dayjs from 'dayjs'

// TODO MentorApp: implement the page
const TasksPage: React.FC = () => {
  useDocumentTitle(getRouteTitle(Routes.TaskDetail))
  const { data: createdTasks } = useTasksList({})
  const { data: assignedTasks } = useTasksAssignedList({})
  const params = useParams<{ id: string }>()
  const { data: currentUser } = useUserCurrentRetrieve({})
  const deleteTask = useTasksDeleteDestroy()
  const updateTask = useTasksPartialUpdate()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [response, setResponse] = React.useState('')

  if (!createdTasks || !assignedTasks) {
    return (
      <RestrictedRoute>
        <PageLoader />
      </RestrictedRoute>
    )
  }

  const taskDetail = [...createdTasks, ...assignedTasks].find(
    (currTask) => currTask?.id === Number(params.id)
  )
  const isOwner = taskDetail?.author === currentUser?.id

  const buttons = (
    <Flex gap={20}>
      <Link to={Routes.Tasks}>
        <Button>Back to all tasks</Button>
      </Link>
      {taskDetail && isOwner && (
        <>
          <Space />
          <Button
            type="primary"
            loading={deleteTask.isPending}
            onClick={() => {
              deleteTask.mutate(
                {
                  pathParams: { id: taskDetail?.id ?? -1 },
                },
                {
                  onSuccess: () => {
                    navigate(Routes.TasksCreated)
                    queryClient.invalidateQueries({
                      predicate: (query) =>
                        Array.isArray(query.queryKey) &&
                        query.queryKey.includes('tasks'),
                    })
                    message.success('Task deleted successfully')
                  },
                  onError: () => {
                    message.error('Task cannot be created')
                  },
                }
              )
            }}
          >
            Delete
          </Button>
        </>
      )}
    </Flex>
  )

  return (
    <RestrictedRoute>
      <Typography.Title level={2}>Task detail</Typography.Title>
      {buttons}
      {!taskDetail && (
        <Typography.Title level={3}>Task not found</Typography.Title>
      )}
      {taskDetail && (
        <>
          <Typography.Title level={3}>
            Task: {taskDetail.title}
          </Typography.Title>
          <Typography.Title level={5}>
            Created at: {formatDateTime(taskDetail.created_at)}
          </Typography.Title>
          <Typography.Title level={5}>
            Resolved at:{' '}
            {taskDetail.resolved_at
              ? formatDateTime(taskDetail.resolved_at)
              : 'Not resolved'}
          </Typography.Title>
          <Typography.Title level={5}>
            Related mentoring:{' '}
            <Link
              to={urlGenerator.mentoringDetail(
                taskDetail.related_mentoring ?? -1
              )}
            >
              {' '}
              See mentoring detail
            </Link>{' '}
          </Typography.Title>
          <Typography.Title level={5}>
            Description:
            {taskDetail.description}
          </Typography.Title>
          <Typography.Title level={5}>Response:</Typography.Title>
          <Typography.Paragraph>
            {taskDetail.response ? taskDetail.response : 'No response yet'}
          </Typography.Paragraph>
          {!isOwner &&
            !taskDetail.resolved &&
            taskDetail.assignee === currentUser?.id && (
              <>
                <Typography.Title level={5}>Response:</Typography.Title>
                <Input.TextArea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                />
                <br />
                <br />
                <Button
                  type="primary"
                  loading={updateTask.isPending}
                  onClick={() => {
                    updateTask.mutate(
                      {
                        pathParams: { id: taskDetail?.id ?? -1 },
                        body: {
                          resolved_at: dayjs().toISOString(),
                          response: response,
                          resolved: true,
                        },
                      },
                      {
                        onSuccess: () => {
                          queryClient.invalidateQueries({
                            predicate: (query) =>
                              Array.isArray(query.queryKey) &&
                              query.queryKey.includes('tasks'),
                          })
                          message.success('Task resolved successfully')
                        },
                        onError: () => {
                          message.error('Task couldn not be resolved')
                        },
                      }
                    )
                  }}
                >
                  Mark as resolved and send response
                </Button>{' '}
              </>
            )}
        </>
      )}
    </RestrictedRoute>
  )
}

export default TasksPage
