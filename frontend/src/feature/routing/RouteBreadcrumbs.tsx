import { ItemType } from 'antd/lib/breadcrumb/Breadcrumb'
import { Breadcrumb } from 'antd'
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { assertIsRoute, Routes } from './routes'

const breadcrumbsByRoute: Record<Routes, ItemType[]> = {
  // Public routes
  [Routes.Index]: [],
  [Routes.About]: [{ title: <NavLink to={Routes.Index}>Index</NavLink> }],
  [Routes.Login]: [{ title: <NavLink to={Routes.Index}>Index</NavLink> }],
  [Routes.Register]: [{ title: <NavLink to={Routes.Index}>Index</NavLink> }],
  // Restricted routes
  [Routes.HomePage]: [{ title: <NavLink to={Routes.HomePage}>Home</NavLink> }],
  [Routes.MyMentoring]: [
    { title: <NavLink to={Routes.HomePage}>Home</NavLink> },
    { title: <NavLink to={Routes.MyMentoring}>My Mentoring</NavLink> },
  ],
  [Routes.Posts]: [
    { title: <NavLink to={Routes.HomePage}>Home</NavLink> },
    { title: <NavLink to={Routes.Posts}>Posts</NavLink> },
  ],
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
