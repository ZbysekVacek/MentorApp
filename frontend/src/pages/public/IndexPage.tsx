import React from 'react'
import { useUserCurrentRetrieve } from '../../api/generated/generatedApiComponents'

import { Routes } from '../../feature/routing/routes'
import { Result, Typography } from 'antd'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { getRouteTitle } from '../../feature/routing/routeDocumentTitle'
import Button from '../../components/Button'
import { Link } from 'react-router-dom'

const IndexPage: React.FC = () => {
  const { data: userData } = useUserCurrentRetrieve({})
  useDocumentTitle(getRouteTitle(Routes.Index))

  return (
    <>
      <Result
        icon={<></>}
        title={
          <Typography.Title level={1}>Welcome to MentorApp</Typography.Title>
        }
        subTitle="Online platform for mentoring support"
        extra={
          !!userData
            ? [
                <Link to={Routes.HomePage}>
                  <Button type="primary">Enter the application</Button>,
                </Link>,
              ]
            : [
                <Link to={Routes.Login}>
                  <Button type="primary">Login</Button>
                </Link>,
                <Link to={Routes.Register}>
                  <Button>Register</Button>
                </Link>,
              ]
        }
      />
    </>
  )
}

export default IndexPage
