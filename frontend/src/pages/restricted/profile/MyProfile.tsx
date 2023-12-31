import React, { useCallback, useState } from 'react'
import {
  Avatar,
  Checkbox,
  Col,
  Descriptions,
  DescriptionsProps,
  Divider,
  Input,
  message,
  notification,
  Row,
  Select,
  Typography,
  Upload,
} from 'antd'
import RestrictedRoute from '../../../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import {
  useCompetencyAllList,
  useUserCurrentRetrieve,
  useUserProfilePartialUpdate,
} from '../../../api/generated/generatedApiComponents'
import Button from '../../../components/Button'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import MarkdownEditor from '../../../components/markdown/MarkdownEditor'
import ValidationErrorList from '../../../components/errors/ValidationErrorList'
import { UploadOutlined } from '@ant-design/icons'
import { getCSRFToken } from '../../../feature/cookies/cookies'
import { useQueryClient } from '@tanstack/react-query'

/*** Displays current users profile */
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
  const [selectedCompetencies, setSelectedCompetencies] = useState(
    user?.profile?.competencies ?? []
  )
  const [about, setAbout] = useState(user?.profile?.about ?? '')
  const [api, contextHolder] = notification.useNotification()
  const queryClient = useQueryClient()

  const { data: competencies } = useCompetencyAllList({})

  const handleMenteesChange = useCallback(
    (e: CheckboxChangeEvent) => {
      setAcceptsMentees(e.target.checked)
    },
    [setAcceptsMentees]
  )
  const handleSubmit = (
    field: 'about' | 'contact' | 'accepts_mentees' | 'skills' | 'competencies'
  ) => {
    if (userId) {
      updateProfile.mutate(
        {
          pathParams: { userId },
          body: {
            about: field === 'about' ? about : undefined,
            contact: field === 'contact' ? contact : undefined,
            accepts_mentees:
              field === 'accepts_mentees' ? acceptsMentees : undefined,
            skills: field === 'skills' ? skills : undefined,
            competencies:
              field === 'competencies' ? selectedCompetencies : undefined,
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

  const myInfoItems: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Name',
      children: user.first_name,
    },
    {
      key: '2',
      label: 'Last Name',
      children: user.last_name,
    },
    {
      key: '3',
      label: 'Username',
      children: user.username,
    },
    {
      key: '4',
      label: 'Email',
      children: user.email,
    },
  ]

  return (
    <RestrictedRoute>
      {contextHolder}
      <Typography.Title>My profile</Typography.Title>
      <Typography.Title level={2}>Me</Typography.Title>
      <Row gutter={[20, 20]}>
        <Col span={12}>
          <Descriptions
            title="My information Size"
            items={myInfoItems}
            column={1}
          />
        </Col>
        <Col span={12}>
          <Typography.Title level={3}>Avatar</Typography.Title>
          <Avatar size={150} src={user.profile?.avatar} />
          <Upload
            action={`/api/user/${userId}/profile/avatar`}
            name="avatar"
            method="PATCH"
            multiple={false}
            headers={{
              'X-Csrftoken': getCSRFToken(),
            }}
            onChange={(info) => {
              if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList)
              }
              if (info.file.status === 'done') {
                queryClient.invalidateQueries({
                  queryKey: ['api', 'user', 'current'],
                })
                message.success(`${info.file.name} file uploaded successfully`)
              } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`)
              }
            }}
          >
            <Button icon={<UploadOutlined />}>Select file and upload</Button>
          </Upload>
        </Col>
      </Row>
      <Typography.Title level={2}>General</Typography.Title>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <div>
            <Typography.Title level={3}>About me</Typography.Title>
            <Typography.Paragraph>
              Tell use something about you. What are you doing, what are your
              objectives, why are here?
            </Typography.Paragraph>
            <Input.TextArea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              disabled={updateProfile.isPending}
              autoSize={{ minRows: 10 }}
              maxLength={500}
              showCount
            />
            <br />
            <br />
            <Button type="primary" onClick={() => handleSubmit('about')}>
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
            <Button type="primary" onClick={() => handleSubmit('contact')}>
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
            <Button
              type="primary"
              onClick={() => handleSubmit('accepts_mentees')}
            >
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
            <Input.TextArea
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              disabled={updateProfile.isPending}
              autoSize={{ minRows: 10 }}
              maxLength={500}
              showCount
            />
            <br />
            <br />
            <Button type="primary" onClick={() => handleSubmit('skills')}>
              Save
            </Button>
          </div>
        </Col>
        <Col span={24}>
          <div>
            <Typography.Title level={3}>My competencies</Typography.Title>
            <Typography.Paragraph>
              In which competencies and areas can you mentor and give advice?
            </Typography.Paragraph>
            <Select
              mode="multiple"
              onChange={(value) => setSelectedCompetencies(value)}
              value={selectedCompetencies}
              style={{ width: '100%' }}
              options={competencies?.map((currCompetency) => ({
                label: currCompetency.name,
                value: currCompetency.id,
              }))}
            />
            <br />
            <br />
            <Button type="primary" onClick={() => handleSubmit('competencies')}>
              Save
            </Button>
          </div>
        </Col>
      </Row>
    </RestrictedRoute>
  )
}

export default MyProfile
