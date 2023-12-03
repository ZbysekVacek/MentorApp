import React, { useEffect } from 'react'
import { Avatar, Card, Col, Divider, Row, Typography } from 'antd'
import RestrictedRoute from '../../../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { getRouteTitle } from '../../../feature/routing/routeDocumentTitle'
import { Routes } from '../../../feature/routing/routes'
import { useNavigate, useParams } from 'react-router-dom'
import { useUserRetrieve } from '../../../api/generated/generatedApiComponents'
import PageLoader from '../../../components/PageLoader'
import MarkdownDisplay from '../../../components/markdown/MarkdownDisplay'
import './SeeProfile.css'
import CompetenciesList from '../../../feature/competency/CompetenciesList'

/** Displays profile of a user */
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
          <div className="SeeProfile__name">
            <Avatar size={150} src={profileUser?.profile?.avatar} />
            <Typography.Title level={1}>
              {profileUser?.first_name} {profileUser?.last_name}
            </Typography.Title>
          </div>
          <Divider />
          {profileUser.profile?.accepts_mentees && (
            <Typography.Title level={3}>Mentor</Typography.Title>
          )}
          <Row gutter={[20, 20]}>
            <Col lg={12} sm={24}>
              <Card title="About me">
                <MarkdownDisplay markdown={profileUser?.profile?.about ?? ''} />
              </Card>
            </Col>
            <Col lg={12} sm={24}>
              <Card title=" Contact information">
                <MarkdownDisplay
                  markdown={profileUser.profile?.contact ?? ''}
                />
              </Card>
            </Col>
            <Col lg={12} sm={24}>
              <Card title="My expertise">
                <MarkdownDisplay markdown={profileUser.profile?.skills ?? ''} />
              </Card>
            </Col>
            <Col lg={12} sm={24}>
              <Card title="My compenecies">
                <CompetenciesList
                  competencyIds={profileUser.profile?.competencies ?? []}
                />
              </Card>
            </Col>
          </Row>
        </>
      )}
    </RestrictedRoute>
  )
}

export default ProfilePage
