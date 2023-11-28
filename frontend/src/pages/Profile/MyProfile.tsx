import React, { useCallback, useState } from 'react'
import { Checkbox, Col, Divider, notification, Row, Typography } from 'antd'
import RestrictedRoute from '../../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import {
  useUserCurrentRetrieve,
  useUserProfilePartialUpdate,
} from '../../api/generated/generatedApiComponents'
import TextArea from 'antd/lib/input/TextArea'
import Button from '../../components/Button'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'

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

  const handleAboutChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setAbout(e.target.value)
    },
    [setAbout]
  )

  const handleContactChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContact(e.target.value)
    },
    [setContact]
  )

  const handleSkillsChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setSkills(e.target.value)
    },
    [setSkills]
  )

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
          onError: () => {
            api.error({
              message: 'Profile was not updated',
              description: 'Your profile could not be updated',
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
        <Col lg={12} sm={24}>
          <div>
            <Typography.Title level={3}>About me</Typography.Title>
            <Typography.Text>
              Tell use something about you. What are you doing, what are your
              objectives, why are here?
            </Typography.Text>
            <TextArea
              rows={10}
              value={about}
              onChange={handleAboutChange}
              disabled={updateProfile.isPending}
            />
            <Button type="primary" onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </Col>
        <Col lg={12} sm={24}>
          <div>
            <Typography.Title level={3}>Contact information</Typography.Title>
            <Typography.Text>
              Please let use know, where can other users contact you
            </Typography.Text>
            <TextArea
              rows={10}
              value={contact}
              onChange={handleContactChange}
              disabled={updateProfile.isPending}
            />
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
        <Col lg={12} sm={24}>
          <div>
            <Typography.Title level={3}>My expertise</Typography.Title>
            <Typography.Paragraph>
              What are your skills? What can you offer to the mentees
            </Typography.Paragraph>
            <Typography.Paragraph>
              <TextArea
                rows={10}
                value={skills}
                onChange={handleSkillsChange}
                disabled={updateProfile.isPending}
              />
            </Typography.Paragraph>
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
