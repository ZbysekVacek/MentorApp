import { ItemType } from 'antd/lib/breadcrumb/Breadcrumb'
import { Breadcrumb } from 'antd'
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { assertIsRoute, Routes } from './routes'
import './RouteBreadcrumbs.css'

/** Breadcrumbs for routes */
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
  [Routes.MyMentoringMyMentors]: [
    { title: <NavLink to={Routes.HomePage}>Home</NavLink> },
    { title: <NavLink to={Routes.MyMentoring}>My Mentoring</NavLink> },
    { title: <NavLink to={Routes.MyMentoringMyMentors}>My Mentors</NavLink> },
  ],
  [Routes.MyMentoringMyMentees]: [
    { title: <NavLink to={Routes.HomePage}>Home</NavLink> },
    { title: <NavLink to={Routes.MyMentoring}>My Mentoring</NavLink> },
    { title: <NavLink to={Routes.MyMentoringMyMentees}>My Mentees</NavLink> },
  ],
  [Routes.MyMentoringDetail]: [
    { title: <NavLink to={Routes.HomePage}>Home</NavLink> },
    { title: <NavLink to={Routes.MyMentoring}>My Mentoring</NavLink> },
  ],
  [Routes.MyMentoringSearchMentor]: [
    { title: <NavLink to={Routes.HomePage}>Home</NavLink> },
    { title: <NavLink to={Routes.MyMentoring}>My Mentoring</NavLink> },
    {
      title: (
        <NavLink to={Routes.MyMentoringSearchMentor}>Search For Mentor</NavLink>
      ),
    },
  ],
  [Routes.Posts]: [
    { title: <NavLink to={Routes.HomePage}>Home</NavLink> },
    { title: <NavLink to={Routes.Posts}>Posts</NavLink> },
  ],
  [Routes.Meetings]: [
    { title: <NavLink to={Routes.HomePage}>Home</NavLink> },
    { title: <NavLink to={Routes.Meetings}>Meetings</NavLink> },
  ],
  [Routes.MeetingDetail]: [
    { title: <NavLink to={Routes.HomePage}>Home</NavLink> },
    { title: <NavLink to={Routes.Meetings}>Meetings</NavLink> },
  ],
  [Routes.MeetingCreate]: [
    { title: <NavLink to={Routes.HomePage}>Home</NavLink> },
    { title: <NavLink to={Routes.Meetings}>Meetings</NavLink> },
    { title: <NavLink to={Routes.MeetingCreate}>Create</NavLink> },
  ],
  [Routes.Tasks]: [
    { title: <NavLink to={Routes.HomePage}>Home</NavLink> },
    { title: <NavLink to={Routes.Tasks}>Tasks</NavLink> },
  ],
  [Routes.TasksCreated]: [
    { title: <NavLink to={Routes.HomePage}>Home</NavLink> },
    { title: <NavLink to={Routes.Tasks}>Tasks</NavLink> },
    { title: <NavLink to={Routes.TasksCreated}>Tasks Created By Me</NavLink> },
  ],
  [Routes.TasksCreate]: [
    { title: <NavLink to={Routes.HomePage}>Home</NavLink> },
    { title: <NavLink to={Routes.Tasks}>Tasks</NavLink> },
    { title: <NavLink to={Routes.TasksCreated}>Tasks Created By Me</NavLink> },
  ],
  [Routes.TaskDetail]: [
    { title: <NavLink to={Routes.HomePage}>Home</NavLink> },
    { title: <NavLink to={Routes.Tasks}>Tasks</NavLink> },
  ],
  [Routes.Notes]: [
    { title: <NavLink to={Routes.HomePage}>Home</NavLink> },
    { title: <NavLink to={Routes.Notes}>Notes</NavLink> },
  ],
  [Routes.NoteCreate]: [
    { title: <NavLink to={Routes.HomePage}>Home</NavLink> },
    { title: <NavLink to={Routes.Notes}>Notes</NavLink> },
  ],
  [Routes.NoteDetail]: [
    { title: <NavLink to={Routes.HomePage}>Home</NavLink> },
    { title: <NavLink to={Routes.Notes}>Notes</NavLink> },
  ],
  [Routes.Connections]: [
    { title: <NavLink to={Routes.HomePage}>Home</NavLink> },
    { title: <NavLink to={Routes.Connections}>Connections</NavLink> },
  ],
  [Routes.ConnectionsSearch]: [
    { title: <NavLink to={Routes.HomePage}>Home</NavLink> },
    { title: <NavLink to={Routes.Connections}>Connections</NavLink> },
    {
      title: (
        <NavLink to={Routes.ConnectionsSearch}>Search For Connection</NavLink>
      ),
    },
  ],
  [Routes.Notifications]: [
    { title: <NavLink to={Routes.HomePage}>Home</NavLink> },
    { title: <NavLink to={Routes.Notifications}>Notifications</NavLink> },
  ],
  [Routes.Messages]: [
    { title: <NavLink to={Routes.HomePage}>Home</NavLink> },
    { title: <NavLink to={Routes.Messages}>Messages</NavLink> },
  ],
  /** Doesn't work because of parameter in URL */
  [Routes.Profile]: [
    { title: <NavLink to={Routes.HomePage}>Home</NavLink> },
    { title: 'User Detail' },
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

  return (
    <div className="RouteBreadcrumbs">
      <Breadcrumb
        className="RouteBreadcrumbs__breadcrumbs"
        items={usedBreadCrumbs}
      />
    </div>
  )
}

export default MentorAppBreadcrumbs
