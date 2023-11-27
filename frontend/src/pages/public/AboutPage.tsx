import React from 'react'

import { Routes } from '../../feature/routing/routes'
import { Typography } from 'antd'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { getRouteTitle } from '../../feature/routing/routeDocumentTitle'

// TODO MentorApp: implement the page
const AboutPage = () => {
  useDocumentTitle(getRouteTitle(Routes.About))

  return (
    <>
      <Typography.Title level={1}>About the project</Typography.Title>
      <Typography.Title level={3}>
        TODO MentorApp: implement the page
      </Typography.Title>
    </>
  )
}

export default AboutPage
