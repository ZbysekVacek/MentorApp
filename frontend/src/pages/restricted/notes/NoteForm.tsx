import React, { useEffect, useState } from 'react'
import { Alert, Form, Input, message, Select } from 'antd'
import RestrictedRoute from '../../../feature/routing/RestrictedRoute'
import Button from '../../../components/Button'
import { NoteRequest } from '../../../api/generated/generatedApiSchemas'
import {
  useMentoringAsMenteeList,
  useMentoringAsMentorList,
  useNotesCreate,
  useNotesPartialUpdate,
  useNotesRetrieve,
} from '../../../api/generated/generatedApiComponents'
import { useQueryClient } from '@tanstack/react-query'
import PageLoader from '../../../components/PageLoader'
import { useNavigate } from 'react-router-dom'
import { urlGenerator } from '../../../feature/routing/routes'

type Props = { noteId?: number }
const NoteForm = ({ noteId }: Props) => {
  const createNote = useNotesCreate({})
  const updateNote = useNotesPartialUpdate({})
  const redirect = useNavigate()
  const { data: menotringAsMentor } = useMentoringAsMentorList({})
  const { data: menotringAsMentee } = useMentoringAsMenteeList({})
  const { data: note } = useNotesRetrieve({
    pathParams: { id: Number(noteId) },
  })
  const [wasFormInitialized, setWasFormInitialized] = useState(false)

  const queryClient = useQueryClient()
  const [submittable, setSubmittable] = useState(false)

  type FormValues = NoteRequest
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

  useEffect(() => {
    if (!wasFormInitialized && note) {
      form.setFieldsValue({
        title: note.title,
        summary: note.summary,
        content: note.content,
        related_mentoring: note.related_mentoring
          ? note.related_mentoring
          : undefined,
      })
      setWasFormInitialized(true)
    }
  }, [form, note, wasFormInitialized])

  const onFinish = (values: FormValues) => {
    if (!noteId) {
      createNote.mutate(
        {
          body: {
            title: values.title,
            summary: values.summary,
            content: values.content,
            related_mentoring: values.related_mentoring ?? undefined,
            // TODO MentorApp: related meeting?
          },
        },
        {
          onSuccess: (newNote) => {
            queryClient.invalidateQueries({
              predicate: (query) =>
                Array.isArray(query.queryKey) &&
                query.queryKey.includes('notes'),
            })
            message.success('Note created successfully')
            form.resetFields()
            if (newNote.id) {
              redirect(urlGenerator.noteDetail(newNote.id))
            }
          },
          onError: () => {
            message.error('Note cannot be created')
          },
        }
      )
    } else {
      updateNote.mutate(
        {
          body: {
            title: values.title,
            summary: values.summary,
            content: values.content,
            related_mentoring: values.related_mentoring ?? undefined,
            // TODO MentorApp: related meeting?
          },
          pathParams: { id: Number(noteId) },
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              predicate: (query) =>
                Array.isArray(query.queryKey) &&
                query.queryKey.includes('notes'),
            })
            message.success('Note updated successfully')
          },
          onError: () => {
            message.error('Note cannot be updated')
          },
        }
      )
    }
  }

  if (!menotringAsMentee || !menotringAsMentor || (!!noteId && !note)) {
    return <PageLoader />
  }

  return (
    <RestrictedRoute>
      <div>
        {createNote.isError && (
          <Alert message="Note cannot be created" type="error" showIcon />
        )}
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          form={form}
          name="create-note-form"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          disabled={createNote.isPending}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please input title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="summary"
            label="Note summery"
            rules={[{ required: true, message: 'Please input your summary!' }]}
          >
            <Input.TextArea autoSize={{ minRows: 4 }} />
          </Form.Item>
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: 'Please input your content!' }]}
          >
            {/* TODO MentorApp: should this be markdown or not? */}
            <Input.TextArea autoSize={{ minRows: 10 }} />
          </Form.Item>
          <Form.Item name="related_mentoring" label="Related mentoring">
            <Select
              style={{ width: '100%' }}
              options={[
                ...[...(menotringAsMentor ?? [])]
                  ?.filter(Boolean)
                  .map((currAsMentor) => ({
                    value: currAsMentor.id,
                    label: `Mentee ${currAsMentor.mentee.first_name} ${currAsMentor.mentee.last_name}`,
                  })),
                ...[...(menotringAsMentee ?? [])]
                  ?.filter(Boolean)
                  .map((currAsMentee) => ({
                    value: currAsMentee.id,
                    label: `Mentor ${currAsMentee.mentor.first_name} ${currAsMentee.mentor.last_name}`,
                  })),
              ]}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              disabled={!submittable}
              loading={createNote.isPending}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </RestrictedRoute>
  )
}

export default NoteForm
