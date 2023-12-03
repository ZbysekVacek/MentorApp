import React, { useState } from 'react'
import { Alert, Form, Input, message, Select, Typography } from 'antd'
import RestrictedRoute from '../../../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { getRouteTitle } from '../../../feature/routing/routeDocumentTitle'
import { Routes } from '../../../feature/routing/routes'
import TasksTabs from './TasksTabs'
import { Link } from 'react-router-dom'
import Button from '../../../components/Button'
import {
  useMentoringAsMentorList,
  useTasksCreate,
} from '../../../api/generated/generatedApiComponents'
import { Task } from '../../../api/generated/generatedApiSchemas'
import { useQueryClient } from '@tanstack/react-query'

const TaskCreatePage: React.FC = () => {
  useDocumentTitle(getRouteTitle(Routes.TasksCreate))
  const createTask = useTasksCreate()
  const { data: myMentorings } = useMentoringAsMentorList({})
  const queryClient = useQueryClient()
  const [submittable, setSubmittable] = useState(false)
  type FormValues = Record<keyof Task, string>
  const [form] = Form.useForm<FormValues>()
  const formValues = Form.useWatch([], form)
  React.useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true)
      },
      () => {
        setSubmittable(false)
      }
    )
  }, [form, formValues])

  const onFinish = (values: FormValues) => {
    createTask.mutate(
      {
        body: {
          title: values.title,
          description: values.description,
          resolved: false,
          resolved_at: null,
          response: null,
          assignee:
            myMentorings?.find(
              (curr) => curr?.id === Number(values?.related_mentoring)
            )?.mentee?.id ?? -1,
          related_mentoring: Number(values.related_mentoring),
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            predicate: (query) =>
              Array.isArray(query.queryKey) && query.queryKey.includes('tasks'),
          })
          message.success('Task created successfully')
          form.resetFields()
        },
        onError: () => {
          message.error('Task cannot be created')
        },
      }
    )
  }

  return (
    <RestrictedRoute>
      <TasksTabs />
      <Typography.Title>Tasks</Typography.Title>
      <Link to={Routes.TasksCreated}>
        <Button>Back to all my task</Button>
      </Link>
      <br />
      <br />
      <div>
        {createTask.isError && (
          <Alert message="Task cannot be created" type="error" showIcon />
        )}
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          form={form}
          name="create-task-form"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          disabled={createTask.isPending}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[
              { required: true, message: 'Please input title of the meeting!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input description!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="related_mentoring"
            label="Assigne"
            rules={[{ required: true, message: 'Please select assignee!' }]}
          >
            <Select
              style={{ width: '100%' }}
              options={myMentorings?.map((currMentoring) => ({
                label: (
                  <>
                    {currMentoring.mentee.first_name}{' '}
                    {currMentoring.mentee.last_name}
                  </>
                ),
                value: currMentoring.id,
              }))}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              disabled={!submittable}
              loading={createTask.isPending}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </RestrictedRoute>
  )
}

export default TaskCreatePage
