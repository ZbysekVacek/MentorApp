import React from 'react'

import { Routes } from '../../feature/routing/routes'
import { Typography } from 'antd'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { getRouteTitle } from '../../feature/routing/routeDocumentTitle'

// TODO MentorApp: implement the page
const RegisterPage = () => {
  useDocumentTitle(getRouteTitle(Routes.Register))

  return (
    <>
      <Typography.Title level={1}>Register to the MentorApp</Typography.Title>
      <Typography.Title level={3}>
        TODO MentorApp: implement the page
      </Typography.Title>
    </>
  )
}

export default RegisterPage
