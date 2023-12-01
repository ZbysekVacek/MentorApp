import React from 'react'
import { Layout, Menu } from 'antd'
import { Link, NavLink } from 'react-router-dom'
import { ExternalRoutes, Routes, urlGenerator } from '../../routing/routes'
import Logo from '../Logo'
import {
  useUserCurrentRetrieve,
  useUserLogoutCreate,
} from '../../../api/generated/generatedApiComponents'
import './MainNavigation.css'
import { MessageOutlined, UserOutlined } from '@ant-design/icons'
import { User } from '../../../api/generated/generatedApiSchemas'
import { useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
import NotificationItem from './NotificationItem'

const { Header } = Layout

const getLoggedInMenuItems = (user: User, handleLogout: () => void) => [
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
      {
        key: 'meetings',
        label: <NavLink to={Routes.Meetings}>Meetings</NavLink>,
      },
      {
        key: 'tasks',
        label: <NavLink to={Routes.Tasks}>Tasks</NavLink>,
      },
    ],
  },
  {
    key: 'posts',
    label: <NavLink to={Routes.Posts}>Posts</NavLink>,
  },
  {
    key: 'notes',
    label: <NavLink to={Routes.Notes}>Notes</NavLink>,
  },
  {
    key: 'connections',
    label: <NavLink to={Routes.Connections}>Connections</NavLink>,
  },
  ...(user?.is_staff
    ? [
        {
          key: 'admin',
          label: (
            <a href={ExternalRoutes.Admin} target="_blank" rel="noreferrer">
              Admin
            </a>
          ),
        },
      ]
    : []),
  {
    key: 'notifications',
    label: (
      <NavLink to={Routes.Notifications}>
        <NotificationItem />
      </NavLink>
    ),
  },
  {
    key: 'messages',
    label: (
      <NavLink to={Routes.Messages}>
        <MessageOutlined className="MainNavigation__iconItem" />
      </NavLink>
    ),
  },
  {
    key: 'profile',
    label: (
      <NavLink
        to={urlGenerator.profile(user.id)}
        className="MainNavigation__iconItem"
      >
        <UserOutlined />
        <span className="MainNavigation__userName">
          {user.first_name} {user.last_name?.[0]}.
        </span>
      </NavLink>
    ),
    children: [
      {
        key: 'my-profile',
        label: <Link to={urlGenerator.profile(user.id)}>My Profile</Link>,
      },
      {
        key: 'logout',
        label: (
          <Link to="#" onClick={handleLogout}>
            Log out
          </Link>
        ),
      },
    ],
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
  } = useUserCurrentRetrieve({})

  const queryClient = useQueryClient()
  const logoutUser = useUserLogoutCreate({})
  const handleLogout = () => {
    logoutUser.mutate(
      {},
      {
        onSuccess: () =>
          queryClient.invalidateQueries({ queryKey: ['api', 'user'] }),
      }
    )
  }

  const userNotLoggedIn =
    isLoadingUser || isErrorLoadingUser || !user || !user.id

  const getItems = () => {
    if (userNotLoggedIn) {
      return notLoggedInMenuItems
    }

    return getLoggedInMenuItems(user, handleLogout)
  }

  return (
    <Header
      className={classNames('MainNavigation', {
        'MainNavigation--notLoggedIn': userNotLoggedIn,
        'MainNavigation--loggedIn': !userNotLoggedIn,
      })}
    >
      <div className="MainNavigation__wrapper">
        <Logo />
        <div className="MainNavigation__menuWrapper">
          <Menu
            theme="dark"
            mode="horizontal"
            items={getItems()}
            className="MainNavigation__menu"
          />
        </div>
      </div>
    </Header>
  )
}

export default MainNavigation
