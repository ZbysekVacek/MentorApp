import React, { useEffect } from 'react'
import { Card, Col, Row, Typography } from 'antd'
import RestrictedRoute from '../../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { getRouteTitle } from '../../feature/routing/routeDocumentTitle'
import { Routes } from '../../feature/routing/routes'
import { useNavigate, useParams } from 'react-router-dom'
import { useUserRetrieve } from '../../api/generated/generatedApiComponents'
import PageLoader from '../../components/PageLoader'

// TODO MentorApp: add Mentoring areas and competencies when ready
const ProfilePage: React.FC = () => {
  const navigate = useNavigate()
  useDocumentTitle(getRouteTitle(Routes.Notifications))
  const params = useParams<{ userId: string }>()

  let userUrl = params.userId
  useEffect(() => {
    if (!userUrl) {
      navigate('/profile')
    }
  })
  const {
    data: profileUser,
    isLoading,
    isError,
  } = useUserRetrieve({
    pathParams: { id: Number(userUrl) },
  })

  return (
    <RestrictedRoute>
      {isError && <Typography.Title>Something went wrong</Typography.Title>}
      {isLoading && <PageLoader />}
      {profileUser && (
        <>
          <Typography.Title level={1}>
            {profileUser.first_name} {profileUser.last_name}
          </Typography.Title>
          {profileUser.profile?.accepts_mentees && (
            <Typography.Title level={3}>Mentor</Typography.Title>
          )}
          <Row gutter={[20, 20]}>
            <Col lg={12} sm={24}>
              <Card title="About me">
                <Typography.Text>{profileUser.profile?.about}</Typography.Text>
              </Card>
            </Col>
            <Col lg={12} sm={24}>
              <Card title=" Contact information">
                <Typography.Text>
                  {profileUser.profile?.contact}
                </Typography.Text>
              </Card>
            </Col>
            <Col span={24}>
              <Card title="My expertise">
                <Typography.Text>{profileUser.profile?.skills}</Typography.Text>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </RestrictedRoute>
  )
}

export default ProfilePage
