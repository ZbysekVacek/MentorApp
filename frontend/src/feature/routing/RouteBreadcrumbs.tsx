import { ItemType } from 'antd/lib/breadcrumb/Breadcrumb'
import { Breadcrumb } from 'antd'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { assertIsRoute, Routes } from './routes'

const breadcrumbsByRoute: Record<Routes, ItemType[]> = {
  [Routes.Index]: [],
  [Routes.HomePage]: [{ title: 'Home', href: Routes.Index }],
  [Routes.Meetings]: [
    { title: 'Home', href: Routes.Index },
    { title: 'Meetings', href: Routes.Meetings },
  ],
}

const MentorAppBreadcrumbs = () => {
  const pathname = useLocation().pathname
  assertIsRoute(pathname)

  const items = breadcrumbsByRoute[pathname]

  return <Breadcrumb style={{ margin: '16px 0' }} items={items} />
}

export default MentorAppBreadcrumbs
