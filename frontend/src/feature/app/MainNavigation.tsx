import React from 'react'
import { Layout, Menu } from 'antd'
import { NavLink } from 'react-router-dom'
import { ExternalRoutes, Routes } from '../routing/routes'
import Logo from './Logo'
import { useUserRetrieve } from '../../api/generated/generatedApiComponents'
import './MainNavigation.css'
import { BellOutlined, MessageOutlined } from '@ant-design/icons'

const { Header } = Layout

const loggedInMenuItems = [
  {
    key: 'homepage',
    label: <NavLink to={Routes.HomePage}>Home</NavLink>,
  },
  {
    key: 'my-mentoring',
    label: (
      <NavLink to={Routes.MyMentoring} className="ant-menu-title-content">
        My Mentoring
      </NavLink>
    ),
    children: [
      {
        key: 'my-mentoring-my-mentors',
        label: <NavLink to={Routes.MyMentoringMyMentors}>My Mentors</NavLink>,
      },
      {
        key: 'my-mentoring-my-mentees',
        label: <NavLink to={Routes.MyMentoringMyMentees}>My Mentees</NavLink>,
      },
      {
        key: 'my-mentoring-search-mentor',
        label: (
          <NavLink to={Routes.MyMentoringSearchMentor}>
            Search For Mentor
          </NavLink>
        ),
      },
    ],
  },
  {
    key: 'posts',
    label: <NavLink to={Routes.Posts}>Posts</NavLink>,
  },
  {
    key: 'meetings',
    label: <NavLink to={Routes.Meetings}>Meetings</NavLink>,
  },
  {
    key: 'tasks',
    label: <NavLink to={Routes.Tasks}>Tasks</NavLink>,
  },
  {
    key: 'notes',
    label: <NavLink to={Routes.Notes}>Notes</NavLink>,
  },
  {
    key: 'connections',
    label: <NavLink to={Routes.Connections}>Connections</NavLink>,
  },
  {
    key: 'notifications',
    label: (
      <NavLink to={Routes.Notifications} className="MainNavigation__iconItem">
        <BellOutlined />
      </NavLink>
    ),
  },
  {
    key: 'messages',
    label: (
      <NavLink to={Routes.Messages} className="MainNavigation__iconItem">
        <MessageOutlined />
      </NavLink>
    ),
  },
]

const notLoggedInMenuItems = [
  {
    key: 'about',
    label: <NavLink to={Routes.About}>About</NavLink>,
  },
  {
    key: 'login',
    label: <NavLink to={Routes.Login}>Sign in</NavLink>,
  },
  {
    key: 'register',
    label: <NavLink to={Routes.Register}>Register</NavLink>,
  },
]

const MainNavigation: React.FC = () => {
  const {
    isLoading: isLoadingUser,
    isError: isErrorLoadingUser,
    data: user,
  } = useUserRetrieve({})

  let loggedItems = loggedInMenuItems
  if (user?.is_staff) {
    loggedItems = [
      ...loggedInMenuItems,
      {
        key: 'admin',
        label: <NavLink to={ExternalRoutes.Admin}>Admin</NavLink>,
      },
    ]
  }

  return (
    <Header className="MainNavigation">
      <Logo />
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ width: '100%' }}
        items={
          isLoadingUser || isErrorLoadingUser || !user || !user.id
            ? notLoggedInMenuItems
            : loggedItems
        }
      />
    </Header>
  )
}

export default MainNavigation
