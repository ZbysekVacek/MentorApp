import React from 'react'

import { Routes } from '../../feature/routing/routes'
import { Typography } from 'antd'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { getRouteTitle } from '../../feature/routing/routeDocumentTitle'
import { useAppSettingsList } from '../../api/generated/generatedApiComponents'
import MarkdownDisplay from '../../components/markdown/MarkdownDisplay'

const AboutPage = () => {
  useDocumentTitle(getRouteTitle(Routes.About))
  const { data: appSettings } = useAppSettingsList({})
  const aboutContent =
    appSettings?.find((curr) => curr.type === 'ABOUT_CONTENT')?.content || ''

  return (
    <>
      <Typography.Title level={1}>About</Typography.Title>
      <MarkdownDisplay markdown={aboutContent} />
    </>
  )
}

export default AboutPage
