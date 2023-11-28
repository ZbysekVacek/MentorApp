import React, { useCallback, useState } from 'react'
import { Checkbox, Col, Divider, notification, Row, Typography } from 'antd'
import RestrictedRoute from '../../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import {
  useUserCurrentRetrieve,
  useUserProfilePartialUpdate,
} from '../../api/generated/generatedApiComponents'
import Button from '../../components/Button'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import MarkdownEditor from '../../components/markdown/MarkdownEditor'
import ValidationErrorList from '../../components/errors/ValidationErrorList'

const MyProfile = () => {
  useDocumentTitle('My profile - MentorApp')
  const { data: user } = useUserCurrentRetrieve({})
  const userId = user?.id
  const updateProfile = useUserProfilePartialUpdate()
  const [contact, setContact] = useState(user?.profile?.contact ?? '')
  const [acceptsMentees, setAcceptsMentees] = useState(
    user?.profile?.accepts_mentees ?? false
  )
  const [skills, setSkills] = useState(user?.profile?.skills ?? '')
  const [about, setAbout] = useState(user?.profile?.about ?? '')
  const [api, contextHolder] = notification.useNotification()

  const handleMenteesChange = useCallback(
    (e: CheckboxChangeEvent) => {
      setAcceptsMentees(e.target.checked)
    },
    [setAcceptsMentees]
  )
  const handleSubmit = () => {
    if (userId) {
      updateProfile.mutate(
        {
          pathParams: { userId },
          body: {
            about,
            contact,
            accepts_mentees: acceptsMentees,
            skills,
          },
        },
        {
          onSuccess: () => {
            api.success({
              message: 'Profile updated',
              description: 'Your profile was successfully updated',
            })
          },
          onError: (updateError) => {
            api.error({
              message: 'Profile was not updated',
              duration: 0,
              description: (
                <div>
                  <Typography.Paragraph>
                    Your profile could not be updated
                  </Typography.Paragraph>
                  <>
                    <ValidationErrorList error={updateError} />
                  </>
                </div>
              ),
            })
          },
        }
      )
    }
  }

  if (!user) {
    return <></>
  }

  // TODO MentorApp: add mentoring areas and competencies selection
  return (
    <RestrictedRoute>
      {contextHolder}
      <Typography.Title>My profile</Typography.Title>
      <Typography.Title level={2}>General</Typography.Title>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <div>
            <Typography.Title level={3}>About me</Typography.Title>
            <Typography.Paragraph>
              Tell use something about you. What are you doing, what are your
              objectives, why are here?
            </Typography.Paragraph>
            <MarkdownEditor
              markdown={about}
              onChange={setAbout}
              loading={updateProfile.isPending}
            />
            <br />
            <Button type="primary" onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </Col>
        <Col span={24}>
          <div>
            <Typography.Title level={3}>Contact information</Typography.Title>
            <Typography.Paragraph>
              Please let use know, where can other users contact you
            </Typography.Paragraph>
            <MarkdownEditor
              markdown={contact}
              onChange={setContact}
              loading={updateProfile.isPending}
            />
            <br />
            <Button type="primary" onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </Col>
      </Row>
      <Divider />
      <Typography.Title level={2}>Mentoring</Typography.Title>
      <Row gutter={[20, 20]}>
        <Col lg={12} sm={24}>
          <div>
            <Typography.Title level={3}>I am mentor</Typography.Title>
            <Typography.Paragraph>
              Are you a mentor open for a new mentees? Check this checkbox and
              you will appear as available mentor
            </Typography.Paragraph>
            <Typography.Paragraph>
              <Checkbox onChange={handleMenteesChange} checked={acceptsMentees}>
                I want to be shown as mentor who accepts new mentees
              </Checkbox>
            </Typography.Paragraph>
            <Button type="primary" onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </Col>
        <Col span={24}>
          <div>
            <Typography.Title level={3}>My expertise</Typography.Title>
            <Typography.Paragraph>
              What are your skills? What can you offer to the mentees
            </Typography.Paragraph>
            <MarkdownEditor
              markdown={skills}
              onChange={setSkills}
              loading={updateProfile.isPending}
            />
            <br />
            <Button type="primary" onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </Col>
      </Row>
    </RestrictedRoute>
  )
}

export default MyProfile