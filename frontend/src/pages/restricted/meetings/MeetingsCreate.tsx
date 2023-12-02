import React, { useState } from 'react'
import { Alert, Form, Input, message, Typography } from 'antd'
import RestrictedRoute from '../../../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { Routes } from '../../../feature/routing/routes'
import { getRouteTitle } from '../../../feature/routing/routeDocumentTitle'
import { useMeetingCreateCreate } from '../../../api/generated/generatedApiComponents'
import { useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import Button from '../../../components/Button'
import { Meeting } from '../../../api/generated/generatedApiSchemas'

const MeetingsCreatePage: React.FC = () => {
  useDocumentTitle(getRouteTitle(Routes.Meetings))
  const createMeeting = useMeetingCreateCreate()

  const queryClient = useQueryClient()
  const [submittable, setSubmittable] = useState(false)

  type FormValues = Record<keyof Meeting, string>
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
    createMeeting.mutate(
      {
        body: {
          meeting_date: values.meeting_date,

          description: values.description,

          location: values.location,
          registered_mentee: null,

          title: values.title,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            predicate: (query) =>
              Array.isArray(query.queryKey) &&
              query.queryKey.includes('meeting'),
          })
          message.success('Meeting created successfully')
          form.resetFields()
        },
        onError: () => {
          message.error('Meeting cannot be created')
        },
      }
    )
  }

  return (
    <RestrictedRoute>
      <Typography.Title level={2}>Create Meeting</Typography.Title>
      <Link to={Routes.Meetings}>
        <Button>Back to all meetings</Button>
      </Link>
      <br />
      <br />
      <div>
        {createMeeting.isError && (
          <Alert message="Meeting cannot be created" type="error" showIcon />
        )}
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          form={form}
          name="create-meeting-form"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          disabled={createMeeting.isPending}
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
            name="meeting_date"
            label="Meeting date"
            rules={[
              { required: true, message: 'Please input your meeting date!' },
            ]}
          >
            <Input type="datetime-local" />
          </Form.Item>
          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: 'Please input your location!' }]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: 'Please input your description!' },
            ]}
          >
            <Input.TextArea showCount autoSize={{ minRows: 10 }} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              disabled={!submittable}
              loading={createMeeting.isPending}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </RestrictedRoute>
  )
}

export default MeetingsCreatePage
