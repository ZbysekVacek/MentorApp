import { ItemType } from 'antd/lib/breadcrumb/Breadcrumb'
import { Breadcrumb } from 'antd'
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { assertIsRoute, Routes } from './routes'

const breadcrumbsByRoute: Record<Routes, ItemType[]> = {
  [Routes.Index]: [],
  [Routes.HomePage]: [{ title: <NavLink to={Routes.HomePage}>Home</NavLink> }],
  [Routes.Meetings]: [
    { title: <NavLink to={Routes.HomePage}>Home</NavLink> },
    { title: <NavLink to={Routes.Meetings}>Meetings</NavLink> },
  ],
}
const defaultItems: ItemType[] = [
  { title: <NavLink to={Routes.HomePage}>Home</NavLink> },
]

const MentorAppBreadcrumbs = () => {
  const pathname = useLocation().pathname

  let usedBreadCrumbs = defaultItems

  if ((Object.values(Routes) as string[]).includes(pathname)) {
    assertIsRoute(pathname)
    usedBreadCrumbs = breadcrumbsByRoute[pathname]
  }

  return <Breadcrumb style={{ margin: '16px 0' }} items={usedBreadCrumbs} />
}

export default MentorAppBreadcrumbs
