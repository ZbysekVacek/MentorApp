import React, { useEffect } from 'react'

import { Routes } from '../../feature/routing/routes'
import { Typography } from 'antd'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { getRouteTitle } from '../../feature/routing/routeDocumentTitle'
import { useUserRetrieve } from '../../api/generated/generatedApiComponents'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../../feature/user/LoginForm'
import './LoginPage.css'

const LoginPage = () => {
  useDocumentTitle(getRouteTitle(Routes.Login))
  const navigate = useNavigate()
  const { data: user } = useUserRetrieve({})

  useEffect(() => {
    if (user?.id) {
      navigate(Routes.HomePage)
    }
  })

  return (
    <div className="LoginPage">
      <Typography.Title level={1}>Sign in</Typography.Title>
      <Typography.Paragraph>
        Please provide your username and password
      </Typography.Paragraph>
      <LoginForm />
    </div>
  )
}

export default LoginPage
